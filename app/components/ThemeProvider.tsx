"use client";

import { ReactNode, useEffect, useState } from "react";

export type ThemeName = "light" | "dark" | "mint" | "sky" | "lavender" | "peach";

export const themeOptions: { label: string; value: ThemeName; color: string }[] = [
  { label: "Light", value: "light", color: "#087ea4" },
  { label: "Dark", value: "dark", color: "#22d3ee" },
  { label: "Mint", value: "mint", color: "#059669" },
  { label: "Sky", value: "sky", color: "#2563eb" },
  { label: "Lavender", value: "lavender", color: "#7c3aed" },
  { label: "Peach", value: "peach", color: "#ea580c" },
];

export default function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as ThemeName | null;
    const selectedTheme = savedTheme || "light";
    document.documentElement.setAttribute("data-theme", selectedTheme);
  }, []);

  return <>{children}</>;
}

export function ThemeIconSelector() {
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
        <i className="fa-solid fa-circle-half-stroke" />
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
        <i className="fa-solid fa-circle-half-stroke" />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 grid w-44 gap-1 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-xl">
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