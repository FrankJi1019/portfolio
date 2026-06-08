const LINKS = [
  { label: "Email", href: "mailto:frankjishiyuan@gmail.com", display: "frankjishiyuan@gmail.com" },
  { label: "GitHub", href: "https://github.com/FrankJi1019", display: "FrankJi1019" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/frank-ji-1019", display: "frank-ji-1019" },
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
            <span className="w-20 text-sm text-[var(--muted)]">{link.label}</span>
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
