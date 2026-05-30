import SectionHeader from "../components/SectionHeader";
import { blogs } from "../data/portfolio";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-soft)] text-[var(--text)]">
      <section className="container-fluid section-space">
        <div className="container-inner">
          <SectionHeader
            eyebrow="Blog"
            title="Writing and technical notes"
            desc="Topics I can write about from my web development, SEO, automation and AI-assisted development experience."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {blogs.map((blog, index) => (
              <article key={blog.title} className={`reveal-up reveal-delay-${index} card-premium rounded-[1.5rem] p-6 transition hover:-translate-y-2 hover:border-[var(--accent)]`}>
                <span className="rounded-full bg-[var(--bg-soft)] px-3 py-1.5 text-xs font-bold text-[var(--accent)]">
                  {blog.tag}
                </span>
                <h2 className="mt-5 text-xl font-black text-[var(--text)]">{blog.title}</h2>
                <p className="mt-4 leading-7 text-[var(--muted)]">{blog.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
