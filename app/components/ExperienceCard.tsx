import Image from "next/image";
import Icon from "./Icon";
import { Reveal } from "./Motion";

/** One role on the timeline: dot, period, role, company logo and highlights */
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
  const bullets = showDetails && item.bullets ? (previewCount ? item.bullets.slice(0, previewCount) : item.bullets) : [];
  const current = /present/i.test(item.period);

  return (
    <Reveal delay={index * 0.05} className="relative pl-9">
      <span
        className={`absolute left-0 top-7 h-[14px] w-[14px] rounded-full border-2 border-[var(--accent)] ${
          current ? "bg-[var(--accent)] shadow-[0_0_0_5px_var(--accent-soft)]" : "bg-[var(--bg)]"
        }`}
      />

      <article className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition-shadow hover:shadow-lg md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--accent-soft)] px-3.5 py-1 text-[12px] font-medium text-[var(--accent)]">
                {item.period}
              </span>
              {current && (
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--p-mint)] px-3 py-1 text-[12px] text-[var(--heading)]">
                  <span className="pulse-dot" /> Current
                </span>
              )}
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--heading)]">{item.role}</h3>
            <p className="mt-1 text-[14px] text-[var(--muted)]">
              {item.company}
              {item.location ? ` · ${item.location}` : ""}
            </p>
          </div>
          {item.logo && (
            <Image
              src={item.logo}
              alt={`${item.company} logo`}
              width={176}
              height={48}
              className="h-10 w-auto max-w-[9rem] rounded-lg border border-[var(--border)] bg-white object-contain p-1.5 md:h-12 md:max-w-[11rem]"
            />
          )}
        </div>

        <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">{item.desc}</p>

        {bullets.length > 0 && (
          <ul className="mt-5 grid gap-3">
            {bullets.map((b) => (
              <li key={b} className="flex gap-3 text-[14.5px] leading-7 text-[var(--text)]">
                <Icon name="fa-solid fa-circle-check" className="mt-1.5 text-[13px] text-[var(--accent)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </Reveal>
  );
}
