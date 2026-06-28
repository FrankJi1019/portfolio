import data from "./portfolio.json";

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

export const META: MetaData = data.meta;
export const HERO: HeroData = data.hero;
export const ABOUT: string = data.about;
export const EXPERIENCE: Role[] = data.experience;
export const EDUCATION: EducationEntry[] = data.education;
export const PROJECTS: Project[] = data.projects;
export const SKILLS: SkillCategory[] = data.skills;
export const CERTIFICATIONS: Certification[] = data.certifications;
export const CONTACT: ContactLink[] = data.contact;
export const NAV_LINKS: NavLink[] = data.navLinks;
