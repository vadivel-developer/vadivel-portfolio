"use client";

import Link from "next/link";
import { useState } from "react";

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

  if (validBlogs.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-6 text-center">
        <p className="text-sm font-medium text-[var(--muted)]">
          No blogs added yet.
        </p>
      </div>
    );
  }

  const visibleCount = Math.min(validBlogs.length, 3);

  const visibleBlogs = Array.from({ length: visibleCount }, (_, index) => {
    const blogIndex = (activeIndex + index) % validBlogs.length;
    return validBlogs[blogIndex];
  });

  const goPrev = () => {
    setActiveIndex((current) =>
      current === 0 ? validBlogs.length - 1 : current - 1
    );
  };

  const goNext = () => {
    setActiveIndex((current) =>
      current === validBlogs.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="w-full">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
            Blogs
          </p>

          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-[-0.035em] text-[var(--heading)] md:text-4xl">
            Writing and technical notes
          </h2>

          <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-[var(--muted)] md:text-base">
            Short preview of topics I can write about from my web development
            experience.
          </p>
        </div>

        {validBlogs.length > 3 && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous blog"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--heading)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <i className="fa-solid fa-chevron-left text-sm" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next blog"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--heading)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <i className="fa-solid fa-chevron-right text-sm" />
            </button>
          </div>
        )}
      </div>

      <div className="grid items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3">
        {visibleBlogs.map((blog) => (
          <article
            key={blog.slug || blog.title}
            className="card-premium flex h-full min-h-[620px] flex-col overflow-hidden rounded-[1.5rem] transition duration-500 hover:-translate-y-1 hover:border-[var(--accent)]"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-52 w-full object-cover"
            />

            <div className="flex flex-1 flex-col p-6">
              {blog.tag && (
                <span className="mb-5 w-fit rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--accent)]">
                  {blog.tag}
                </span>
              )}

              <h3 className="font-heading text-xl font-semibold leading-tight text-[var(--heading)]">
                {blog.title}
              </h3>

              <p className="mt-5 text-sm font-medium leading-8 text-[var(--muted)]">
                {blog.desc}
              </p>

              <div className="mt-auto pt-6">
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-flex min-h-[44px] w-fit items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-sm font-semibold text-[var(--heading)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)] hover:gap-3"
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