import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "../components/SectionHeader";
import { blogs, siteUrl } from "../data/portfolio";

export const metadata: Metadata = {
  title: "Blogs | Vadivel Portfolio",
  description:
    "Read practical blogs by Vadivel T on web development, AI workflows, prompt engineering, website testing, hosting, analytics, automation, and AI security.",
  alternates: {
    canonical: `${siteUrl}/blogs`,
  },
};

export default function BlogsPage() {
  const validBlogs = Array.isArray(blogs) ? blogs.filter(Boolean) : [];

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[var(--bg-soft)] text-[var(--text)]">
      <section className="section-space w-full overflow-x-hidden">
        <div className="container-inner w-full overflow-x-hidden">
          <SectionHeader
            eyebrow="Blogs"
            title="Writing and technical notes"
            desc="Topics I can write about from my web development, SEO, automation, and AI-assisted development experience."
          />

          {validBlogs.length === 0 ? (
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-6 text-center">
              <p className="text-sm font-medium text-[var(--muted)]">
                No blogs added yet.
              </p>
            </div>
          ) : (
            <div className="grid min-w-0 items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3">
              {validBlogs.map((blog: any, index: number) => (
                <article
                  key={blog.slug || `${blog.title}-${index}`}
                  className="card-premium flex h-full min-w-0 flex-col overflow-hidden rounded-[1.5rem] transition duration-500 hover:-translate-y-1 hover:border-[var(--accent)]"
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-44 w-full object-cover sm:h-52"
                  />

                  <div className="flex min-w-0 flex-1 flex-col p-5 md:p-6">
                    {blog.tag && (
                      <span className="mb-4 w-fit rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--accent)]">
                        {blog.tag}
                      </span>
                    )}

                    <h2 className="font-heading max-w-full break-words text-lg font-semibold leading-snug text-[var(--heading)] md:text-xl">
                      {blog.title}
                    </h2>

                    <p className="mt-4 max-w-full break-words text-sm font-medium leading-7 text-[var(--muted)]">
                      {blog.desc}
                    </p>

                    <div className="mt-6">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-sm font-semibold text-[var(--heading)] shadow-sm transition hover:gap-3 hover:border-[var(--accent)] hover:text-[var(--accent)] sm:w-fit"
                      >
                        <span>Read More</span>
                        <i className="fa-solid fa-arrow-right text-xs" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}