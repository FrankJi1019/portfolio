import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Remind Me",
    description:
      "A serverless morning briefing system that sends a daily HTML email digest with upcoming Google Calendar events and Notion todos. Built as a set of single-responsibility AWS Lambda functions orchestrated together.",
    tech: ["TypeScript", "AWS Lambda", "SES", "DynamoDB", "Google Calendar API", "Notion API"],
    link: "https://github.com/FrankJi1019/remin-me",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20">
      <h2 className="text-2xl font-bold">Projects</h2>
      <div className="mt-8 space-y-4">
        {PROJECTS.map((project) => (
          <div
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
                  className="shrink-0 text-sm text-accent hover:underline"
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-4 w-4" /> GitHub
                </a>
              )}
            </div>
            <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
