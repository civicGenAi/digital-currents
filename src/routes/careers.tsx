import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { PageTransition } from "../components/PageTransition";
import { NetworkMesh } from "../components/NetworkMesh";
import { RevealHeading, FadeIn } from "../components/RevealText";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — East Africa Internet Group" },
      { name: "description", content: "Grow with the network. Open roles and rolling applications across East Africa." },
      { property: "og:title", content: "Careers — East Africa Internet Group" },
      { property: "og:description", content: "Grow with the network. Open roles and rolling applications across East Africa." },
    ],
  }),
  component: Careers,
});

const roles = [
  { title: "Senior Creative Strategist", loc: "Dar-es-Salaam", type: "Full-time", body: "Lead end-to-end creative strategy across regional accounts. Five years of agency or in-house brand experience." },
  { title: "Digital Producer", loc: "Nairobi", type: "Full-time", body: "Own production for digital campaigns: timelines, vendors, deliverables. Calm under deadline." },
  { title: "Market Research Lead", loc: "Dodoma", type: "Full-time", body: "Design and run primary research that feeds creative and strategy. Quant and qual fluency." },
  { title: "Junior Designer", loc: "Remote — East Africa", type: "Full-time", body: "Strong type and layout instincts. Portfolio over CV." },
  { title: "Rolling — Freelance Network", loc: "East Africa", type: "Freelance", body: "Writers, editors, motion designers, devs. We hire from the network first." },
];

function Careers() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <PageTransition>
      <section className="relative isolate min-h-[80svh] surface-dark overflow-hidden px-6 pt-40 pb-24 md:px-10">
        <NetworkMesh />
        <div className="relative z-10 mx-auto max-w-[1200px]">
          <FadeIn><span className="text-xs uppercase tracking-[0.3em] opacity-60">Careers</span></FadeIn>
          <RevealHeading
            className="mt-6 max-w-[14ch] font-display text-4xl font-semibold leading-[1.05] md:text-7xl"
            highlight="grow"
            delay={0.1}
          >
            Grow with the network.
          </RevealHeading>
          <FadeIn delay={0.6} className="mt-8 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">
            We develop and mobilize local talent — across seven countries and growing. If the work matters to you, the door is open.
          </FadeIn>
          <FadeIn delay={0.9} className="mt-10">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-flow px-7 py-4 text-sm font-medium uppercase tracking-widest text-[color:var(--navy-ink)] transition-transform duration-500 hover:scale-[1.03]" data-cursor="Apply">
              Join the Network
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="relative px-6 py-24 md:px-10">
        <div className="mx-auto max-w-[1100px]">
          <FadeIn>
            <h2 className="font-display text-2xl font-medium md:text-3xl">Open roles</h2>
          </FadeIn>
          <ul className="mt-12 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
            {roles.map((r, i) => {
              const isOpen = open === i;
              return (
                <li key={r.title}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                    data-cursor={isOpen ? "Close" : "Open"}
                  >
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-1 sm:gap-8">
                      <span className="font-display text-lg font-medium md:text-2xl">{r.title}</span>
                      <span className="hidden text-xs uppercase tracking-[0.2em] opacity-60 sm:inline">{r.loc}</span>
                      <span className="hidden text-xs uppercase tracking-[0.2em] opacity-60 sm:inline">{r.type}</span>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="shrink-0">
                      <Plus className="h-5 w-5" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 sm:max-w-2xl">
                          <p className="text-sm leading-relaxed opacity-80">{r.body}</p>
                          <Link to="/contact" className="link-underline mt-5 inline-block text-xs uppercase tracking-[0.25em]">
                            Apply via contact →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </PageTransition>
  );
}
