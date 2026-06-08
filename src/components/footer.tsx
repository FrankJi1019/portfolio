const LINKS = [
  { label: "Email", href: "mailto:frankjishiyuan@gmail.com" },
  { label: "GitHub", href: "https://github.com/FrankJi1019" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/frank-ji-1019" },
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
              className="text-sm text-[var(--muted)] transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
