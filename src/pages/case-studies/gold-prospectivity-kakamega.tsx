import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
	ArrowLeft,
	ArrowRight,
	FlaskConical,
	GitBranch,
	Mountain,
	Satellite
} from "lucide-react";
import SEO, { breadcrumbSchema, articleSchema } from "@/components/SEO";
import useMounted from "@/lib/useMounted";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import {
	area,
	dataStreams,
	findings,
	metrics,
	models,
	stack,
	sites,
	study,
	validation
} from "@/data/goldProspectivity";

/* Warm accent drawn from the existing palette. Light mode uses the darker
   amber so text on white clears WCAG AA; dark mode can carry the brighter one. */
const ACCENT = "#B45309";

/* Map modules are client only: the SDK touches window on construction, and
   there is nothing to prerender since the views are lazy loaded anyway. */
const SwipeMaps = dynamic(
	() => import("@/components/maps/GoldMaps").then((m) => m.SwipeMaps),
	{ ssr: false }
);
const TargetsMap = dynamic(
	() => import("@/components/maps/GoldMaps").then((m) => m.TargetsMap),
	{ ssr: false }
);
/* The hero map is plain SVG, no SDK, so it renders with the page */
const WorldSites = dynamic(() => import("@/components/maps/WorldSites"));
const SiteLabels = dynamic(
	() => import("@/components/maps/WorldSites").then((m) => m.SiteLabels)
);


const ICONS = { FlaskConical, Satellite, GitBranch, Mountain } as const;

/* ── Reveal on scroll, skipped entirely when reduced motion is requested ── */
function Reveal({
	children,
	delay = 0,
	className,
	style
}: {
	children: React.ReactNode;
	delay?: number;
	className?: string;
	style?: React.CSSProperties;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-60px" });
	const mounted = useMounted();
	const prefersReduced = useReducedMotion();
	const reduceMotion = mounted && prefersReduced;

	if (reduceMotion) {
		return (
			<div ref={ref} className={className} style={style}>
				{children}
			</div>
		);
	}

	return (
		<motion.div
			ref={ref}
			className={className}
			style={style}
			initial={{ opacity: 0, y: 24 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}>
			{children}
		</motion.div>
	);
}

/* ── Eyebrow label above each section heading ── */
function Eyebrow({ children }: { children: React.ReactNode }) {
	return (
		<p
			className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-4"
			style={{ color: ACCENT }}>
			{children}
		</p>
	);
}



/* ── Impact band tiles. The two model scores are read straight out of the
   single models object, so neither figure can be quoted without the other. ── */
const scoreNote = "ranking score on held-out ground";

const tiles = [
	metrics[0],
	metrics[1],
	...models.entries.map((m) => ({
		value: m.score,
		unit: undefined as string | undefined,
		label: m.name,
		note: scoreNote
	})),
	metrics[2],
	metrics[3]
];

/* ── Validation comparison. Static SVG, no chart library. Bars are drawn on a
   0 to 100 scale; every printed figure is the source figure. ── */
const comparisonRows = [
	{
		label: "Ranking score",
		values: models.entries.map((m) => ({
			name: m.short,
			printed: m.score,
			pct: parseFloat(m.score) * 100
		}))
	},
	{
		label: "Precision",
		values: models.entries.map((m) => ({
			name: m.short,
			printed: m.precision,
			pct: parseFloat(m.precision)
		}))
	},
	{
		label: "Recall",
		values: models.entries.map((m) => ({
			name: m.short,
			printed: m.recall,
			pct: parseFloat(m.recall)
		}))
	}
];

function ModelComparison() {
	const rowH = 64;
	const barH = 14;
	const gap = 6;
	const labelW = 104;
	const trackW = 300;
	const width = labelW + trackW + 64;
	const height = comparisonRows.length * rowH + 8;

	return (
		<svg
			viewBox={`0 0 ${width} ${height}`}
			className="w-full h-auto"
			role="img"
			aria-label={`Model comparison. ${comparisonRows
				.map(
					(r) =>
						`${r.label}: ${r.values
							.map((v) => `${v.name} ${v.printed}`)
							.join(", ")}`
				)
				.join(". ")}.`}>
			{comparisonRows.map((row, i) => {
				const top = i * rowH + 10;
				return (
					<g key={row.label}>
						<text
							x="0"
							y={top + barH}
							fontSize="11"
							fontWeight="600"
							fill="var(--text)">
							{row.label}
						</text>
						{row.values.map((v, j) => {
							const y = top + j * (barH + gap);
							return (
								<g key={v.name}>
									<rect
										x={labelW}
										y={y}
										width={trackW}
										height={barH}
										fill="var(--border)"
									/>
									<rect
										x={labelW}
										y={y}
										width={(trackW * v.pct) / 100}
										height={barH}
										fill={ACCENT}
										opacity={j === 0 ? 1 : 0.55}
									/>
									<text
										x={labelW + trackW + 8}
										y={y + barH - 3}
										fontSize="10"
										fill="var(--text-dim)">
										{v.name} {v.printed}
									</text>
								</g>
							);
						})}
					</g>
				);
			})}
		</svg>
	);
}

const GoldProspectivityPage: NextPage = () => {
	return (
		<>
			{/* The maps are lazy loaded, so the browser only discovers these two
			   hosts once the reader is already near a map and waiting on it.
			   Warming DNS, TCP and TLS at page load takes that handshake off the
			   critical path without downloading anything. */}
			<Head>
				<link rel="preconnect" href="https://js.arcgis.com" crossOrigin="" />
				<link
					rel="preconnect"
					href="https://services6.arcgis.com"
					crossOrigin=""
				/>
				<link
					rel="preconnect"
					href="https://esrieanatres.maps.arcgis.com"
					crossOrigin=""
				/>
			</Head>

			<SEO
				title={study.pageTitle}
				description={study.metaDescription}
				path={`/case-studies/${study.slug}`}
				type="article"
				jsonLd={[
					articleSchema({
						title: study.title,
						description: study.metaDescription,
						path: `/case-studies/${study.slug}`,
						datePublished: "2026-01-01"
					}),
					breadcrumbSchema([
						{ name: "Home", path: "/" },
						{ name: "Products", path: "/products" },
						{ name: "Kaistrum Minerals", path: "/products#minerals" },
						{ name: study.title, path: `/case-studies/${study.slug}` }
					])
				]}
			/>

			<Header />

			<main className="pt-14">
				{/* ── 1. Hero ── */}
				<section
					className="relative py-20 md:py-28 px-4 md:px-8 border-b overflow-hidden"
					style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
					{/* Dot grid world map, drawn as SVG. Not a static image, and
					    deliberately not a live map: the hero must not pull the
					    ArcGIS bundle before the reader has scrolled anywhere. */}
					<div
						className="absolute inset-0 pointer-events-none overflow-hidden"
						style={{ color: "var(--text)" }}>
						<div className="absolute inset-0 opacity-[0.55]">
							<WorldSites sites={sites} accent={ACCENT} />
						</div>
						{/* Keeps heading text clear of the dots at AA contrast */}
						<div
							className="absolute inset-0"
							style={{
								background:
									"linear-gradient(to right, var(--bg) 0%, var(--bg) 38%, transparent 78%)"
							}}
						/>
					</div>
					<div className="max-w-6xl mx-auto relative z-10">
						<div
							className="flex items-center gap-2 mb-8 text-xs"
							style={{ color: "var(--text-muted)" }}>
							<Link href="/products" className="hover:underline">
								Products
							</Link>
							<span>/</span>
							<Link href="/products#minerals" className="hover:underline">
								Kaistrum Minerals
							</Link>
							<span>/</span>
							<span style={{ color: "var(--text-dim)" }}>{study.title}</span>
						</div>

						<Eyebrow>{study.eyebrow}</Eyebrow>

						<h1
							className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.05] tracking-tight max-w-3xl mb-8"
							style={{ color: "var(--text)" }}>
							Kakamega sits on one of East Africa&apos;s most promising gold
							frontiers.{" "}
							<span
								className="font-normal italic"
								style={{
									fontFamily: "'Instrument Serif', serif",
									color: "var(--text-dim)"
								}}>
								We mapped where to look first.
							</span>
						</h1>

						<p
							className="text-base md:text-lg leading-[1.8] max-w-2xl mb-10"
							style={{ color: "var(--text-dim)" }}>
							Two independent models, trained on {validation.occurrences}{" "}
							confirmed gold occurrences and {metrics[0].value} layers of
							evidence, rank {metrics[2].value} {metrics[2].unit} of ground as
							high priority. Both were tested on ground they had never seen.
						</p>

						<p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
							Built on{" "}
							<Link
								href="/products#minerals"
								className="underline underline-offset-4"
								style={{ color: ACCENT }}>
								Kaistrum Minerals
							</Link>
						</p>

						<div className="flex flex-col sm:flex-row gap-4">
							<a
								href="#map-b"
								className="group inline-flex items-center gap-2 pl-5 pr-2 py-2 font-medium text-sm"
								style={{ background: ACCENT, color: "#FFFFFF" }}>
								Explore the targets
								<span
									className="w-8 h-8 flex items-center justify-center"
									style={{ background: "#FFFFFF", color: ACCENT }}>
									<ArrowRight size={13} />
								</span>
							</a>
							<Link
								href="/#contact"
								className="inline-flex items-center gap-2 px-5 py-3 border text-sm font-medium"
								style={{
									borderColor: "var(--border)",
									color: "var(--text-dim)"
								}}>
								Talk to us
							</Link>
						</div>

						<div className="mt-10 pt-8 border-t max-w-xl" style={{ borderColor: "var(--border)" }}>
							<p
								className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-3"
								style={{ color: "var(--text-muted)" }}>
								Targeting work, mapped
							</p>
							<SiteLabels sites={sites} accent={ACCENT} />
						</div>
					</div>
				</section>

				{/* ── 2. Context strip ── */}
				<section
					className="py-16 md:py-20 px-4 md:px-8 border-b"
					style={{
						background: "var(--bg-surface)",
						borderColor: "var(--border)"
					}}>
					<div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20">
						<Reveal>
							<Eyebrow>The ground</Eyebrow>
							<h2
								className="text-2xl md:text-3xl leading-snug font-normal italic max-w-xs"
								style={{
									fontFamily: "'Instrument Serif', serif",
									color: "var(--text)"
								}}>
								Gold this far underground does not announce itself.
							</h2>
						</Reveal>
						<Reveal delay={0.1}>
							<p
								className="text-base leading-[1.85] mb-5"
								style={{ color: "var(--text-dim)" }}>
								The {area.corridor.name} is a{" "}
								{area.corridor.lengthKm} km structural zone inside the{" "}
								{area.corridor.belt}. It already hosts the{" "}
								{area.corridor.deposits.join(" and ")} high grade orogenic gold
								deposits, in the {area.geology.split(".")[0]}.
							</p>
							<p
								className="text-base leading-[1.85]"
								style={{ color: "var(--text-dim)" }}>
								That is what makes targeting hard. The gold sits in shear
								zones, so finding more of it means reading structure rather than
								surface. Soil chemistry smears the signal over hundreds of
								metres, and the available fault mapping is too coarse to show
								the small splays that actually carry the mineralisation.
							</p>
						</Reveal>
					</div>
				</section>

				{/* ── 3. Impact band ── */}
				<section
					className="border-b"
					style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
					<div
						className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-3 border-l"
						style={{ borderColor: "var(--border)" }}>
						{tiles.map((t, i) => (
							<Reveal
								key={t.label}
								delay={i * 0.05}
								className="px-5 py-8 md:px-7 md:py-10 border-r border-b"
								style={{ borderColor: "var(--border)" }}>
								<p
									className="text-3xl md:text-4xl font-semibold mb-2 leading-none"
									style={{ color: ACCENT }}>
									{t.value}
									{t.unit && (
										<span className="text-lg md:text-xl ml-1">{t.unit}</span>
									)}
								</p>
								<p
									className="text-xs font-semibold uppercase tracking-[0.14em] mb-2"
									style={{ color: "var(--text)" }}>
									{t.label}
								</p>
								<p
									className="text-xs leading-[1.65]"
									style={{ color: "var(--text-muted)" }}>
									{t.note}
								</p>
							</Reveal>
						))}
					</div>
				</section>

				{/* ── 4. Four data streams ── */}
				<section
					className="py-20 md:py-24 px-4 md:px-8 border-b"
					style={{
						background: "var(--bg-surface)",
						borderColor: "var(--border)"
					}}>
					<div className="max-w-6xl mx-auto">
						<Reveal>
							<Eyebrow>How it works</Eyebrow>
							<h2
								className="text-2xl md:text-3xl font-semibold leading-tight max-w-xl mb-14"
								style={{ color: "var(--text)" }}>
								Four streams of evidence, {metrics[0].value} layers in all.
							</h2>
						</Reveal>
						<div
							className="grid grid-cols-1 sm:grid-cols-2 border-t border-l"
							style={{ borderColor: "var(--border)" }}>
							{dataStreams.map((s, i) => {
								const Icon = ICONS[s.icon as keyof typeof ICONS];
								return (
									<Reveal
										key={s.title}
										delay={i * 0.06}
										className="border-b border-r p-7 md:p-8"
										style={{ borderColor: "var(--border)" }}>
										<Icon
											size={20}
											aria-hidden="true"
											style={{ color: ACCENT }}
											className="mb-4"
										/>
										<h3
											className="text-base font-semibold mb-3"
											style={{ color: "var(--text)" }}>
											{s.title}
										</h3>
										<p
											className="text-sm leading-[1.75]"
											style={{ color: "var(--text-dim)" }}>
											{s.body}
										</p>
									</Reveal>
								);
							})}
						</div>
					</div>
				</section>

				{/* ── 5. The two models ── */}
				<section
					className="py-20 md:py-24 px-4 md:px-8 border-b"
					style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
					<div className="max-w-6xl mx-auto">
						<div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-14">
							<Reveal>
								<Eyebrow>Two models</Eyebrow>
								<h2
									className="text-2xl md:text-3xl leading-snug font-normal italic"
									style={{
										fontFamily: "'Instrument Serif', serif",
										color: "var(--text)"
									}}>
									One model tells you what it found. Two tell you whether to
									believe it.
								</h2>
							</Reveal>
							<Reveal delay={0.1}>
								<p
									className="text-base leading-[1.85]"
									style={{ color: "var(--text-dim)" }}>
									A single model can latch onto a quirk of its own mathematics
									and present the result with total confidence. So we ran two
									that work in completely different ways, trained separately,
									and compared where they landed.{" "}
									{models.convergence.split(". ")[1]} Where both of them point
									at the same ground, that agreement is worth more than either
									score on its own.
								</p>
							</Reveal>
						</div>

					<div id="map-a" className="scroll-mt-14">
							<p
								className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-3"
								style={{ color: ACCENT }}>
								Map A, model comparison
							</p>
							<SwipeMaps
								accent={ACCENT}
								leftLabel={models.entries[0].name}
								rightLabel={models.entries[1].name}
								alt={`Swipe comparison of two prospectivity maps of ${area.county} at the same extent, ${models.entries[0].name} revealed from the left and ${models.entries[1].name} from the right, drawn with the same five class ramp from Very Low to Very High. Wiping between them shows both models placing the same high priority belt through the ${area.corridor.name}.`}
							/>
							<p
								className="text-xs mt-3"
								style={{ color: "var(--text-muted)" }}>
								Drag the handle, or focus it and use the arrow keys, to wipe
								between the two models.
							</p>
						</div>
					</div>
				</section>

				{/* ── 6. Validation ── */}
				<section
					className="py-20 md:py-24 px-4 md:px-8 border-b"
					style={{
						background: "var(--bg-surface)",
						borderColor: "var(--border)"
					}}>
					<div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20">
						<Reveal>
							<Eyebrow>Validation</Eyebrow>
							<h2
								className="text-2xl md:text-3xl font-semibold leading-tight mb-6"
								style={{ color: "var(--text)" }}>
								Tested on ground it had never seen.
							</h2>
							<p
								className="text-base leading-[1.85] mb-5"
								style={{ color: "var(--text-dim)" }}>
								The study area was cut into {validation.blocks} blocks on a{" "}
								{validation.fishnetKm} km fishnet, and whole blocks were held
								back from training. {validation.separation}
							</p>
							<p
								className="text-base leading-[1.85] mb-5"
								style={{ color: "var(--text-dim)" }}>
								Training used {validation.trainingPoints} points in total:{" "}
								{validation.occurrences} confirmed gold occurrences and{" "}
								{validation.backgroundPoints} background points.{" "}
								{validation.imbalance} Validation ran as{" "}
								{validation.methods[0].charAt(0).toLowerCase() +
									validation.methods[0].slice(1)}
								, plus {validation.methods[1].toLowerCase()}.
							</p>
							<p
								className="text-sm leading-[1.8]"
								style={{ color: "var(--text-muted)" }}>
								The ranking score below is the {models.scoreNote} figure. It
								measures ordering, not correctness: it is how often the model
								scores a known occurrence above a random background point.{" "}
								{models.scoreScale}
							</p>
						</Reveal>
						<Reveal delay={0.1} className="md:pt-16">
							<div
								className="border p-6 md:p-8"
								style={{
									background: "var(--bg-surface)",
									borderColor: "var(--border)"
								}}>
								<ModelComparison />
								<p
									className="text-xs leading-[1.7] mt-6 pt-5 border-t"
									style={{
										color: "var(--text-muted)",
										borderColor: "var(--border)"
									}}>
									Solid bars are{" "}
									{models.entries[0].name}, lighter bars are{" "}
									{models.entries[1].name}. Both reached{" "}
									{models.entries[0].recall} recall on the{" "}
									{validation.occurrences} known occurrences, meaning zero
									omission errors.
								</p>
							</div>
						</Reveal>
					</div>
				</section>

				{/* ── 7. What the data shows ── */}
				<section
					className="py-20 md:py-24 px-4 md:px-8 border-b"
					style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
					<div className="max-w-6xl mx-auto">
						<Reveal>
							<Eyebrow>What the data shows</Eyebrow>
							<h2
								className="text-2xl md:text-3xl font-semibold leading-tight max-w-xl mb-12"
								style={{ color: "var(--text)" }}>
								Three things the models agree on.
							</h2>
						</Reveal>
						<ul className="flex flex-col">
							{findings.map((f, i) => (
								<Reveal key={i} delay={i * 0.07}>
									<li
										className="flex gap-5 md:gap-8 py-6 border-t text-base leading-[1.8]"
										style={{
											borderColor: "var(--border)",
											color: "var(--text-dim)"
										}}>
										<span
											className="text-xs font-semibold shrink-0 mt-1.5 w-6"
											style={{ color: ACCENT }}>
											{String(i + 1).padStart(2, "0")}
										</span>
										{f}
									</li>
								</Reveal>
							))}
						</ul>

						<div id="map-b" className="mt-14 md:mt-16 scroll-mt-14">
							<Reveal>
								<TargetsMap
									accent={ACCENT}
									alt={`Interactive map of ${area.county} showing prospectivity in five classes from Very Low to Very High, with sub county outlines, prospecting licence areas and the ${validation.occurrences} known gold occurrences. The highest classes concentrate along the ${area.corridor.name}.`}
								/>
							</Reveal>
						</div>
					</div>
				</section>

				{/* ── 10. Call to action ── */}
				<section
					className="py-20 md:py-24 px-4 md:px-8 border-b"
					style={{
						background: "var(--bg-surface)",
						borderColor: "var(--border)"
					}}>
					<div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-10">
						<div>
							<Eyebrow>Work with Kairos</Eyebrow>
							<h2
								className="text-2xl md:text-3xl font-semibold leading-tight max-w-lg mb-4"
								style={{ color: "var(--text)" }}>
								Prospectivity targeting for exploration companies, ministries
								and regulators.
							</h2>
							<p
								className="text-sm md:text-base leading-[1.8] max-w-lg"
								style={{ color: "var(--text-dim)" }}>
								If you hold ground, license it, or regulate it, we can build the
								same targeting workflow over your data.
							</p>
						</div>
						<Link
							href="/#contact"
							className="group inline-flex items-center gap-2 pl-5 pr-2 py-2 font-medium text-sm shrink-0"
							style={{ background: ACCENT, color: "#FFFFFF" }}>
							Talk to us
							<span
								className="w-8 h-8 flex items-center justify-center"
								style={{ background: "#FFFFFF", color: ACCENT }}>
								<ArrowRight size={13} />
							</span>
						</Link>
					</div>
				</section>

				{/* ── 11. Attribution ── */}
				<section
					className="py-14 md:py-16 px-4 md:px-8"
					style={{ background: "var(--bg)" }}>
					<div className="max-w-6xl mx-auto">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
							<div>
								<p
									className="text-[10px] uppercase tracking-[0.18em] font-medium mb-2"
									style={{ color: "var(--text-muted)" }}>
									Built with
								</p>
								<p className="text-sm" style={{ color: "var(--text-dim)" }}>
									{stack.join(", ")}
								</p>
								<p
									className="text-xs mt-3"
									style={{ color: "var(--text-muted)" }}>
									Prospectivity targeting within Kaistrum Minerals.
								</p>
								<p
									className="text-xs mt-3"
									style={{ color: "var(--text-muted)" }}>
									Working coordinate system: {study.coordinateSystem}
								</p>
							</div>
							<Link
								href="/case-studies"
								className="inline-flex items-center gap-2 px-5 py-3 border text-sm font-medium shrink-0"
								style={{
									borderColor: "var(--border)",
									color: "var(--text-dim)"
								}}>
								<ArrowLeft size={14} />
								All case studies
							</Link>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
};

export default GoldProspectivityPage;
