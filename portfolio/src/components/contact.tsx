import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faAward } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { CONTACT } from "@/data/portfolio";

const ICONS: Record<string, typeof faEnvelope> = {
  Email: faEnvelope,
  GitHub: faGithub,
  LinkedIn: faLinkedin,
  Credly: faAward,
};

export function Contact() {
  return (
    <section id="contact" aria-label="Contact information" className="py-20">
      <h2 className="text-2xl font-bold">Get in Touch</h2>
      <p className="mt-4 max-w-lg text-[var(--muted)]">
        I&apos;m always open to interesting conversations and opportunities.
        Feel free to reach out.
      </p>
      <ul className="mt-8 space-y-3">
        {CONTACT.map((link) => (
          <li key={link.label} className="flex items-center gap-3">
            <FontAwesomeIcon icon={ICONS[link.label]} className="h-4 w-4 text-[var(--muted)]" />
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
