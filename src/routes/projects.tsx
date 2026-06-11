import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import { RevealHeading, FadeIn } from "../components/RevealText";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — East Africa Internet Group" },
      { name: "description", content: "Work that moves the region. Selected case studies and campaigns from EAG." },
      { property: "og:title", content: "Projects — East Africa Internet Group" },
      { property: "og:description", content: "Work that moves the region. Selected case studies and campaigns from EAG." },
    ],
  }),
  component: Projects,
});

const projects = [
  { title: "Brand System for a Regional Bank", tag: "Brand · Digital", year: "2026" },
  { title: "BBN Network Launch Campaign", tag: "Campaign · Strategy", year: "2026" },
  { title: "Telecom Re-Platforming Story", tag: "Editorial · Film", year: "2025" },
  { title: "Cross-Border Market Entry", tag: "Research · GTM", year: "2025" },
  { title: "Civic Tech Movement", tag: "Brand · Product", year: "2025" },
  { title: "Agritech Series B Narrative", tag: "Narrative · Pitch", year: "2024" },
];

function Projects() {
  return (
    <PageTransition>
      <section className="relative px-6 pt-40 pb-16 md:px-10">
        <div className="mx-auto max-w-[1300px]">
          <FadeIn><span className="text-xs uppercase tracking-[0.3em] opacity-60">Selected Work</span></FadeIn>
          <RevealHeading
            className="mt-6 max-w-[18ch] font-display text-4xl font-semibold leading-[1.05] md:text-7xl"
            highlight="moves"
            delay={0.1}
          >
            Work that moves the region.
          </RevealHeading>
          <FadeIn delay={0.6} className="mt-8 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">
            A living portfolio. New case studies arrive as they ship — each one built around a single strategic question.
          </FadeIn>
        </div>
      </section>

      <section className="relative px-6 py-20 md:px-10">
        <div className="mx-auto max-w-[1300px]">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-cyan-glow"
                data-cursor="Open"
              >
                <div className="relative aspect-[4/3] overflow-hidden" style={{ background: `linear-gradient(${135 + i * 25}deg, #0A2E4D, #1B6CA8 60%, #29B6E8)` }}>
                  <div className="absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-80" style={{ background: "radial-gradient(circle at 70% 30%, #5FD0F5, transparent 55%)" }} />
                  <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 400 300" fill="none">
                    {Array.from({ length: 8 }).map((_, k) => (
                      <circle key={k} cx={50 + k * 45} cy={150 + Math.sin(k + i) * 60} r="2.5" fill="#F4FAFD" />
                    ))}
                    <path d={`M50 ${150 + Math.sin(i) * 60} Q 200 ${80 + i * 10} 380 ${150 + Math.cos(i) * 50}`} stroke="#F4FAFD" strokeWidth="0.8" fill="none" />
                  </svg>
                  <span className="absolute right-4 top-4 rounded-full bg-black/30 px-3 py-1 text-[10px] uppercase tracking-widest text-white backdrop-blur">{p.year}</span>
                </div>
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] opacity-60">{p.tag}</p>
                    <h3 className="mt-2 font-display text-lg font-medium leading-tight">{p.title}</h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-500 group-hover:rotate-45" />
                </div>
              </motion.article>
            ))}
          </div>

          <FadeIn delay={0.2} className="mt-20 flex flex-col items-start gap-6 rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-10 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-display text-2xl font-medium md:text-3xl">Have a brief in motion?</h3>
              <p className="mt-2 max-w-md text-sm opacity-70">We take on a small number of partners each quarter. Tell us what you're building.</p>
            </div>
            <Link to="/contact" className="rounded-full bg-gradient-flow px-6 py-3 text-xs font-medium uppercase tracking-widest text-[color:var(--navy-ink)] transition-transform duration-500 hover:scale-[1.03]" data-cursor="Talk">
              Start a Project
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
