import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { HERO, META } from "@/data/portfolio";

export function Hero() {
  return (
    <section aria-label="Introduction" className="relative flex min-h-[60vh] flex-col justify-center py-16 sm:min-h-[calc(100vh-73px)] sm:py-20">
      <div className="mb-8 flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1.5 w-fit font-mono">
        <FontAwesomeIcon icon={faCircle} className="text-[6px] text-emerald-400 animate-[pulse-dot_2s_ease-in-out_infinite]" />
        <span className="text-xs text-accent">status: {HERO.statusText}</span>
      </div>

      <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
        <span className="name-flow bg-clip-text text-transparent">
          {HERO.heading}
        </span>
      </h1>
      <h2 className="mt-4 font-mono text-lg text-[var(--muted)] sm:text-xl">
        {HERO.subtitle}
      </h2>
      <p className="mt-6 max-w-lg text-[var(--muted)] leading-relaxed">
        {HERO.tagline}
      </p>
      <div className="mt-4 flex flex-wrap gap-3 font-mono text-xs text-[var(--muted)]">
        {HERO.techBadges.map((badge) => (
          <span key={badge} className="rounded border border-[var(--border)] px-2 py-1">{badge}</span>
        ))}
      </div>
      <div className="mt-10 flex gap-4">
        <a
          href={META.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-hover hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
        >
          View Resume
        </a>
        <a
          href="#contact"
          className="rounded-md border border-accent/50 px-5 py-2.5 text-sm font-medium text-accent transition-all hover:border-accent hover:bg-accent/10 hover:scale-105"
        >
          Get in Touch
        </a>
      </div>
      <p className="mt-6 hidden items-center gap-1.5 font-mono text-xs text-[var(--muted)] md:flex">
        Press{" "}
        <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px]">Ctrl</kbd>
        <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px]">K</kbd>
        {" "}to open command palette
      </p>
    </section>
  );
}
