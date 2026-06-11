import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { PROJECTS } from "@/data/portfolio";

export function Projects() {
  return (
    <section id="projects" aria-label="Projects" className="py-20">
      <h2 className="text-2xl font-bold">Projects</h2>
      <div className="mt-8 space-y-4">
        {PROJECTS.map((project) => (
          <article
            key={project.title}
            className="card-glow rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 hover:border-accent"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                  className="shrink-0 text-sm text-accent hover:underline"
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-4 w-4" aria-hidden="true" /> GitHub
                </a>
              )}
            </div>
            <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
              {project.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                >
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
