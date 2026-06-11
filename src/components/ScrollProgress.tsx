import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[90] h-[2px] origin-left"
      style={{ scaleX: sx, background: "var(--gradient-flow)" }}
    />
  );
}
