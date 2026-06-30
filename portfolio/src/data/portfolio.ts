export interface Role {
  title: string;
  company: string;
  period: string;
  points: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  achievements: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

export interface SkillCategory {
  label: string;
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  issued: string;
  expires: string;
  credlyUrl?: string;
}

export interface ContactLink {
  label: string;
  href: string;
  display: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface HeroData {
  statusText: string;
  heading: string;
  subtitle: string;
  tagline: string;
  techBadges: string[];
}

export interface MetaData {
  name: string;
  title: string;
  siteUrl: string;
  siteName: string;
  locale: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  ogDescription: string;
  twitterDescription: string;
  googleVerification: string;
  resumeUrl: string;
}

export interface PortfolioData {
  meta: MetaData;
  hero: HeroData;
  about: string;
  experience: Role[];
  education: EducationEntry[];
  projects: Project[];
  skills: SkillCategory[];
  certifications: Certification[];
  contact: ContactLink[];
  navLinks: NavLink[];
}

const API_URL =
  "https://qamcukdm60.execute-api.ap-southeast-2.amazonaws.com/portfolio/sections";

const NAV_LINKS: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#certifications", label: "Certifications" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

function formatPeriod(startDate: string, endDate: string, isCurrentRole?: boolean): string {
  const format = (d: string) => {
    const [month, year] = d.split("/");
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString("en-NZ", { month: "short", year: "numeric" });
  };

  const start = format(startDate);
  const end = isCurrentRole || !endDate ? "Present" : format(endDate);
  return `${start} — ${end}`;
}

export async function fetchPortfolioData(): Promise<PortfolioData> {
  const res = await fetch(API_URL, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error(`Failed to fetch portfolio data: ${res.status}`);
  }

  const json = await res.json();

  return {
    meta: {
      name: json.seo.name,
      title: json.seo.title,
      siteUrl: json.seo.siteUrl,
      siteName: json.seo.siteName,
      locale: json.seo.locale,
      seoTitle: json.seo.seoTitle,
      seoDescription: json.seo.seoDescription,
      seoKeywords: json.seo.seoKeywords,
      ogDescription: json.seo.ogDescription,
      twitterDescription: json.seo.twitterDescription,
      googleVerification: json.seo.googleVerification,
      resumeUrl: json.seo.resumeUrl,
    },
    hero: {
      statusText: json.hero.heroStatusText,
      heading: json.hero.heroHeading,
      subtitle: json.hero.heroSubtitle,
      tagline: json.hero.heroTagline,
      techBadges: json.hero.heroTechBadges,
    },
    about: json.about.about,
    experience: json.experience.experience.map(
      (exp: { title: string; company: string; startDate: string; endDate: string; isCurrentRole?: boolean; description: string }) => ({
        title: exp.title,
        company: exp.company,
        period: formatPeriod(exp.startDate, exp.endDate, exp.isCurrentRole),
        points: exp.description.split("\n"),
      })
    ),
    education: json.education.education.map(
      (edu: { institution: string; degree: string; startDate: string; endDate: string; description: string }) => ({
        institution: edu.institution,
        degree: edu.degree,
        period: formatPeriod(edu.startDate, edu.endDate),
        achievements: edu.description.split("\n"),
      })
    ),
    projects: json.projects.projects.map(
      (proj: { title: string; description: string; tech: string[]; link?: string }) => ({
        title: proj.title,
        description: proj.description,
        tech: proj.tech,
        link: proj.link,
      })
    ),
    skills: json.skills.skills,
    certifications: json.certifications.certifications.map(
      (cert: { name: string; issuer: string; issuedDate: string; expiresDate: string; credlyUrl?: string }) => ({
        name: cert.name,
        issuer: cert.issuer,
        issued: cert.issuedDate,
        expires: cert.expiresDate,
        credlyUrl: cert.credlyUrl,
      })
    ),
    contact: json.contact.contact,
    navLinks: NAV_LINKS,
  };
}
