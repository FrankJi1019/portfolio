import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const LINKS: { label: string; href: string; display: string; icon: IconDefinition }[] = [
  { label: "Email", href: "mailto:frankjishiyuan@gmail.com", display: "frankjishiyuan@gmail.com", icon: faEnvelope },
  { label: "GitHub", href: "https://github.com/FrankJi1019", display: "FrankJi1019", icon: faGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/frank-ji-1019", display: "frank-ji-1019", icon: faLinkedin },
];

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <h2 className="text-2xl font-bold">Get in Touch</h2>
      <p className="mt-4 max-w-lg text-[var(--muted)]">
        I&apos;m always open to interesting conversations and opportunities.
        Feel free to reach out.
      </p>
      <ul className="mt-8 space-y-3">
        {LINKS.map((link) => (
          <li key={link.label} className="flex items-center gap-3">
            <FontAwesomeIcon icon={link.icon} className="h-4 w-4 text-[var(--muted)]" />
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors hover:text-accent"
            >
              {link.display}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
