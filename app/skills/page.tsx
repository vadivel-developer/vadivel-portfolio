import SectionHeader from "../components/SectionHeader";
import SkillsShowcase from "../components/SkillsShowcase";

export const metadata = {
  title: "Skills",
  description: "Technical skills and tools used by Vadivel T.",
};

export default function SkillsPage() {
  return (
    <main className="min-h-screen text-[var(--text)]">
      <section className="section-space">
        <div className="container-inner">
          <SectionHeader
            eyebrow="Skills"
            title="Technical skills and tools"
            desc="My stack by category: Next.js, WordPress, HubSpot CMS, AI and MCP, performance and SEO, and Linux and Docker."
          />
          <SkillsShowcase />
        </div>
      </section>
    </main>
  );
}
