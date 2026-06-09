import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const LINKS: { label: string; href: string; icon: IconDefinition }[] = [
  { label: "Email", href: "mailto:frankjishiyuan@gmail.com", icon: faEnvelope },
  { label: "GitHub", href: "https://github.com/FrankJi1019", icon: faGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/frank-ji-1019", icon: faLinkedin },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
        <p className="text-sm text-[var(--muted)]">© 2026 Frank Ji</p>
        <div className="flex gap-6">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--muted)] transition-colors hover:text-accent flex items-center gap-1.5"
            >
              <FontAwesomeIcon icon={link.icon} className="h-4 w-4" />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
