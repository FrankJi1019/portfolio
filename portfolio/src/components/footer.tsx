"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faAward } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { usePortfolioData } from "./portfolio-data-provider";

const ICONS: Record<string, IconDefinition> = {
  Email: faEnvelope,
  GitHub: faGithub,
  LinkedIn: faLinkedin,
  Credly: faAward,
};

export function Footer() {
  const { contact, meta } = usePortfolioData();

  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
        <p className="text-sm text-[var(--muted)]">© {new Date().getFullYear()} {meta.name}</p>
        <nav aria-label="Social links" className="flex gap-6">
          {contact.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--muted)] transition-colors hover:text-accent flex items-center gap-1.5"
            >
              <FontAwesomeIcon icon={ICONS[link.label]} className="h-4 w-4" />
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
