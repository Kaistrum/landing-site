import type { NextPage } from "next";
import Link from "next/link";
import SEO, { breadcrumbSchema, orgSchema } from "@/components/SEO";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
			initial={{ opacity: 0, y: 22 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}>
			{children}
		</motion.div>
	);
}

const values = [
	{
		title: "Precision over volume",
		body: "We deploy fewer engagements and do them properly. Every project we take on gets a dedicated team and a clear outcome definition before work begins."
	},
	{
		title: "Built for the field",
		body: "Our software is designed for the environments where GIS data is actually collected — low bandwidth, shared devices, inconsistent connectivity, and non-specialist users."
	},
	{
		title: "Open where it matters",
		body: "We build on and contribute to open spatial standards. Our platforms export to GeoJSON, shapefile, and WFS/WMS — no proprietary lock-in on your data."
	},
	{
		title: "Long deployments, not projects",
		body: "We're not a delivery team that ships and disappears. Most of our clients have been with us for multiple years, expanding their deployment incrementally."
	}
];

const About: NextPage = () => {
	return (
		<>
			<SEO
				title="About — Kaistrum"
				description="Kaistrum is an enterprise GIS company building spatial intelligence software for governments, utilities, and NGOs across Africa and beyond."
				path="/about"
				jsonLd={[
					orgSchema(),
					breadcrumbSchema([
						{ name: "Home", path: "/" },
						{ name: "About", path: "/about" }
					])
				]}
			/>

			<Header />

			<main className="pt-14">
				{/* ── Hero ── */}
				<section
					className="relative py-24 md:py-32 px-4 md:px-8 border-b overflow-hidden"
					style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
					<span
						className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 font-semibold uppercase tracking-tighter leading-none pointer-events-none select-none pr-4"
						style={{
							fontSize: "clamp(80px, 14vw, 220px)",
							color: "var(--accent)",
							opacity: 0.04
						}}>
						About
					</span>
					<div className="max-w-6xl mx-auto relative z-10">
						<motion.p
							className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-5"
							style={{ color: "var(--accent)" }}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
							Company
						</motion.p>
						<motion.h1
							className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.04] tracking-tight max-w-3xl mb-8"
							style={{ color: "var(--text)" }}
							initial={{ opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}>
							Spatial intelligence,{" "}
							<span
								className="font-normal italic"
								style={{
									fontFamily: "'Instrument Serif', serif",
									color: "var(--text-dim)"
								}}>
								built for the real world.
							</span>
						</motion.h1>
						<motion.p
							className="text-base md:text-lg leading-[1.8] max-w-2xl"
							style={{ color: "var(--text-dim)" }}
							initial={{ opacity: 0, y: 14 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}>
							Kaistrum builds enterprise GIS software for organisations that need
							authoritative spatial data — governments, utilities, NGOs, and
							infrastructure operators working at continental scale.
						</motion.p>
					</div>
				</section>

				{/* ── Mission ── */}
				<section
					className="py-20 md:py-24 px-4 md:px-8 border-b"
					style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
					<div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-20">
						<FadeIn>
							<p
								className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-4"
								style={{ color: "var(--accent)" }}>
								Mission
							</p>
							<h2
								className="text-2xl md:text-3xl font-normal italic leading-snug"
								style={{
									fontFamily: "'Instrument Serif', serif",
									color: "var(--text)"
								}}>
								Make geospatial data usable for the organisations that need it most.
							</h2>
						</FadeIn>
						<FadeIn delay={0.1} className="flex flex-col gap-5">
							<p
								className="text-base leading-[1.85]"
								style={{ color: "var(--text-dim)" }}>
								GIS has existed for decades, but most of the world's critical
								infrastructure is still managed from paper maps and disconnected
								spreadsheets. The software exists — the deployment expertise,
								data-migration capability, and local operational knowledge do not.
							</p>
							<p
								className="text-base leading-[1.85]"
								style={{ color: "var(--text-dim)" }}>
								Kaistrum was founded to close that gap. We combine enterprise GIS
								platform expertise with deep experience in the environments where
								that software actually has to run — unreliable power, low
								bandwidth, mixed device fleets, and end users who are engineers or
								field officers, not GIS analysts.
							</p>
							<p
								className="text-base leading-[1.85]"
								style={{ color: "var(--text-dim)" }}>
								Our clients include national governments, electricity utilities,
								agricultural ministries, and UN agencies. Every deployment we
								have done is in production — managing real infrastructure, real
								land records, or real emergency response workflows.
							</p>
						</FadeIn>
					</div>
				</section>

				{/* ── Values ── */}
				<section
					className="py-20 md:py-24 px-4 md:px-8 border-b"
					style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
					<div className="max-w-6xl mx-auto">
						<FadeIn className="mb-12">
							<p
								className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-4"
								style={{ color: "var(--accent)" }}>
								How we work
							</p>
							<h2
								className="text-2xl md:text-3xl font-semibold"
								style={{ color: "var(--text)" }}>
								Principles
							</h2>
						</FadeIn>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-l"
							style={{ borderColor: "var(--border)" }}>
							{values.map((v, i) => (
								<FadeIn
									key={v.title}
									delay={i * 0.07}
									className="border-b border-r p-7 md:p-8"
									style={{ borderColor: "var(--border)" }}>
									<p
										className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-3"
										style={{ color: "var(--accent)" }}>
										{String(i + 1).padStart(2, "0")}
									</p>
									<h3
										className="text-base font-semibold mb-3"
										style={{ color: "var(--text)" }}>
										{v.title}
									</h3>
									<p
										className="text-sm leading-[1.75]"
										style={{ color: "var(--text-dim)" }}>
										{v.body}
									</p>
								</FadeIn>
							))}
						</div>
					</div>
				</section>

				{/* ── Image placeholder ── */}
				<div
					className="w-full relative overflow-hidden"
					style={{ aspectRatio: "16/5", background: "var(--bg-surface)" }}>
					<svg
						className="absolute inset-0 w-full h-full opacity-[0.04]"
						xmlns="http://www.w3.org/2000/svg">
						<defs>
							<pattern
								id="grid-about"
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
						<rect width="100%" height="100%" fill="url(#grid-about)" />
					</svg>
					<div className="absolute inset-0 flex items-center justify-center">
						<p
							className="text-xs font-medium"
							style={{ color: "var(--text-muted)" }}>
							Kaistrum team — field deployment
						</p>
					</div>
				</div>

				{/* ── CTA ── */}
				<section
					className="py-20 md:py-24 px-4 md:px-8"
					style={{ background: "var(--bg)" }}>
					<div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
						<div>
							<h2
								className="text-2xl md:text-3xl font-semibold mb-2"
								style={{ color: "var(--text)" }}>
								Ready to work with us?
							</h2>
							<p className="text-sm" style={{ color: "var(--text-dim)" }}>
								Tell us about your geospatial challenge and we'll scope a deployment.
							</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-4 shrink-0">
							<Link
								href="/careers"
								className="inline-flex items-center gap-2 px-5 py-3 border text-sm font-medium transition-colors duration-200"
								style={{ borderColor: "var(--border)", color: "var(--text-dim)" }}>
								View open roles
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

export default About;
