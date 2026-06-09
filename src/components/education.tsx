import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

interface Education {
  institution: string;
  degree: string;
  period: string;
  achievements: string[];
}

const EDUCATION: Education[] = [
  {
    institution: "University of Auckland",
    degree: "BSc (Honours) — Software Engineering, First Class",
    period: "Mar 2019 — Nov 2023",
    achievements: [
      "First Class Honours — Dean's Honour List 2021",
      "Summer Research Scholarship, 2023–2024",
      "NZ Programming Contest — 1st place (2021), 3rd place (2022)",
      "Southern Pacific Programming Contest, 2021",
      "ANZAC Programming Contest, 2022 — multiple rounds",
      "First-in-course: Mathematics Modelling & Fundamental of Computer Systems (2021)",
    ],
  },
  {
    institution: "Howick College",
    degree: "Secondary School",
    period: "May 2016 — Nov 2018",
    achievements: [
      "NCEA Scholarship Calculus, 2018",
      "Top student in Calculus and English Language, 2018",
      "Excellence Endorsements in Level 3 Calculus and Statistics",
    ],
  },
];

export function Education() {
  return (
    <section id="education" className="py-20">
      <h2 className="text-2xl font-bold">Education</h2>
      <div className="mt-8 space-y-10">
        {EDUCATION.map((edu) => (
          <div key={edu.institution} className="relative pl-6 border-l-2 border-[var(--border)]">
            <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-[var(--background)]" />
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faGraduationCap} className="h-4 w-4 text-accent" />
              <h3 className="font-semibold">{edu.institution}</h3>
            </div>
            <p className="mt-1 text-sm text-[var(--muted)]">{edu.degree}</p>
            <p className="font-mono text-xs text-accent">{edu.period}</p>
            <ul className="mt-3 space-y-1.5">
              {edu.achievements.map((item, i) => (
                <li key={i} className="text-sm text-[var(--muted)] leading-relaxed">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
