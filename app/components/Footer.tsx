import Link from "next/link";
import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] px-5 py-10">
      <div className="container-inner flex flex-col items-center gap-5 text-center">
        <div className="flex items-center justify-center gap-8">
          <Link href={profile.github} target="_blank" rel="noreferrer" className="icon-link" aria-label="GitHub">
            <i className="fa-brands fa-github text-2xl" />
          </Link>

          <Link href={profile.linkedin} target="_blank" rel="noreferrer" className="icon-link" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin text-2xl" />
          </Link>

          <Link href={`mailto:${profile.email}`} className="icon-link" aria-label="Email">
            <i className="fa-solid fa-envelope text-2xl" />
          </Link>
        </div>

        <p className="text-sm font-medium text-[var(--muted)]">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
