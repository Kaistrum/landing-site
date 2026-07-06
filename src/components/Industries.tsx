import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
	Shield,
	Zap,
	Radio,
	Truck,
	Mountain,
	Wheat,
	Heart,
	Building2,
	TreePine,
	AlertTriangle,
	ArrowRight
} from "lucide-react";
import WordsPullUpMultiStyle from "./animations/WordsPullUpMultiStyle";

const industries = [
	{
		Icon: Shield,
		name: "Government & Defense",
		description:
			"Secure geospatial intelligence for national security, military planning, and government administrative operations.",
		href: "/industries/government-defense"
	},
	{
		Icon: Zap,
		name: "Utilities & Infrastructure",
		description:
			"Network mapping, outage management, and asset monitoring for power, water, and critical infrastructure.",
		href: "/industries/utilities-infrastructure"
	},
	{
		Icon: Radio,
		name: "Telecoms & Broadband",
		description:
			"Coverage planning, site acquisition, and network infrastructure management for telecoms operators.",
		href: "/industries/telecoms-broadband"
	},
	{
		Icon: Truck,
		name: "Transportation & Logistics",
		description:
			"Route optimisation, asset inspection, and corridor monitoring for roads, rail, and logistics networks.",
		href: "/industries/transportation-logistics"
	},
	{
		Icon: Mountain,
		name: "Mining & Natural Resources",
		description:
			"Exploration mapping, environmental compliance, and site management for extractive industries.",
		href: "/industries/mining-natural-resources"
	},
	{
		Icon: Wheat,
		name: "Agriculture",
		description:
			"Crop health monitoring, irrigation planning, and yield prediction via satellite remote sensing.",
		href: "/industries/agriculture"
	},
	{
		Icon: Heart,
		name: "NGOs & Non-profits",
		description:
			"Field data collection, impact mapping, and community needs assessments for humanitarian organisations.",
		href: "/industries/ngos-nonprofits"
	},
	{
		Icon: Building2,
		name: "Smart Cities",
		description:
			"Digital twins, urban mobility analytics, and infrastructure monitoring for city authorities.",
		href: "/industries/smart-cities"
	},
	{
		Icon: TreePine,
		name: "Environmental",
		description:
			"Biodiversity mapping, deforestation alerts, and climate vulnerability assessments.",
		href: "/industries/environmental"
	},
	{
		Icon: AlertTriangle,
		name: "Disaster Response",
		description:
			"Rapid damage assessment, evacuation routing, and situational awareness for crisis response teams.",
		href: "/industries/disaster-response"
	}
];

function IndustryCard({
	industry,
	index
}: {
	industry: (typeof industries)[number];
	index: number;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-80px" });
	const { Icon } = industry;

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 20 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{
				duration: 0.7,
				delay: index * 0.07,
				ease: [0.22, 1, 0.36, 1]
			}}>
			<Link
				href={industry.href}
				className="group p-6 border flex flex-col gap-4 h-full transition-colors duration-200"
				style={{
					background: "var(--bg-card)",
					borderColor: "var(--border)",
					display: "flex"
				}}
				onMouseEnter={(e) =>
					((e.currentTarget as HTMLElement).style.borderColor = "var(--accent)")
				}
				onMouseLeave={(e) =>
					((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")
				}>
				<div className="w-10 h-10 flex items-center justify-center transition-colors duration-300">
					<Icon strokeWidth={1} size={48} style={{ color: "var(--accent)" }} />
				</div>
				<div className="flex-1">
					<h3
						className="font-semibold text-sm mb-1.5"
						style={{ color: "var(--text)" }}>
						{industry.name}
					</h3>
					<p
						className="text-xs leading-[1.6]"
						style={{ color: "var(--text-dim)" }}>
						{industry.description}
					</p>
				</div>
				<div
					className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.16em] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
					style={{ color: "var(--accent)" }}>
					Learn more
					<ArrowRight size={10} style={{ transform: "rotate(-45deg)" }} />
				</div>
			</Link>
		</motion.div>
	);
}

export default function Industries() {
	const headerRef = useRef<HTMLDivElement>(null);
	const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

	return (
		<section
			id="industries"
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
						Industries
					</p>
					<div className="text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.05] max-w-2xl">
						<WordsPullUpMultiStyle
							justify="start"
							segments={[
								{
									text: "Built for the organisations",
									className: "font-semibold",
									style: { color: "var(--text)" }
								},
								{
									text: " that shape the world.",
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

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
					{industries.map((ind, i) => (
						<IndustryCard key={ind.name} industry={ind} index={i} />
					))}
				</div>
			</div>
		</section>
	);
}
