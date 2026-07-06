import Link from "next/link";
import Image from "next/image";

const footerColumns = [
	{
		heading: "Services",
		links: [
			{
				label: "Infrastructure Deployment",
				href: "/services/infrastructure-deployment"
			},
			{ label: "Data Migration", href: "/services/data-migration" },
			{ label: "Custom Development", href: "/services/custom-development" },
			{ label: "System Integration", href: "/services/system-integration" },
			{ label: "Training", href: "/services/training" },
			{ label: "Support", href: "/services/support" }
		]
	},
	{
		heading: "Industries",
		links: [
			{ label: "Government & Defense", href: "/industries/government-defense" },
			{
				label: "Utilities & Infrastructure",
				href: "/industries/utilities-infrastructure"
			},
			{
				label: "Transportation & Logistics",
				href: "/industries/transportation-logistics"
			},
			{ label: "Agriculture", href: "/industries/agriculture" },
			{ label: "Smart Cities", href: "/industries/smart-cities" },
			{ label: "Disaster Response", href: "/industries/disaster-response" }
		]
	},
	{
		heading: "Case Studies",
		links: [
			{
				label: "Nairobi Digital Twin",
				href: "/case-studies/nairobi-digital-twin"
			},
			{
				label: "KenGen Pipeline Network",
				href: "/case-studies/kengen-pipeline"
			},
			{
				label: "Smallholder Crop Monitoring",
				href: "/case-studies/smallholder-crop-monitoring"
			},
			{ label: "RAPIDA — UNDP", href: "/case-studies/rapida-undp" },
			{ label: "All case studies", href: "/case-studies" }
		]
	},
	{
		heading: "Company",
		links: [
			{ label: "About", href: "/about" },
			{ label: "Careers", href: "/careers" },
			{ label: "Contact", href: "/#contact" }
		]
	}
];

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer
			className="py-16 md:py-20 px-4 md:px-6 border-t"
			style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-6 mb-14">
					{/* Brand */}
					<div className="col-span-2 md:col-span-1">
						<Link
							href="/"
							className="flex items-center gap-2.5 mb-4"
							aria-label="Kaistrum home">
							<Image
								src="/logo.png"
								alt=""
								height={12}
								width={36}
								className="object-contain"
							/>
							<span
								className="text-xs font-bold tracking-widest uppercase"
								style={{ color: "var(--text)" }}>
								Kaistrum
							</span>
						</Link>
						<p
							className="text-xs leading-relaxed max-w-[200px]"
							style={{ color: "var(--text-muted)" }}>
							Spatial . Non-spatial . Limitless
						</p>
					</div>

					{/* Link columns */}
					{footerColumns.map((col) => (
						<div key={col.heading}>
							<p
								className="text-[10px] font-semibold mb-4 uppercase tracking-[0.18em]"
								style={{ color: "var(--accent)" }}>
								{col.heading}
							</p>
							<ul className="flex flex-col gap-2.5">
								{col.links.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className="text-xs sm:text-sm transition-colors duration-200"
											style={{ color: "var(--text-muted)" }}
											onMouseEnter={(e) =>
												((e.currentTarget as HTMLElement).style.color =
													"var(--text)")
											}
											onMouseLeave={(e) =>
												((e.currentTarget as HTMLElement).style.color =
													"var(--text-muted)")
											}>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom bar */}
				<div
					className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
					style={{ borderColor: "var(--border)" }}>
					<p className="text-xs" style={{ color: "var(--text-muted)" }}>
						© {year} Kaistrum. All rights reserved.
					</p>
					<p className="text-xs" style={{ color: "var(--text-muted)" }}>
						hello@kaistrum.com
					</p>
				</div>
			</div>
		</footer>
	);
}
