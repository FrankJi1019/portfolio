import type { PortfolioContent } from "../types/portfolio"

export const mockPortfolio: PortfolioContent = {
  meta: {
    name: "Frank Ji",
    title: "Front-End Developer",
    siteUrl: "https://www.frankji.com",
    siteName: "Frank Ji — Portfolio",
    locale: "en_NZ",
    seoTitle: "Frank Ji | Front-End Developer — Angular, React & TypeScript",
    seoDescription: "Frank Ji is a front-end developer in New Zealand specialising in Angular, React, TypeScript, and SAP Composable Storefront.",
    seoKeywords: ["Frank Ji", "front-end developer", "Angular developer", "React developer", "TypeScript", "New Zealand"],
    ogDescription: "Front-end developer in New Zealand building enterprise e-commerce platforms with Angular, React, and SAP Composable Storefront.",
    twitterDescription: "Front-end developer in New Zealand building enterprise e-commerce platforms and serverless applications.",
    googleVerification: "4KPYDEWwqJxCzwzysop1BZMZc7HAIVdr9EwM2LZXEVk",
    resumeUrl: "https://portfolio-218448085940-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com/Frank-Ji-CV.pdf",
  },
  hero: {
    statusText: "open_to_work",
    heading: "Frank Ji",
    subtitle: "front_end_developer",
    tagline: "I build performant, accessible web experiences — from enterprise e-commerce platforms to serverless side projects.",
    techBadges: ["Angular", "React", "TypeScript", "AWS"],
  },
  about: "I'm a front-end developer based in New Zealand with a background in software engineering from the University of Auckland. I enjoy building things that live on the web — whether that's a large-scale commerce platform serving thousands of customers or a personal tool that makes my mornings easier.\n\nDay-to-day, I work on enterprise e-commerce storefronts using Angular and SAP Composable Storefront (Spartacus), handling everything from component architecture and state management to SSR and search integration. Outside of work, I gravitate toward React, TypeScript, and AWS — building serverless apps and exploring new patterns.\n\nI care about clean code, thoughtful UX, and shipping things that actually work well for the people using them.",
  experience: [
    {
      title: "Front-End Developer",
      company: "Mitre 10",
      startDate: "02/2024",
      endDate: "",
      isCurrentRole: true,
      description: "Develop and maintain a high-traffic B2C e-commerce storefront using Angular and SAP Composable Storefront (Spartacus). Drive server-side rendering optimisation and SEO improvements. Implement Algolia-powered search experiences. Architect complex state management with NgRx and RxJS.",
    },
    {
      title: "Full-Stack Software Engineer",
      company: "CentraPass",
      startDate: "01/2022",
      endDate: "06/2023",
      isCurrentRole: false,
      description: "Delivered end-to-end features across React/Next.js front-ends and NestJS REST APIs. Designed serverless authentication flows using AWS Lambda and Cognito. Built data layers against MongoDB and PostgreSQL.",
    },
  ],
  education: [
    {
      institution: "University of Auckland",
      degree: "Bachelor of Engineering (Honours) — Software Engineering",
      startDate: "03/2019",
      endDate: "11/2023",
      description: "First Class Honours. Dean's Honour List 2021. Summer Research Scholarship 2023–2024. NZ Programming Contest — 1st place (2021), 3rd place (2022).",
    },
  ],
  projects: [
    {
      title: "Remind Me",
      description: "A serverless morning briefing system that sends a daily HTML email digest with upcoming Google Calendar events and Notion todos.",
      tech: ["TypeScript", "AWS Lambda", "SES", "DynamoDB"],
      link: "https://github.com/FrankJi1019/remin-me",
    },
  ],
  certifications: [
    {
      name: "AWS Certified AI Practitioner",
      issuer: "Amazon Web Services",
      issuedDate: "06/2025",
      expiresDate: "06/2028",
      credlyUrl: "https://www.credly.com/badges/1ba0a15f-d771-478c-8767-f3cebb419ef3/public_url",
    },
  ],
  skills: [
    { label: "Front-End", items: ["Angular", "React", "Next.js", "TypeScript", "RxJS", "NgRx", "Tailwind CSS", "SCSS"] },
    { label: "Back-End", items: ["Node.js", "NestJS", "Express", "GraphQL", ".NET"] },
    { label: "Cloud & Infrastructure", items: ["AWS Lambda", "S3", "SES", "DynamoDB", "Cognito", "SSM"] },
    { label: "Tools & Platforms", items: ["Git", "SAP Spartacus", "Algolia", "Vite", "esbuild"] },
  ],
  contact: [
    { label: "Email", href: "mailto:frankjishiyuan@gmail.com", display: "frankjishiyuan@gmail.com" },
    { label: "GitHub", href: "https://github.com/FrankJi1019", display: "github.com/FrankJi1019" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/frank-ji-1019", display: "linkedin.com/in/frank-ji-1019" },
  ],
  navLinks: [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#certifications", label: "Certifications" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ],
}
