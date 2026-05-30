"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { profile } from "../data/portfolio";
import { ThemeIconSelector } from "./ThemeProvider";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Education", href: "/education" },
  { label: "Skills", href: "/skills" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky left-0 top-0 z-40 w-full border-b border-[var(--border)] bg-white">
      <div className="container-inner flex items-center justify-between py-4">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight text-[var(--heading)]">
          Vadivel<span className="text-[var(--accent)]">.</span>T
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] font-semibold transition ${
                  active
                    ? "text-[var(--accent)]"
                    : "text-[var(--muted)] hover:text-[var(--accent)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeIconSelector />
          <Link
            href={`mailto:${profile.email}`}
            className="rounded-full bg-[var(--button)] px-5 py-2.5 text-sm font-semibold text-[var(--button-text)] transition hover:scale-[1.03]"
          >
            Hire Me
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-semibold text-[var(--heading)] lg:hidden"
        >
          <i className="fa-solid fa-bars" />
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--bg)] px-5 py-4 lg:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-base font-semibold text-[var(--muted)] hover:bg-[var(--bg-soft)]"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-2 flex items-center justify-between rounded-xl bg-[var(--bg-soft)] px-3 py-2">
              <span className="text-sm font-semibold text-[var(--muted)]">Theme</span>
              <ThemeIconSelector />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
