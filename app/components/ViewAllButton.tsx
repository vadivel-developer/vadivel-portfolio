import Link from "next/link";

export default function ViewAllButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-3 rounded-full border border-[var(--border)] bg-[var(--card)] px-7 py-3 text-sm font-semibold text-[var(--heading)] shadow-sm transition hover:-translate-y-1 hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      {label}
      <i className="fa-solid fa-chevron-down text-xs" />
    </Link>
  );
}
