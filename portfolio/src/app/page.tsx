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

  return (
    <div className="mx-auto max-w-5xl px-6">
      <Hero hero={portfolio.hero} resumeUrl={portfolio.meta.resumeUrl} />
      <Reveal><About about={portfolio.about} /></Reveal>
      <Reveal><Experience experience={portfolio.experience} /></Reveal>
      <Reveal><Education education={portfolio.education} /></Reveal>
      <Reveal><Certifications certifications={portfolio.certifications} /></Reveal>
      <Reveal><Projects projects={portfolio.projects} /></Reveal>
      <Reveal><Skills skills={portfolio.skills} /></Reveal>
      <Reveal><Contact contact={portfolio.contact} /></Reveal>
    </div>
  );
}
