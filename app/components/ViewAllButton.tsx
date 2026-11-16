import Link from "next/link";
import Icon from "./Icon";

/** Simple text link with an arrow */
export default function ViewAllButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-[15px] font-medium text-[var(--heading)] transition-colors hover:text-[var(--accent)]"
    >
      <span className="border-b border-[var(--heading)]/30 pb-0.5 transition-colors group-hover:border-[var(--accent)]">{label}</span>
      <Icon name="fa-solid fa-arrow-right" className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
