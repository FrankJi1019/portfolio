interface SkillCategory {
  label: string;
  items: string[];
}

const SKILLS: SkillCategory[] = [
  {
    label: "Front-End",
    items: ["Angular", "React", "Next.js", "TypeScript", "RxJS", "NgRx", "Tailwind CSS", "SCSS"],
  },
  {
    label: "Back-End",
    items: ["Node.js", "NestJS", "Express", "GraphQL", ".NET"],
  },
  {
    label: "Cloud & Infrastructure",
    items: ["AWS Lambda", "S3", "SES", "DynamoDB", "Cognito", "SSM"],
  },
  {
    label: "Tools & Platforms",
    items: ["Git", "SAP Spartacus", "Algolia", "Vite", "esbuild"],
  },
];

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
