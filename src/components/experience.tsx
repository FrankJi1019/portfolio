interface Role {
  title: string;
  company: string;
  period: string;
  points: string[];
}

const EXPERIENCE: Role[] = [
  {
    title: "Front-End Developer",
    company: "Mitre 10",
    period: "2024 — Present",
    points: [
      "Building and maintaining a B2C e-commerce storefront using Angular and SAP Composable Storefront (Spartacus).",
      "Driving SSR optimisation and SEO improvements to boost search visibility and performance.",
      "Implementing and refining Algolia-powered search experiences across product catalogue and content.",
      "Managing complex state with NgRx and RxJS across checkout, cart, and product flows.",
    ],
  },
  {
    title: "Full-Stack Software Engineer",
    company: "CentraPass",
    period: "2022 — 2023",
    points: [
      "Developed responsive web applications with React, Next.js, and TypeScript.",
      "Built REST APIs using NestJS, integrated with MongoDB and PostgreSQL.",
      "Integrated AWS Lambda and Cognito for serverless authentication flows.",
    ],
  },
  {
    title: "Graduate Teaching Assistant",
    company: "University of Auckland",
    period: "2023",
    points: [
      "Provided academic support to final-year Computer Science students.",
      "Reviewed and marked student work across .NET, front-end, and Python (Flask) topics.",
    ],
  },
];

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
