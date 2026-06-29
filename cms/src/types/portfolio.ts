export interface MetaData {
  name: string
  title: string
  siteUrl: string
  siteName: string
  locale: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string[]
  ogDescription: string
  twitterDescription: string
  googleVerification: string
  resumeUrl: string
}

export interface HeroData {
  statusText: string
  heading: string
  subtitle: string
  tagline: string
  techBadges: string[]
}

export interface Role {
  title: string
  company: string
  startDate: string
  endDate: string
  isCurrentRole: boolean
  description: string
}

export interface EducationEntry {
  institution: string
  degree: string
  startDate: string
  endDate: string
  description: string
}

export interface Project {
  title: string
  description: string
  tech: string[]
  link?: string
}

export interface SkillCategory {
  label: string
  items: string[]
}

export interface Certification {
  name: string
  issuer: string
  issuedDate: string
  expiresDate: string
  credlyUrl?: string
}

export interface ContactLink {
  label: string
  href: string
  display: string
}

export interface NavLink {
  href: string
  label: string
}

export interface PortfolioContent {
  meta: MetaData
  hero: HeroData
  about: string
  experience: Role[]
  education: EducationEntry[]
  projects: Project[]
  skills: SkillCategory[]
  certifications: Certification[]
  contact: ContactLink[]
  navLinks: NavLink[]
}

export const STATUS_OPTIONS = [
  { value: "open_to_work", label: "Open to Work" },
  { value: "employed", label: "Employed" },
  { value: "freelancing", label: "Freelancing" },
  { value: "not_looking", label: "Not Looking" },
] as const
