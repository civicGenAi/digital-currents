import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import { RevealHeading, FadeIn } from "../components/RevealText";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — East Africa Internet Group" },
      { name: "description", content: "Moments from the studio and the field. A visual log from across the network." },
      { property: "og:title", content: "Gallery — East Africa Internet Group" },
      { property: "og:description", content: "Moments from the studio and the field. A visual log from across the network." },
      { property: "og:url", content: "https://eastafricainternetgroup.com/gallery" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://eastafricainternetgroup.com/android-chrome-512x512.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gallery — East Africa Internet Group" },
      { name: "twitter:description", content: "Moments from the studio and the field. A visual log from across the network." },
      { name: "twitter:image", content: "https://eastafricainternetgroup.com/android-chrome-512x512.png" },
    ],
  }),
  component: Gallery,
});

const items = [
  { h: 320, hue: 200 },{ h: 420, hue: 210 },{ h: 280, hue: 195 },
  { h: 380, hue: 220 },{ h: 340, hue: 205 },{ h: 460, hue: 198 },
  { h: 300, hue: 215 },{ h: 400, hue: 192 },{ h: 360, hue: 208 },
  { h: 330, hue: 200 },{ h: 410, hue: 218 },{ h: 290, hue: 196 },
];

function tile(i: number, hue: number) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: `linear-gradient(${130 + i * 18}deg, hsl(${hue}, 55%, 22%), hsl(${hue + 10}, 70%, 50%))` }}
    >
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at ${20 + (i * 11) % 60}% ${30 + (i * 7) % 50}%, hsl(${hue + 20}, 85%, 70%), transparent 55%)`, opacity: 0.6 }} />
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 200 200" preserveAspectRatio="none">
        {Array.from({ length: 6 }).map((_, k) => (
          <circle key={k} cx={20 + k * 30} cy={100 + Math.sin(k + i) * 40} r="2" fill="#F4FAFD" />
        ))}
        <path d={`M0 ${100 + i * 5} Q 100 ${40 + i * 8} 200 ${100 + Math.cos(i) * 30}`} stroke="#F4FAFD" strokeWidth="0.6" fill="none" />
      </svg>
    </div>
  );
}

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <PageTransition>
      <section className="relative px-6 pt-40 pb-16 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn><span className="text-xs uppercase tracking-[0.3em] opacity-60">Gallery</span></FadeIn>
          <RevealHeading
            className="mt-6 max-w-[16ch] font-display text-4xl font-semibold leading-[1.05] md:text-7xl"
            highlight="moments"
            delay={0.1}
          >
            Moments from the network.
          </RevealHeading>
          <FadeIn delay={0.6} className="mt-8 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">
            A visual log from the studio and the field across East Africa.
          </FadeIn>
        </div>
      </section>

      <section className="relative px-4 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1300px] columns-2 gap-2 md:columns-2 md:gap-4 lg:columns-3 xl:columns-4">
          {items.map((it, i) => (
            <motion.button
              key={i}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group mb-2 block w-full overflow-hidden rounded-xl md:mb-4"
              style={{ height: it.h }}
              data-cursor="View"
            >
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                {tile(i, it.hue)}
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            key="lb"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 p-6 backdrop-blur"
            onClick={() => setOpen(null)}
          >
            <motion.div
              drag="y" dragConstraints={{ top: 0, bottom: 0 }} onDragEnd={(_, info) => Math.abs(info.offset.y) > 100 && setOpen(null)}
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] w-full max-w-2xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {tile(open, items[open].hue)}
            </motion.div>
            <button className="absolute right-6 top-6 text-white" onClick={() => setOpen(null)} aria-label="Close">
              <X className="h-7 w-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
