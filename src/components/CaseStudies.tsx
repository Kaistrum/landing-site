import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import WordsPullUpMultiStyle from "./animations/WordsPullUpMultiStyle";
import cases from "@/data/cases";

function CaseCard({ c, index }: { c: (typeof cases)[number]; index: number }) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-80px" });

	return (
		<motion.div
			ref={ref}
			className="p-7 md:p-8 flex flex-col gap-5 border"
			style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
			initial={{ opacity: 0, y: 28 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{
				duration: 0.8,
				delay: index * 0.14,
				ease: [0.16, 1, 0.3, 1]
			}}>
			<p
				className="text-[10px] uppercase tracking-[0.2em] font-medium"
				style={{ color: c.accent }}>
				{c.tag}
			</p>

			<h3
				className="text-lg sm:text-xl font-semibold leading-snug"
				style={{ color: "var(--text)" }}>
				{c.title}
			</h3>

			<p
				className="text-sm leading-[1.7] flex-1"
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
				className="group inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 mt-1"
				style={{ color: c.accent }}>
				Read full case study
				<ArrowRight
					size={12}
					className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
					style={{ transform: "rotate(-45deg)" }}
				/>
			</Link>
		</motion.div>
	);
}

export default function CaseStudies() {
	const headerRef = useRef<HTMLDivElement>(null);
	const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

	return (
		<section
			id="case-studies"
			className="py-20 md:py-24 px-4 md:px-6"
			style={{ background: "var(--bg-surface)" }}>
			<div className="max-w-6xl mx-auto">
				<motion.div
					ref={headerRef}
					className="mb-12 md:mb-16"
					initial={{ opacity: 0, y: 20 }}
					animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
					<p
						className="text-[10px] sm:text-xs uppercase tracking-[0.22em] mb-4 font-medium"
						style={{ color: "var(--accent)" }}>
						Case Studies
					</p>
					<div className="text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.05] max-w-xl">
						<WordsPullUpMultiStyle
							justify="start"
							segments={[
								{
									text: "Real results from",
									className: "font-semibold",
									style: { color: "var(--text)" }
								},
								{
									text: " real deployments.",
									className: "font-normal italic",
									style: {
										fontFamily: "'Instrument Serif', serif",
										color: "var(--text-dim)"
									}
								}
							]}
						/>
					</div>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					{cases.map((c, i) => (
						<CaseCard key={c.slug} c={c} index={i} />
					))}
				</div>

				<div className="mt-10 text-center">
					<Link
						href="/case-studies"
						className="inline-flex items-center gap-2 px-6 py-3 border text-sm font-medium transition-colors duration-200"
						style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
						View all case studies
						<ArrowRight size={14} />
					</Link>
				</div>
			</div>
		</section>
	);
}
