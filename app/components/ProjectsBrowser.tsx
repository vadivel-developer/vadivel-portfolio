import Link from "next/link";
import Icon from "./Icon";
import { Reveal } from "./Motion";

type P = {
  title: string;
  slug: string;
  tag?: string;
  tags?: string[];
  technologies?: string[];
  desc: string;
  outcome?: string;
  [key: string]: unknown;
};

const tints = ["var(--p-sky)", "var(--p-lilac)", "var(--p-mint)", "var(--p-peach)", "var(--p-lemon)", "var(--p-rose)"];

/** Project index: big titles in a card. Hovering a row highlights it and dims the rest (CSS only). */
export default function ProjectsIndex({ projects, limit }: { projects: P[]; limit?: number }) {
  const list = (limit ? projects.slice(0, limit) : projects).filter(Boolean);

  return (
    <Reveal>
      <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
        <div className="hidden grid-cols-[64px_1fr_210px_52px] items-center gap-6 border-b border-[var(--border)] bg-[var(--bg-soft)] px-6 py-3 text-[11.5px] font-medium uppercase tracking-[0.16em] text-[var(--muted)] md:grid">
          <span>No.</span>
          <span>Project</span>
          <span>Type</span>
          <span />
        </div>

        <ul className="group/list">
          {list.map((p, i) => {
            const t = p.technologies?.length ? p.technologies : p.tags ?? [];
            return (
              <li
                key={p.slug}
                className="border-b border-[var(--border)] transition-opacity duration-300 last:border-b-0 group-hover/list:opacity-45 hover:!opacity-100"
              >
                <Link
                  href={`/projects/${p.slug}`}
                  className="group relative isolate grid grid-cols-[40px_1fr_44px] items-center gap-4 px-5 py-6 md:grid-cols-[64px_1fr_210px_52px] md:gap-6 md:px-6 md:py-7"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                    style={{ background: tints[i % tints.length] }}
                  />
                  <span className="text-lg font-bold text-[var(--heading)]/25 transition-colors group-hover:text-[var(--heading)] md:text-2xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold leading-tight tracking-tight text-[var(--heading)] transition-transform duration-500 group-hover:translate-x-1.5 md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-[var(--muted)] md:hidden">{p.desc}</p>
                    <p className="mt-2 hidden text-[13px] text-[var(--muted)] md:block">{t.slice(0, 4).join("  ·  ")}</p>
                  </div>

                  <span className="hidden w-fit rounded-full border border-[var(--heading)]/20 px-3.5 py-1.5 text-[12px] text-[var(--heading)] md:inline-block">
                    {p.tag ?? "Project"}
                  </span>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--heading)]/20 text-[var(--heading)] transition-all duration-500 group-hover:-rotate-45 group-hover:border-transparent group-hover:bg-[var(--button)] group-hover:text-[var(--button-text)]">
                    <Icon name="fa-solid fa-arrow-right" className="text-xs" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Reveal>
  );
}
