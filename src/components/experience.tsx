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
    period: "Feb 2024 — Present",
    points: [
      "Develop and maintain a high-traffic B2C e-commerce storefront using Angular and SAP Composable Storefront (Spartacus).",
      "Drive server-side rendering optimisation and SEO improvements, boosting organic search visibility.",
      "Implement Algolia-powered search experiences across product catalogue and content pages.",
      "Architect complex state management with NgRx and RxJS across checkout, cart, and product domains.",
    ],
  },
  {
    title: "Graduate Teaching Assistant",
    company: "University of Auckland",
    period: "Jul 2023 — Nov 2023",
    points: [
      "Mentored final-year Computer Science students across .NET, front-end, and Python (Flask).",
      "Reviewed and graded coursework, providing detailed technical feedback.",
    ],
  },
  {
    title: "Tutor",
    company: "YouTutor Ltd.",
    period: "Aug 2023 — Nov 2023",
    points: [
      "Provided academic support to Computer Science students.",
      "Taught Object-Oriented Programming and Java concepts.",
    ],
  },
  {
    title: "Full-Stack Software Engineer",
    company: "CentraPass",
    period: "Jan 2022 — Jun 2023",
    points: [
      "Delivered end-to-end features across React/Next.js front-ends and NestJS REST APIs.",
      "Designed and integrated serverless authentication flows using AWS Lambda and Cognito.",
      "Built data layers against MongoDB and PostgreSQL, handling schema design and query optimisation.",
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
