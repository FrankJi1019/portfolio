import { ABOUT } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="py-20">
      <h2 className="text-2xl font-bold">About</h2>
      <div className="mt-8 space-y-4 text-[var(--muted)] leading-relaxed max-w-2xl">
        {ABOUT.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
