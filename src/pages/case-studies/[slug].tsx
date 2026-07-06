import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import SEO, { breadcrumbSchema, articleSchema } from "@/components/SEO";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import cases, { type CaseStudyData } from "@/data/cases";

type Props = { caseStudy: CaseStudyData };

/* ── Image placeholder helper ── */
function ImgPlaceholder({
	label,
	aspect = "16/7",
	id
}: {
	label: string;
	aspect?: string;
	id: string;
}) {
	return (
		<div
			className="relative w-full overflow-hidden"
			style={{ aspectRatio: aspect, background: "var(--bg-surface)" }}>
			<svg
				className="absolute inset-0 w-full h-full opacity-[0.04]"
				xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern
						id={`grid-${id}`}
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
				<rect width="100%" height="100%" fill={`url(#grid-${id})`} />
			</svg>
			<div className="absolute inset-0 flex items-center justify-center px-8">
				<p
					className="text-xs text-center font-medium max-w-sm"
					style={{ color: "var(--text-muted)" }}>
					{label}
				</p>
			</div>
		</div>
	);
}

/* ── Fade-in-view wrapper ── */
function FadeIn({
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

const CaseStudyPage: NextPage<Props> = ({ caseStudy: c }) => {
	const relatedCases = cases.filter(
		(cs) => cs.slug !== c.slug && cs.industry === c.industry
	).slice(0, 2);

	const fallbackRelated = cases
		.filter((cs) => cs.slug !== c.slug)
		.slice(0, 2);

	const related = relatedCases.length >= 1 ? relatedCases : fallbackRelated;

	return (
		<>
			<SEO
				title={`${c.title} — Kaistrum Case Study`}
				description={c.summary}
				path={`/case-studies/${c.slug}`}
				type="article"
				jsonLd={[
					articleSchema({
						title: c.title,
						description: c.summary,
						path: `/case-studies/${c.slug}`,
						datePublished: `${c.year}-01-01`
					}),
					breadcrumbSchema([
						{ name: "Home", path: "/" },
						{ name: "Case Studies", path: "/case-studies" },
						{ name: c.title, path: `/case-studies/${c.slug}` }
					])
				]}
			/>

			<Header />

			<main className="pt-14">
				{/* ── Hero ── */}
				<section
					className="relative py-20 md:py-28 px-4 md:px-8 border-b overflow-hidden"
					style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
					{/* Ghost industry text */}
					<span
						className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 font-semibold uppercase tracking-tighter leading-none pointer-events-none select-none whitespace-nowrap pr-4"
						style={{
							fontSize: "clamp(72px, 12vw, 180px)",
							color: c.accent + "0c"
						}}>
						{c.industry}
					</span>

					<div className="max-w-6xl mx-auto relative z-10">
						{/* Breadcrumb */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
							className="flex items-center gap-2 mb-8 text-xs"
							style={{ color: "var(--text-muted)" }}>
							<Link href="/case-studies" className="hover:underline">
								Case Studies
							</Link>
							<span>/</span>
							<span style={{ color: "var(--text-dim)" }}>{c.title}</span>
						</motion.div>

						{/* Tag */}
						<motion.p
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
							className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-5"
							style={{ color: c.accent }}>
							{c.tag}
						</motion.p>

						{/* Title */}
						<motion.h1
							initial={{ opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
							className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.04] tracking-tight max-w-3xl mb-8"
							style={{ color: "var(--text)" }}>
							{c.title}
						</motion.h1>

						{/* Scope strip */}
						<motion.div
							initial={{ opacity: 0, y: 14 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
							className="flex flex-wrap gap-0 border-t border-b py-5"
							style={{ borderColor: "var(--border)" }}>
							{[
								{ label: "Client", value: c.client },
								{ label: "Location", value: c.location },
								{ label: "Year", value: c.year },
								{ label: "Services", value: c.services.join(", ") }
							].map((item, i) => (
								<div
									key={item.label}
									className="pr-8 mr-8 border-r last:border-r-0 last:mr-0"
									style={{ borderColor: "var(--border)" }}>
									<p
										className="text-[10px] uppercase tracking-[0.18em] font-medium mb-1"
										style={{ color: "var(--text-muted)" }}>
										{item.label}
									</p>
									<p
										className="text-sm font-medium"
										style={{ color: "var(--text)" }}>
										{item.value}
									</p>
								</div>
							))}
						</motion.div>

						{/* Summary */}
						<motion.p
							initial={{ opacity: 0, y: 14 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
							className="text-base md:text-lg leading-[1.8] max-w-2xl mt-8"
							style={{ color: "var(--text-dim)" }}>
							{c.summary}
						</motion.p>
					</div>
				</section>

				{/* ── Wide image ── */}
				<ImgPlaceholder
					label={c.imagePlaceholders.wide}
					aspect="16/6"
					id="hero-wide"
				/>

				{/* ── Results strip ── */}
				<section
					className="border-b"
					style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
					<div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x"
						style={{ borderColor: "var(--border)" }}>
						{c.outcomes.map((o, i) => (
							<FadeIn key={o.label} delay={i * 0.07} className="px-6 py-8">
								<p
									className="text-3xl md:text-4xl font-semibold mb-1 leading-none"
									style={{ color: c.accent }}>
									{o.value}
								</p>
								<p
									className="text-xs font-semibold uppercase tracking-[0.14em] mb-2"
									style={{ color: "var(--text)" }}>
									{o.label}
								</p>
								<p
									className="text-xs leading-[1.65]"
									style={{ color: "var(--text-muted)" }}>
									{o.description}
								</p>
							</FadeIn>
						))}
					</div>
				</section>

				{/* ── Challenge ── */}
				<section
					className="py-20 md:py-24 px-4 md:px-8 border-b"
					style={{
						background: "var(--bg-surface)",
						borderColor: "var(--border)"
					}}>
					<div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20">
						{/* Left: sticky heading */}
						<div className="md:sticky md:top-28 md:self-start">
							<FadeIn>
								<p
									className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-4"
									style={{ color: c.accent }}>
									The Challenge
								</p>
								<h2
									className="text-2xl md:text-3xl leading-snug font-normal italic max-w-xs"
									style={{
										fontFamily: "'Instrument Serif', serif",
										color: "var(--text)"
									}}>
									{c.challenge.headline}
								</h2>
							</FadeIn>
						</div>

						{/* Right */}
						<FadeIn delay={0.1}>
							<p
								className="text-base leading-[1.85] mb-8"
								style={{ color: "var(--text-dim)" }}>
								{c.challenge.body}
							</p>
							<ul className="flex flex-col gap-0">
								{c.challenge.points.map((point, i) => (
									<li
										key={i}
										className="flex gap-4 py-4 border-t text-sm leading-[1.7]"
										style={{
											borderColor: "var(--border)",
											color: "var(--text-dim)"
										}}>
										<span
											className="text-xs font-semibold shrink-0 mt-0.5 w-5"
											style={{ color: c.accent }}>
											{String(i + 1).padStart(2, "0")}
										</span>
										{point}
									</li>
								))}
							</ul>
						</FadeIn>
					</div>
				</section>

				{/* ── Solution ── */}
				<section
					className="py-20 md:py-24 px-4 md:px-8 border-b"
					style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
					<div className="max-w-6xl mx-auto">
						<div className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 mb-16">
							<FadeIn>
								<p
									className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-4"
									style={{ color: c.accent }}>
									The Solution
								</p>
								<h2
									className="text-2xl md:text-3xl leading-snug font-normal italic"
									style={{
										fontFamily: "'Instrument Serif', serif",
										color: "var(--text)"
									}}>
									{c.solution.headline}
								</h2>
							</FadeIn>
							<FadeIn delay={0.1}>
								<p
									className="text-base leading-[1.85]"
									style={{ color: "var(--text-dim)" }}>
									{c.solution.body}
								</p>
							</FadeIn>
						</div>

						{/* Components grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-l"
							style={{ borderColor: "var(--border)" }}>
							{c.solution.components.map((comp, i) => (
								<FadeIn
									key={comp.title}
									delay={i * 0.06}
									className="border-b border-r p-7 md:p-8"
									style={{ borderColor: "var(--border)" }}>
									<p
										className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-3"
										style={{ color: c.accent }}>
										{String(i + 1).padStart(2, "0")}
									</p>
									<h3
										className="text-base font-semibold mb-3"
										style={{ color: "var(--text)" }}>
										{comp.title}
									</h3>
									<p
										className="text-sm leading-[1.75]"
										style={{ color: "var(--text-dim)" }}>
										{comp.description}
									</p>
								</FadeIn>
							))}
						</div>
					</div>
				</section>

				{/* ── Narrow image + outcomes ── */}
				<section
					className="py-20 md:py-24 px-4 md:px-8 border-b"
					style={{
						background: "var(--bg-surface)",
						borderColor: "var(--border)"
					}}>
					<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
						<FadeIn>
							<ImgPlaceholder
								label={c.imagePlaceholders.narrow}
								aspect="4/3"
								id="narrow"
							/>
						</FadeIn>
						<FadeIn delay={0.1}>
							<p
								className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-6"
								style={{ color: c.accent }}>
								Outcomes
							</p>
							<div className="flex flex-col gap-0">
								{c.outcomes.map((o, i) => (
									<div
										key={o.label}
										className="py-5 border-b flex gap-5 items-baseline"
										style={{ borderColor: "var(--border)" }}>
										<span
											className="text-2xl font-semibold leading-none shrink-0 w-20"
											style={{ color: c.accent }}>
											{o.value}
										</span>
										<div>
											<p
												className="text-sm font-semibold mb-0.5"
												style={{ color: "var(--text)" }}>
												{o.label}
											</p>
											<p
												className="text-xs leading-[1.6]"
												style={{ color: "var(--text-muted)" }}>
												{o.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</FadeIn>
					</div>
				</section>

				{/* ── Testimonial ── */}
				{c.testimonial && (
					<section
						className="py-20 md:py-24 px-4 md:px-8 border-b"
						style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
						<div className="max-w-4xl mx-auto">
							<FadeIn>
								<Quote
									size={32}
									className="mb-8 opacity-30"
									style={{ color: c.accent }}
								/>
								<blockquote
									className="text-xl md:text-2xl leading-[1.6] font-normal italic mb-8"
									style={{
										fontFamily: "'Instrument Serif', serif",
										color: "var(--text)"
									}}>
									"{c.testimonial.quote}"
								</blockquote>
								<div
									className="flex items-center gap-4 pt-6 border-t"
									style={{ borderColor: "var(--border)" }}>
									<div
										className="w-10 h-10 shrink-0 flex items-center justify-center text-sm font-semibold"
										style={{
											background: c.accent + "22",
											color: c.accent
										}}>
										{c.testimonial.name
											.split(" ")
											.map((n) => n[0])
											.join("")
											.slice(0, 2)}
									</div>
									<div>
										<p
											className="text-sm font-semibold"
											style={{ color: "var(--text)" }}>
											{c.testimonial.name}
										</p>
										<p
											className="text-xs"
											style={{ color: "var(--text-muted)" }}>
											{c.testimonial.title}
										</p>
									</div>
								</div>
							</FadeIn>
						</div>
					</section>
				)}

				{/* ── Related cases ── */}
				{related.length > 0 && (
					<section
						className="py-20 md:py-24 px-4 md:px-8 border-b"
						style={{
							background: "var(--bg-surface)",
							borderColor: "var(--border)"
						}}>
						<div className="max-w-6xl mx-auto">
							<FadeIn>
								<p
									className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-10"
									style={{ color: "var(--accent)" }}>
									Related Case Studies
								</p>
							</FadeIn>
							<div className="grid md:grid-cols-2 gap-6">
								{related.map((rel, i) => (
									<FadeIn key={rel.slug} delay={i * 0.08}>
										<Link
											href={`/case-studies/${rel.slug}`}
											className="group flex flex-col border p-6 transition-colors duration-200 h-full"
											style={{
												background: "var(--bg-card)",
												borderColor: "var(--border)"
											}}>
											<p
												className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-3"
												style={{ color: rel.accent }}>
												{rel.tag}
											</p>
											<h3
												className="text-base font-semibold leading-snug mb-3 flex-1"
												style={{ color: "var(--text)" }}>
												{rel.title}
											</h3>
											<span
												className="inline-flex items-center gap-1.5 text-xs font-medium"
												style={{ color: rel.accent }}>
												Read case study
												<ArrowRight
													size={11}
													style={{ transform: "rotate(-45deg)" }}
												/>
											</span>
										</Link>
									</FadeIn>
								))}
							</div>
						</div>
					</section>
				)}

				{/* ── CTA ── */}
				<section
					className="py-20 md:py-24 px-4 md:px-8"
					style={{ background: "var(--bg)" }}>
					<div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
						<div>
							<p
								className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-4"
								style={{ color: c.accent }}>
								Work with Kaistrum
							</p>
							<h2
								className="text-2xl md:text-3xl font-semibold leading-tight max-w-md"
								style={{ color: "var(--text)" }}>
								Have a similar challenge?{" "}
								<span
									className="font-normal italic"
									style={{
										fontFamily: "'Instrument Serif', serif",
										color: "var(--text-dim)"
									}}>
									Let's scope it.
								</span>
							</h2>
						</div>
						<div className="flex flex-col sm:flex-row gap-4 shrink-0">
							<Link
								href="/case-studies"
								className="inline-flex items-center gap-2 px-5 py-3 border text-sm font-medium transition-colors duration-200"
								style={{ borderColor: "var(--border)", color: "var(--text-dim)" }}>
								<ArrowLeft size={14} />
								All case studies
							</Link>
							<Link
								href="/#contact"
								className="group inline-flex items-center gap-2 pl-5 pr-2 py-2 font-medium text-sm transition-all duration-200"
								style={{ background: "var(--accent)", color: "var(--bg)" }}>
								Get in touch
								<span
									className="w-8 h-8 flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
									style={{ background: "var(--bg)", color: "var(--accent)" }}>
									<ArrowRight size={13} />
								</span>
							</Link>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = cases.map((c) => ({ params: { slug: c.slug } }));
	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
	const slug = params?.slug as string;
	const caseStudy = cases.find((c) => c.slug === slug);
	if (!caseStudy) return { notFound: true };
	return { props: { caseStudy } };
};

export default CaseStudyPage;
