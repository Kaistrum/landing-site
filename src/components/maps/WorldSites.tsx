import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import useMounted from "@/lib/useMounted";
import {
	DOT_COLS,
	DOT_ROWS,
	landDots,
	projectToGrid
} from "@/data/worldDots";

export type Site = {
	name: string;
	region: string;
	mineral: string;
	lon: number;
	lat: number;
	/* Only a site with a real study behind it is marked active. Anything
	   else is drawn as an empty slot and says so. */
	active: boolean;
};

/* A dot grid world map drawn entirely as SVG. No raster image, nothing
   fetched, no map SDK: the hero must stay cheap and must not pull the
   ArcGIS bundle before the reader has scrolled anywhere. */
export default function WorldSites({
	sites,
	accent
}: {
	sites: Site[];
	accent: string;
}) {
	const mounted = useMounted();
	const prefersReduced = useReducedMotion();
	const reduceMotion = mounted && prefersReduced;

	/* 2,974 dots as one path rather than 2,974 nodes. Built once. */
	const dotPath = useMemo(
		() =>
			landDots
				.map(([c, r]) => `M${c + 0.2} ${r + 0.2}h.6v.6h-.6z`)
				.join(""),
		[]
	);

	const marked = sites.filter((s) => s.active);
	const label =
		marked.length > 0
			? `World map with ${marked
					.map((s) => `${s.mineral} in ${s.name}, ${s.region}`)
					.join("; ")} marked.`
			: "World map with no sites marked.";

	return (
		<svg
			viewBox={`0 0 ${DOT_COLS} ${DOT_ROWS}`}
			className="w-full h-full"
			preserveAspectRatio="xMidYMid slice"
			role="img"
			aria-label={label}>
			{/* Land */}
			<path d={dotPath} fill="currentColor" opacity={0.22} />

			{sites.map((s) => {
				const [x, y] = projectToGrid(s.lon, s.lat);
				const colour = s.active ? accent : "currentColor";
				return (
					<g key={`${s.name}-${s.mineral}`}>
						{s.active && !reduceMotion && (
							<circle cx={x} cy={y} r={1.2} fill={colour} opacity={0.35}>
								<animate
									attributeName="r"
									values="1.2;4.5"
									dur="2.4s"
									repeatCount="indefinite"
								/>
								<animate
									attributeName="opacity"
									values="0.35;0"
									dur="2.4s"
									repeatCount="indefinite"
								/>
							</circle>
						)}
						<circle
							cx={x}
							cy={y}
							r={s.active ? 1.25 : 0.9}
							fill={s.active ? colour : "none"}
							stroke={colour}
							strokeWidth={s.active ? 0 : 0.35}
							opacity={s.active ? 1 : 0.4}
						/>
					</g>
				);
			})}
		</svg>
	);
}

/* The labels sit in HTML rather than inside the SVG, so they use the page's
   type scale and stay legible at phone width. */
export function SiteLabels({
	sites,
	accent
}: {
	sites: Site[];
	accent: string;
}) {
	return (
		<ul className="flex flex-wrap gap-x-5 gap-y-2">
			{sites.map((s) => (
				<li
					key={`${s.name}-${s.mineral}`}
					className="flex items-center gap-2 text-xs"
					style={{ color: s.active ? "var(--text)" : "var(--text-muted)" }}>
					<span
						className="w-2 h-2 shrink-0 rounded-full"
						style={{
							background: s.active ? accent : "transparent",
							border: s.active ? "none" : "1px solid var(--text-muted)"
						}}
						aria-hidden="true"
					/>
					{s.active ? (
						<span>
							<span className="font-semibold">{s.mineral}</span>, {s.name}
						</span>
					) : (
						<span>{s.mineral}</span>
					)}
				</li>
			))}
		</ul>
	);
}
