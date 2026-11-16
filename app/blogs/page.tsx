import type { Metadata } from "next";
import Link from "next/link";
import BlogsShowcase from "../components/BlogsShowcase";
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
    <main className="min-h-screen text-[var(--text)]">
      <section className="py-8 md:py-10">
        <div className="container-inner">
          <SectionHeader
            eyebrow="Blogs"
            title="Writing and technical notes"
            desc="Practical notes on web development, SEO, automation and AI-assisted development."
          />

          <BlogsShowcase blogs={validBlogs as any} />
        </div>
      </section>
    </main>
  );
}