/* Map construction shared by Map A and Map B.

   One renderer definition serves both, which is the point: the two services
   ship renderers that disagree (Random Forest uses uniqueValue over gridcode
   1 to 5, SVM uses classBreaks over gridcode 0 to 5, with one feature at 0).
   Comparing them as published would be dishonest, so the page ignores both
   and draws everything from Pros_Class with the ramp below. */

import type { Arcgis } from "./arcgis";
import {
	BASEMAP,
	CLASS_FIELD,
	EXTENT_PADDING_RATIO,
	classFillOpacity,
	layers,
	prospectivityClasses,
	serviceUrl,
	subCountyWhere,
	type LayerKey
} from "@/data/kakamegaLayers";

export function prefersReducedMotion(): boolean {
	return (
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches
	);
}

/* ── The one renderer ── */
export function classRenderer(a: Arcgis) {
	return new a.UniqueValueRenderer({
		field: CLASS_FIELD,
		defaultSymbol: null,
		uniqueValueInfos: prospectivityClasses.map((c) => ({
			value: c.value,
			label: c.value,
			symbol: new a.SimpleFillSymbol({
				color: [...hexToRgb(c.color), classFillOpacity],
				outline: { color: [0, 0, 0, 0.12], width: 0.3 }
			})
		}))
	});
}

function hexToRgb(hex: string): [number, number, number] {
	if (typeof hex !== "string" || hex.length < 6) return [0, 0, 0];
	const h = hex.replace("#", "");
	return [
		parseInt(h.slice(0, 2), 16),
		parseInt(h.slice(2, 4), 16),
		parseInt(h.slice(4, 6), 16)
	];
}

/* ── Popups, built from fields the inspection actually found ── */
function popup(a: Arcgis, title: string, fields: string[], labels: string[]) {
	return new a.PopupTemplate({
		title,
		content: [
			{
				type: "fields",
				fieldInfos: fields.map((f, i) => ({
					fieldName: f,
					label: labels[i] ?? f
				}))
			}
		]
	});
}

/* ── Layer factories ──
   Every layer is loaded by portalItem id, never by a constructed URL. */
function byItem(a: Arcgis, key: LayerKey, extra: Record<string, unknown> = {}) {
	return new a.FeatureLayer({
		portalItem: { id: layers[key].itemId },
		title: layers[key].label,
		...extra
	});
}

/* `popups: false` is not cosmetic. A popup template pins its four fields to
   the layer's required field set, so every one of the 4,230 and 3,947
   features carries Litho_Name, Rock_Type and Area_km2 down the wire before
   anything draws. The swipe panes have nothing to click, so they ask for the
   class field alone. Map B keeps its popups and pays for them. */
export function prospectivityLayer(
	a: Arcgis,
	key: "randomForest" | "svm",
	opts: { popups?: boolean } = {}
) {
	const withPopup = opts.popups !== false;
	return byItem(a, key, {
		renderer: classRenderer(a),
		opacity: 1,
		outFields: withPopup ? layers[key].popupFields : [CLASS_FIELD],
		popupEnabled: withPopup,
		...(withPopup
			? {
					popupTemplate: popup(
						a,
						"{" + CLASS_FIELD + "} prospectivity",
						layers[key].popupFields,
						["Class", "Lithology", "Rock type", "Area km2"]
					)
			  }
			: {})
	});
}

export function countyLayer(a: Arcgis) {
	return byItem(a, "county", {
		renderer: new a.SimpleRenderer({
			symbol: new a.SimpleFillSymbol({
				color: [0, 0, 0, 0],
				outline: { color: [40, 40, 40, 0.9], width: 1.6 }
			})
		}),
		popupEnabled: false,
		legendEnabled: false
	});
}

export function subCountyLayer(a: Arcgis) {
	/* The service covers eight counties, so this is filtered or it draws
	   seven neighbours. Note Hamisi is in Vihiga and will not appear. */
	return byItem(a, "subCounties", {
		definitionExpression: subCountyWhere,
		renderer: new a.SimpleRenderer({
			symbol: new a.SimpleFillSymbol({
				color: [0, 0, 0, 0],
				outline: { color: [60, 60, 60, 0.55], width: 0.7 }
			})
		}),
		labelingInfo: [
			{
				labelExpressionInfo: { expression: "$feature.adm2_name" },
				symbol: {
					type: "text",
					color: [30, 30, 30, 0.9],
					haloColor: [255, 255, 255, 0.9],
					haloSize: 1.2,
					font: { size: 9, weight: "bold" }
				},
				labelPlacement: "always-horizontal"
			}
		],
		popupTemplate: popup(a, "{adm2_name}", ["adm2_name", "adm1_name"], [
			"Sub county",
			"County"
		])
	});
}

export function newZonesLayer(a: Arcgis) {
	/* Reads as an overlay, not another fill class: hollow with a firm outline
	   so the prospectivity ramp underneath stays visible. */
	return byItem(a, "newZones", {
		renderer: new a.SimpleRenderer({
			symbol: new a.SimpleFillSymbol({
				color: [0, 0, 0, 0],
				outline: { color: [20, 120, 190, 0.95], width: 1.1 }
			})
		}),
		popupTemplate: popup(
			a,
			layers.newZones.label,
			layers.newZones.popupFields,
			["Class, model one", "Class, model two", "Lithology"]
		)
	});
}

export function licenceLayer(a: Arcgis) {
	/* Labelled by what the features are, not what the service is called:
	   all four carry Status "Pending Renewal". */
	return byItem(a, "activeLicences", {
		renderer: new a.SimpleRenderer({
			symbol: new a.SimpleFillSymbol({
				color: [0, 0, 0, 0],
				outline: { color: [120, 40, 140, 0.95], width: 1.4, style: "dash" }
			})
		}),
		popupTemplate: popup(
			a,
			"{Parties}",
			layers.activeLicences.popupFields,
			["Holder", "Status", "Licence type", "Commodities"]
		)
	});
}

export function occurrenceLayer(a: Arcgis) {
	return byItem(a, "goldOccurrences", {
		renderer: new a.SimpleRenderer({
			symbol: new a.SimpleMarkerSymbol({
				style: "circle",
				size: 5.5,
				color: [15, 15, 15, 0.95],
				outline: { color: [255, 255, 255, 0.95], width: 0.9 }
			})
		}),
		popupTemplate: popup(
			a,
			"{Area_Name}",
			layers.goldOccurrences.popupFields,
			["Occurrence", "Source"]
		)
	});
}

/* ── View rules shared by every view on the page ── */
export type ViewOptions = {
	container: HTMLDivElement;
	mapLayers: unknown[];
	ui?: boolean;
};

export async function makeView(a: Arcgis, opts: ViewOptions) {
	const view = new a.MapView({
		container: opts.container,
		map: new a.Map({ basemap: BASEMAP, layers: opts.mapLayers }),
		ui: { components: opts.ui === false ? [] : ["attribution"] }
	});

	/* Two fingers to pan on touch, so a one finger drag still scrolls the page */
	view.navigation.browserTouchPanEnabled = true;

	await view.when();

	/* Ctrl or cmd plus wheel to zoom, so the page does not get hijacked by a
	   map the reader was only scrolling past. The hint overlay is rendered by
	   MapFrame and driven by the event below. */
	view.on("mouse-wheel", (e: any) => {
		if (!e.native.ctrlKey && !e.native.metaKey) {
			e.stopPropagation();
			opts.container.dispatchEvent(
				new CustomEvent("map-scroll-blocked", { bubbles: true })
			);
		}
	});

	return view;
}

/* Keep the reader inside the study area plus a margin. Built from the county
   layer's real extent rather than a hardcoded box.

   The query is split from the applying so that the swipe can run it once and
   hand the same extent to both panes. Two panes resolving the extent
   separately cost two layer loads and two queryExtent round trips to show the
   identical box. */
export async function countyExtent(county: any): Promise<any | null> {
	try {
		await county.load();
		const res = await county.queryExtent();
		if (!res?.extent) return null;
		return res.extent.clone().expand(1 + EXTENT_PADDING_RATIO);
	} catch {
		/* A failed extent query is not worth failing the map over */
		return null;
	}
}

export async function applyExtent(view: any, ext: any): Promise<void> {
	if (!ext) return;
	try {
		await view.goTo(ext, { animate: !prefersReducedMotion() });
		view.constraints.geometry = ext;
		view.constraints.rotationEnabled = false;
	} catch {
		/* Same reasoning: the map is still readable without the constraint */
	}
}

export async function constrainToCounty(a: Arcgis, view: any, county: any) {
	await applyExtent(view, await countyExtent(county));
}

/* Link two views so a swipe compares the same ground on both sides. The guard
   is what stops the two watchers driving each other in a loop. */
export function syncViews(a: Arcgis, left: any, right: any): () => void {
	let syncing = false;
	const link = (from: any, to: any) =>
		a.reactiveUtils.watch(
			() => from.viewpoint,
			(vp: any) => {
				if (syncing || !vp) return;
				syncing = true;
				to.viewpoint = vp;
				syncing = false;
			}
		);
	const handles = [link(left, right), link(right, left)];
	return () => handles.forEach((h) => h.remove());
}

export { serviceUrl };
