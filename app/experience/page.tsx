import ExperienceCard from "../components/ExperienceCard";
import { ScrollLine } from "../components/ScrollFx";
import SectionHeader from "../components/SectionHeader";
import { experience } from "../data/portfolio";

export const metadata = {
  title: "Experience",
  description: "Professional experience of Vadivel T as a WordPress and HubSpot developer.",
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
            desc="My work across Next.js, WordPress and HubSpot CMS, AI-assisted development, automation and performance."
          />

          <ScrollLine className="space-y-12">
            {validExperience.map((item, index) => (
              <ExperienceCard
                key={`${item.role}-${item.period}`}
                item={item}
                index={index}
                showDetails
              />
            ))}
          </ScrollLine>
        </div>
      </section>
    </main>
  );
}