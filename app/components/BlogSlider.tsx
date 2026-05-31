"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type BlogItem = {
  title: string;
  slug: string;
  tag?: string;
  image: string;
  desc: string;
};

type BlogSliderProps = {
  blogs: BlogItem[];
};

export default function BlogSlider({ blogs }: BlogSliderProps) {
  const validBlogs = Array.isArray(blogs) ? blogs.filter(Boolean) : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [slidesPerView, setSlidesPerView] = useState(1);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

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
    if (validBlogs.length <= slidesPerView || isPaused) return;

    const autoplay = window.setInterval(() => {
      setDirection("next");
      setActiveIndex((current) =>
        current === validBlogs.length - 1 ? 0 : current + 1
      );
    }, 4000);

    return () => window.clearInterval(autoplay);
  }, [validBlogs.length, slidesPerView, isPaused]);

  if (validBlogs.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-6 text-center">
        <p className="text-sm font-medium text-[var(--muted)]">
          No blogs added yet.
        </p>
      </div>
    );
  }

  const visibleCount = Math.min(validBlogs.length, slidesPerView);

  const visibleBlogs = Array.from({ length: visibleCount }, (_, index) => {
    const blogIndex = (activeIndex + index) % validBlogs.length;
    return validBlogs[blogIndex];
  });

  const goPrev = () => {
    setDirection("prev");
    setActiveIndex((current) =>
      current === 0 ? validBlogs.length - 1 : current - 1
    );
  };

  const goNext = () => {
    setDirection("next");
    setActiveIndex((current) =>
      current === validBlogs.length - 1 ? 0 : current + 1
    );
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    touchEndX.current = null;
    touchStartX.current = event.targetTouches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);

    if (touchStartX.current === null || touchEndX.current === null) {
      return;
    }

    const distance = touchStartX.current - touchEndX.current;

    if (distance > minSwipeDistance) {
      goNext();
    }

    if (distance < -minSwipeDistance) {
      goPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="w-full touch-pan-y"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="mb-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
            Blogs
          </p>

          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-[-0.035em] text-[var(--heading)] md:text-4xl">
            Writing and technical notes
          </h2>

          <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-[var(--muted)] md:text-base">
            Short preview of topics I can write about from my web development,
            SEO, automation, and AI-assisted development experience.
          </p>
        </div>

        {validBlogs.length > slidesPerView && (
          <div className="flex w-full items-center justify-end gap-3 md:w-auto">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous blog"
              suppressHydrationWarning
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--heading)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <i className="fa-solid fa-chevron-left text-sm" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next blog"
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
        {visibleBlogs.map((blog) => (
          <article
            key={blog.slug || blog.title}
            className="card-premium flex h-full flex-col overflow-hidden rounded-[1.5rem] transition duration-500 hover:-translate-y-1 hover:border-[var(--accent)]"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-48 w-full object-cover sm:h-52"
            />

            <div className="flex flex-1 flex-col p-5 md:p-6">
              {blog.tag && (
                <span className="mb-5 w-fit rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--accent)]">
                  {blog.tag}
                </span>
              )}

              <h3 className="font-heading text-xl font-semibold leading-snug text-[var(--heading)]">
                {blog.title}
              </h3>

              <p className="mt-4 text-sm font-medium leading-7 text-[var(--muted)]">
                {blog.desc}
              </p>

              <div className="mt-7">
                <Link
                  href={`/blogs/${blog.slug}`}
                  suppressHydrationWarning
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
    </div>
  );
}