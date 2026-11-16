import type { Metadata } from "next";
import ContactSection from "../components/ContactSection";
import SectionHeader from "../components/SectionHeader";
import { siteUrl } from "../data/portfolio";

export const metadata: Metadata = {
  title: "Contact | Vadivel Portfolio",
  description:
    "Contact Vadivel T for web development, WordPress, Next.js, automation, AI workflow, hosting, and website performance support.",
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen text-[var(--text)]">
      <section className="section-space">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <SectionHeader
            eyebrow="Contact"
            title="Let's discuss your project"
            desc="A new WordPress site, a HubSpot build or an automation workflow? Send me a message and I will get back to you."
          />
          <div className="mt-4">
            <ContactSection />
          </div>
        </div>
      </section>
    </main>
  );
}
