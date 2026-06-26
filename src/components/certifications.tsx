import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { CERTIFICATIONS } from "@/data/portfolio";
import { TiltCard } from "./tilt-card";

export function Certifications() {
  return (
    <section id="certifications" aria-label="Certifications" className="py-20">
      <h2 className="text-2xl font-bold">Certifications</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CERTIFICATIONS.map((cert) => (
          <TiltCard key={cert.name}>
            <a
              href={cert.credlyUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="card-glow flex h-full flex-col rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-accent"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent/10">
                  <FontAwesomeIcon icon={faCertificate} className="h-4 w-4 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-semibold leading-tight">{cert.name}</h3>
              </div>
              <p className="mt-3 text-sm text-[var(--muted)]">{cert.issuer}</p>
              <div className="mt-auto flex items-center justify-between pt-4">
                <p className="font-mono text-xs text-[var(--muted)]">
                  {cert.issued} — {cert.expires}
                </p>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3 text-accent" aria-hidden="true" />
              </div>
            </a>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
