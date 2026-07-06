import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Inbox } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Careers: NextPage = () => {
	return (
		<>
			<Head>
				<title>Careers — Kaistrum</title>
				<meta
					name="description"
					content="Open roles at Kaistrum. We're a small team building enterprise GIS software for governments and utilities across Africa."
				/>
			</Head>

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
						Careers
					</span>
					<div className="max-w-6xl mx-auto relative z-10">
						<motion.p
							className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-5"
							style={{ color: "var(--accent)" }}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
							Company · Careers
						</motion.p>
						<motion.h1
							className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.04] tracking-tight max-w-3xl mb-8"
							style={{ color: "var(--text)" }}
							initial={{ opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}>
							Join the team{" "}
							<span
								className="font-normal italic"
								style={{
									fontFamily: "'Instrument Serif', serif",
									color: "var(--text-dim)"
								}}>
								building for scale.
							</span>
						</motion.h1>
						<motion.p
							className="text-base md:text-lg leading-[1.8] max-w-xl"
							style={{ color: "var(--text-dim)" }}
							initial={{ opacity: 0, y: 14 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}>
							We're a small, technical team. Everyone who joins works on real
							deployments with real consequences — not internal tooling or demo
							environments.
						</motion.p>
					</div>
				</section>

				{/* ── No openings ── */}
				<section
					className="py-24 md:py-32 px-4 md:px-8 border-b"
					style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
					<div className="max-w-6xl mx-auto">
						<div
							className="flex flex-col items-center text-center py-16 px-8 border"
							style={{
								background: "var(--bg-card)",
								borderColor: "var(--border)"
							}}>
							<Inbox
								size={36}
								className="mb-6 opacity-30"
								style={{ color: "var(--text-muted)" }}
							/>
							<h2
								className="text-xl font-semibold mb-3"
								style={{ color: "var(--text)" }}>
								No open roles right now
							</h2>
							<p
								className="text-sm leading-[1.75] max-w-sm mb-8"
								style={{ color: "var(--text-dim)" }}>
								We don't have any current openings, but we're always interested in
								hearing from strong GIS engineers, spatial data specialists, and
								technical project managers.
							</p>
							<Link
								href="/#contact"
								className="group inline-flex items-center gap-2 pl-5 pr-2 py-2 font-medium text-sm transition-all duration-200"
								style={{ background: "var(--accent)", color: "var(--bg)" }}>
								Send a speculative application
								<span
									className="w-8 h-8 flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
									style={{ background: "var(--bg)", color: "var(--accent)" }}>
									<ArrowRight size={13} />
								</span>
							</Link>
						</div>
					</div>
				</section>

				{/* ── What we look for ── */}
				<section
					className="py-20 md:py-24 px-4 md:px-8"
					style={{ background: "var(--bg)" }}>
					<div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-20">
						<div>
							<p
								className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-4"
								style={{ color: "var(--accent)" }}>
								Profile
							</p>
							<h2
								className="text-2xl md:text-3xl font-normal italic leading-snug"
								style={{
									fontFamily: "'Instrument Serif', serif",
									color: "var(--text)"
								}}>
								What we look for.
							</h2>
						</div>
						<div className="flex flex-col gap-0">
							{[
								{
									title: "Deep GIS platform knowledge",
									body: "We work with ESRI, QGIS, PostGIS, and custom WebGIS stacks. You should know at least one of these well enough to debug a production deployment."
								},
								{
									title: "Comfort with field conditions",
									body: "Our software runs in environments with limited connectivity and non-specialist users. Experience designing for those constraints matters more than experience with ideal infrastructure."
								},
								{
									title: "Spatial data fluency",
									body: "You should be comfortable with coordinate systems, data formats (GeoJSON, shapefile, GeoPackage), and spatial SQL — these come up in every project."
								},
								{
									title: "Long-term thinking",
									body: "We measure success in years, not sprints. We want people who care about the systems they build still working correctly five years later."
								}
							].map((item, i) => (
								<div
									key={item.title}
									className="py-6 border-t flex gap-5"
									style={{ borderColor: "var(--border)" }}>
									<span
										className="text-xs font-semibold shrink-0 mt-0.5 w-5"
										style={{ color: "var(--accent)" }}>
										{String(i + 1).padStart(2, "0")}
									</span>
									<div>
										<p
											className="text-sm font-semibold mb-1.5"
											style={{ color: "var(--text)" }}>
											{item.title}
										</p>
										<p
											className="text-sm leading-[1.75]"
											style={{ color: "var(--text-dim)" }}>
											{item.body}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
};

export default Careers;
