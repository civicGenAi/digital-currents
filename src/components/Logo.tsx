import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`} aria-label="East Africa Internet Group">
      <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden>
        <defs>
          <linearGradient id="logoFlow" x1="0" y1="0" x2="36" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#1B6CA8" />
            <stop offset="1" stopColor="#29B6E8" />
          </linearGradient>
        </defs>
        <rect x="0.5" y="4" width="16" height="16" rx="4" stroke="url(#logoFlow)" strokeWidth="1.5" />
        <path d="M16 12 C 22 12, 22 16, 26 16" stroke="url(#logoFlow)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M27 8 C 31 12, 35 14, 31 22 C 27 26, 23 22, 27 8 Z" fill="url(#logoFlow)" />
      </svg>
      <span className="font-display text-sm font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
        EAG
      </span>
    </Link>
  );
}
