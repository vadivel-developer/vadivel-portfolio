"use client";

import { ReactNode, useEffect, useRef } from "react";

/** A vertical line that fills as you scroll through the list (timeline). Uses a CSS variable, no re-renders. */
export function ScrollLine({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.7 - r.top) / r.height));
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`} style={{ ["--p" as string]: 0 }}>
      <div className="absolute bottom-0 left-[6px] top-0 w-[2px] bg-[var(--border)]" />
      <div
        className="absolute left-[6px] top-0 h-full w-[2px] origin-top bg-gradient-to-b from-[var(--accent)] to-[var(--accent-2)]"
        style={{ transform: "scaleY(var(--p))" }}
      />
      {children}
    </div>
  );
}
