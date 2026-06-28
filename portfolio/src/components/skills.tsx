import { SKILLS } from "@/data/portfolio";
import { TiltCard } from "./tilt-card";

export function Skills() {
  return (
    <section id="skills" aria-label="Technical skills" className="py-20">
      <h2 className="text-2xl font-bold">Skills</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {SKILLS.map((category) => (
          <TiltCard key={category.label} className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
              {category.label}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {category.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm transition-all hover:border-accent hover:text-accent hover:shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
