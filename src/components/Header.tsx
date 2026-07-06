import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

/* ── Megamenu data ── */
const megamenus = {
	Company: {
		columns: [
			{
				heading: "COMPANY",
				links: [
					{ label: "About", sub: "Our mission and team", href: "/about" },
					{ label: "Careers", sub: "Open roles at Kaistrum", href: "/careers" }
				],
				cta: { label: "Get in touch", href: "/#contact" }
			}
		]
	},
	Services: {
		columns: [
			{
				heading: "PROFESSIONAL",
				links: [
					{
						label: "Infrastructure Deployment",
						sub: "End-to-end GIS deployment",
						href: "/services/infrastructure-deployment"
					},
					{
						label: "Data Migration",
						sub: "Move legacy spatial data without loss",
						href: "/services/data-migration"
					},
					{
						label: "Custom Development",
						sub: "Tailored GIS web & mobile applications",
						href: "/services/custom-development"
					},
					{
						label: "System Integration",
						sub: "Connect GIS with your enterprise stack",
						href: "/services/system-integration"
					}
				]
			},
			{
				heading: "TRAINING & SUPPORT",
				links: [
					{
						label: "Training",
						sub: "Expert-led workshops on your platform",
						href: "/services/training"
					},
					{
						label: "Support",
						sub: "24/7 SLA-backed technical support",
						href: "/services/support"
					}
				],
				cta: { label: "All services", href: "/#products" }
			}
		]
	},
	Industries: {
		columns: [
			{
				heading: "PUBLIC SECTOR",
				links: [
					{
						label: "Government & Defense",
						sub: "",
						href: "/industries/government-defense"
					},
					{
						label: "Utilities & Infrastructure",
						sub: "",
						href: "/industries/utilities-infrastructure"
					},
					{
						label: "Telecoms & Broadband",
						sub: "",
						href: "/industries/telecoms-broadband"
					}
				]
			},
			{
				heading: "PRIVATE SECTOR",
				links: [
					{
						label: "Transportation & Logistics",
						sub: "",
						href: "/industries/transportation-logistics"
					},
					{
						label: "Mining & Natural Resources",
						sub: "",
						href: "/industries/mining-natural-resources"
					},
					{ label: "Agriculture", sub: "", href: "/industries/agriculture" }
				]
			},
			{
				heading: "EMERGING",
				links: [
					{
						label: "NGOs & Non-profits",
						sub: "",
						href: "/industries/ngos-nonprofits"
					},
					{ label: "Smart Cities", sub: "", href: "/industries/smart-cities" },
					{
						label: "Environmental",
						sub: "",
						href: "/industries/environmental"
					},
					{
						label: "Disaster Response",
						sub: "",
						href: "/industries/disaster-response"
					}
				],
				cta: { label: "All industries", href: "/#industries" }
			}
		]
	}
};

type MegamenuKey = keyof typeof megamenus;

/* ── Nav item shape ── */
type NavEntry =
	| { kind: "mega"; label: MegamenuKey }
	| { kind: "link"; label: string; href: string };

const navItems: NavEntry[] = [
	{ kind: "mega", label: "Services" },
	{ kind: "mega", label: "Industries" },
	{ kind: "mega", label: "Company" },
	{ kind: "link", label: "Case Studies", href: "/case-studies" },
	{ kind: "link", label: "Contact", href: "/#contact" }
];

/* ── Full-width dropdown panel ── */
function MegaDropdown({
	item,
	onMouseEnter,
	onMouseLeave
}: {
	item: MegamenuKey;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}) {
	const data = megamenus[item];

	return (
		<motion.div
			className="w-full border-b"
			style={{ background: "var(--drop-bg)", borderColor: "var(--border)" }}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			initial={{ opacity: 0, y: -6 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -6 }}
			transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}>
			<div className="max-w-7xl mx-auto px-8 py-10">
				<div
					className="grid gap-10"
					style={{
						gridTemplateColumns: `repeat(${data.columns.length}, 1fr)`
					}}>
					{data.columns.map((col) => (
						<div key={col.heading}>
							<p
								className="text-[10px] font-semibold tracking-[0.2em] mb-4 pb-3 border-b"
								style={{
									color: "var(--accent)",
									borderColor: "var(--border)"
								}}>
								{col.heading}
							</p>
							<ul className="flex flex-col gap-3">
								{col.links.map((link) => (
									<li key={link.label}>
										<Link href={link.href} className="group block">
											<span
												className="font-medium text-sm block transition-colors duration-150"
												style={{ color: "var(--text)" }}
												onMouseEnter={(e) =>
													((e.currentTarget as HTMLElement).style.color =
														"var(--accent)")
												}
												onMouseLeave={(e) =>
													((e.currentTarget as HTMLElement).style.color =
														"var(--text)")
												}>
												{link.label}
											</span>
											{link.sub && (
												<span
													className="text-xs block mt-0.5"
													style={{ color: "var(--text-muted)" }}>
													{link.sub}
												</span>
											)}
										</Link>
									</li>
								))}
							</ul>
							{"cta" in col && col.cta && (
								<Link
									href={col.cta.href}
									className="inline-flex items-center gap-1.5 mt-6 text-xs font-semibold transition-colors duration-200"
									style={{ color: "var(--accent)" }}>
									{col.cta.label}
									<ArrowRight
										size={11}
										style={{ transform: "rotate(-45deg)" }}
									/>
								</Link>
							)}
						</div>
					))}
				</div>
			</div>
		</motion.div>
	);
}

export default function Header() {
	const [activeItem, setActiveItem] = useState<MegamenuKey | null>(null);
	const [mobileOpen, setMobileOpen] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const { theme, toggleTheme } = useTheme();

	const openMenu = (item: MegamenuKey) => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setActiveItem(item);
	};

	const closeMenu = () => {
		timeoutRef.current = setTimeout(() => setActiveItem(null), 100);
	};

	const keepMenu = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
	};

	return (
		<header
			className="fixed top-0 left-0 right-0 z-50"
			style={{ borderBottom: activeItem ? "none" : `1px solid var(--border)` }}>
			{/* ── Main bar ── */}
			<div
				className="relative flex items-center px-4 md:px-8 h-14"
				style={{
					background: "var(--nav-bg)",
					backdropFilter: "blur(18px)",
					borderBottom: `1px solid var(--border)`
				}}>
				{/* Logo */}
				<div className="flex-shrink-0 mr-10">
					<Link
						href="/"
						className="flex items-center gap-2.5"
						aria-label="Kaistrum home">
						<Image
							src="/logo.png"
							alt=""
							height={12}
							width={36}
							className="object-contain"
							priority
						/>
						<span
							className="text-lg font-bold tracking-widest uppercase"
							style={{ color: "var(--text)" }}>
							Kaistrum
						</span>
					</Link>
				</div>

				{/* Desktop nav */}
				<nav
					className="hidden md:flex items-center h-full absolute left-1/2 -translate-x-1/2"
					aria-label="Main navigation">
					{navItems.map((entry) => {
						const isMega = entry.kind === "mega";
						const isActive = isMega && activeItem === entry.label;

						return (
							<div
								key={entry.label}
								className="relative h-full flex items-center"
								onMouseEnter={() =>
									isMega && openMenu(entry.label as MegamenuKey)
								}
								onMouseLeave={() => isMega && closeMenu()}>
								{isMega ? (
									<button
										className="flex items-center gap-1 px-4 text-sm font-medium transition-colors duration-150 cursor-pointer h-full border-b-2"
										style={{
											color: isActive ? "var(--accent)" : "var(--text-dim)",
											borderBottomColor: isActive
												? "var(--accent)"
												: "transparent"
										}}>
										{entry.label}
										<ChevronDown
											size={13}
											className="transition-transform duration-200"
											style={{
												transform: isActive ? "rotate(180deg)" : "rotate(0deg)"
											}}
										/>
									</button>
								) : (
									<Link
										href={entry.href}
										className="flex items-center gap-1 px-4 text-sm font-medium transition-colors duration-150"
										style={{ color: "var(--text-dim)" }}
										onMouseEnter={(e) =>
											((e.currentTarget as HTMLElement).style.color =
												"var(--text)")
										}
										onMouseLeave={(e) =>
											((e.currentTarget as HTMLElement).style.color =
												"var(--text-dim)")
										}>
										{entry.label}
									</Link>
								)}
							</div>
						);
					})}
				</nav>

				{/* Right side: theme toggle + CTA + hamburger */}
				<div className="flex items-center gap-3 ml-auto">
					<button
						onClick={toggleTheme}
						className="hidden md:flex w-9 h-9 items-center justify-center border transition-colors duration-200"
						style={{
							borderColor: "var(--border)",
							color: "var(--text-dim)",
							background: "var(--accent-faint)"
						}}
						aria-label="Toggle theme">
						{theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
					</button>

					<Link
						href="/#contact"
						className="hidden md:inline-flex group items-center gap-1.5 pl-4 pr-1.5 py-1.5 font-medium text-xs transition-all duration-200 hover:gap-2.5"
						style={{ background: "var(--accent)", color: "var(--bg)" }}>
						Contact
						<span
							className="w-6 h-6 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shrink-0"
							style={{ background: "var(--bg)", color: "var(--accent)" }}>
							<ArrowRight size={11} />
						</span>
					</Link>

					<button
						className="md:hidden flex items-center gap-2 text-sm"
						style={{ color: "var(--text-dim)" }}
						onClick={() => setMobileOpen((o) => !o)}
						aria-label={mobileOpen ? "Close menu" : "Open menu"}>
						{mobileOpen ? <X size={16} /> : <Menu size={16} />}
					</button>
				</div>
			</div>

			{/* ── Full-width megamenu dropdown ── */}
			<AnimatePresence>
				{activeItem && (
					<MegaDropdown
						item={activeItem}
						onMouseEnter={keepMenu}
						onMouseLeave={closeMenu}
					/>
				)}
			</AnimatePresence>

			{/* ── Mobile drawer ── */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						className="md:hidden border-b overflow-y-auto max-h-[80vh]"
						style={{
							background: "var(--drop-bg)",
							borderColor: "var(--border)"
						}}
						initial={{ opacity: 0, y: -6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -6 }}
						transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}>
						<ul className="flex flex-col py-2">
							{navItems.map((entry) => (
								<li key={entry.label}>
									<Link
										href={entry.kind === "link" ? entry.href : "#"}
										className="block px-5 py-3.5 text-sm font-medium border-b transition-colors duration-200"
										style={{
											color: "var(--text-dim)",
											borderColor: "var(--border-subtle)"
										}}
										onClick={() => setMobileOpen(false)}>
										{entry.label}
									</Link>
								</li>
							))}
						</ul>
						<div className="px-4 py-4 flex items-center gap-3">
							<button
								onClick={toggleTheme}
								className="flex items-center gap-2 text-xs px-3 py-2 border"
								style={{
									borderColor: "var(--border)",
									color: "var(--text-dim)",
									background: "var(--accent-faint)"
								}}>
								{theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
								{theme === "dark" ? "Light mode" : "Dark mode"}
							</button>
							<Link
								href="/#contact"
								onClick={() => setMobileOpen(false)}
								className="flex-1 flex items-center justify-center gap-2 py-2.5 font-medium text-sm"
								style={{ background: "var(--accent)", color: "var(--bg)" }}>
								Contact Us
								<ArrowRight size={14} />
							</Link>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
