import Image from "next/image";
import { Reveal } from "../components/Motion";
import SectionHeader from "../components/SectionHeader";
import { education } from "../data/portfolio";

export const metadata = {
  title: "Education",
  description: "Education background of Vadivel T.",
};

export default function EducationPage() {
  return (
    <main className="min-h-screen text-[var(--text)]">
      <section className="py-8 md:py-10">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <SectionHeader
            eyebrow="Education"
            title="Education background"
            desc="Academic foundation and technical learning background."
          />

          <div className="grid gap-4">
            {education.map((item, index) => (
              <Reveal key={item.institution} delay={index * 0.06}>
                <div className="flex items-start justify-between gap-5 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition-shadow hover:shadow-lg md:p-7">
                  <div className="min-w-0">
                    <span className="inline-block whitespace-nowrap rounded-full bg-[var(--accent-soft)] px-3.5 py-1 text-[12px] font-medium text-[var(--accent)]">
                      {item.period}
                    </span>
                    <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-[var(--heading)] md:text-2xl">
                      {item.institution}
                    </h2>
                    <p className="mt-1 text-[15px] font-medium text-[var(--text)]">{item.course}</p>

                    {item.grade && <p className="mt-2 text-sm text-[var(--text)]">{item.grade}</p>}
                    {item.activities && <p className="mt-2 text-sm text-[var(--text)]">{item.activities}</p>}

                    <p className="mt-3 max-w-3xl text-[14.5px] leading-7 text-[var(--muted)]">{item.desc}</p>
                  </div>

                  <Image
                    src={item.logo}
                    alt={`${item.institution} logo`}
                    width={80}
                    height={80}
                    className="h-16 w-16 shrink-0 rounded-xl border border-[var(--border)] bg-white object-contain p-2 md:h-20 md:w-20"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
