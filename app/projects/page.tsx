import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "../components/SectionHeader";
import { projects, siteUrl } from "../data/portfolio";

export const metadata: Metadata = {
  title: "Projects | Vadivel Portfolio",
  description:
    "Explore WordPress, AI workflow, automation, testing, SEO, hosting, and web development projects by Vadivel T.",
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
};

export default function ProjectsPage() {
  const validProjects = Array.isArray(projects) ? projects.filter(Boolean) : [];

  return (
    <main className="min-h-screen bg-[var(--bg-soft)] text-[var(--text)]">
      <section className="section-space">
        <div className="container-inner">
          <SectionHeader
            eyebrow="Projects"
            title="Selected project work"
            desc="A practical collection of WordPress, automation, AI workflow, testing, SEO, hosting, and web development projects."
          />

          {validProjects.length === 0 ? (
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-6 text-center">
              <p className="text-sm font-medium text-[var(--muted)]">
                No projects added yet.
              </p>
            </div>
          ) : (
            <div className="grid items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3">
              {validProjects.map((project: any, index: number) => {
                const displayTags =
                  Array.isArray(project.tags) && project.tags.length > 0
                    ? project.tags
                    : Array.isArray(project.technologies) &&
                        project.technologies.length > 0
                      ? project.technologies.slice(0, 4)
                      : project.tag
                        ? [project.tag]
                        : [];

                return (
                  <article
                    key={project.slug || `${project.title}-${index}`}
                    className={`reveal-up reveal-delay-${index} card-premium flex h-full flex-col overflow-hidden rounded-[1.5rem] transition duration-500 hover:-translate-y-1 hover:border-[var(--accent)]`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-52 w-full shrink-0 object-cover"
                    />

                    <div className="flex flex-1 flex-col p-6">
                      {displayTags.length > 0 && (
                       <div className="mb-5 flex flex-wrap content-start gap-2">
                          {displayTags.map((tag: string) => (
                            <span
                              key={tag}
                              className="h-fit rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--accent)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <h2 className="font-heading text-xl font-semibold leading-tight text-[var(--heading)]">
                        {project.title}
                      </h2>

                      <p className="mt-5 text-sm font-medium leading-8 text-[var(--muted)]">
                        {project.desc}
                      </p>

                      <div className="mt-auto pt-6">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex min-h-[44px] w-fit items-center justify-center gap-2 rounded-full bg-[#087ea4] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:gap-3 hover:bg-[#066b8d]"
                        >
                          <span>Read More</span>
                          <i className="fa-solid fa-arrow-right text-xs" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}