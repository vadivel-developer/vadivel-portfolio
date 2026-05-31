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
                className={`reveal-up reveal-delay-${index} card-premium mx-auto w-full max-w-[980px] rounded-[1.5rem] p-5 transition duration-500 hover:-translate-y-1 hover:border-[var(--accent)] md:p-6`}
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  {/* Logo: top on mobile, left side on tablet/desktop */}
                  <div className="flex shrink-0 items-center justify-start">
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-3 shadow-sm md:h-24 md:w-24">
                      <img
                        src={item.logo}
                        alt={`${item.institution} logo`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h2 className="font-heading text-xl font-semibold leading-snug text-[var(--heading)] md:text-2xl">
                      {item.institution}
                    </h2>

                    <p className="mt-2 text-sm font-semibold leading-6 text-[var(--text)] md:text-base">
                      {item.course}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-[var(--muted)]">
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

                    <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-[var(--muted)] md:text-base">
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