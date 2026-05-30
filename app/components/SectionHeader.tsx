export default function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center reveal-up">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">
        {eyebrow}
      </p>

      <h2 className="font-heading text-3xl font-semibold tracking-[-0.035em] text-[var(--heading)] md:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-sm font-medium leading-7 text-[var(--muted)] md:text-base">
        {desc}
      </p>
    </div>
  );
}
