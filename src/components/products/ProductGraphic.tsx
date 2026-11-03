import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import useMounted from "@/lib/useMounted";

/* Earth themed graphics for the product sections.

   These are illustrations, not data. Real maps and real outputs belong on the
   case study pages, where there is a source to credit and something to
   caption. Nothing here should be mistaken for a result, so the forms carry
   no legend, no scale bar and no place names.

   The treatment follows the home page hero: a dark field, one warm light
   source, depth built from layering rather than outlines, the edges faded
   into the section behind, and the same film grain the rest of the site uses.

   Everything is generated from fixed arithmetic rather than randomness, so
   the server and the client produce identical markup and hydration is
   stable. */

const W = 480;
const H = 320;

type Palette = {
	deep: string;
	mid: string;
	glow: string;
	hot: string;
};

const PALETTES: Record<string, Palette> = {
	prospectivity: { deep: "#1A0E04", mid: "#7C3A06", glow: "#D95F0E", hot: "#FFC663" },
	seismic: { deep: "#0B1016", mid: "#1F4A5C", glow: "#2E8CA6", hot: "#8FE3F5" },
	water: { deep: "#04161A", mid: "#0C5B55", glow: "#1E8A82", hot: "#8FE6DC" },
	fleets: { deep: "#0D0F18", mid: "#3B2E6B", glow: "#6D5BC0", hot: "#C3B6FF" }
};

/* ── Contoured target field, tightening onto a single high point ── */
function contourPath(ringIndex: number, radius: number): string {
	const cx = W * 0.56;
	const cy = H * 0.52;
	const steps = 84;
	const pts: string[] = [];
	for (let i = 0; i <= steps; i++) {
		const t = (i / steps) * Math.PI * 2;
		const wobble =
			1 +
			0.11 * Math.sin(3 * t + ringIndex * 0.42) +
			0.065 * Math.sin(5 * t - ringIndex * 0.27) +
			0.03 * Math.sin(9 * t + ringIndex * 0.6);
		const r = radius * wobble;
		pts.push(
			`${i === 0 ? "M" : "L"}${(cx + r * Math.cos(t) * 1.3).toFixed(1)} ${(
				cy +
				r * Math.sin(t)
			).toFixed(1)}`
		);
	}
	return `${pts.join("")}Z`;
}

function Prospectivity({ p }: { p: Palette }) {
	const rings = useMemo(() => {
		const count = 26;
		const out: { d: string; i: number }[] = [];
		for (let i = count - 1; i >= 0; i--) {
			out.push({ d: contourPath(i, 10 + i * 8.2), i });
		}
		return out;
	}, []);

	return (
		<g>
			{rings.map((r) => {
				/* 0 at the rim, 1 at the core */
				const k = 1 - r.i / 26;
				return (
					<path
						key={r.i}
						d={r.d}
						fill="none"
						stroke={k > 0.72 ? p.hot : k > 0.4 ? p.glow : p.mid}
						strokeWidth={0.5 + k * 1.5}
						opacity={0.2 + k * 0.72}
					/>
				);
			})}
			<circle cx={W * 0.56} cy={H * 0.52} r={5} fill={p.hot} opacity={0.95} />
		</g>
	);
}

/* ── Horizon line generator, shared by the section and basin graphics ── */
function stratumLine(index: number, amp: number): string {
	const baseY = 18 + index * 7.2;
	const steps = 60;
	const pts: string[] = [];
	for (let i = 0; i <= steps; i++) {
		const x = (i / steps) * W;
		const t = (i / steps) * Math.PI * 2;
		const y =
			baseY +
			amp * Math.sin(t * 1.3 + index * 0.21) +
			amp * 0.4 * Math.sin(t * 2.9 - index * 0.13);
		pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
	}
	return pts.join("");
}

function Seismic({ p }: { p: Palette }) {
	const lines = useMemo(
		() =>
			Array.from({ length: 42 }, (_, i) => ({
				d: stratumLine(i, 5 + (i % 7) * 1.5),
				i
			})),
		[]
	);

	return (
		<g>
			{lines.map((l) => {
				const k = l.i / 42;
				return (
					<path
						key={l.i}
						d={l.d}
						fill="none"
						stroke={k > 0.55 ? p.mid : p.glow}
						strokeWidth={0.7}
						opacity={0.18 + (1 - k) * 0.5}
					/>
				);
			})}
			{/* The horizon the conversion actually carries across */}
			<path d={stratumLine(16, 9)} fill="none" stroke={p.hot} strokeWidth={7} opacity={0.18} />
			<path d={stratumLine(16, 9)} fill="none" stroke={p.hot} strokeWidth={2.4} />
		</g>
	);
}

/* ── Drainage basin with a branching network ── */
function tributaries(
	x: number,
	y: number,
	angle: number,
	len: number,
	depth: number,
	out: string[]
): void {
	if (depth === 0 || len < 6) return;
	const x2 = x + Math.cos(angle) * len;
	const y2 = y + Math.sin(angle) * len;
	out.push(`M${x.toFixed(1)} ${y.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`);
	const spread = 0.5 + depth * 0.05;
	tributaries(x2, y2, angle - spread, len * 0.7, depth - 1, out);
	tributaries(x2, y2, angle + spread * 0.85, len * 0.74, depth - 1, out);
}

function Water({ p }: { p: Palette }) {
	const bands = useMemo(
		() =>
			Array.from({ length: 16 }, (_, i) => ({
				d: stratumLine(i * 2.6 + 4, 7 + i * 0.9),
				i
			})),
		[]
	);

	const streams = useMemo(() => {
		const out: string[] = [];
		tributaries(W * 0.52, H + 10, -Math.PI / 2, 74, 6, out);
		return out.join("");
	}, []);

	return (
		<g>
			{bands.map((b) => (
				<path key={b.i} d={b.d} fill="none" stroke={p.mid} strokeWidth={0.7} opacity={0.3} />
			))}
			<path d={streams} fill="none" stroke={p.glow} strokeWidth={4} strokeLinecap="round" opacity={0.25} />
			<path d={streams} fill="none" stroke={p.hot} strokeWidth={1.5} strokeLinecap="round" opacity={0.95} />
		</g>
	);
}

/* ── Route network with one route lit ── */
function Fleets({ p }: { p: Palette }) {
	const nodes = useMemo(() => {
		const out: { x: number; y: number }[] = [];
		for (let r = 0; r < 5; r++) {
			for (let c = 0; c < 7; c++) {
				out.push({
					x: ((c + 0.5) / 7) * W + 16 * Math.sin(r * 1.7 + c * 0.9),
					y: ((r + 0.5) / 5) * H + 14 * Math.cos(c * 1.3 + r * 0.7)
				});
			}
		}
		return out;
	}, []);

	const links = useMemo(() => {
		const out: string[] = [];
		for (let r = 0; r < 5; r++) {
			for (let c = 0; c < 7; c++) {
				const a = nodes[r * 7 + c];
				const push = (b: { x: number; y: number }) =>
					out.push(
						`M${a.x.toFixed(1)} ${a.y.toFixed(1)}L${b.x.toFixed(1)} ${b.y.toFixed(1)}`
					);
				if (c < 6) push(nodes[r * 7 + c + 1]);
				if (r < 4) push(nodes[(r + 1) * 7 + c]);
			}
		}
		return out.join("");
	}, [nodes]);

	const route = useMemo(
		() =>
			[0, 1, 8, 15, 16, 23, 30, 31]
				.map(
					(n, i) =>
						`${i === 0 ? "M" : "L"}${nodes[n].x.toFixed(1)} ${nodes[n].y.toFixed(1)}`
				)
				.join(""),
		[nodes]
	);

	return (
		<g>
			<path d={links} fill="none" stroke={p.mid} strokeWidth={0.8} opacity={0.45} />
			<path d={route} fill="none" stroke={p.glow} strokeWidth={7} opacity={0.22} strokeLinejoin="round" />
			<path d={route} fill="none" stroke={p.hot} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
			{nodes.map((n, i) => (
				<circle key={i} cx={n.x} cy={n.y} r={1.8} fill={p.glow} opacity={0.6} />
			))}
		</g>
	);
}

export type GraphicVariant = "prospectivity" | "seismic" | "water" | "fleets";

export default function ProductGraphic({
	variant,
	label
}: {
	variant: GraphicVariant;
	label: string;
}) {
	/* Must match the server on the first client render, see useMounted */
	const mounted = useMounted();
	const prefersReduced = useReducedMotion() ?? false;
	const reduceMotion = mounted && prefersReduced;

	const p = PALETTES[variant];
	const uid = `pg-${variant}`;

	return (
		<div
			className="relative w-full overflow-hidden border"
			style={{
				aspectRatio: "3/2",
				background: p.deep,
				borderColor: "var(--border)"
			}}>
			<svg
				viewBox={`0 0 ${W} ${H}`}
				className="absolute inset-0 w-full h-full"
				preserveAspectRatio="xMidYMid slice"
				role="img"
				aria-label={label}>
				<defs>
					{/* One warm light source, as the hero has */}
					<radialGradient id={`${uid}-glow`} cx="56%" cy="50%" r="62%">
						<stop offset="0%" stopColor={p.glow} stopOpacity="0.5" />
						<stop offset="55%" stopColor={p.mid} stopOpacity="0.18" />
						<stop offset="100%" stopColor={p.deep} stopOpacity="0" />
					</radialGradient>
					{/* Side edges faded out, as the hero fades into black */}
					<linearGradient id={`${uid}-fadeX`} x1="0" x2="1">
						<stop offset="0%" stopColor="#fff" stopOpacity="0" />
						<stop offset="18%" stopColor="#fff" stopOpacity="1" />
						<stop offset="82%" stopColor="#fff" stopOpacity="1" />
						<stop offset="100%" stopColor="#fff" stopOpacity="0" />
					</linearGradient>
					<mask id={`${uid}-mask`}>
						<rect width={W} height={H} fill={`url(#${uid}-fadeX)`} />
					</mask>
					<linearGradient id={`${uid}-vignette`} x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor={p.deep} stopOpacity="0.55" />
						<stop offset="45%" stopColor={p.deep} stopOpacity="0" />
						<stop offset="100%" stopColor={p.deep} stopOpacity="0.8" />
					</linearGradient>
				</defs>

				<rect width={W} height={H} fill={`url(#${uid}-glow)`} />

				<g mask={`url(#${uid}-mask)`}>
					{variant === "prospectivity" && <Prospectivity p={p} />}
					{variant === "seismic" && <Seismic p={p} />}
					{variant === "water" && <Water p={p} />}
					{variant === "fleets" && <Fleets p={p} />}
				</g>

				<rect width={W} height={H} fill={`url(#${uid}-vignette)`} />

				{!reduceMotion && (
					<circle
						cx={W * 0.56}
						cy={H * 0.52}
						r={14}
						fill="none"
						stroke={p.hot}
						strokeWidth={1}
						opacity={0.5}>
						<animate attributeName="r" values="14;150" dur="6s" repeatCount="indefinite" />
						<animate attributeName="opacity" values="0.5;0" dur="6s" repeatCount="indefinite" />
					</circle>
				)}
			</svg>

			{/* The same film grain the rest of the site uses */}
			<div
				className="bg-noise absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay"
				aria-hidden="true"
			/>
		</div>
	);
}
