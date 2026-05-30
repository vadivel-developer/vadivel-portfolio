import SectionHeader from "../components/SectionHeader";
import SkillCard from "../components/SkillCard";
import { skills } from "../data/portfolio";

export const metadata = {
  title: "Skills",
  description: "Technical skills and tools used by Vadivel T.",
};

export default function SkillsPage() {
  return (
    <main className="bg-[var(--bg-soft)] text-[var(--text)]">
      <section className="section-space">
        <div className="container-inner">
          <SectionHeader
            eyebrow="Skills"
            title="Technical skills and tools"
            desc="A focused skill stack covering frontend, WordPress, backend integration, SEO, analytics, AI and hosting."
          />

          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <SkillCard key={skill} skill={skill} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
