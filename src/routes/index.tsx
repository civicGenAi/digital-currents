import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import { NetworkMesh } from "../components/NetworkMesh";
import { RevealHeading, FadeIn } from "../components/RevealText";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EAG — Building a connected, prosperous East Africa" },
      { name: "description", content: "East Africa Internet Group is a digital-centric marketing agency mobilizing local talent and global networks across the region." },
      { property: "og:title", content: "EAG — Building a connected, prosperous East Africa" },
      { property: "og:description", content: "Digital-centric marketing agency mobilizing local talent and global networks across East Africa." },
    ],
  }),
  component: Index,
});

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const countries = ["Tanzania", "Kenya", "Uganda", "Rwanda", "Burundi", "DR Congo", "South Sudan"];

  return (
    <PageTransition>
      {/* HERO */}
      <section ref={heroRef} className="relative isolate min-h-[100svh] overflow-hidden surface-dark">
        <NetworkMesh />
        <div className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl animate-[flow-drift_10s_ease-in-out_infinite]" style={{ background: "radial-gradient(circle, #29B6E8 0%, transparent 60%)" }} />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl animate-[flow-drift_14s_ease-in-out_infinite]" style={{ background: "radial-gradient(circle, #5FD0F5 0%, transparent 60%)" }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-center px-6 pb-24 pt-40 md:px-10">
          <FadeIn delay={0.1}>
            <span className="text-xs uppercase tracking-[0.3em] opacity-60">East Africa Internet Group</span>
          </FadeIn>
          <RevealHeading
            highlight="connected,"
            className="mt-6 max-w-[18ch] font-display font-semibold leading-[1.05]"
            delay={0.2}
          >
            Building a connected, prosperous East Africa.
          </RevealHeading>
          <FadeIn delay={0.9} className="mt-8 max-w-xl">
            <p className="text-base leading-relaxed opacity-75 md:text-lg">
              A digital-centric marketing agency mobilizing local talent and global networks across the region.
            </p>
          </FadeIn>
          <FadeIn delay={1.1} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              data-cursor="Talk"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-flow px-7 py-4 text-sm font-medium uppercase tracking-widest text-[color:var(--navy-ink)] transition-transform duration-500 hover:scale-[1.03]"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
            <Link to="/about" className="link-underline text-sm tracking-wide opacity-80" data-cursor="View">
              Our Story
            </Link>
          </FadeIn>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] opacity-60"
        >
          <span>Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* INTENT */}
      <section className="relative px-6 py-32 md:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <FadeIn>
            <span className="text-xs uppercase tracking-[0.3em] opacity-60">01 — Intent</span>
          </FadeIn>
          <div>
            <RevealHeading as="h2" className="font-display text-3xl font-medium leading-[1.15] md:text-5xl" highlight="science">
              Built on science and technology, made for the region.
            </RevealHeading>
            <FadeIn delay={0.3} className="mt-8 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">
              We leverage a global network, develop and mobilize local talent, and attract new investments — so the next decade of East African growth happens here, not somewhere else.
            </FadeIn>
            <FadeIn delay={0.5} className="mt-10">
              <Link to="/about" className="link-underline text-sm uppercase tracking-[0.25em]" data-cursor="Read">
                Read the full story
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SECTORS PREVIEW */}
      <section className="relative surface-deep overflow-hidden px-6 py-32 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] opacity-60">02 — Reach</span>
              <RevealHeading as="h2" className="mt-4 font-display text-3xl font-medium leading-[1.15] md:text-5xl" highlight="seven">
                Seven countries, one network.
              </RevealHeading>
            </div>
            <Link to="/sectors" className="link-underline text-sm uppercase tracking-[0.25em]" data-cursor="Explore">
              Explore reach →
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-3 lg:grid-cols-7">
            {countries.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex aspect-square flex-col items-center justify-center gap-3 surface-dark p-4 text-center transition-colors duration-500 hover:bg-[color:var(--ocean-deep)]"
              >
                <span className="h-2 w-2 rounded-full bg-[color:var(--cyan-flow)] animate-[node-pulse_2.5s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.2}s` }} />
                <span className="text-xs uppercase tracking-[0.15em] opacity-80">{c}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK PREVIEW */}
      <section className="relative px-6 py-32 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] opacity-60">03 — Work</span>
              <RevealHeading as="h2" className="mt-4 font-display text-3xl font-medium leading-[1.15] md:text-5xl" highlight="moves">
                Work that moves the region.
              </RevealHeading>
            </div>
            <Link to="/projects" className="link-underline text-sm uppercase tracking-[0.25em]" data-cursor="View">
              All projects →
            </Link>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-cyan-glow"
                data-cursor="Open"
              >
                <div className="relative h-48 overflow-hidden rounded-xl" style={{ background: "linear-gradient(135deg, #0F4C81, #29B6E8)" }}>
                  <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 30% 40%, #5FD0F5, transparent 60%)" }} />
                  <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 400 200" fill="none">
                    <circle cx={60 + i * 40} cy="100" r="3" fill="#5FD0F5" />
                    <circle cx={200} cy={60 + i * 20} r="3" fill="#5FD0F5" />
                    <circle cx={340} cy={140} r="3" fill="#5FD0F5" />
                    <path d={`M${60 + i * 40} 100 Q 130 ${40 + i * 10}, 200 ${60 + i * 20} T 340 140`} stroke="#5FD0F5" strokeWidth="0.8" fill="none" opacity="0.7" />
                  </svg>
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] opacity-60">Case study {i.toString().padStart(2, "0")}</p>
                    <h3 className="mt-2 font-display text-xl font-medium">Coming soon</h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-500 group-hover:rotate-45" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
