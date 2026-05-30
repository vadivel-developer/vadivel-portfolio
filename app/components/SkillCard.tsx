export default function SkillCard({ skill }: { skill: string }) {
  return (
    <span className="rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-xs font-semibold text-[var(--muted)] shadow-sm transition hover:-translate-y-1 hover:border-[var(--accent)] hover:text-[var(--accent)] md:text-sm">
      {skill}
    </span>
  );
}
