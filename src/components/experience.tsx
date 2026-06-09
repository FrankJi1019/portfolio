import { EXPERIENCE } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="py-20">
      <h2 className="text-2xl font-bold">Experience</h2>
      <div className="mt-8 space-y-10">
        {EXPERIENCE.map((role) => (
          <div key={`${role.company}-${role.period}`} className="relative pl-6 border-l-2 border-[var(--border)]">
            <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-[var(--background)]" />
            <p className="font-mono text-xs text-accent">{role.period}</p>
            <h3 className="mt-1 font-semibold">{role.title}</h3>
            <p className="text-sm text-[var(--muted)]">{role.company}</p>
            <ul className="mt-3 space-y-1.5">
              {role.points.map((point, i) => (
                <li key={i} className="text-sm text-[var(--muted)] leading-relaxed">
                  • {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
