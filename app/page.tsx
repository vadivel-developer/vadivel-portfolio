import Link from "next/link";
import ExperienceCard from "./components/ExperienceCard";
import ProfileAvatar from "./components/ProfileAvatar";
import ProjectSlider from "./components/ProjectSlider";
import SectionHeader from "./components/SectionHeader";
import SkillCard from "./components/SkillCard";
import ViewAllButton from "./components/ViewAllButton";
import {
  blogs as portfolioBlogs,
  education,
  experience,
  profile,
  projects as portfolioProjects,
  skills,
} from "./data/portfolio";
import BlogSlider from "./components/BlogSlider";
import ContactFormClient from "./components/ContactFormClient";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: profile.email,
  telephone: profile.phone,
  url: profile.linkedin,
  sameAs: [profile.linkedin, profile.github, profile.x],
  knowsAbout: skills,
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <section id="home" className="relative bg-[var(--bg)] py-10 md:py-10">
        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-[var(--accent)]/10 blur-3xl" />
        <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-[var(--accent-2)]/10 blur-3xl" />

        <div className="container-inner relative flex flex-col items-center text-center">
          <ProfileAvatar />

          <h1 className="reveal-up max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--heading)] md:text-4xl">
            {profile.name}
          </h1>

          <span className="reveal-up reveal-delay-1 mt-4 text-xl font-semibold text-[var(--accent)] md:text-2xl">
            {profile.role}
          </span>

          <p className="reveal-up reveal-delay-2 mt-4 max-w-5xl border-b border-gray-200 pb-6 text-sm font-medium leading-7 text-[var(--muted)] md:text-base">
            {profile.headline}
          </p>

          <p className="reveal-up reveal-delay-2 mt-4 max-w-6xl text-sm font-medium leading-7 text-[var(--muted)] md:text-base">
            {profile.summary}
          </p>



          <div className="reveal-up reveal-delay-2 mt-5 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/pdf/vadivel-resume.pdf"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-[var(--button)] px-7 py-4 text-center text-sm font-semibold text-[var(--button-text)] transition hover:scale-[1.02]"
            >
              <i className="fa-regular fa-file-lines" />
              Resume
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-7 py-4 text-center text-sm font-semibold text-[var(--heading)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <i className="fa-solid fa-phone" />
              Contact
            </Link>
          </div>

          <Link
            href="#experience-preview"
            className="scroll-bounce mt-5 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-lg text-[var(--heading)] shadow-sm"
            aria-label="Scroll down"
          >
            <i className="fa-solid fa-chevron-down leading-none" />
          </Link>
        </div>
      </section>

      <section id="experience-preview" className="section-space bg-[var(--bg-soft)]">
        <div className="container-inner">
          <SectionHeader
            eyebrow="Experience"
            title="Professional Journey"
            desc="A quick overview of my web development, frontend, and performance optimization experience."
          />

          <div className="space-y-5">
            {experience.slice(0, 2).map((item, index) => (
              <ExperienceCard key={item.role} item={item} index={index} showDetails />
            ))}
          </div>

          <div className="mt-8 text-center">
            <ViewAllButton href="/experience" label="View All Experience" />
          </div>
        </div>
      </section>

      <section id="projects" className="section-space bg-[var(--bg)]">
        <div className="container-inner">
          <ProjectSlider projects={portfolioProjects} />

          <div className="mt-10 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-3 text-sm font-semibold text-[var(--heading)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)] hover:gap-3"
            >
              View All Projects
              <i className="fa-solid fa-chevron-down text-xs" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--bg-soft)]">
        <div className="container-inner">
          <SectionHeader
            eyebrow="Education"
            title="Education background"
            desc="Short preview of my academic and technical foundation."
          />

          <div className="grid gap-5">
            {education.slice(0, 3).map((item, index) => (
              <div
                key={item.course}
                className={`reveal-up reveal-delay-${index} card-premium mx-auto flex w-full max-w-[980px] flex-col gap-6 rounded-[1.5rem] p-6 md:flex-row md:items-center md:justify-between`}
              >
                {/* Logo: Top on mobile, right side on desktop */}
                <div className="order-1 flex shrink-0 items-center justify-start md:order-2 md:justify-end">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-3 shadow-sm md:h-24 md:w-24">
                    <img
                      src={item.logo}
                      alt={`${item.institution} logo`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>

                {/* Content: Below logo on mobile, left side on desktop */}
                <div className="order-2 md:order-1">
                  <h3 className="font-heading text-xl font-semibold leading-tight text-[var(--heading)]">
                    {item.course}
                  </h3>

                  <p className="mt-2 font-semibold leading-7 text-[var(--accent)]">
                    {item.institution}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
                    {item.period}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <ViewAllButton href="/education" label="View Education" />
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--bg)]">
        <div className="container-inner">
          <SectionHeader
            eyebrow="Skills"
            title="Technical Skills and Tools"
            desc="Short preview of my frontend, WordPress, SEO, AI and automation skill stack."
          />

          <div className="reveal-up flex flex-wrap justify-center gap-3">
            {skills.slice(0, 18).map((skill) => (
              <SkillCard key={skill} skill={skill} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <ViewAllButton href="/skills" label="View All Skills" />
          </div>
        </div>
      </section>

      <section id="blogs" className="section-space bg-[var(--bg-soft)]">
        <div className="container-inner">
          <BlogSlider blogs={portfolioBlogs} />

          <div className="mt-10 flex justify-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-3 text-sm font-semibold text-[var(--heading)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)] hover:gap-3"
            >
              View All Blogs
              <i className="fa-solid fa-chevron-down text-xs" />
            </Link>
          </div>
        </div>
      </section>
      <section className="section-space bg-[var(--bg)]">
        <div className="container-inner grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="reveal-up">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">
              Contact
            </p>

            <h2 className="font-heading text-3xl font-semibold tracking-[-0.035em] text-[var(--heading)] md:text-3xl">
              Ready to build an AI-assisted, high-performance website?

            </h2>

            <p className="mt-5 text-base font-medium leading-8 text-[var(--muted)]">
              Available for WordPress development, AI-assisted frontend work, website optimization, SEO support, and automation workflow tasks.
            </p>

            <div className="mt-4 grid gap-3 text-sm font-semibold text-[var(--muted)]">
              <p>
                <i className="fa-solid fa-phone mr-2 text-[var(--accent)]" />
                {profile.phone}
              </p>

              <p>
                <i className="fa-solid fa-envelope mr-2 text-[var(--accent)]" />
                {profile.email}
              </p>

              <p>
                <i className="fa-solid fa-location-dot mr-2 text-[var(--accent)]" />
                {profile.location}
              </p>
            </div>
          </div>

          <ContactFormClient />
        </div>
      </section>
    </main>
  );
}
