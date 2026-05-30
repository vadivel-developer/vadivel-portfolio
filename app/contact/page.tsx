import type { Metadata } from "next";
import ContactFormClient from "../components/ContactFormClient";
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

const contactDetails = [
  {
    label: "Email",
    value: "vadivelwebdeveloper@gmail.com",
    href: "mailto:vadivelwebdeveloper@gmail.com",
    icon: "fa-solid fa-envelope",
  },
  {
    label: "Phone",
    value: "+91 93636 37726",
    href: "tel:+919363637726",
    icon: "fa-solid fa-phone",
  },
 
  {
    label: "Location",
    value: "Chennai, India",
    href: "",
    icon: "fa-solid fa-location-dot",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-soft)] text-[var(--text)]">
      <section className="section-space">
        <div className="container-inner">
          <SectionHeader
            eyebrow="Contact"
            title="Let’s discuss your project"
            desc="Have a website issue, automation workflow, development requirement, or performance improvement request? Send me a message."
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <aside className="card-premium rounded-[1.5rem] p-6 md:p-6">
             

              <h1 className="mt-6 font-heading text-3xl font-semibold leading-tight text-[var(--heading)] md:text-4xl">
                Contact Me
              </h1>

              <p className="mt-4 text-base font-medium leading-8 text-[var(--muted)]">
                Need help with a website, WordPress update, Next.js project,
                automation workflow, hosting setup, or website performance
                improvement? Share your details and I will get back to you.
              </p>

              <div className="mt-8 grid gap-4">
                {contactDetails.map((item) => {
                  const content = (
                    <div className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 transition hover:border-[var(--accent)]">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                        <i className={`${item.icon} text-sm`} />
                      </span>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                          {item.label}
                        </p>

                        <p className="mt-1 break-all text-sm font-semibold text-[var(--heading)]">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.label === "LinkedIn" ? "_blank" : undefined}
                      rel={item.label === "LinkedIn" ? "noreferrer" : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}
              </div>
            </aside>

            <ContactFormClient />
          </div>
        </div>
      </section>
    </main>
  );
}