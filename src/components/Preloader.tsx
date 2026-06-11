import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "eag_preloaded";

export function Preloader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;
    setShow(true);
    const t = window.setTimeout(() => {
      sessionStorage.setItem(KEY, "1");
      setShow(false);
    }, 1700);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: "var(--navy-ink)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        >
          <svg width="120" height="90" viewBox="0 0 120 90" fill="none" aria-hidden>
            <defs>
              <linearGradient id="pl" x1="0" y1="0" x2="120" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#1B6CA8" />
                <stop offset="1" stopColor="#29B6E8" />
              </linearGradient>
              <clipPath id="nodeClip">
                <rect x="6" y="20" width="50" height="50" rx="12" />
              </clipPath>
            </defs>
            <rect x="6" y="20" width="50" height="50" rx="12" stroke="url(#pl)" strokeWidth="1.5" />
            <motion.rect
              x="6" y="70" width="50" height="0" fill="url(#pl)"
              clipPath="url(#nodeClip)"
              initial={{ height: 0, y: 70 }}
              animate={{ height: 50, y: 20 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
            <motion.path
              d="M56 45 C 72 45, 76 50, 88 50"
              stroke="url(#pl)" strokeWidth="1.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            />
            <motion.path
              d="M92 28 C 100 36, 110 44, 100 64 C 92 76, 80 68, 92 28 Z"
              fill="url(#pl)"
              initial={{ scale: 0, opacity: 0, transformOrigin: "96px 50px" }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
