import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Certifications } from "@/components/certifications";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Reveal } from "@/components/reveal";
import { fetchPortfolioData } from "@/data/portfolio";

export default async function Home() {
  const portfolio = await fetchPortfolioData();
  const { visibility } = portfolio;

  return (
    <div className="mx-auto max-w-5xl px-6">
      <Hero hero={portfolio.hero} resumeUrl={portfolio.meta.resumeUrl} isContactVisible={visibility.contact} />
      {visibility.about && <Reveal><About about={portfolio.about} /></Reveal>}
      {visibility.experience && <Reveal><Experience experience={portfolio.experience} /></Reveal>}
      {visibility.education && <Reveal><Education education={portfolio.education} /></Reveal>}
      {visibility.certifications && <Reveal><Certifications certifications={portfolio.certifications} /></Reveal>}
      {visibility.projects && <Reveal><Projects projects={portfolio.projects} /></Reveal>}
      {visibility.skills && <Reveal><Skills skills={portfolio.skills} /></Reveal>}
      {visibility.contact && <Reveal><Contact contact={portfolio.contact} /></Reveal>}
    </div>
  );
}
