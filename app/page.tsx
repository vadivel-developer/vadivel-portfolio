import type { Metadata } from "next";
import Image from "next/image";
import ExperienceCard from "./components/ExperienceCard";
import Hero from "./components/Hero";
import Services from "./components/Services";
import SkillsShowcase from "./components/SkillsShowcase";
import { Reveal } from "./components/Motion";
import { ScrollLine } from "./components/ScrollFx";
import SectionHeader from "./components/SectionHeader";
import ViewAllButton from "./components/ViewAllButton";
import {
  blogs as portfolioBlogs,
  education,
  experience,
  profile,
  projects as portfolioProjects,
  siteUrl,
  skills,
} from "./data/portfolio";
import ProjectsList from "./components/ProjectsBrowser";
import BlogsShowcase from "./components/BlogsShowcase";
import ContactSection from "./components/ContactSection";

export const metadata: Metadata = {
  title: "Vadivel T | WordPress & HubSpot Developer",
  description:
    "Web developer with 5+ years of experience in Next.js, React, WordPress, PHP and HubSpot CMS, building fast, SEO-friendly websites, MCP servers and AI-assisted development workflows.",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: "Vadivel T | WordPress & HubSpot Developer",
    description:
      "Web developer with 5+ years of experience in Next.js, React, WordPress, PHP and HubSpot CMS, building fast, SEO-friendly websites, MCP servers and AI-assisted development workflows.",
    url: `${siteUrl}/`,
    siteName: "Vadivel Portfolio",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/og/vadivel-webdeveloper.jpg`,
        width: 1200,
        height: 630,
        alt: "Vadivel T Web Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vadivel T | WordPress & HubSpot Developer",
    description:
      "Web developer with 5+ years of experience in Next.js, React, WordPress, PHP and HubSpot CMS, building fast, SEO-friendly websites, MCP servers and AI-assisted development workflows.",
    images: [`${siteUrl}/images/og/vadivel-webdeveloper.jpg`],
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
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: profile.email,
  telephone: profile.phone,
  url: siteUrl,
  sameAs: [profile.linkedin, profile.github].filter(Boolean),
  knowsAbout: skills,
};

function Band({
  id,
  soft = false,
  children,
}: {
  id: string;
  soft?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={soft ? "bg-[var(--bg-soft)]" : ""}>
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-14">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="home-main min-h-screen text-[var(--text)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <Hero />

      {/* Services */}
      <Band id="services">
        <SectionHeader
          eyebrow="Services"
          title="What I build"
          desc="Next.js, WordPress and HubSpot builds, AI-assisted development and performance work."
        />
        <div>
          <Services />
        </div>
      </Band>

      {/* Experience: sticky heading on the left, timeline on the right */}
      <Band id="experience" soft>
        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              eyebrow="Experience"
              title="Where I have worked"
              desc="The teams and products I have shipped for."
            />
            <div>
              <ViewAllButton href="/experience" label="Full experience" />
            </div>
          </div>
          <ScrollLine className="space-y-12">
            {experience.slice(0, 2).map((item, index) => (
              <ExperienceCard key={item.role} item={item} index={index} showDetails previewCount={4} />
            ))}
          </ScrollLine>
        </div>
      </Band>

      {/* Projects */}
      <Band id="projects">
        <SectionHeader
          eyebrow="Projects"
          title="Projects"
          desc="A selection of projects, each with a full case study."
        />
        <div>
          <ProjectsList projects={portfolioProjects} limit={6} />
        </div>
        <div className="mt-6">
          <ViewAllButton href="/projects" label="All projects" />
        </div>
      </Band>

      {/* Skills */}
      <Band id="skills" soft>
        <SectionHeader
          eyebrow="Skills"
          title="Skills and tools"
          desc="The languages, platforms and tools I use every day."
        />
        <div>
          <SkillsShowcase />
        </div>
        <div className="mt-6">
          <ViewAllButton href="/skills" label="All skills" />
        </div>
      </Band>

      {/* Education */}
      <Band id="education">
        <SectionHeader
          eyebrow="Education"
          title="Education"
          desc="The academic foundation behind my development work."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {education.slice(0, 3).map((item, index) => (
            <Reveal key={item.course} delay={index * 0.08} className="h-full">
              <div className="h-full rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <span className="whitespace-nowrap rounded-full bg-[var(--accent-soft)] px-3.5 py-1 text-[12px] font-medium text-[var(--accent)]">
                    {item.period}
                  </span>
                  <Image
                    src={item.logo}
                    alt={`${item.institution} logo`}
                    width={64}
                    height={64}
                    className="h-14 w-14 shrink-0 rounded-xl border border-[var(--border)] bg-white object-contain p-1.5"
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold leading-snug text-[var(--heading)]">{item.course}</h3>
                <p className="mt-1.5 text-[14px] text-[var(--muted)]">{item.institution}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6">
          <ViewAllButton href="/education" label="Education details" />
        </div>
      </Band>

      {/* Blogs */}
      <Band id="blogs" soft>
        <SectionHeader
          eyebrow="Blogs"
          title="Blogs"
          desc="Practical posts on web development, SEO, AI workflows and automation."
        />
        <div>
          <BlogsShowcase blogs={portfolioBlogs} limit={6} />
        </div>
        <div className="mt-6">
          <ViewAllButton href="/blogs" label="All blogs" />
        </div>
      </Band>

      {/* Contact */}
      <Band id="contact">
        <SectionHeader
          eyebrow="Contact"
          title="Let's work together"
          desc="Need a WordPress or HubSpot developer? Tell me about your project and I will reply with clear next steps."
        />
        <div>
          <ContactSection />
        </div>
      </Band>
    </main>
  );
}
