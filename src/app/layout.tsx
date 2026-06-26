import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandPalette } from "@/components/command-palette";
import { TerminalModeProvider } from "@/components/terminal-mode-provider";
import { MainContent } from "@/components/main-content";
import { META, CONTACT, SKILLS } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const emailContact = CONTACT.find((c) => c.label === "Email");
const githubContact = CONTACT.find((c) => c.label === "GitHub");
const linkedinContact = CONTACT.find((c) => c.label === "LinkedIn");

export const metadata: Metadata = {
  metadataBase: new URL(META.siteUrl),
  title: META.seoTitle,
  description: META.seoDescription,
  keywords: META.seoKeywords,
  authors: [{ name: META.name, url: META.siteUrl }],
  creator: META.name,
  alternates: { canonical: META.siteUrl },
  verification: { google: META.googleVerification },
  openGraph: {
    title: META.seoTitle,
    description: META.ogDescription,
    url: META.siteUrl,
    siteName: META.siteName,
    type: "website",
    locale: META.locale,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${META.name} — ${META.title} Portfolio` }],
  },
  twitter: {
    card: "summary_large_image",
    title: META.seoTitle,
    description: META.twitterDescription,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: META.name,
  url: META.siteUrl,
  jobTitle: META.title,
  description: `${META.title} specialising in Angular, React, TypeScript, and enterprise e-commerce platforms.`,
  sameAs: [githubContact?.href, linkedinContact?.href].filter(Boolean),
  email: emailContact?.display,
  knowsAbout: SKILLS.flatMap((s) => s.items),
  hasOccupation: [
    {
      "@type": "Occupation",
      name: META.title,
      occupationLocation: { "@type": "Country", name: "New Zealand" },
      skills: "Angular, React, TypeScript, SAP Composable Storefront, NgRx, RxJS",
    },
  ],
  worksFor: { "@type": "Organization", name: "Mitre 10", url: "https://www.mitre10.co.nz" },
  alumniOf: { "@type": "EducationalOrganization", name: "University of Auckland", url: "https://www.auckland.ac.nz" },
  workLocation: { "@type": "Place", name: "New Zealand" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: META.siteName,
  url: META.siteUrl,
  description: `Personal portfolio of ${META.name}, a ${META.title.toLowerCase()} based in New Zealand.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.classList.add('dark')})()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <TerminalModeProvider>
            <Header />
            <CommandPalette />
            <main className="flex-1">
              <MainContent>{children}</MainContent>
            </main>
          </TerminalModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
