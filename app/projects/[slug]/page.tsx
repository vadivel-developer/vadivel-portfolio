import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, siteUrl } from "../../data/portfolio";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ProjectSection = {
  heading: string;
  paragraphs: string[];
  technologies?: string[];
  siteUrl?: string;
  siteUrls?: (
    | string
    | {
        label?: string;
        url: string;
      }
  )[];
  bulletTitle?: string;
  bullets?: string[];
  groups?: {
    title: string;
    items: string[];
  }[];
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Vadivel Portfolio",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} | Vadivel Portfolio`,
    description: project.desc,
    alternates: {
      canonical: `${siteUrl}/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[currentIndex];

  if (!project) {
    notFound();
  }

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;

  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null;

  const sections: ProjectSection[] = Array.isArray((project as any).sections)
    ? (project as any).sections
    : [];

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <article className="section-space">
        <div className="container-inner max-w-[1180px]">
          <div className="overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] shadow-sm">
            <div className="relative h-[340px] w-full overflow-hidden md:h-[300px]">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />

              <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
                <div className="max-w-4xl">
                  <span className="inline-flex rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[var(--accent)] shadow-sm backdrop-blur md:text-sm">
                    {project.tag}
                  </span>

                  <h1 className="font-heading mt-5 text-3xl font-semibold leading-tight tracking-[-0.035em] text-white md:text-4xl">
                    {project.title}
                  </h1>

                  <p className="mx-auto mt-5 max-w-3xl text-sm font-medium leading-7 text-white/85 md:text-base">
                    {project.desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {sections.length > 0 && (
                <div className="grid gap-10">
                  {sections.map((section, index) => (
                    <section
                      key={`${section.heading}-${index}`}
                      className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm md:p-6"
                    >
                      <h2 className="font-heading text-xl font-semibold leading-tight text-[var(--heading)] md:text-2xl">
                        {section.heading}
                      </h2>

                      <div className="mt-4 grid gap-4">
                        {section.paragraphs.map((paragraph, paragraphIndex) => (
                          <p
                            key={`${section.heading}-para-${paragraphIndex}`}
                            className="text-sm font-medium leading-8 text-[var(--muted)] md:text-base"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {section.technologies &&
                        section.technologies.length > 0 && (
                          <div className="mt-5">
                            <p className="text-sm font-semibold text-[var(--heading)]">
                              Technologies Used:
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">
                              {section.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full bg-[var(--bg-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)]"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                      {section.siteUrls && section.siteUrls.length > 0 && (
                        <div className="mt-6">
                          <p className="mb-3 text-sm font-semibold text-[var(--heading)]">
                            Project URLs:
                          </p>

                          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                              {section.siteUrls.map((site, siteIndex) => {
                                const url = typeof site === "string" ? site : site.url;

                                return (
                                  <a
                                    key={`${url}-${siteIndex}`}
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-4 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent-soft)] md:odd:border-r"
                                  >
                                    <span className="break-all">{url}</span>
                                    <i className="fa-solid fa-arrow-up-right-from-square shrink-0 text-xs" />
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {section.groups && section.groups.length > 0 && (
  <div className="mt-8 grid gap-8">
    {section.groups.map((group) => (
      <div key={group.title}>
        <h3 className="font-heading text-xl font-semibold text-[var(--heading)]">
          {group.title}
        </h3>

        <ul className="mt-4 grid gap-3">
          {group.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm font-medium leading-7 text-[var(--muted)]"
            >
              <span className="mt-[8px] flex h-4 w-4 shrink-0 items-center justify-center">
                <i className="fa-solid fa-circle-check text-[12px] leading-none text-[var(--accent)]" />
              </span>

              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)}

                      {section.siteUrl && (
                        <div className="mt-5">
                          <p className="text-sm font-semibold text-[var(--heading)]">
                            Site URL:
                          </p>

                          <a
                            href={section.siteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-flex items-center gap-2 break-all text-sm font-semibold text-[var(--accent)]"
                          >
                            {section.siteUrl}
                            <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                          </a>
                        </div>
                      )}

                      {section.bullets && section.bullets.length > 0 && (
                        <div className="mt-6">
                          <p className="mb-4 text-sm font-semibold text-[var(--heading)]">
                            {section.bulletTitle || "Advantages:"}
                          </p>

                          <ul className="grid gap-3 md:grid-cols-2 md:gap-x-8">
                            {section.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex items-start gap-3 text-sm font-medium leading-7 text-[var(--muted)]"
                              >
                                <span className="mt-[8px] flex h-4 w-4 shrink-0 items-center justify-center">
                                  <i className="fa-solid fa-circle-check text-[12px] leading-none text-[var(--accent)]" />
                                </span>

                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </section>
                  ))}
                </div>
              )}

              <div className="mt-12 border-t border-[var(--border)] pt-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {prevProject ? (
                    <Link
                      href={`/projects/${prevProject.slug}`}
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-sm font-semibold text-[var(--accent)] shadow-sm transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:gap-3"
                    >
                      <i className="fa-solid fa-arrow-left text-xs" />
                      Back Project
                    </Link>
                  ) : (
                    <Link
                      href="/projects"
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-sm font-semibold text-[var(--accent)] shadow-sm transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:gap-3"
                    >
                      <i className="fa-solid fa-arrow-left text-xs" />
                      Back to Projects
                    </Link>
                  )}

                  {nextProject && (
                    <Link
                      href={`/projects/${nextProject.slug}`}
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:gap-3 hover:opacity-90"
                    >
                      Next Project
                      <i className="fa-solid fa-arrow-right text-xs" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}