import SectionHeader from "../components/SectionHeader";
import { education } from "../data/portfolio";

export const metadata = {
  title: "Education",
  description: "Education background of Vadivel T.",
};

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-soft)] text-[var(--text)]">
      <section className="section-space">
        <div className="container-inner">
          <SectionHeader
            eyebrow="Education"
            title="Education background"
            desc="Academic foundation and technical learning background."
          />

          <div className="grid gap-5">
            {education.map((item, index) => (
              <div
                key={item.institution}
                className={`reveal-up reveal-delay-${index} card-premium mx-auto flex w-full max-w-[980px] flex-col gap-5 rounded-[1.5rem] p-5 transition duration-500 hover:-translate-y-1 hover:border-[var(--accent)] sm:flex-row sm:items-start sm:justify-between md:p-6`}
              >
                <div className="flex gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-white p-2 shadow-sm md:h-20 md:w-20">
                    <img
                      src={item.logo}
                      alt={`${item.institution} logo`}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div>
                    <h2 className="font-heading text-lg font-semibold leading-snug text-[var(--heading)] md:text-xl">
                      {item.institution}
                    </h2>

                    <p className="mt-1 text-sm font-medium leading-6 text-[var(--text)]">
                      {item.course}
                    </p>

                    <p className="mt-1 text-sm font-medium text-[var(--muted)]">
                      {item.period}
                    </p>

                    {item.grade && (
                      <p className="mt-3 text-sm font-medium text-[var(--text)]">
                        {item.grade}
                      </p>
                    )}

                    {item.activities && (
                      <p className="mt-3 text-sm font-medium text-[var(--text)]">
                        {item.activities}
                      </p>
                    )}

                    <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-[var(--muted)]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}