import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const links = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/sectors", label: "Sectors" },
  { to: "/insights", label: "Insights" },
  { to: "/careers", label: "Careers" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="relative surface-dark overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
        <div
          className="h-full w-[200%] animate-[flow-drift_8s_ease-in-out_infinite]"
          style={{ background: "linear-gradient(90deg, transparent, #29B6E8, #5FD0F5, #29B6E8, transparent)" }}
        />
      </div>
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-md text-sm leading-relaxed opacity-70">
              The main objective is to build a strong, innovative East Africa backed by Science and Technology, leveraging our global network, developing and mobilizing local talent, and attracting new investments to East Africa.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] opacity-50">Navigate</h4>
            <ul className="mt-5 space-y-2 text-sm">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-underline opacity-80 hover:opacity-100">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] opacity-50">Reach</h4>
            <ul className="mt-5 space-y-2 text-sm opacity-80">
              <li>Zo Space, 8th Floor, Kinondoni, Dar-es-Salaam</li>
              <li>Ilazo, Dodoma, Tanzania</li>
              <li>+255 754 407 003</li>
              <li>+255 759 234 234</li>
              <li><a href="mailto:info@eastafricainternetgroup.com" className="link-underline">info@eastafricainternetgroup.com</a></li>
            </ul>
            <div className="mt-6 flex gap-3 text-xs opacity-60">
              <a href="#" className="link-underline">LinkedIn</a>
              <a href="#" className="link-underline">Instagram</a>
              <a href="#" className="link-underline">X</a>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 text-xs opacity-50 md:flex-row">
          <span>Copyright 2026 East Africa Internet Group. All rights reserved.</span>
          <span>Registered by the Tanzania Revenue Authority.</span>
        </div>
      </div>
    </footer>
  );
}
