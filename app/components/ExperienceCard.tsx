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
      {/* First Row: Role Left + Logo Right */}
      <div className="flex w-full items-center justify-between gap-4">
        <h3 className="min-w-0 flex-1 font-heading text-xl font-semibold leading-tight text-[var(--heading)] md:text-[24px]">
          {item.role}
        </h3>

        <div className="shrink-0">
          <div className="flex h-12 w-[92px] items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-white px-2 py-2 shadow-sm sm:h-14 sm:w-[120px] md:h-14 md:w-[150px]">
            {item.logo ? (
              <img
                src={item.logo}
                alt={`${item.company} logo`}
                className="max-h-7 w-full object-contain md:max-h-9"
              />
            ) : (
              <span className="text-xs font-semibold text-[var(--accent)] md:text-sm">
                {item.company.slice(0, 2)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Second Row: Period + Company Same Row */}
      <div className="mt-5 flex flex-nowrap items-center gap-2">
        <span className="inline-flex shrink-0 items-center rounded-full bg-[var(--accent-soft)] px-3 py-2 text-[11px] font-semibold leading-4 text-[var(--accent)] sm:px-4 sm:text-xs md:px-5 md:text-sm">
          {item.period}
        </span>

        <span className="inline-flex shrink-0 items-center rounded-full bg-[var(--accent-soft)] px-3 py-2 text-[11px] font-semibold leading-4 text-[var(--accent)] sm:px-4 sm:text-xs md:px-5 md:text-sm">
          {item.company}
          {item.location ? `, ${item.location}` : ""}
        </span>
      </div>

      <p className="mt-7 max-w-5xl text-sm font-medium leading-7 text-[var(--muted)] md:text-base">
        {item.desc}
      </p>

      {visibleBullets.length > 0 && (
        <ul className="mt-7 grid gap-5 text-sm font-medium leading-7 text-[var(--muted)] md:grid-cols-2 md:gap-x-10">
          {visibleBullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-3">
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