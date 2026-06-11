import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition } from "../components/PageTransition";
import { RevealHeading, FadeIn } from "../components/RevealText";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — East Africa Internet Group" },
      { name: "description", content: "Field notes, research, and points of view on digital growth across East Africa." },
      { property: "og:title", content: "Insights — East Africa Internet Group" },
      { property: "og:description", content: "Field notes, research, and points of view on digital growth across East Africa." },
    ],
  }),
  component: Insights,
});

const posts = [
  { tag: "Field Note", title: "Why brand still beats performance in emerging markets", date: "Soon" },
  { tag: "Research", title: "The seven-country media-mix gap in 2026", date: "Soon" },
  { tag: "Point of View", title: "BBN: building the Business Branding Network", date: "Soon" },
  { tag: "Field Note", title: "Mobile-first creative, audited", date: "Soon" },
  { tag: "Research", title: "What clients actually buy when they buy strategy", date: "Soon" },
  { tag: "Point of View", title: "Mobilizing local talent at regional scale", date: "Soon" },
];

function Insights() {
  return (
    <PageTransition>
      <section className="relative px-6 pt-40 pb-16 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn><span className="text-xs uppercase tracking-[0.3em] opacity-60">Insights</span></FadeIn>
          <RevealHeading
            className="mt-6 max-w-[16ch] font-display text-4xl font-semibold leading-[1.05] md:text-7xl"
            highlight="thinking"
            delay={0.1}
          >
            Thinking, in the open.
          </RevealHeading>
          <FadeIn delay={0.6} className="mt-8 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">
            Short essays, field notes, and research from the work — published when it's useful, not when it's scheduled.
          </FadeIn>
        </div>
      </section>

      <section className="relative px-6 py-20 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--border)] md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <motion.a
                key={p.title}
                href="#"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col gap-6 bg-[color:var(--card)] p-8 transition-colors duration-500 hover:bg-[color:var(--secondary)]"
                data-cursor="Read"
              >
                <div className="relative h-32 overflow-hidden rounded-lg" style={{ background: `linear-gradient(${100 + i * 30}deg, #0A2E4D, #1B6CA8)` }}>
                  <div className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-60" style={{ background: "radial-gradient(circle at 30% 60%, #29B6E8, transparent 60%)", opacity: 0.4 }} />
                </div>
                <div>
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] opacity-60">
                    <span>{p.tag}</span><span>{p.date}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-medium leading-tight">
                    <span className="link-underline">{p.title}</span>
                  </h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
