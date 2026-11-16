import { profile } from "../data/portfolio";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-[13px] text-[var(--muted)] md:flex-row md:px-10">
        <p>
          © {new Date().getFullYear()} {profile.name}. Designed &amp; built with Next.js.
        </p>
        <div className="flex items-center gap-1">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-10 w-10 items-center justify-center rounded-lg text-lg transition-colors hover:bg-[var(--bg-soft)] hover:text-[var(--heading)]">
            <Icon name="fa-brands fa-github" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-lg text-lg transition-colors hover:bg-[var(--bg-soft)] hover:text-[var(--heading)]">
            <Icon name="fa-brands fa-linkedin" />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="flex h-10 w-10 items-center justify-center rounded-lg text-lg transition-colors hover:bg-[var(--bg-soft)] hover:text-[var(--heading)]">
            <Icon name="fa-solid fa-envelope" />
          </a>
        </div>
      </div>
    </footer>
  );
}
