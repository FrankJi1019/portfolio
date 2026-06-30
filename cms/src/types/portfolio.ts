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

export interface DriveFile {
  mimeType: string
  parents: string[]
  id: string
  name: string
}

export interface ResumeData {
  files: DriveFile[]
  selectedFileId: string
}

export interface NavLink {
  href: string
  label: string
}

// Backend response shapes (matches JSON structure returned by API)

export interface HeroResponse {
  heroStatusText: string
  heroHeading: string
  heroSubtitle: string
  heroTagline: string
  heroTechBadges: string[]
}

export interface AboutResponse {
  about: string
}

export interface ExperienceResponse {
  experience: Role[]
}

export interface EducationResponse {
  education: EducationEntry[]
}

export interface ProjectsResponse {
  projects: Project[]
}

export interface SkillsResponse {
  skills: SkillCategory[]
}

export interface CertificationsResponse {
  certifications: Certification[]
}

export interface ContactResponse {
  contact: ContactLink[]
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
