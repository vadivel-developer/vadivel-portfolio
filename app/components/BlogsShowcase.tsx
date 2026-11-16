import Link from "next/link";
import Icon from "./Icon";
import { Reveal } from "./Motion";

type B = { title: string; slug: string; tag?: string; image?: string; desc: string };

const tints = ["var(--p-sky)", "var(--p-lilac)", "var(--p-mint)", "var(--p-peach)", "var(--p-lemon)", "var(--p-rose)"];

/** Two-column article cards: tag, title, summary, read link */
export default function BlogsList({ blogs, limit }: { blogs: B[]; limit?: number }) {
  const list = (limit ? blogs.slice(0, limit) : blogs).filter(Boolean);

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {list.map((b, i) => (
        <Reveal key={b.slug} delay={(i % 2) * 0.08} className="h-full">
          <Link
            href={`/blogs/${b.slug}`}
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              style={{ background: tints[i % tints.length] }}
            />
            <div className="flex items-center justify-between">
              {b.tag ? (
                <span className="rounded-full px-3.5 py-1 text-[12px] font-medium text-[var(--heading)]" style={{ background: tints[i % tints.length] }}>
                  {b.tag}
                </span>
              ) : (
                <span />
              )}
              <span className="text-3xl font-bold text-[var(--heading)]/10">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight text-[var(--heading)]">{b.title}</h3>
            <p className="mt-2 line-clamp-3 flex-1 text-[14.5px] leading-7 text-[var(--muted)]">{b.desc}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-[var(--heading)] transition-colors group-hover:text-[var(--accent)]">
              Read article
              <Icon name="fa-solid fa-arrow-right" className="text-xs transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
