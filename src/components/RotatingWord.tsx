import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  words: string[];
  interval?: number;
  className?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function RotatingWord({ words, interval = 2400, className = "" }: Props) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={`relative inline-flex align-baseline overflow-hidden ${className}`} style={{ verticalAlign: "baseline" }}>
      <span aria-hidden className="invisible whitespace-nowrap">
        {words.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          className="text-gradient-flow absolute inset-0 whitespace-nowrap"
          initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function RotatingLine({ lines, interval = 3600, className = "" }: { lines: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % lines.length), interval);
    return () => clearInterval(id);
  }, [lines.length, interval]);
  return (
    <span className={`relative block ${className}`} aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={lines[i]}
          className="block"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {lines[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}