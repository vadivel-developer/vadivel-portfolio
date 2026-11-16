import Image from "next/image";
import Link from "next/link";
import { profile, skills } from "../data/portfolio";
import Icon from "./Icon";
import { Counter, Parallax } from "./Motion";

const stats = [
  { n: 5, d: 0, s: "+", l: "Years of experience" },
  { n: 50, d: 0, s: "+", l: "WordPress websites" },
  { n: Math.floor(skills.length / 10) * 10, d: 0, s: "+", l: "Tools and skills" },
];

const chips = [
  { icon: "fa-brands fa-wordpress", label: "WordPress", pos: "-left-4 top-8 md:-left-10", delay: "0s" },
  { icon: "fa-brands fa-hubspot", label: "HubSpot", pos: "-right-3 top-1/3 md:-right-8", delay: "0.8s" },
  { icon: "fa-brands fa-react", label: "Next.js", pos: "-left-2 bottom-10 md:-left-8", delay: "1.6s" },
];

export default function Hero() {
  return (
    <section id="home" className="hero-bg relative overflow-hidden pb-10 pt-24 md:pb-12 md:pt-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3.5 py-1.5 text-[13px] text-[var(--muted)] shadow-sm">
              <span className="pulse-dot" /> Available for new projects · {profile.location}
            </p>

            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-[var(--heading)] md:text-7xl">
              Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
            </h1>
            <p className="mt-4 text-xl font-medium text-[var(--heading)]/80 md:text-2xl">
              Web developer building fast sites with Next.js, WordPress and HubSpot.
            </p>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)] md:text-lg">
              5+ years of experience building responsive, high-performance websites and web apps, with a focus on clean code, SEO and user experience. I also build MCP servers and AI-assisted development workflows.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--button)] px-6 py-3.5 text-[15px] font-medium text-[var(--button-text)] shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5"
              >
                View projects <Icon name="fa-solid fa-arrow-right" className="text-xs" />
              </Link>
              <a
                href="/pdf/vadivel-resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--heading)]/20 bg-[var(--card)] px-6 py-3.5 text-[15px] font-medium text-[var(--heading)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <Icon name="fa-solid fa-download" className="text-xs" /> Resume
              </a>
              <div className="ml-1 flex gap-1">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-xl text-[var(--muted)] transition-colors hover:bg-[var(--card)] hover:text-[var(--heading)]"
                >
                  <Icon name="fa-brands fa-github" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-xl text-[var(--muted)] transition-colors hover:bg-[var(--card)] hover:text-[var(--heading)]"
                >
                  <Icon name="fa-brands fa-linkedin" />
                </a>
              </div>
            </div>
          </div>

          <Parallax speed={0.07} className="relative mx-auto w-full max-w-[340px]">
            <div className="relative aspect-square w-full">
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2.5rem] bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] opacity-90" />
              <Image
                src="/images/vadivel-web-developer.jpg"
                alt={profile.name}
                width={340}
                height={340}
                priority
                sizes="(min-width: 1024px) 340px, 300px"
                className="relative h-full w-full rounded-[2.5rem] border-4 border-[var(--card)] object-cover object-top"
              />
              {chips.map((c) => (
                <span
                  key={c.label}
                  className={`animate-float absolute hidden items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 py-2 text-[13px] font-medium text-[var(--heading)] shadow-lg sm:inline-flex ${c.pos}`}
                  style={{ animationDelay: c.delay }}
                >
                  <Icon name={c.icon} className="text-[var(--accent)]" /> {c.label}
                </span>
              ))}
            </div>
          </Parallax>
        </div>

        <dl className="mt-10 grid grid-cols-3 gap-3 md:mt-12 md:gap-5">
          {stats.map((x) => (
            <div
              key={x.l}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-5 shadow-sm md:px-7 md:py-6"
            >
              <dt className="text-3xl font-bold tracking-tight md:text-5xl">
                <span className="text-gradient">
                  <Counter to={x.n} suffix={x.s} decimals={x.d} />
                </span>
              </dt>
              <dd className="mt-1 text-[12px] text-[var(--muted)] md:text-sm">{x.l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
