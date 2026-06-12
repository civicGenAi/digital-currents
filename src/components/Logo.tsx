import { Link } from "@tanstack/react-router";
import logo from "../assets/logo.png";

export function Logo({ className = "", variant = "auto" }: { className?: string; variant?: "auto" | "light" | "dark" }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`} aria-label="East Africa Internet Group — Home">
      <img
        src={logo}
        alt="East Africa Internet Group"
        width={132}
        height={40}
        className="h-9 w-auto md:h-10"
        style={variant === "light" ? { filter: "brightness(0) invert(1)" } : undefined}
        decoding="async"
      />
    </Link>
  );
}
