import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs, siteUrl } from "../../data/portfolio";
import Icon from "../../components/Icon";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
};

export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Vadivel Portfolio",
      description: "The requested blog could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const blogUrl = `${siteUrl}/blogs/${blog.slug}`;
  const seoTitle = blog.metaTitle || blog.title;
  const seoDescription = blog.metaDescription || blog.desc;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: blogUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: blogUrl,
      siteName: "Vadivel Portfolio",
      type: "article",
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [blog.image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  const currentIndex = blogs.findIndex((item) => item.slug === slug);
  const blog = blogs[currentIndex];

  if (!blog) {
    notFound();
  }

  const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;

  const nextBlog =
    currentIndex >= 0 && currentIndex < blogs.length - 1
      ? blogs[currentIndex + 1]
      : null;

  const sections: BlogSection[] = Array.isArray((blog as any).sections)
    ? (blog as any).sections
    : [];

  const oldContent: string[] = Array.isArray((blog as any).content)
    ? (blog as any).content
    : [];

  return (
    <main className="min-h-screen text-[var(--text)]">
      <article className="py-8 md:py-10">
        <div className="container-inner w-full">
          <div className="card-premium w-full min-w-0 overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] shadow-sm">
            {/* Compact header */}
            <div className="w-full min-w-0 border-b border-[var(--border)] bg-gradient-to-br from-[var(--accent-soft)] to-[var(--bg-soft)] px-5 py-6 sm:px-6 md:px-8 md:py-7">
              {blog.tag && (
                <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[var(--accent)] shadow-sm sm:text-xs">
                  {blog.tag}
                </span>
              )}

              <h1 className="mt-3 max-w-[900px] break-words text-xl font-semibold leading-tight tracking-tight text-[var(--heading)] sm:text-2xl md:text-[1.75rem]">
                {blog.title}
              </h1>

              <p className="mt-2 max-w-3xl break-words text-[13.5px] leading-6 text-[var(--muted)] md:text-sm">
                {blog.desc}
              </p>
            </div>

            {/* Blog Content */}
            <div className="w-full min-w-0 max-w-full overflow-hidden p-5 sm:p-6 md:p-8">
              {sections.length > 0 && (
                <div className="grid w-full min-w-0 max-w-full gap-9">
                  {sections.map((section, index) => {
                    const isDuplicateTitle =
                      index === 0 &&
                      section.heading.toLowerCase().trim() ===
                        blog.title.toLowerCase().trim();

                    // a paragraph ending with ":" introduces the bullet list: show it right above the
                    // list and move any follow-up paragraphs below the list
                    const hasBullets = !!section.bullets && section.bullets.length > 0;
                    let leadIdx = -1;
                    if (hasBullets) {
                      section.paragraphs.forEach((p, i) => {
                        if (p.trim().endsWith(":")) leadIdx = i;
                      });
                    }
                    const beforeList = leadIdx >= 0 ? section.paragraphs.slice(0, leadIdx + 1) : section.paragraphs;
                    const afterList = leadIdx >= 0 ? section.paragraphs.slice(leadIdx + 1) : [];

                    return (
                      <section
                        key={`${section.heading}-${index}`}
                        className="w-full min-w-0 max-w-full overflow-hidden"
                      >
                        {!isDuplicateTitle && (
                          <h2 className="font-heading max-w-full break-words text-xl font-semibold leading-tight text-[var(--heading)] md:text-2xl">
                            {section.heading}
                          </h2>
                        )}

                        <div
                          className={`${
                            isDuplicateTitle ? "mt-0" : "mt-4"
                          } grid w-full min-w-0 gap-4`}
                        >
                          {beforeList.map(
                            (paragraph, paragraphIndex) => (
                              <p
                                key={`${section.heading}-para-${paragraphIndex}`}
                                className="max-w-full break-words text-sm font-medium leading-7 text-[var(--muted)] md:text-base md:leading-8"
                              >
                                {paragraph}
                              </p>
                            )
                          )}
                        </div>

                        {section.table && (
                          <div className="mt-6 w-full min-w-0 max-w-full overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
                            <table className="w-full min-w-[640px] border-collapse text-left">
                              <thead className="bg-[var(--bg-soft)]">
                                <tr>
                                  {section.table.headers.map((header) => (
                                    <th
                                      key={header}
                                      className="border-b border-[var(--border)] px-4 py-4 text-sm font-semibold text-[var(--heading)]"
                                    >
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>

                              <tbody>
                                {section.table.rows.map((row, rowIndex) => (
                                  <tr key={`row-${rowIndex}`}>
                                    {row.map((cell, cellIndex) => (
                                      <td
                                        key={`cell-${rowIndex}-${cellIndex}`}
                                        className="border-b border-[var(--border)] px-4 py-4 text-sm font-medium leading-7 text-[var(--muted)]"
                                      >
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {section.bullets && section.bullets.length > 0 && (
                          <ul className="mt-5 grid w-full min-w-0 gap-3 md:grid-cols-2 md:gap-x-8">
                            {section.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex min-w-0 items-start gap-3 text-sm font-medium leading-7 text-[var(--muted)] md:text-base"
                              >
                                <span className="mt-[8px] flex h-4 w-4 shrink-0 items-center justify-center">
                                  <Icon name="fa-solid fa-circle-check" className="text-[12px] leading-none text-[var(--accent)]" />
                                </span>

                                <span className="block min-w-0 flex-1 break-words">
                                  {bullet}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {afterList.length > 0 && (
                          <div className="mt-5 grid w-full min-w-0 gap-4">
                            {afterList.map((paragraph, i) => (
                              <p
                                key={`${section.heading}-after-${i}`}
                                className="max-w-full break-words text-sm font-medium leading-7 text-[var(--muted)] md:text-base md:leading-8"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        )}
                      </section>
                    );
                  })}
                </div>
              )}

              {sections.length === 0 && oldContent.length > 0 && (
                <div className="grid w-full min-w-0 gap-5">
                  {oldContent.map((paragraph, index) => (
                    <p
                      key={`old-content-${index}`}
                      className="max-w-full break-words text-sm font-medium leading-7 text-[var(--muted)] md:text-base md:leading-8"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              <div className="mt-10 border-t border-[var(--border)] pt-7 md:mt-12 md:pt-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {prevBlog ? (
                    <Link
                      href={`/blogs/${prevBlog.slug}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-sm font-semibold text-[var(--accent)] shadow-sm transition hover:gap-3 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] sm:w-fit"
                    >
                      <Icon name="fa-solid fa-arrow-left" className="text-xs" />
                      Back Blog
                    </Link>
                  ) : (
                    <Link
                      href="/blogs"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-sm font-semibold text-[var(--accent)] shadow-sm transition hover:gap-3 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] sm:w-fit"
                    >
                      <Icon name="fa-solid fa-arrow-left" className="text-xs" />
                      Back to Blogs
                    </Link>
                  )}

                  {nextBlog && (
                    <Link
                      href={`/blogs/${nextBlog.slug}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:gap-3 hover:opacity-90 sm:w-fit"
                    >
                      Next Blog
                      <Icon name="fa-solid fa-arrow-right" className="text-xs" />
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