import ExperienceCard from "../components/ExperienceCard";
import SectionHeader from "../components/SectionHeader";
import { experience } from "../data/portfolio";

export const metadata = {
  title: "Experience",
  description: "Professional experience of Vadivel T as a senior web developer.",
};

export default function ExperiencePage() {
  const validExperience = experience.filter(Boolean);

  return (
    <main className="min-h-screen bg-[var(--bg-soft)] text-[var(--text)]">
      <section className="section-space">
        <div className="container-inner">
          <SectionHeader
            eyebrow="Experience"
            title="Professional Journey"
            desc="Current work focus across websites, AI-assisted workflows, automation testing and optimization."
          />

          <div className="space-y-5">
            {validExperience.map((item, index) => (
              <ExperienceCard
                key={`${item.role}-${item.period}`}
                item={item}
                index={index}
                showDetails
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}