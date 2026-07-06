import { useRef } from "react";
import { useScroll } from "framer-motion";
import WordsPullUpMultiStyle from "./animations/WordsPullUpMultiStyle";
import { AnimatedLetter } from "./animations/AnimatedLetter";
import { CountUp } from "./animations/CountUp";

const bodyText =
	"We deliver geospatial platforms for professionals and organisations that demand authoritative location intelligence. We integrate and connect data through the context of geography, providing world-leading capabilities for creating, managing, analysing, mapping, and sharing all types of spatial data — powered by deep AI integration.";

const stats = [
	{ value: "20+", label: "solutions delivered" },
	{ value: "5+", label: "countries" },
	{ value: "10+", label: "combined experience" },
	{ value: "99.9%", label: "cloud uptime SLA" }
];

export default function About() {
	const textRef = useRef<HTMLParagraphElement>(null);
	const { scrollYProgress } = useScroll({
		target: textRef,
		offset: ["start 0.85", "end 0.15"]
	});

	const chars = bodyText.split("");

	return (
		<section
			id="about"
			className="py-20 md:py-20 md:pb-0 px-4 md:px-6"
			style={{ background: "var(--bg)" }}>
			<div className="max-w-6xl mx-auto">
				<div
					className="p-8 md:p-12 lg:p-16 text-center"
					style={{ background: "var(--bg-surface)" }}>
					{/* Label */}
					<p
						className="text-[10px] sm:text-xs uppercase tracking-[0.22em] mb-8 font-medium"
						style={{ color: "var(--accent)" }}>
						Who we are
					</p>

					{/* Main heading */}
					<div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] max-w-4xl mx-auto leading-[0.93] mb-12">
						<WordsPullUpMultiStyle
							justify="center"
							segments={[
								{
									text: "Authoritative spatial data.",
									className: "font-semibold"
								},
								{
									text: " Any scale.",
									className: "font-normal italic",
									style: { fontFamily: "'Instrument Serif', serif" }
								},
								{ text: " One platform.", className: "font-semibold" }
							]}
						/>
					</div>

					{/* Scroll-linked body text */}
					<p
						ref={textRef}
						className="text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-[1.65] mb-14"
						style={{ color: "var(--text)" }}>
						{chars.map((char, i) => (
							<AnimatedLetter
								key={i}
								char={char}
								progress={scrollYProgress}
								index={i}
								total={chars.length}
							/>
						))}
					</p>

					{/* Stats strip */}
					<div
						className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-10 border-t"
						style={{ borderColor: "var(--border)" }}>
						{stats.map((stat) => (
							<div key={stat.label} className="text-center">
								<p
									className="font-light text-4xl sm:text-5xl md:text-6xl mb-1"
									style={{ color: "var(--text)" }}>
									<CountUp value={stat.value} />
								</p>
								<p
									className="text-xs sm:text-sm leading-snug"
									style={{ color: "var(--text-muted)" }}>
									{stat.label}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
