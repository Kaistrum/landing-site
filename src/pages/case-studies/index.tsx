import { useState, useRef } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import SEO, { breadcrumbSchema } from "@/components/SEO";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import cases from "@/data/cases";

const ALL_INDUSTRIES = "All";

const industries = [
	ALL_INDUSTRIES,
	...Array.from(new Set(cases.map((c) => c.industry)))
];

function CaseCard({
	c,
	index
}: {
	c: (typeof cases)[number];
	index: number;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-60px" });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 32 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
			className="group flex flex-col border h-full"
			style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
			{/* Image placeholder */}
			<div
				className="relative overflow-hidden"
				style={{ aspectRatio: "16/9", background: "var(--bg-surface)" }}>
				<svg
					className="absolute inset-0 w-full h-full opacity-[0.04]"
					xmlns="http://www.w3.org/2000/svg">
					<defs>
						<pattern
							id={`grid-cs-${c.slug}`}
							width="32"
							height="32"
							patternUnits="userSpaceOnUse">
							<path
								d="M 32 0 L 0 0 0 32"
								fill="none"
								stroke="currentColor"
								strokeWidth="0.5"
							/>
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill={`url(#grid-cs-${c.slug})`} />
				</svg>
				<div className="absolute inset-0 flex items-center justify-center px-6">
					<p
						className="text-xs text-center font-medium"
						style={{ color: "var(--text-muted)" }}>
						{c.imagePlaceholders.wide}
					</p>
				</div>
				<div
					className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.18em] font-semibold px-2.5 py-1"
					style={{ background: c.accent + "22", color: c.accent }}>
					{c.tag}
				</div>
			</div>

			{/* Body */}
			<div className="flex flex-col flex-1 p-6 gap-4">
				<div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] font-medium" style={{ color: "var(--text-muted)" }}>
					<span>{c.location}</span>
					<span style={{ color: "var(--border)" }}>·</span>
					<span>{c.year}</span>
				</div>

				<h2
					className="text-lg font-semibold leading-snug"
					style={{ color: "var(--text)" }}>
					{c.title}
				</h2>

				<p
					className="text-sm leading-[1.75] flex-1"
					style={{ color: "var(--text-dim)" }}>
					{c.summary}
				</p>

				<ul
					className="flex flex-col gap-1.5 border-t pt-4"
					style={{ borderColor: "var(--border)" }}>
					{c.results.map((r) => (
						<li
							key={r}
							className="flex items-center gap-2 text-xs"
							style={{ color: "var(--text-dim)" }}>
							<span
								className="w-1.5 h-1.5 shrink-0"
								style={{ background: c.accent }}
							/>
							{r}
						</li>
					))}
				</ul>

				<Link
					href={`/case-studies/${c.slug}`}
					className="group/link inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200 mt-1"
					style={{ color: c.accent }}>
					Read full case study
					<ArrowRight
						size={12}
						className="shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
						style={{ transform: "rotate(-45deg)" }}
					/>
				</Link>
			</div>
		</motion.div>
	);
}

const CaseStudiesIndex: NextPage = () => {
	const [activeIndustry, setActiveIndustry] = useState(ALL_INDUSTRIES);
	const heroRef = useRef<HTMLDivElement>(null);

	const filtered =
		activeIndustry === ALL_INDUSTRIES
			? cases
			: cases.filter((c) => c.industry === activeIndustry);

	return (
		<>
			<SEO
				title="Case Studies — Kaistrum"
				description="Real-world GIS deployments across government, utilities, agriculture, and humanitarian sectors. Full case studies with measurable outcomes."
				path="/case-studies"
				jsonLd={breadcrumbSchema([
					{ name: "Home", path: "/" },
					{ name: "Case Studies", path: "/case-studies" }
				])}
			/>

			<Header />

			<main className="pt-14">
				{/* ── Hero ── */}
				<section
					className="py-20 md:py-28 px-4 md:px-8 border-b"
					style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
					<div className="max-w-6xl mx-auto" ref={heroRef}>
						<motion.p
							className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-5"
							style={{ color: "var(--accent)" }}
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
							Case Studies
						</motion.p>
						<motion.h1
							className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.04] tracking-tight max-w-3xl mb-6"
							style={{ color: "var(--text)" }}
							initial={{ opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}>
							Real deployments.{" "}
							<span
								className="font-normal italic"
								style={{
									fontFamily: "'Instrument Serif', serif",
									color: "var(--text-dim)"
								}}>
								Measurable results.
							</span>
						</motion.h1>
						<motion.p
							className="text-base md:text-lg leading-[1.75] max-w-xl"
							style={{ color: "var(--text-dim)" }}
							initial={{ opacity: 0, y: 14 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}>
							Each engagement below is a full deployment — from data ingestion to
							live operations. No demos, no proofs of concept.
						</motion.p>
					</div>
				</section>

				{/* ── Filter + Grid ── */}
				<section
					className="py-16 md:py-20 px-4 md:px-8"
					style={{ background: "var(--bg-surface)" }}>
					<div className="max-w-6xl mx-auto">
						{/* Filter tabs */}
						<div className="flex flex-wrap gap-2 mb-12">
							{industries.map((ind) => {
								const active = activeIndustry === ind;
								return (
									<button
										key={ind}
										onClick={() => setActiveIndustry(ind)}
										className="text-xs font-medium px-4 py-2 border transition-all duration-200"
										style={{
											borderColor: active ? "var(--accent)" : "var(--border)",
											color: active ? "var(--accent)" : "var(--text-dim)",
											background: active
												? "var(--accent-faint)"
												: "transparent"
										}}>
										{ind}
									</button>
								);
							})}
						</div>

						{/* Cards grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{filtered.map((c, i) => (
								<CaseCard key={c.slug} c={c} index={i} />
							))}
						</div>
					</div>
				</section>

				{/* ── CTA strip ── */}
				<section
					className="py-16 md:py-20 px-4 md:px-8 border-t"
					style={{
						background: "var(--bg)",
						borderColor: "var(--border)"
					}}>
					<div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
						<div>
							<h2
								className="text-2xl md:text-3xl font-semibold mb-2"
								style={{ color: "var(--text)" }}>
								Ready to be the next case study?
							</h2>
							<p className="text-sm" style={{ color: "var(--text-dim)" }}>
								Tell us about your geospatial challenge and we'll scope a deployment.
							</p>
						</div>
						<Link
							href="/#contact"
							className="group inline-flex items-center gap-2 pl-5 pr-2 py-2 font-medium text-sm shrink-0 transition-all duration-200"
							style={{ background: "var(--accent)", color: "var(--bg)" }}>
							Get in touch
							<span
								className="w-8 h-8 flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
								style={{ background: "var(--bg)", color: "var(--accent)" }}>
								<ArrowRight size={13} />
							</span>
						</Link>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
};

export default CaseStudiesIndex;
