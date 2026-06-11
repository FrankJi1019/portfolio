import { EXPERIENCE } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" aria-label="Work experience" className="py-20">
      <h2 className="text-2xl font-bold">Experience</h2>
      <div className="mt-8 space-y-10">
        {EXPERIENCE.map((role) => (
          <article key={`${role.company}-${role.period}`} className="relative pl-6 border-l-2 border-[var(--border)]">
            <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-[var(--background)]" />
            <p className="font-mono text-xs text-accent">
              <time>{role.period}</time>
            </p>
            <h3 className="mt-1 font-semibold">{role.title}</h3>
            <p className="text-sm text-[var(--muted)]">{role.company}</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside marker:text-accent/60">
              {role.points.map((point, i) => (
                <li key={i} className="text-sm text-[var(--muted)] leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
