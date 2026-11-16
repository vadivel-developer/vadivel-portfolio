import Icon from "./Icon";
import { Reveal } from "./Motion";

const services = [
  {
    icon: "fa-brands fa-react",
    tint: "var(--p-lilac)",
    title: "Next.js & React",
    desc: "Modern frontend development with server-side rendering, API integration, responsive interfaces and performance optimization.",
    tags: ["Next.js", "React", "SSR"],
  },
  {
    icon: "fa-brands fa-wordpress",
    tint: "var(--p-sky)",
    title: "WordPress Development",
    desc: "Custom themes and plugins, HTML and Figma-to-WordPress conversion, ACF-based dynamic content, REST API integration and Avada customization.",
    tags: ["Themes", "ACF", "Avada"],
  },
  {
    icon: "fa-brands fa-hubspot",
    tint: "var(--p-peach)",
    title: "HubSpot CMS",
    desc: "Custom theme and module development with HubL, reusable components, landing pages and responsive page development.",
    tags: ["HubL", "Modules", "Landing pages"],
  },
  {
    icon: "fa-solid fa-robot",
    tint: "var(--p-mint)",
    title: "AI, MCP & RAG",
    desc: "AI-assisted development with Claude CLI and HubSpot MCP, plus MCP servers, embeddings, vector databases and LLM-powered retrieval apps.",
    tags: ["Claude CLI", "MCP", "RAG"],
  },
  {
    icon: "fa-solid fa-chart-line",
    tint: "var(--p-lemon)",
    title: "Performance & SEO",
    desc: "Core Web Vitals, technical SEO, caching, schema, redirects and canonicalization, tracked with GA, GTM, Search Console and Semrush.",
    tags: ["Core Web Vitals", "Schema", "Analytics"],
  },
  {
    icon: "fa-brands fa-docker",
    tint: "var(--p-rose)",
    title: "Linux & Docker",
    desc: "Hands-on VPS management, KVM virtualization and containerized deployments with Docker.",
    tags: ["Docker", "VPS", "KVM"],
  },
];

export default function Services() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <Reveal key={s.title} delay={(i % 3) * 0.08} className="h-full">
          <div className="group relative h-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]/50 hover:shadow-xl">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] transition-transform duration-500 group-hover:scale-x-100"
            />
            <div className="flex items-start justify-between">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-[var(--heading)] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                style={{ background: s.tint }}
              >
                <Icon name={s.icon} />
              </span>
              <span className="text-4xl font-bold text-[var(--heading)]/10">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-[var(--heading)]">{s.title}</h3>
            <p className="mt-2 text-[14.5px] leading-7 text-[var(--muted)]">{s.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span key={t} className="rounded-full bg-[var(--bg-soft)] px-3 py-1 text-[12px] text-[var(--heading)]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
