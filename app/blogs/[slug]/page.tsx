import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs, siteUrl } from "../../data/portfolio";

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

  const prevBlog =
    currentIndex > 0
      ? blogs[currentIndex - 1]
      : null;

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
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <article className="section-space">
        <div className="container-inner max-w-[1180px]">


          <div className="overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] shadow-sm">
            {/* Hero Image with Overlay Title */}
            <div className="relative h-[340px] w-full overflow-hidden md:h-[300px]">
              <img
                src={blog.image}
                alt={blog.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />

              <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
                <div className="max-w-4xl">
                  <span className="inline-flex rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[var(--accent)] shadow-sm backdrop-blur md:text-sm">
                    {blog.tag}
                  </span>

                  <h1 className="font-heading mt-5 text-3xl font-semibold leading-tight tracking-[-0.035em] text-white md:text-4xl">
                    {blog.title}
                  </h1>

                  <p className="mx-auto mt-5 max-w-3xl text-sm font-medium leading-7 text-white/85 md:text-base">
                    {blog.desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {sections.length > 0 && (
                <div className="grid gap-10">
                  {sections.map((section, index) => {
                    const isDuplicateTitle =
                      index === 0 &&
                      section.heading.toLowerCase().trim() ===
                      blog.title.toLowerCase().trim();

                    return (
                      <section key={`${section.heading}-${index}`}>
                        {!isDuplicateTitle && (
                          <h2 className="font-heading text-xl font-semibold leading-tight text-[var(--heading)] md:text-2xl">
                            {section.heading}
                          </h2>
                        )}

                        <div
                          className={`${isDuplicateTitle ? "mt-0" : "mt-4"
                            } grid gap-4`}
                        >
                          {section.paragraphs.map(
                            (paragraph, paragraphIndex) => (
                              <p
                                key={`${section.heading}-para-${paragraphIndex}`}
                                className="text-sm font-medium leading-8 text-[var(--muted)] md:text-base"
                              >
                                {paragraph}
                              </p>
                            )
                          )}
                        </div>

                        {section.table && (
                          <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--border)]">
                            <table className="w-full min-w-[720px] border-collapse bg-[var(--card)] text-left">
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
                          <ul className="mt-5 grid gap-3 md:grid-cols-2 md:gap-x-8">
                            {section.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex items-start gap-3 text-sm font-medium leading-7 text-[var(--muted)] md:text-base"
                              >
                                <span className="mt-[8px] flex h-4 w-4 shrink-0 items-center justify-center">
                                  <i className="fa-solid fa-circle-check text-[12px] leading-none text-[var(--accent)]" />
                                </span>

                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </section>
                    );
                  })}
                </div>
              )}

              {sections.length === 0 && oldContent.length > 0 && (
                <div className="grid gap-5">
                  {oldContent.map((paragraph, index) => (
                    <p
                      key={`old-content-${index}`}
                      className="text-sm font-medium leading-8 text-[var(--muted)] md:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              <div className="mt-12 border-t border-[var(--border)] pt-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {prevBlog ? (
                    <Link
                      href={`/blogs/${prevBlog.slug}`}
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-sm font-semibold text-[var(--accent)] shadow-sm transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:gap-3"
                    >
                      <i className="fa-solid fa-arrow-left text-xs" />
                      Back Blog
                    </Link>
                  ) : (
                    <Link
                      href="/blogs"
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-sm font-semibold text-[var(--accent)] shadow-sm transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:gap-3"
                    >
                      <i className="fa-solid fa-arrow-left text-xs" />
                      Back to Blogs
                    </Link>
                  )}

                  {nextBlog && (
                    <Link
                      href={`/blogs/${nextBlog.slug}`}
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:gap-3 hover:opacity-90"
                    >
                      Next Blog
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