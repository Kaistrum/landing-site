import { useEffect, useId, useRef, useState } from "react";
import { loadArcgis, type Arcgis } from "@/lib/arcgis";
import {
	applyExtent,
	constrainToCounty,
	countyExtent,
	countyLayer,
	licenceLayer,
	makeView,
	newZonesLayer,
	occurrenceLayer,
	prospectivityLayer,
	subCountyLayer,
	syncViews
} from "@/lib/prospectivityMap";
import { layers, prospectivityClasses } from "@/data/kakamegaLayers";
import SwipeCompare from "./SwipeCompare";
import ClassLegend from "./ClassLegend";

type Status = "idle" | "loading" | "ready" | "error";

/* Labels come from the layer registry so the page and the registry cannot
   drift apart. See the notes there on why the licence layer is not called
   "active licences". */
const LAYER_TOGGLES = [
	{ key: "subCounties", label: layers.subCounties.label },
	{ key: "newZones", label: layers.newZones.label },
	{ key: "licences", label: layers.activeLicences.label },
	{ key: "occurrences", label: layers.goldOccurrences.label }
];

/* ── Lazy load ──
   Nothing map related is fetched until the module is near the viewport. The
   root margin is a screen or two deep because the chain behind it is long:
   loader, modules, then feature queries that take seconds on these services.
   Starting at 400px meant the reader arrived at the same time as the request.
   A reader who never scrolls this far still downloads none of it. */
function useLazyArcgis(ref: React.RefObject<HTMLElement | null>) {
	const [status, setStatus] = useState<Status>("idle");
	const [arcgis, setArcgis] = useState<Arcgis | null>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el || typeof IntersectionObserver === "undefined") return;

		let cancelled = false;
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((e) => e.isIntersecting)) return;
				observer.disconnect();
				setStatus("loading");
				loadArcgis()
					.then((a) => {
						if (cancelled) return;
						setArcgis(a);
						setStatus("ready");
					})
					.catch((err) => {
						console.error("[maps] SDK failed to load", err);
						if (!cancelled) setStatus("error");
					});
			},
			{ rootMargin: "1200px" }
		);
		observer.observe(el);
		return () => {
			cancelled = true;
			observer.disconnect();
		};
	}, [ref]);

	return { status, arcgis, setStatus };
}

/* ── Overlays ──
   A map never leaves an empty grey box. Before load it shows a quiet
   placeholder, on failure it says so in plain words. */
function Placeholder({ label }: { label: string }) {
	const patternId = `mg-${useId().replace(/:/g, "")}`;
	return (
		<div
			className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 px-6 text-center pointer-events-none"
			style={{ background: "var(--bg-surface)" }}>
			<svg
				aria-hidden="true"
				className="absolute inset-0 w-full h-full opacity-[0.05]"
				xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern
						id={patternId}
						width="40"
						height="40"
						patternUnits="userSpaceOnUse">
						<path
							d="M 40 0 L 0 0 0 40"
							fill="none"
							stroke="currentColor"
							strokeWidth="0.5"
						/>
					</pattern>
				</defs>
				<rect
					width="100%"
					height="100%"
					fill={`url(#${patternId})`}
				/>
			</svg>
			<p className="text-xs" style={{ color: "var(--text-muted)" }}>
				{label}
			</p>
		</div>
	);
}

function FailureNote() {
	return (
		<div
			className="absolute inset-0 z-20 flex items-center justify-center px-8 text-center"
			style={{ background: "var(--bg-surface)" }}>
			<p
				className="text-sm leading-[1.7] max-w-sm"
				style={{ color: "var(--text-dim)" }}>
				The live map could not load. The findings above do not depend on it.
			</p>
		</div>
	);
}

/* Shown briefly when a reader scrolls over the map without the modifier key,
   so the map does not silently swallow the gesture. */
function ScrollHint({ visible }: { visible: boolean }) {
	return (
		<div
			aria-hidden="true"
			className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none transition-opacity duration-200"
			style={{
				opacity: visible ? 1 : 0,
				background: "rgba(0,0,0,0.45)"
			}}>
			<p className="text-sm font-medium text-white px-4 text-center">
				Hold ctrl or cmd and scroll to zoom. Use two fingers on a touch screen.
			</p>
		</div>
	);
}

function useScrollHint(ref: React.RefObject<HTMLElement | null>) {
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		let timer: ReturnType<typeof setTimeout>;
		const onBlocked = () => {
			setVisible(true);
			clearTimeout(timer);
			timer = setTimeout(() => setVisible(false), 1200);
		};
		el.addEventListener("map-scroll-blocked", onBlocked);
		return () => {
			clearTimeout(timer);
			el.removeEventListener("map-scroll-blocked", onBlocked);
		};
	}, [ref]);
	return visible;
}

/* ── Map A, the swipe comparison ── */
export function SwipeMaps({
	leftLabel,
	rightLabel,
	alt,
	accent
}: {
	leftLabel: string;
	rightLabel: string;
	alt: string;
	accent: string;
}) {
	const rootRef = useRef<HTMLDivElement>(null);
	const leftRef = useRef<HTMLDivElement>(null);
	const rightRef = useRef<HTMLDivElement>(null);
	const { status, arcgis, setStatus } = useLazyArcgis(rootRef);
	const hint = useScrollHint(rootRef);
	/* Tracked per pane, and separately from the SDK status. The SDK being
	   downloaded is not the same thing as a map having drawn: reading the two
	   as one lifted the placeholder off an empty box seconds before anything
	   appeared in it. */
	const [drawn, setDrawn] = useState({ left: false, right: false });

	useEffect(() => {
		if (!arcgis || !leftRef.current || !rightRef.current) return;
		let views: any[] = [];
		let unsync: (() => void) | undefined;
		let cancelled = false;

		(async () => {
			try {
				/* One county layer across both panes, not one each. A layer
				   instance may sit in two maps at once, so this is a single
				   portal lookup and a single metadata load rather than two. */
				const county = countyLayer(arcgis);
				/* And one extent query, resolved before either view moves */
				const extentPromise = countyExtent(county);

				const build = async (
					el: HTMLDivElement,
					key: "randomForest" | "svm",
					side: "left" | "right"
				) => {
					const view = await makeView(arcgis, {
						container: el,
						mapLayers: [
							county,
							prospectivityLayer(arcgis, key, { popups: false })
						],
						ui: false
					});
					await applyExtent(view, await extentPromise);
					if (!cancelled) setDrawn((d) => ({ ...d, [side]: true }));
					return view;
				};

				/* Each pane reveals as it lands. Awaiting both together held the
				   faster side behind the slower one for no reason. */
				const [l, r] = await Promise.all([
					build(leftRef.current!, "randomForest", "left"),
					build(rightRef.current!, "svm", "right")
				]);
				if (cancelled) {
					l.destroy();
					r.destroy();
					return;
				}
				views = [l, r];
				/* Both sides must show the same ground or the wipe lies */
				unsync = syncViews(arcgis, l, r);
			} catch (err) {
				console.error("[maps] view build failed", err);
				if (!cancelled) setStatus("error");
			}
		})();

		return () => {
			cancelled = true;
			unsync?.();
			views.forEach((v) => v?.destroy());
		};
	}, [arcgis, setStatus]);

	const pane = (
		ref: React.RefObject<HTMLDivElement | null>,
		label: string,
		side: "left" | "right"
	) => (
		<div className="absolute inset-0">
			<div ref={ref} className="absolute inset-0" />
			{!drawn[side] && status !== "error" && <Placeholder label={label} />}
		</div>
	);

	return (
		<div ref={rootRef}>
			<SwipeCompare
				leftLabel={leftLabel}
				rightLabel={rightLabel}
				accent={accent}
				alt={alt}
				left={pane(leftRef, leftLabel, "left")}
				right={pane(rightRef, rightLabel, "right")}
				overlay={
					<>
						{status === "error" && <FailureNote />}
						<ScrollHint visible={hint} />
					</>
				}
			/>
			<ClassLegend />
		</div>
	);
}

/* ── Map B, the targets explorer ── */
export function TargetsMap({ alt, accent }: { alt: string; accent: string }) {
	const rootRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<HTMLDivElement>(null);
	const { status, arcgis, setStatus } = useLazyArcgis(rootRef);
	const hint = useScrollHint(rootRef);
	const [model, setModel] = useState<"randomForest" | "svm">("randomForest");
	const layersRef = useRef<Record<string, any>>({});
	const [layersReady, setLayersReady] = useState(false);
	const [visible, setVisible] = useState<Record<string, boolean>>({
		subCounties: true,
		newZones: true,
		licences: true,
		occurrences: true
	});

	/* Toggles drive the live layers once they exist */
	useEffect(() => {
		if (!layersReady) return;
		Object.entries(visible).forEach(([key, on]) => {
			const layer = layersRef.current[key];
			if (layer) layer.visible = on;
		});
	}, [visible, layersReady]);

	useEffect(() => {
		if (!arcgis || !mapRef.current) return;
		let view: any;
		let cancelled = false;

		(async () => {
			try {
				const county = countyLayer(arcgis);
				const rf = prospectivityLayer(arcgis, "randomForest");
				const svm = prospectivityLayer(arcgis, "svm");
				svm.visible = false;
				const subCounties = subCountyLayer(arcgis);
				const newZones = newZonesLayer(arcgis);
				const licences = licenceLayer(arcgis);
				const occurrences = occurrenceLayer(arcgis);
				layersRef.current = {
					randomForest: rf,
					svm,
					subCounties,
					newZones,
					licences,
					occurrences
				};

				/* Draw order, bottom to top */
				const stack = [
					county,
					subCounties,
					rf,
					svm,
					newZones,
					licences,
					occurrences
				];

				view = await makeView(arcgis, {
					container: mapRef.current!,
					mapLayers: stack
				});
				if (cancelled) {
					view.destroy();
					return;
				}

				/* No SDK widgets here on purpose. Legend and LayerList render
				   Calcite components, whose message bundles do not resolve from
				   the CDN build, and the first one to format a localised string
				   throws. The legend and the layer toggles below are plain HTML,
				   which also keeps them on the site's own styling and keeps them
				   working when the SDK does not load at all. */
				await constrainToCounty(arcgis, view, county);
				if (!cancelled) setLayersReady(true);
			} catch (err) {
				console.error("[maps] view build failed", err);
				if (!cancelled) setStatus("error");
			}
		})();

		return () => {
			cancelled = true;
			view?.destroy();
		};
	}, [arcgis, setStatus]);

	/* Switching models toggles visibility rather than rebuilding the map, so
	   the reader keeps their extent. Both sides use the same renderer. */
	useEffect(() => {
		const l = layersRef.current;
		if (!l.randomForest || !l.svm) return;
		l.randomForest.visible = model === "randomForest";
		l.svm.visible = model === "svm";
	}, [model]);

	const options: { key: "randomForest" | "svm"; label: string }[] = [
		{ key: "randomForest", label: "Random Forest" },
		{ key: "svm", label: "Support Vector Machine" }
	];

	return (
		<figure className="m-0" ref={rootRef}>
			<div
				className="flex flex-wrap items-center gap-2 mb-3"
				role="group"
				aria-label="Choose which model to show">
				<span
					className="text-[10px] uppercase tracking-[0.18em] font-semibold mr-1"
					style={{ color: "var(--text-muted)" }}>
					Model
				</span>
				{options.map((o) => {
					const active = model === o.key;
					return (
						<button
							key={o.key}
							type="button"
							aria-pressed={active}
							onClick={() => setModel(o.key)}
							className="text-xs font-medium px-3 py-1.5 border transition-colors duration-200"
							style={{
								borderColor: active ? accent : "var(--border)",
								color: active ? "#FFFFFF" : "var(--text-dim)",
								background: active ? accent : "transparent"
							}}>
							{o.label}
						</button>
					);
				})}
			</div>

			{layersReady && (
				<fieldset className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 border-0 p-0 m-0">
					<legend
						className="text-[10px] uppercase tracking-[0.18em] font-semibold float-left mr-3"
						style={{ color: "var(--text-muted)" }}>
						Layers
					</legend>
					{LAYER_TOGGLES.map((t) => (
						<label
							key={t.key}
							className="inline-flex items-center gap-2 text-xs cursor-pointer"
							style={{ color: "var(--text-dim)" }}>
							<input
								type="checkbox"
								checked={visible[t.key] ?? true}
								onChange={(e) =>
									setVisible((v) => ({ ...v, [t.key]: e.target.checked }))
								}
								style={{ accentColor: accent }}
							/>
							{t.label}
						</label>
					))}
				</fieldset>
			)}

			<div
				className="relative w-full overflow-hidden border h-[420px] md:h-[560px]"
				style={{
					background: "var(--bg-surface)",
					borderColor: "var(--border)"
				}}>
				<div ref={mapRef} className="absolute inset-0" />
				{!layersReady && status !== "error" && (
					<Placeholder label="Loading the targets map" />
				)}
				{status === "error" && <FailureNote />}
				<ScrollHint visible={hint} />
			</div>

			<ClassLegend />

			<p className="sr-only">{alt}</p>
			<figcaption
				className="text-xs leading-[1.6] mt-3"
				style={{ color: "var(--text-muted)" }}>
				{alt}
			</figcaption>
		</figure>
	);
}
