import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HeroBackground from "./HeroBackground";

export default function Hero() {
  return (
    <section className="h-screen relative overflow-hidden" style={{ background: "#000" }}>
      <HeroBackground />

      {/* Noise overlay */}
      <div
        className="noise-overlay absolute inset-0 opacity-[0.45] mix-blend-overlay pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-28 z-20 px-4 text-center pointer-events-none">
        <motion.p
          className="text-[10px] sm:text-xs uppercase tracking-[0.28em] mb-5 font-medium"
          style={{ color: "#2DD4BF" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
          Enterprise GIS Platform
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[0.92] mb-5 max-w-3xl"
          style={{ color: "#E2E8F0" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}>
          Map. Analyse.{" "}
          <em
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 300,
              color: "rgba(45,212,191,0.85)",
            }}>
            Decide.
          </em>
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base md:text-lg max-w-lg leading-relaxed"
          style={{ color: "rgba(226,232,240,0.50)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}>
          Geospatial intelligence for governments, utilities, and organisations worldwide.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}>
        <span
          className="text-[9px] uppercase tracking-[0.24em]"
          style={{ color: "rgba(226,232,240,0.3)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={16} style={{ color: "rgba(226,232,240,0.35)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
