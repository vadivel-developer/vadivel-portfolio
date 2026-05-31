"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ProjectItem = {
  title: string;
  slug: string;
  tag?: string;
  tags?: string[];
  technologies?: string[];
  image: string;
  desc: string;
};

type ProjectSliderProps = {
  projects: ProjectItem[];
};

export default function ProjectSlider({ projects }: ProjectSliderProps) {
  const validProjects = Array.isArray(projects) ? projects.filter(Boolean) : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    updateSlidesPerView();

    window.addEventListener("resize", updateSlidesPerView);

    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  useEffect(() => {
    if (validProjects.length <= slidesPerView || isPaused) return;

    const autoplay = window.setInterval(() => {
      setDirection("next");
      setActiveIndex((current) =>
        current === validProjects.length - 1 ? 0 : current + 1
      );
    }, 4000);

    return () => window.clearInterval(autoplay);
  }, [validProjects.length, slidesPerView, isPaused]);

  if (validProjects.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-6 text-center">
        <p className="text-sm font-medium text-[var(--muted)]">
          No projects added yet.
        </p>
      </div>
    );
  }

  const visibleCount = Math.min(validProjects.length, slidesPerView);

  const visibleProjects = Array.from({ length: visibleCount }, (_, index) => {
    const projectIndex = (activeIndex + index) % validProjects.length;
    return validProjects[projectIndex];
  });

  const goPrev = () => {
    setDirection("prev");
    setActiveIndex((current) =>
      current === 0 ? validProjects.length - 1 : current - 1
    );
  };

  const goNext = () => {
    setDirection("next");
    setActiveIndex((current) =>
      current === validProjects.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="mb-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
            Projects
          </p>

          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-[-0.035em] text-[var(--heading)] md:text-4xl">
            Selected project work
          </h2>

          <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-[var(--muted)] md:text-base">
            Short preview of my WordPress, AI workflow, automation, testing,
            SEO, hosting, and web development projects.
          </p>
        </div>

        {validProjects.length > slidesPerView && (
  <div className="flex w-full items-center justify-end gap-3 md:w-auto">
    <button
      type="button"
      onClick={goPrev}
      aria-label="Previous project"
      suppressHydrationWarning
      className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--heading)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      <i className="fa-solid fa-chevron-left text-sm" />
    </button>

    <button
      type="button"
      onClick={goNext}
      aria-label="Next project"
      suppressHydrationWarning
      className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--heading)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      <i className="fa-solid fa-chevron-right text-sm" />
    </button>
  </div>
)}
      </div>

      <div
        key={`${activeIndex}-${slidesPerView}`}
        className={`grid gap-7 md:grid-cols-2 lg:grid-cols-3 ${
          direction === "next" ? "slider-enter-next" : "slider-enter-prev"
        }`}
      >
        {visibleProjects.map((project) => {
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
              key={project.slug || project.title}
              className="card-premium flex h-full flex-col overflow-hidden rounded-[1.5rem] transition duration-500 hover:-translate-y-1 hover:border-[var(--accent)]"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-48 w-full object-cover sm:h-52"
              />

              <div className="flex flex-1 flex-col p-5 md:p-6">
                {displayTags.length > 0 && (
                  <div className="mb-5 flex flex-wrap gap-2">
                    {displayTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--accent)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h3 className="font-heading text-xl font-semibold leading-snug text-[var(--heading)]">
                  {project.title}
                </h3>

                <p className="mt-4 text-sm font-medium leading-7 text-[var(--muted)]">
                  {project.desc}
                </p>

                <div className="mt-7">
                  <Link
                    href={`/projects/${project.slug}`}
                    suppressHydrationWarning
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#087ea4] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:gap-3 hover:bg-[#066b8d] sm:w-fit"
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
    </div>
  );
}