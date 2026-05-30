export default function ExperienceCard({
  item,
  index,
  showDetails = false,
  previewCount,
}: {
  item: {
    company: string;
    location?: string;
    role: string;
    period: string;
    desc: string;
    logo?: string;
    bullets?: string[];
  };
  index: number;
  showDetails?: boolean;
  previewCount?: number;
}) {
  if (!item) return null;

  const visibleBullets =
    showDetails && item.bullets
      ? previewCount
        ? item.bullets.slice(0, previewCount)
        : item.bullets
      : [];

  return (
    <div
      className={`reveal-up reveal-delay-${index} card-premium mx-auto w-full max-w-[1180px] rounded-[1.5rem] p-5 transition duration-500 hover:-translate-y-1 hover:border-[var(--accent)] md:p-7`}
    >
      <div className="flex w-full flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-xl font-semibold text-[var(--heading)] md:text-[24px]">
            {item.role}
          </h3>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="inline-flex w-fit items-center rounded-full bg-[var(--accent-soft)] px-5 py-2 text-xs font-semibold text-[var(--accent)] md:text-sm">
              {item.period}
            </span>

            <span className="inline-flex w-fit items-center rounded-full bg-[var(--accent-soft)] px-5 py-2 text-xs font-semibold text-[var(--accent)] md:text-sm">
              {item.company}
              {item.location ? `, ${item.location}` : ""}
            </span>
          </div>
        </div>

        <div className="flex w-full justify-start md:w-auto md:justify-end">
          <div className="flex h-12 w-[140px] items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-white px-3 py-2 shadow-sm md:h-14 md:w-[170px]">
            {item.logo ? (
              <img
                src={item.logo}
                alt={`${item.company} logo`}
                className="max-h-8 w-full object-contain md:max-h-10"
              />
            ) : (
              <span className="text-base font-semibold text-[var(--accent)]">
                {item.company.slice(0, 2)}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="mt-7 max-w-5xl text-sm font-medium leading-7 text-[var(--muted)] md:text-base">
        {item.desc}
      </p>

      {visibleBullets.length > 0 && (
        <ul className="mt-7 grid gap-5 text-sm font-medium leading-7 text-[var(--muted)] md:grid-cols-2 md:gap-x-10">
          {visibleBullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <span className="mt-[6px] flex h-4 w-4 shrink-0 items-center justify-center">
                <i className="fa-solid fa-circle-check text-[14px] leading-none text-[var(--accent)]" />
              </span>

              <span className="block flex-1 text-sm font-medium leading-7 text-[var(--muted)] md:text-base">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}