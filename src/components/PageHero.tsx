import { motion } from "framer-motion";
import { FadeIn } from "./RevealText";
import { RotatingWord } from "./RotatingWord";

const ease = [0.16, 1, 0.3, 1] as const;

interface Props {
  eyebrow: string;
  prefix: string;          // e.g. "Built on"
  rotating: string[];      // e.g. ["science.", "craft.", "code."]
  suffix?: string;         // optional tail after the rotating word
  description: string;
  image: string;
  align?: "left" | "center";
}

export function PageHero({ eyebrow, prefix, rotating, suffix, description, image, align = "left" }: Props) {
  return (
    <section className="relative isolate overflow-hidden surface-dark">
      <img
        src={image}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[color:var(--navy-ink)]/70 via-[color:var(--navy-ink)]/55 to-[color:var(--navy-ink)]" />
      <div
        className="pointer-events-none absolute -right-32 top-20 h-[380px] w-[380px] rounded-full opacity-40 blur-3xl animate-[flow-drift_12s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, #29B6E8 0%, transparent 60%)" }}
      />

      <div className={`relative z-10 mx-auto max-w-[1300px] px-6 pb-28 pt-40 md:px-10 md:pb-36 md:pt-48 ${align === "center" ? "text-center" : ""}`}>
        <FadeIn>
          <span className="text-xs uppercase tracking-[0.35em] opacity-70">{eyebrow}</span>
        </FadeIn>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className={`mt-6 font-display text-4xl font-semibold leading-[1.05] md:text-7xl ${align === "center" ? "mx-auto max-w-[20ch]" : "max-w-[18ch]"}`}
        >
          {prefix}{" "}
          <RotatingWord words={rotating} interval={2400} />
          {suffix ? <> {suffix}</> : null}
        </motion.h1>
        <FadeIn delay={0.55} className={`mt-8 text-base leading-relaxed opacity-80 md:text-lg ${align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"}`}>
          {description}
        </FadeIn>
      </div>
    </section>
  );
}