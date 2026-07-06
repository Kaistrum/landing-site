import { motion, MotionValue, useTransform } from "framer-motion";

interface AnimatedLetterProps {
  char: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}

export function AnimatedLetter({ char, progress, index, total }: AnimatedLetterProps) {
  const charProgress = index / total;
  const opacity = useTransform(
    progress,
    [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
    [0.18, 1]
  );

  return (
    <motion.span style={{ opacity }} className="inline whitespace-pre-wrap break-words">
      {char}
    </motion.span>
  );
}
