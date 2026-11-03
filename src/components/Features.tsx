import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
	ArrowRight,
	Server,
	DatabaseZap,
	Code2,
	GitMerge,
	GraduationCap,
	Headphones
} from "lucide-react";
import WordsPullUpMultiStyle from "./animations/WordsPullUpMultiStyle";

const features = [
	{
		tab: "Infrastructure Deployment",
		category: "DEPLOYMENT",
		headline: "Enterprise-grade GIS infrastructure, built to last.",
		body: "From geodatabase configuration to cloud architecture, we deliver fully hardened GIS environments that scale with your organisation — on-premise, cloud, or hybrid. Every deployment is security-hardened, load-balanced, and benchmarked before handover.",
		cta: "Explore the service",
		href: "/services/infrastructure-deployment",
		image: "/services/deployment.jpg",
		Icon: Server
	},
	{
		tab: "Data Migration",
		category: "MIGRATION",
		headline: "Move legacy spatial data without losing a single record.",
		body: "We audit, map, and migrate your spatial datasets across platforms with full quality assurance, topology validation, and zero-downtime strategies for live production systems.",
		cta: "Explore the service",
		href: "/services/data-migration",
		image: "/services/migration.jpeg",
		Icon: DatabaseZap
	},
	{
		tab: "Custom Development",
		category: "DEVELOPMENT",
		headline: "GIS applications built exactly for the way you work.",
		body: "We design and build bespoke web and mobile GIS applications — from field survey tools to real-time operational dashboards — tightly integrated with your workflows.",
		cta: "Explore the service",
		href: "/services/custom-development",
		image: "/services/development.jpg",
		Icon: Code2
	},
	{
		tab: "System Integration",
		category: "INTEGRATION",
		headline: "Connect your GIS to every system that matters.",
		body: "We bridge GIS with ERPs such as SAP and Oracle, Sharepoint , Power BI so your spatial data flows freely across your entire technology stack.",
		cta: "Explore the service",
		href: "/services/system-integration",
		image: "/services/integration.jpg",
		Icon: GitMerge
	},
	{
		tab: "Training",
		category: "TRAINING",
		headline: "Hands-on GIS training using your own data.",
		body: "From GIS fundamentals to advanced spatial analysis, our expert-led workshops are tailored to your deployed platform and your team's roles.",
		cta: "Explore the service",
		href: "/services/training",
		image: "/services/training.avif",
		Icon: GraduationCap
	},
	{
		tab: "Support",
		category: "SUPPORT",
		headline: "24/7 expert support, whenever you need it.",
		body: "Every Kairos client gets SLA-backed technical support with dedicated account manager, remote diagnostics, and proactive platform monitoring — so your GIS environment stays healthy and your team stays unblocked.",
		cta: "Explore the service",
		href: "/services/support",
		image: "/services/support.webp",
		Icon: Headphones
	}
];

export default function Features() {
	const [active, setActive] = useState(0);
	const current = features[active];
	const { Icon } = current;

	return (
		<section
			id="services"
			className="py-20 md:py-32 px-4 md:px-6 relative"
			style={{ background: "var(--bg)" }}>
			<div
				className="bg-noise absolute inset-0 opacity-[0.07] pointer-events-none"
				aria-hidden="true"
			/>

			<div className="relative max-w-7xl mx-auto">
				{/* Section header */}
				<div className="mb-12 md:mb-16 max-w-3xl">
					<p
						className="text-[10px] sm:text-xs uppercase tracking-[0.22em] mb-5 font-medium"
						style={{ color: "var(--accent)" }}>
						Our Services
					</p>
					<div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.08]">
						<WordsPullUpMultiStyle
							justify="start"
							segments={[
								{
									text: "Every GIS service you need,",
									className: "font-semibold",
									style: { color: "var(--text)" }
								},
								{
									text: " one partner.",
									className: "font-normal italic",
									style: {
										color: "var(--text-muted)",
										fontFamily: "'Instrument Serif', serif"
									}
								}
							]}
						/>
					</div>
				</div>

				{/* Tab bar */}
				<div
					className="border-b mb-12 md:mb-16"
					style={{ borderColor: "var(--border)" }}>
					<div className="flex justify-center overflow-x-auto">
						{features.map((f, i) => (
							<button
								key={f.tab}
								onClick={() => setActive(i)}
								className="relative px-5 md:px-7 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 shrink-0 cursor-pointer"
								style={{
									color: active === i ? "var(--accent)" : "var(--text-muted)"
								}}>
								{f.tab}
								{active === i && (
									<motion.div
										layoutId="tab-indicator"
										className="absolute bottom-0 left-0 right-0 h-[2px]"
										style={{ background: "var(--accent)" }}
										transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
									/>
								)}
							</button>
						))}
					</div>
				</div>

				{/* Content panel */}
				<AnimatePresence mode="wait">
					<motion.div
						key={active}
						className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-10 lg:gap-20 items-center"
						initial={{ opacity: 0, y: 18 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}>
						{/* Image */}
						<div
							className="relative w-full overflow-hidden"
							style={{ aspectRatio: "16/9" }}>
							{current.image ? (
								<Image
									src={current.image}
									alt={current.headline}
									fill
									className="object-cover"
								/>
							) : (
								<div
									className="absolute inset-0 flex flex-col items-center justify-center gap-4"
									style={{ background: "var(--accent-faint)" }}>
									<div
										className="bg-noise absolute inset-0 opacity-10 pointer-events-none"
										aria-hidden="true"
									/>
									<Icon
										size={56}
										style={{ color: "var(--accent)", opacity: 0.28 }}
									/>
									<span
										className="text-[10px] uppercase tracking-[0.2em] font-semibold"
										style={{ color: "var(--accent)", opacity: 0.38 }}>
										Image coming soon
									</span>
								</div>
							)}
						</div>

						{/* Text */}
						<div>
							<p
								className="text-[10px] sm:text-xs uppercase tracking-[0.22em] mb-5 font-semibold"
								style={{ color: "var(--text-muted)" }}>
								{current.category}
							</p>
							<h2
								className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.08] mb-6"
								style={{ color: "var(--text)" }}>
								{current.headline}
							</h2>
							<p
								className="text-sm sm:text-base leading-relaxed mb-10"
								style={{ color: "var(--text-dim)" }}>
								{current.body}
							</p>
							<Link
								href={current.href}
								className="group inline-flex items-center gap-3 px-6 py-3.5 text-sm font-semibold transition-opacity duration-200 hover:opacity-90"
								style={{ background: "var(--accent)", color: "var(--bg)" }}>
								{current.cta}
								<ArrowRight
									size={15}
									className="transition-transform duration-200 group-hover:translate-x-0.5"
								/>
							</Link>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
	);
}
