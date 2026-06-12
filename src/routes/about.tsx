import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition } from "../components/PageTransition";
import { RevealHeading, FadeIn } from "../components/RevealText";
import { PageHero } from "../components/PageHero";
import heroAbout from "../assets/hero-about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — East Africa Internet Group" },
      { name: "description", content: "Built on science and technology. Mobilizing local talent and global networks across East Africa." },
      { property: "og:title", content: "About — East Africa Internet Group" },
      { property: "og:description", content: "Built on science and technology. Mobilizing local talent and global networks across East Africa." },
      { property: "og:url", content: "https://eastafricainternetgroup.com/about" },
      { property: "og:image", content: "https://eastafricainternetgroup.com/android-chrome-512x512.png" },
    ],
    links: [{ rel: "canonical", href: "https://eastafricainternetgroup.com/about" }],
  }),
  component: About,
});

const values = [
  { k: "Innovation", d: "We move where the work is going, not where it has been." },
  { k: "Integrity", d: "Plain dealing with clients, partners, and the region." },
  { k: "Inclusivity", d: "Local talent, global standards, shared upside." },
  { k: "Customer-Centricity", d: "The brief belongs to the client. We make it work." },
  { k: "Empowerment", d: "Skills, tools, and ownership — passed on." },
  { k: "Sustainability", d: "Built to last beyond the next campaign cycle." },
];

function About() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="About EAG"
        prefix="Built on"
        rotating={["science.", "technology.", "craft.", "trust.", "the region."]}
        description="A digital-centric marketing agency with deep experience across social media and every aspect of modern marketing — anchored in Tanzania, operating across East Africa."
        image={heroAbout}
      />

      <section className="relative px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <p className="text-lg leading-relaxed opacity-85">
              The main objective is to build a strong, innovative East Africa backed by Science and Technology. Towards this goal, we are leveraging our global network, developing and mobilizing local talents, and attracting new investments to East Africa countries.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-lg leading-relaxed opacity-85">
              The East Africa Internet Group is a digital-centric marketing agency with deep experience in all social media and aspects of marketing. Our in-house market research capabilities enable us to advise and guide our clients to achieve success more effectively than trial-and-error methods.
            </p>
            <p className="mt-6 text-sm opacity-55">
              East Africa Internet Group is registered by the Tanzania Revenue Authority.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="relative surface-dark px-6 py-32 md:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 md:grid-cols-2">
          {[
            { tag: "Vision", title: "Lead East Africa's digital transformation.", body: "A connected and prosperous future, built and owned in the region." },
            { tag: "Mission", title: "Become a top creative and internet marketing agency in Africa.", body: "Targeting more than 20 countries, starting with seven in East Africa — Tanzania, Kenya, Uganda, Rwanda, Burundi, DR Congo and South Sudan — with a focus on BBN, the Business Branding Network." },
          ].map((p) => (
            <motion.div
              key={p.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="surface-dark p-10 md:p-14"
            >
              <span className="text-xs uppercase tracking-[0.3em] opacity-60">{p.tag}</span>
              <h3 className="mt-5 font-display text-2xl font-medium leading-tight md:text-3xl">{p.title}</h3>
              <p className="mt-5 text-base leading-relaxed opacity-75">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative px-6 py-32 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <RevealHeading as="h2" className="max-w-[14ch] font-display text-3xl font-medium leading-[1.1] md:text-5xl" highlight="values">
            Six values, one network.
          </RevealHeading>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--border)] md:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-[color:var(--card)] p-8 transition-colors duration-500 hover:bg-[color:var(--secondary)]"
              >
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--cyan-flow)] animate-[node-pulse_2.5s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.15}s` }} />
                  <h4 className="font-display text-xl font-medium">{v.k}</h4>
                </div>
                <p className="mt-4 text-sm leading-relaxed opacity-70">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
