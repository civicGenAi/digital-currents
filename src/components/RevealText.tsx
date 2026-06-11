import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function RevealHeading({
  children,
  highlight,
  as = "h1",
  className = "",
  delay = 0,
}: {
  children: string;
  highlight?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
}) {
  const words = children.split(" ");
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" style={{ marginRight: "0.28em" }}>
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 0.85, ease, delay: delay + i * 0.06 } },
            }}
          >
            {highlight && w.toLowerCase().replace(/[.,]/g, "") === highlight.toLowerCase() ? (
              <span className="text-gradient-flow">{w}</span>
            ) : (
              w
            )}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function FadeIn({ children, delay = 0, y = 24, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
