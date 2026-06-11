import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { PageTransition } from "../components/PageTransition";
import { RevealHeading, FadeIn } from "../components/RevealText";

export const Route = createFileRoute("/sectors")({
  head: () => ({
    meta: [
      { title: "Sectors — East Africa Internet Group" },
      { name: "description", content: "Seven countries, one network. EAG operates across Tanzania, Kenya, Uganda, Rwanda, Burundi, DR Congo and South Sudan." },
      { property: "og:title", content: "Sectors — East Africa Internet Group" },
      { property: "og:description", content: "Seven countries, one network." },
    ],
  }),
  component: Sectors,
});

const countries = [
  { name: "Tanzania", x: 50, y: 60, base: true },
  { name: "Kenya", x: 64, y: 46 },
  { name: "Uganda", x: 46, y: 42 },
  { name: "Rwanda", x: 38, y: 54 },
  { name: "Burundi", x: 34, y: 62 },
  { name: "DR Congo", x: 22, y: 50 },
  { name: "South Sudan", x: 44, y: 26 },
];

function Sectors() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <PageTransition>
      <section className="relative px-6 pt-40 pb-16 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn><span className="text-xs uppercase tracking-[0.3em] opacity-60">Reach & Sectors</span></FadeIn>
          <RevealHeading
            className="mt-6 max-w-[16ch] font-display text-4xl font-semibold leading-[1.05] md:text-7xl"
            highlight="seven"
            delay={0.1}
          >
            Seven countries, one network.
          </RevealHeading>
          <FadeIn delay={0.6} className="mt-8 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">
            A regional footprint built on the ground, anchored in Tanzania and extending across East Africa.
          </FadeIn>
        </div>
      </section>

      <section className="relative surface-dark overflow-hidden px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-[1300px] gap-16 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="relative aspect-square w-full">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="line" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0" stopColor="#29B6E8" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#5FD0F5" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              {countries.filter((c) => !c.base).map((c, i) => {
                const base = countries[0];
                return (
                  <motion.line
                    key={c.name}
                    x1={base.x} y1={base.y} x2={c.x} y2={c.y}
                    stroke="url(#line)" strokeWidth="0.3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                );
              })}
              {countries.map((c, i) => (
                <g key={c.name} style={{ cursor: "pointer" }} onMouseEnter={() => setActive(c.name)} onMouseLeave={() => setActive(null)}>
                  <motion.circle
                    cx={c.x} cy={c.y}
                    r={c.base ? 2.2 : 1.4}
                    fill={c.base ? "#29B6E8" : "#5FD0F5"}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <circle cx={c.x} cy={c.y} r={c.base ? 4 : 3} fill="#29B6E8" opacity={active === c.name ? 0.25 : 0} className="transition-opacity duration-300" />
                  <text x={c.x + 3} y={c.y + 1} fill="#F4FAFD" fontSize="2.4" opacity={active === c.name || c.base ? 0.95 : 0.45} className="transition-opacity duration-300" fontFamily="Space Grotesk">
                    {c.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div>
            <RevealHeading as="h2" className="font-display text-2xl font-medium leading-tight md:text-3xl">
              Anchored in Tanzania, extending across the region.
            </RevealHeading>
            <FadeIn delay={0.2} className="mt-6 text-base leading-relaxed opacity-75">
              <p>Each node is a country, each line a live connection — local teams, regional standards, and a single operating network.</p>
            </FadeIn>
            <FadeIn delay={0.4} className="mt-10 grid grid-cols-2 gap-3">
              {countries.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  onMouseEnter={() => setActive(c.name)}
                  onMouseLeave={() => setActive(null)}
                  className={`flex items-center gap-3 rounded-full border border-white/10 px-4 py-2 text-sm transition-colors duration-300 ${active === c.name ? "bg-[color:var(--cyan-flow)]/15 border-[color:var(--cyan-flow)]/40" : ""}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--cyan-flow)] animate-[node-pulse_2.5s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.2}s` }} />
                  {c.name}
                  {c.base && <span className="ml-auto text-[10px] uppercase tracking-widest opacity-60">Base</span>}
                </motion.div>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
