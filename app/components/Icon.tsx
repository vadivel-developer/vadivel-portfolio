import { ICONS } from "./iconData";

/**
 * Inline SVG icon. Accepts a Font Awesome style string such as "fa-solid fa-arrow-right"
 * (or just "arrow-right"). Sized with the surrounding font size (1em), coloured with currentColor.
 */
export default function Icon({ name, className = "" }: { name: string; className?: string }) {
  const tokens = name.split(/\s+/);
  const style = tokens.includes("fa-brands") ? "brands" : tokens.includes("fa-regular") ? "regular" : "solid";
  const base = tokens.filter((t) => !["fa-solid", "fa-brands", "fa-regular"].includes(t)).pop() ?? "";
  const key = `${style}:${base.replace(/^fa-/, "")}`;
  const data = ICONS[key] ?? ICONS[`solid:${base.replace(/^fa-/, "")}`];
  if (!data) return null;
  return (
    <svg
      viewBox={data.vb}
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={`inline-block shrink-0 align-[-0.125em] ${className}`}
    >
      <path d={data.d} />
    </svg>
  );
}
