"use client";

import { ReactNode, useEffect, useState } from "react";
import Icon from "./Icon";

export type ThemeName = "light" | "dark" | "mint" | "sky" | "lavender" | "peach";

export const themeOptions: { label: string; value: ThemeName; color: string }[] = [
  { label: "Airy", value: "light", color: "#7c6ee6" },
  { label: "Dark", value: "dark", color: "#22d3ee" },
  { label: "Mint", value: "mint", color: "#3f9d78" },
  { label: "Sky", value: "sky", color: "#4a8bd0" },
  { label: "Lilac", value: "lavender", color: "#8461d6" },
  { label: "Peach", value: "peach", color: "#e0764f" },
];

export default function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as ThemeName | null;
    const selectedTheme = savedTheme || "light";
    document.documentElement.setAttribute("data-theme", selectedTheme);
  }, []);

  return <>{children}</>;
}

export function ThemeIconSelector({ up = false }: { up?: boolean }) {
  const [theme, setTheme] = useState<ThemeName>("light");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as ThemeName | null;
    const selectedTheme = savedTheme || "light";

    setTheme(selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
    setMounted(true);
  }, []);

  function handleThemeChange(value: ThemeName) {
    setTheme(value);
    setOpen(false);
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem("portfolio-theme", value);
  }

  if (!mounted) {
    return (
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--accent)] shadow-sm"
        suppressHydrationWarning
      >
        <Icon name="fa-solid fa-circle-half-stroke" />
      </div>
    );
  }

  return (
    <div className="relative" suppressHydrationWarning>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--accent)] shadow-sm transition hover:scale-105"
        aria-label="Change color theme"
        suppressHydrationWarning
      >
        <Icon name="fa-solid fa-circle-half-stroke" />
      </button>

      {open && (
        <div className={`absolute right-0 z-50 ${up ? "bottom-12" : "top-12"} grid w-44 gap-1 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-xl`}>
          {themeOptions.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => handleThemeChange(item.value)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold transition hover:bg-[var(--bg-soft)] ${
                theme === item.value
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)]"
              }`}
              suppressHydrationWarning
            >
              <span
                className="h-3.5 w-3.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}