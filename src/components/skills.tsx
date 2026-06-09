import { SKILLS } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <h2 className="text-2xl font-bold">Skills</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {SKILLS.map((category) => (
          <div key={category.label}>
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
          </div>
        ))}
      </div>
    </section>
  );
}
