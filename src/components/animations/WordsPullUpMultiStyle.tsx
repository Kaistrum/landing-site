import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface TextSegment {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  className?: string;
  justify?: "center" | "start";
}

export default function WordsPullUpMultiStyle({
  segments,
  className = "",
  justify = "center",
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const allWords: { word: string; wordClass: string; wordStyle?: React.CSSProperties; idx: number }[] = [];
  let globalIdx = 0;

  segments.forEach((segment) => {
    segment.text.split(" ").forEach((word) => {
      if (word) {
        allWords.push({ word, wordClass: segment.className ?? "", wordStyle: segment.style, idx: globalIdx++ });
      }
    });
  });

  return (
    <span
      ref={ref}
      className={`inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.1em] ${
        justify === "center" ? "justify-center" : "justify-start"
      } ${className}`}>
      {allWords.map(({ word, wordClass, wordStyle, idx }) => (
        <span key={idx} className="overflow-hidden inline-block">
          <motion.span
            className={`inline-block ${wordClass}`}
            style={wordStyle}
            initial={{ y: 24, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.85, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}>
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
