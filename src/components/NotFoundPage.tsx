import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import hero404 from "../assets/hero-404.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

export function NotFoundPage() {
  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[color:var(--navy-ink)] text-[color:var(--mist)]">
      {/* background image */}
      <img
        src={hero404}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[color:var(--navy-ink)]/60 via-[color:var(--navy-ink)]/40 to-[color:var(--navy-ink)]" />
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #29B6E8 0%, transparent 60%)" }}
      />

      {/* minimal top bar — no nav, just the wordmark */}
      <header className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-6 md:px-10">
        <Link to="/" className="text-xs uppercase tracking-[0.3em] opacity-70 hover:opacity-100">
          ← East Africa Internet Group
        </Link>
        <span className="text-xs uppercase tracking-[0.3em] opacity-50">Error / 404</span>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-1 flex-col justify-center px-6 py-20 md:px-10">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="text-xs uppercase tracking-[0.35em] opacity-70"
        >
          The signal broke.
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="mt-6 font-display text-[22vw] font-semibold leading-[0.85] tracking-tight md:text-[14rem]"
        >
          4
          <span className="text-gradient-flow">0</span>
          4
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="mt-8 max-w-xl text-base leading-relaxed opacity-75 md:text-lg"
        >
          The page you're looking for has drifted off the network. The link may be old, the URL mistyped, or the work simply moved. Let's get you back on the flow.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-flow px-7 py-4 text-sm font-medium uppercase tracking-widest text-[color:var(--navy-ink)] transition-transform duration-500 hover:scale-[1.03]"
          >
            <ArrowLeft className="h-4 w-4" />
            Return Home
          </Link>
          <Link to="/contact" className="link-underline text-sm uppercase tracking-[0.25em] opacity-80">
            Tell us what you needed <ArrowUpRight className="ml-1 inline h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-20 grid max-w-2xl grid-cols-2 gap-x-10 gap-y-3 text-sm opacity-80 md:grid-cols-4"
        >
          {[
            { to: "/about", label: "About" },
            { to: "/projects", label: "Projects" },
            { to: "/sectors", label: "Sectors" },
            { to: "/insights", label: "Insights" },
          ].map((l) => (
            <Link key={l.to} to={l.to} className="link-underline">
              {l.label}
            </Link>
          ))}
        </motion.div>
      </main>
    </div>
  );
}