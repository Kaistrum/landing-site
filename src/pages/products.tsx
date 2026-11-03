import type { NextPage } from "next";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import SEO, { breadcrumbSchema } from "@/components/SEO";
import useMounted from "@/lib/useMounted";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import products, {
	liveProducts,
	shownProducts,
	type Capability,
	type Product
} from "@/data/products";
import ProductGraphic from "@/components/products/ProductGraphic";
import cases from "@/data/cases";

const HERO_DESCRIPTION =
	"Kaistrum is the platform Kairos Spatial Solutions builds on. Each product takes one domain and carries it from raw spatial data through to a decision a team can act on.";

/* ── Scroll reveal, skipped when reduced motion is requested ── */
function Reveal({
	children,
	delay = 0,
	className
}: {
	children: React.ReactNode;
	delay?: number;
	className?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-60px" });
	const mounted = useMounted();
	const prefersReduced = useReducedMotion();
	const reduceMotion = mounted && prefersReduced;

	if (reduceMotion) {
		return (
			<div ref={ref} className={className}>
				{children}
			</div>
		);
	}

	return (
		<motion.div
			ref={ref}
			className={className}
			initial={{ opacity: 0, y: 24 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}>
			{children}
		</motion.div>
	);
}

/* ── One capability. A product can hold more than one, and they are not all
   at the same stage, so each carries its own case study link or none. ── */
function CapabilityBlock({
	capability,
	showName
}: {
	capability: Capability;
	showName: boolean;
}) {
	return (
		<div>
			{showName && (
				<h3
					className="text-lg font-semibold mb-3"
					style={{ color: "var(--text)" }}>
					{capability.name}
				</h3>
			)}
			<p
				className="text-sm leading-[1.8] mb-4"
				style={{ color: "var(--text-dim)" }}>
				{capability.summary}
			</p>
			{capability.detail && capability.detail.length > 0 && (
				<ul className="flex flex-col gap-2.5">
					{capability.detail.map((line) => (
						<li
							key={line}
							className="flex gap-3 text-sm leading-[1.7]"
							style={{ color: "var(--text-dim)" }}>
							<Check
								size={15}
								aria-hidden="true"
								className="shrink-0 mt-1"
								style={{ color: "var(--accent)" }}
							/>
							{line}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

/* ── One product section, driven entirely by the registry ── */
function ProductSection({
	product,
	index
}: {
	product: Product;
	index: number;
}) {
	/* The button resolves through the registry. Nothing about any case study
	   page is hardcoded here, and the label is the study's own title. */
	const study = product.caseStudy
		? cases.find((c) => c.slug === product.caseStudy)
		: undefined;

	const isDraft = product.status === "draft";

	/* Alternate which side the visual sits on */
	const visualFirst = index % 2 === 1;
	const tinted = index % 2 === 1;

	return (
		<section
			id={product.slug}
			/* Focusable so a fragment link moves focus, not just the scroll
			   position. scroll-mt clears the fixed 56px header. */
			tabIndex={-1}
			aria-labelledby={`${product.slug}-heading`}
			className="py-20 md:py-28 px-4 md:px-8 border-b scroll-mt-20 focus:outline-none"
			style={{
				background: tinted ? "var(--bg-surface)" : "var(--bg)",
				borderColor: "var(--border)"
			}}>
			<div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
				<Reveal className={visualFirst ? "lg:order-2" : undefined}>
					<p
						className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-4"
						style={{ color: "var(--accent)" }}>
						{product.name}
					</p>

					{isDraft ? (
						<h2
							id={`${product.slug}-heading`}
							className="text-3xl md:text-4xl font-semibold leading-[1.1] tracking-tight mb-6"
							style={{ color: "var(--text-muted)" }}>
							{product.name}
						</h2>
					) : (
						<h2
							id={`${product.slug}-heading`}
							className="text-3xl md:text-4xl font-semibold leading-[1.1] tracking-tight mb-6"
							style={{ color: "var(--text)" }}>
							{product.headline}
						</h2>
					)}

					{isDraft ? (
						/* Deliberately says nothing about what the product does.
						   A plausible sentence here would be worse than silence. */
						<div
							className="border border-dashed p-6 mb-8"
							style={{ borderColor: "var(--border)" }}>
							<p
								className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-3"
								style={{ color: "var(--text-muted)" }}>
								Copy pending
							</p>
							<p
								className="text-sm leading-[1.8]"
								style={{ color: "var(--text-muted)" }}>
								Overview, capabilities and audiences for {product.name} are
								not written yet. This section is a placeholder so the shape of
								the page can be judged, and it is not for publication.
							</p>
						</div>
					) : (
						<p
							className="text-base leading-[1.85] mb-8"
							style={{ color: "var(--text-dim)" }}>
							{product.overview}
						</p>
					)}

					<div className="flex flex-col gap-10 mb-8">
						{product.capabilities.map((cap) => (
							<CapabilityBlock
								key={cap.name}
								capability={cap}
								/* With one capability the headline already covers it,
								   so the subheading would just repeat the section. */
								showName={product.capabilities.length > 1}
							/>
						))}
					</div>

					{product.audiences.length > 0 && (
						<p
							className="text-sm mb-8 pb-8 border-b"
							style={{
								color: "var(--text-muted)",
								borderColor: "var(--border)"
							}}>
							Built for {formatList(product.audiences)}.
						</p>
					)}

					{study ? (
						<Link
							href={`/case-studies/${study.slug}`}
							className="group inline-flex items-center gap-3 pl-6 pr-2 py-2.5 font-semibold text-sm md:text-base transition-opacity duration-200 hover:opacity-90"
							style={{ background: "var(--accent)", color: "var(--bg)" }}>
							See the {study.title} case study
							<span
								className="w-9 h-9 shrink-0 flex items-center justify-center"
								style={{ background: "var(--bg)", color: "var(--accent)" }}>
								<ArrowRight size={15} />
							</span>
						</Link>
					) : (
						<Link
							href="/#contact"
							className="inline-flex items-center gap-3 px-6 py-3.5 border-2 text-sm md:text-base font-semibold transition-colors duration-200"
							style={{
								borderColor: "var(--accent)",
								color: "var(--accent)"
							}}>
							Talk to us about {product.name}
							<ArrowRight size={15} aria-hidden="true" />
						</Link>
					)}
				</Reveal>

				<Reveal
					delay={0.1}
					className={visualFirst ? "lg:order-1" : undefined}>
					<ProductGraphic
						variant={product.graphic}
						label={product.graphicAlt}
					/>
				</Reveal>
			</div>
		</section>
	);
}

function formatList(items: string[]): string {
	if (items.length <= 1) return items[0] ?? "";
	return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const ProductsPage: NextPage = () => {
	/* Draft products render nothing anywhere: no section, no anchor, no entry
	   in this nav. With a single live product the nav would be a row of one,
	   so it does not render at all until a second product goes live. */
	const showAnchorNav = shownProducts.length > 1;

	return (
		<>
			<SEO
				title="Products · Kairos Spatial Solutions"
				description={HERO_DESCRIPTION}
				path="/products"
				jsonLd={breadcrumbSchema([
					{ name: "Home", path: "/" },
					{ name: "Products", path: "/products" }
				])}
			/>

			<Header />

			<main className="pt-14">
				{/* ── Hero ── */}
				<section
					className="py-20 md:py-28 px-4 md:px-8 border-b"
					style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
					<div className="max-w-6xl mx-auto">
						<motion.p
							className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-5"
							style={{ color: "var(--accent)" }}
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
							The Kaistrum platform
						</motion.p>
						<motion.h1
							className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.04] tracking-tight max-w-3xl mb-6"
							style={{ color: "var(--text)" }}
							initial={{ opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.75,
								delay: 0.08,
								ease: [0.16, 1, 0.3, 1]
							}}>
							One platform.{" "}
							<span
								className="font-normal italic"
								style={{
									fontFamily: "'Instrument Serif', serif",
									color: "var(--text-dim)"
								}}>
								A product per domain.
							</span>
						</motion.h1>
						<motion.p
							className="text-base md:text-lg leading-[1.8] max-w-2xl"
							style={{ color: "var(--text-dim)" }}
							initial={{ opacity: 0, y: 14 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.7,
								delay: 0.16,
								ease: [0.16, 1, 0.3, 1]
							}}>
							{HERO_DESCRIPTION}
						</motion.p>

						{showAnchorNav && (
							<nav
								aria-label="Products on this page"
								className="flex flex-wrap gap-2 mt-10">
								{shownProducts.map((p) => (
									<a
										key={p.slug}
										href={`#${p.slug}`}
										className="text-xs font-medium px-4 py-2 border transition-colors duration-200"
										style={{
											borderColor: "var(--border)",
											color: "var(--text-dim)"
										}}>
										{p.name}
									</a>
								))}
							</nav>
						)}
					</div>
				</section>

				{shownProducts.map((p, i) => (
					<ProductSection key={p.slug} product={p} index={i} />
				))}

				<Contact />
			</main>

			<Footer />
		</>
	);
};

export default ProductsPage;

/* Draft entries are referenced here only so the registry import is obviously
   the whole list, not just the live slice. */
export const TOTAL_PRODUCTS = products.length;
