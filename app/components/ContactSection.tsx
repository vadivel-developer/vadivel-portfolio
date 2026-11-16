import { profile } from "../data/portfolio";
import ContactFormClient from "./ContactFormClient";
import Icon from "./Icon";
import { Reveal } from "./Motion";

const waNumber = profile.whatsapp.replace(/[^\d]/g, "");

const channels = [
  { icon: "fa-solid fa-envelope", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: "fa-solid fa-phone", label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: "fa-brands fa-whatsapp", label: "WhatsApp", value: "Chat on WhatsApp", href: `https://wa.me/${waNumber}`, external: true },
  { icon: "fa-brands fa-linkedin", label: "LinkedIn", value: "vadivel-developer", href: profile.linkedin, external: true },
  { icon: "fa-brands fa-github", label: "GitHub", value: "vadivel-developer", href: profile.github, external: true },
];

/** Dark panel with contact channels next to a clean message form */
export default function ContactSection() {
  return (
    <Reveal>
      <div className="grid overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] shadow-xl lg:grid-cols-[0.95fr_1.05fr]">
        <div className="contact-panel relative p-7 text-[var(--button-text)] md:p-10">
          <p className="relative inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-[12px]">
            <span className="pulse-dot" /> Open to new projects
          </p>
          <h3 className="relative mt-5 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">Have a project in mind?</h3>
          <p className="relative mt-3 max-w-md text-[15px] leading-7 opacity-80">
            Tell me what you need, whether it is a WordPress site, a HubSpot build or an automation, and I will reply with clear next steps.
          </p>

          <ul className="relative mt-7 space-y-2.5">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-white/15 px-4 py-3 transition-colors hover:bg-white/10"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-base">
                    <Icon name={c.icon} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] uppercase tracking-[0.16em] opacity-60">{c.label}</span>
                    <span className="block truncate text-[14.5px]">{c.value}</span>
                  </span>
                  <Icon name="fa-solid fa-arrow-up-right-from-square" className="text-[11px] opacity-50 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>

          <p className="relative mt-6 text-[13px] opacity-70">
            <Icon name="fa-solid fa-location-dot" className="mr-2" />
            Based in {profile.location}.
          </p>
        </div>

        <div className="p-7 md:p-10">
          <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">Send a message</p>
          <div className="mt-5">
            <ContactFormClient />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
