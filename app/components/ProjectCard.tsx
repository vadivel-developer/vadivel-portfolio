import Link from "next/link";

type ProjectCardProps = {
  project: {
    title: string;
    slug: string;
    tag?: string;
    tags?: string[];
    technologies?: string[];
    image: string;
    desc: string;
  };
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const displayTags =
    Array.isArray(project.tags) && project.tags.length > 0
      ? project.tags
      : Array.isArray(project.technologies) && project.technologies.length > 0
      ? project.technologies.slice(0, 4)
      : project.tag
      ? [project.tag]
      : [];

  return (
    <article
      className={`reveal-up reveal-delay-${index} card-premium overflow-hidden rounded-[1.5rem] transition duration-500 hover:-translate-y-1 hover:border-[var(--accent)]`}
    >
      <img
        src={project.image}
        alt={project.title}
        className="h-52 w-full object-cover"
      />

      <div className="flex flex-1 flex-col p-6">
        <span className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
          <i className="fa-solid fa-code text-sm" />
        </span>

        <h3 className="font-heading text-2xl font-semibold leading-tight text-[var(--heading)]">
          {project.title}
        </h3>

        <p className="mt-5 text-sm font-medium leading-8 text-[var(--muted)]">
          {project.desc}
        </p>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-6 inline-flex min-h-[44px] w-fit items-center justify-center gap-2 rounded-full bg-[#087ea4] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:gap-3 hover:bg-[#066b8d]"
        >
          <span className="text-white">Read More</span>
          <i className="fa-solid fa-arrow-right text-xs text-white" />
        </Link>

        {displayTags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {displayTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--bg-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}