export function About() {
  return (
    <section id="about" className="py-20">
      <h2 className="text-2xl font-bold">About</h2>
      <div className="mt-8 space-y-4 text-[var(--muted)] leading-relaxed max-w-2xl">
        <p>
          I&apos;m a front-end developer based in New Zealand with a background
          in software engineering from the University of Auckland. I enjoy
          building things that live on the web — whether that&apos;s a
          large-scale commerce platform serving thousands of customers or a
          personal tool that makes my mornings easier.
        </p>
        <p>
          Day-to-day, I work on enterprise e-commerce storefronts using Angular
          and SAP Composable Storefront (Spartacus), handling everything from
          component architecture and state management to SSR and search
          integration. Outside of work, I gravitate toward React, TypeScript, and
          AWS — building serverless apps and exploring new patterns.
        </p>
        <p>
          I care about clean code, thoughtful UX, and shipping things that
          actually work well for the people using them.
        </p>
      </div>
    </section>
  );
}
