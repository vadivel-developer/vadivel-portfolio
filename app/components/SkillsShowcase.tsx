import { skills } from "../data/portfolio";
import { skillGroups } from "../data/skillGroups";
import Icon from "./Icon";
import { Reveal } from "./Motion";

const tints = ["var(--p-sky)", "var(--p-lilac)", "var(--p-mint)", "var(--p-peach)", "var(--p-lemon)", "var(--p-rose)"];

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const twice = [...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden">
      <div className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}>
        {twice.map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="mx-1.5 shrink-0 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-[13.5px] text-[var(--heading)] shadow-sm"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/** A skills marquee on top and one card per category below */
export default function SkillsShowcase() {
  const half = Math.ceil(skills.length / 2);

  return (
    <div>
      <Reveal className="space-y-3">
        <Row items={skills.slice(0, half)} />
        <Row items={skills.slice(half)} reverse />
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.key} delay={(i % 3) * 0.08} className="h-full">
            <div className="h-full rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl text-[var(--heading)]"
                  style={{ background: tints[i % tints.length] }}
                >
                  <Icon name={g.icon} />
                </span>
                <div>
                  <h3 className="text-[16px] font-semibold text-[var(--heading)]">{g.title}</h3>
                  <p className="text-[12.5px] text-[var(--muted)]">{g.items.length} skills</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-[var(--bg-soft)] px-2.5 py-1 text-[12.5px] text-[var(--heading)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
