import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const touch = window.matchMedia("(hover: none)").matches;
    if (touch) return;
    setHidden(false);
    document.documentElement.classList.add("cursor-hidden");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
    };
    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest("[data-cursor]");
      if (t) {
        const l = t.getAttribute("data-cursor") || "";
        setLabel(l);
        ringRef.current?.classList.add("is-active");
      } else {
        setLabel("");
        ringRef.current?.classList.remove("is-active");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, []);

  if (hidden) return null;
  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full"
        style={{ background: "var(--cyan-flow)", mixBlendMode: "exclusion" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[99] flex h-9 w-9 items-center justify-center rounded-full border text-[10px] font-medium uppercase tracking-widest transition-[width,height,background-color] duration-300 [&.is-active]:h-16 [&.is-active]:w-16 [&.is-active]:bg-[color:var(--cyan-flow)]/15"
        style={{ borderColor: "rgba(41,182,232,0.6)", color: "var(--cyan-flow)" }}
      >
        {label}
      </div>
    </>
  );
}
