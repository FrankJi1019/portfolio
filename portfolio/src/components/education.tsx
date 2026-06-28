import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { EDUCATION } from "@/data/portfolio";

export function Education() {
  return (
    <section id="education" aria-label="Education" className="py-20">
      <h2 className="text-2xl font-bold">Education</h2>
      <div className="mt-8 space-y-10">
        {EDUCATION.map((edu) => (
          <article key={edu.institution} className="relative pl-6 border-l-2 border-[var(--border)]">
            <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-[var(--background)]" />
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faGraduationCap} className="h-4 w-4 text-accent" aria-hidden="true" />
              <h3 className="font-semibold">{edu.institution}</h3>
            </div>
            <p className="mt-1 text-sm text-[var(--muted)]">{edu.degree}</p>
            <p className="font-mono text-xs text-accent">
              <time>{edu.period}</time>
            </p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside marker:text-accent/60">
              {edu.achievements.map((item, i) => (
                <li key={i} className="text-sm text-[var(--muted)] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
