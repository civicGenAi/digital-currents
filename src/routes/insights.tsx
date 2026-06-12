import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition } from "../components/PageTransition";
import "../components/RevealText";
import { PageHero } from "../components/PageHero";
import heroInsights from "../assets/hero-insights.jpg";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — East Africa Internet Group" },
      { name: "description", content: "Field notes, research, and points of view on digital growth across East Africa." },
      { property: "og:title", content: "Insights — East Africa Internet Group" },
      { property: "og:description", content: "Field notes, research, and points of view on digital growth across East Africa." },
      { property: "og:url", content: "https://eastafricainternetgroup.com/insights" },
      { property: "og:image", content: "https://eastafricainternetgroup.com/android-chrome-512x512.png" },
    ],
    links: [{ rel: "canonical", href: "https://eastafricainternetgroup.com/insights" }],
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
      <PageHero
        eyebrow="Insights"
        prefix="Thinking,"
        rotating={["in the open.", "in motion.", "in public.", "in service.", "in long form."]}
        description="Short essays, field notes, and research from the work — published when it's useful, not when it's scheduled."
        image={heroInsights}
      />

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
