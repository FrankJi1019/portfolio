import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { TypingText } from "./typing-text";

export function Hero() {
  return (
    <section className="relative flex min-h-[60vh] flex-col justify-center py-16 sm:min-h-[calc(100vh-73px)] sm:py-20">
      {/* Status badge */}
      <div className="mb-8 flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1.5 w-fit font-mono">
        <FontAwesomeIcon icon={faCircle} className="text-[6px] text-emerald-400 animate-[pulse-dot_2s_ease-in-out_infinite]" />
        <span className="text-xs text-accent">status: open_to_work</span>
      </div>

      <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
        <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
          Frank Ji
        </span>
      </h1>
      <h2 className="mt-4 font-mono text-lg text-[var(--muted)] sm:text-xl">
        <TypingText />
      </h2>
      <p className="mt-6 max-w-lg text-[var(--muted)] leading-relaxed">
        I build performant, accessible web experiences — from enterprise
        e-commerce platforms to serverless side projects.
      </p>
      <div className="mt-4 flex flex-wrap gap-3 font-mono text-xs text-[var(--muted)]">
        <span className="rounded border border-[var(--border)] px-2 py-1">Angular</span>
        <span className="rounded border border-[var(--border)] px-2 py-1">React</span>
        <span className="rounded border border-[var(--border)] px-2 py-1">TypeScript</span>
        <span className="rounded border border-[var(--border)] px-2 py-1">AWS</span>
      </div>
      <div className="mt-10 flex gap-4">
        <a
          href="#projects"
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-hover hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
        >
          View Projects
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
