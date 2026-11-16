import type { Metadata } from "next";
import Link from "next/link";
import ProjectsBrowser from "../components/ProjectsBrowser";
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
            title="Projects"
            desc="WordPress, HubSpot, Next.js, automation and AI projects, each with a full case study."
          />

          <ProjectsBrowser projects={validProjects as any} />
        </div>
      </section>
    </main>
  );
}