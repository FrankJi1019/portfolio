interface AboutProps {
  about: string;
}

export function About({ about }: AboutProps) {
  return (
    <section id="about" className="py-20">
      <h2 className="text-2xl font-bold">About</h2>
      <div className="mt-8 space-y-4 text-[var(--muted)] leading-relaxed max-w-2xl">
        {about.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
