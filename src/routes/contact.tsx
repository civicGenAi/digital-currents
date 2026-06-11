import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import { NetworkMesh } from "../components/NetworkMesh";
import { RevealHeading, FadeIn } from "../components/RevealText";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — East Africa Internet Group" },
      { name: "description", content: "For project discussions and business partnerships. Reach the EAG team in Dar-es-Salaam and Dodoma." },
      { property: "og:title", content: "Contact — East Africa Internet Group" },
      { property: "og:description", content: "For project discussions and business partnerships. Reach the EAG team in Dar-es-Salaam and Dodoma." },
    ],
  }),
  component: Contact,
});

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.25em] opacity-60">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  return (
    <PageTransition>
      <section className="relative isolate min-h-[100svh] surface-dark overflow-hidden px-6 pt-40 pb-24 md:px-10">
        <NetworkMesh />
        <div className="relative z-10 mx-auto grid max-w-[1300px] gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <FadeIn><span className="text-xs uppercase tracking-[0.3em] opacity-60">Contact</span></FadeIn>
            <RevealHeading
              className="mt-6 max-w-[14ch] font-display text-4xl font-semibold leading-[1.05] md:text-7xl"
              highlight="build"
              delay={0.1}
            >
              Let's build something.
            </RevealHeading>
            <FadeIn delay={0.6} className="mt-8 max-w-md text-base leading-relaxed opacity-75 md:text-lg">
              For project discussions, business partnerships and more — for serious business people only.
            </FadeIn>

            <FadeIn delay={0.9} className="mt-14 grid gap-8 sm:grid-cols-2">
              <div>
                <h4 className="text-xs uppercase tracking-[0.25em] opacity-60">Dar-es-Salaam</h4>
                <p className="mt-3 text-sm leading-relaxed opacity-85">Zo Space, 8th Floor,<br/>Kinondoni, Dar-es-Salaam,<br/>Tanzania</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.25em] opacity-60">Dodoma</h4>
                <p className="mt-3 text-sm leading-relaxed opacity-85">Ilazo,<br/>Dodoma,<br/>Tanzania</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.25em] opacity-60">Call</h4>
                <p className="mt-3 text-sm leading-relaxed opacity-85">
                  <a href="tel:+255754407003" className="link-underline block">+255 754 407 003</a>
                  <a href="tel:+255759234234" className="link-underline mt-1 block">+255 759 234 234</a>
                </p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.25em] opacity-60">Write</h4>
                <p className="mt-3 text-sm leading-relaxed opacity-85">
                  <a href="mailto:info@eastafricainternetgroup.com" className="link-underline">info@eastafricainternetgroup.com</a>
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.div key="form" exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                    <h3 className="font-display text-2xl font-medium">Tell us what you're building</h3>
                    <div className="mt-8 space-y-5">
                      <Field label="Name">
                        <input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full border-b border-white/20 bg-transparent py-3 text-base outline-none transition-colors duration-300 focus:border-[color:var(--cyan-flow)]"
                          placeholder="Your name"
                        />
                      </Field>
                      <Field label="Email">
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full border-b border-white/20 bg-transparent py-3 text-base outline-none transition-colors duration-300 focus:border-[color:var(--cyan-flow)]"
                          placeholder="you@company.com"
                        />
                      </Field>
                      <Field label="Message">
                        <textarea
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full resize-none border-b border-white/20 bg-transparent py-3 text-base outline-none transition-colors duration-300 focus:border-[color:var(--cyan-flow)]"
                          placeholder="A few lines about the project"
                        />
                      </Field>
                      <button
                        type="button"
                        onClick={submit}
                        disabled={sending}
                        className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-flow px-7 py-4 text-sm font-medium uppercase tracking-widest text-[color:var(--navy-ink)] transition-transform duration-500 hover:scale-[1.02] disabled:opacity-60"
                        data-cursor="Send"
                      >
                        {sending ? "Sending…" : "Send Message"}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center py-10 text-center">
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-flow text-[color:var(--navy-ink)]"
                    >
                      <Check className="h-7 w-7" />
                    </motion.div>
                    <h3 className="mt-6 font-display text-2xl font-medium">Message received.</h3>
                    <p className="mt-3 max-w-xs text-sm opacity-70">Thanks — we'll be in touch within two working days.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
