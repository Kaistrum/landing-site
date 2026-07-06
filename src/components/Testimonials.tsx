import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import WordsPullUpMultiStyle from "./animations/WordsPullUpMultiStyle";

const testimonials = [
  {
    quote:
      "We replaced five separate GIS tools with Kaistrum and cut our licence cost by 35% in year one. The migration support was exceptional — they had our geodatabases running on Kaistrum Cloud within two weeks, with zero data loss.",
    name: "Dr. Asha Wangari",
    title: "Director of Urban Planning, Nairobi County Government",
  },
  {
    quote:
      "Kaistrum's field inspection app transformed how our crews work. Inspectors now capture gas leak reports with GPS coordinates, photos, and sensor readings in the field — and they sync to our control room in real time. What used to take two days of back-and-forth now takes fifteen minutes.",
    name: "James Ochieng",
    title: "GIS Manager, Kenya Pipeline Company",
  },
  {
    quote:
      "The remote sensing module caught a landslide risk zone in our eastern corridor six weeks before the rainy season hit. That early warning gave us time to reroute crews and avoid what would have been a catastrophic outage. Kaistrum quite literally paid for itself that quarter.",
    name: "Fatuma Al-Hassan",
    title: "Head of Geospatial Operations, Tanzania TANESCO",
  },
];

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="p-7 md:p-8 flex flex-col gap-6 border"
      style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}>
      {/* Quote mark */}
      <span
        className="font-serif leading-none select-none"
        style={{
          fontSize: "3rem",
          color: "var(--accent-faint)",
          lineHeight: 1,
          fontFamily: "'Instrument Serif', serif",
        }}>
        "
      </span>

      <p className="text-sm sm:text-base leading-[1.7] flex-1 -mt-4" style={{ color: "var(--text-dim)" }}>
        {t.quote}
      </p>

      <div className="border-t pt-5 flex items-center gap-3" style={{ borderColor: "var(--border)" }}>
        <div
          className="w-9 h-9 shrink-0 flex items-center justify-center text-[11px] font-medium tracking-wide border"
          style={{
            background: "var(--accent-faint)",
            color: "var(--accent)",
            borderColor: "var(--border)",
          }}>
          {t.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            {t.name}
          </p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {t.title}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-24 px-4 md:px-6" style={{ background: "var(--bg)" }}>
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
            Testimonials
          </p>
          <div className="text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.05] max-w-xl">
            <WordsPullUpMultiStyle
              justify="start"
              segments={[
                { text: "What GIS leaders say about", className: "font-semibold", style: { color: "var(--text)" } },
                {
                  text: " Kaistrum.",
                  className: "font-normal italic",
                  style: { fontFamily: "'Instrument Serif', serif", color: "var(--text-dim)" },
                },
              ]}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
