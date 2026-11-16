import { Reveal } from "./Motion";

/** Section heading: small gradient label, title, one line of description */
export default function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className="mb-8 max-w-xl">
      <p className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
        <span className="h-[2px] w-6 rounded bg-[var(--accent)]" />
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--heading)] md:text-4xl">{title}</h2>
      <p className="mt-3 text-[15px] leading-7 text-[var(--muted)]">{desc}</p>
    </Reveal>
  );
}
