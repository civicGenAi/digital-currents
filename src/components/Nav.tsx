import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/sectors", label: "Sectors" },
  { to: "/insights", label: "Insights" },
  { to: "/careers", label: "Careers" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > 80 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  // Routes that begin with a dark hero — keep nav light on top of them until scrolled.
  const darkHeroRoutes = ["/", "/contact"];
  const onDarkHero = darkHeroRoutes.includes(pathname) && !scrolled;

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.45, ease }}
        className={`fixed inset-x-0 top-0 z-[60] backdrop-blur-xl transition-colors duration-500 ${
          onDarkHero
            ? "bg-[color:var(--navy-ink)]/40 border-b border-white/10 text-[color:var(--mist)]"
            : "bg-[color:var(--background)]/80 border-b border-[color:var(--border)] text-[color:var(--foreground)]"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-10">
          <Logo variant={onDarkHero ? "light" : "auto"} />
          <nav className="hidden items-center gap-8 lg:flex">
            {links.slice(1).map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  data-cursor="Open"
                  className="link-underline text-sm tracking-wide"
                  style={{ opacity: active ? 1 : 0.7, color: active ? "var(--cyan-flow)" : undefined }}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <Link
            to="/contact"
            className="hidden rounded-full bg-gradient-flow px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-[color:var(--navy-ink)] transition-transform duration-500 hover:scale-[1.03] lg:inline-block"
            data-cursor="Talk"
          >
            Start a Project
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-black/40 backdrop-blur-xl"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-white hover:text-[color:var(--cyan-flow)] transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.05 }}
                >
                  <Link 
                    to={l.to} 
                    className="font-display text-4xl font-medium tracking-tight text-white transition-colors duration-300 hover:text-[color:var(--cyan-flow)] md:text-5xl" 
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex justify-center pb-10 text-[10px] uppercase tracking-widest text-white opacity-50">
               East Africa Internet Group
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
