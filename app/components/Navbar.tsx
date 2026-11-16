"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "../data/portfolio";
import Icon from "./Icon";
import { ThemeIconSelector } from "./ThemeProvider";

const links = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Education", href: "/education" },
  { label: "Blogs", href: "/blogs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(3)})`;
      setScrolled(window.scrollY > 16);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? "border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label={`${profile.name} home`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--button)] text-[13px] font-semibold text-[var(--button-text)]">
            VT
          </span>
          <span className="hidden text-[15px] font-semibold text-[var(--heading)] sm:block">{profile.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-3.5 py-2 text-[14px] transition-colors ${
                  active ? "text-[var(--heading)]" : "text-[var(--muted)] hover:text-[var(--heading)]"
                }`}
              >
                {l.label}
                {active && <span className="absolute inset-x-3.5 -bottom-px h-[2px] rounded bg-[var(--accent)]" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ThemeIconSelector />
          </div>
          <Link
            href="/contact"
            className="hidden rounded-lg bg-[var(--button)] px-4 py-2.5 text-[14px] font-medium text-[var(--button-text)] transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Contact
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--heading)] lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <Icon name={open ? "fa-solid fa-xmark" : "fa-solid fa-bars"} />
          </button>
        </div>
      </div>

      <div
        ref={bar}
        className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-[var(--accent)]"
        style={{ transform: "scaleX(0)" }}
      />

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--bg)] lg:hidden">
          <div className="mx-auto max-w-6xl px-6 py-3 md:px-10">
            {[...links, { label: "Contact", href: "/contact" }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block border-b border-[var(--border)] py-3 text-[15px] last:border-b-0 ${
                  pathname === l.href ? "text-[var(--heading)]" : "text-[var(--muted)]"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-[var(--muted)]">Theme</span>
              <ThemeIconSelector />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
