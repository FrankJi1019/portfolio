import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandPalette } from "@/components/command-palette";
import { TerminalModeProvider } from "@/components/terminal-mode-provider";
import { MainContent } from "@/components/main-content";
import { PortfolioDataProvider } from "@/components/portfolio-data-provider";
import { fetchPortfolioData } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await fetchPortfolioData();

  return {
    metadataBase: new URL(meta.siteUrl),
    title: meta.seoTitle,
    description: meta.seoDescription,
    keywords: meta.seoKeywords,
    authors: [{ name: meta.name, url: meta.siteUrl }],
    creator: meta.name,
    alternates: { canonical: meta.siteUrl },
    verification: { google: meta.googleVerification },
    openGraph: {
      title: meta.seoTitle,
      description: meta.ogDescription,
      url: meta.siteUrl,
      siteName: meta.siteName,
      type: "website",
      locale: meta.locale,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${meta.name} — ${meta.title} Portfolio` }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.seoTitle,
      description: meta.twitterDescription,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const portfolio = await fetchPortfolioData();
  const { meta, contact, skills } = portfolio;

  const emailContact = contact.find((c) => c.label === "Email");
  const githubContact = contact.find((c) => c.label === "GitHub");
  const linkedinContact = contact.find((c) => c.label === "LinkedIn");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: meta.name,
    url: meta.siteUrl,
    jobTitle: meta.title,
    description: `${meta.title} specialising in Angular, React, TypeScript, and enterprise e-commerce platforms.`,
    sameAs: [githubContact?.href, linkedinContact?.href].filter(Boolean),
    email: emailContact?.display,
    knowsAbout: skills.flatMap((s) => s.items),
    hasOccupation: [
      {
        "@type": "Occupation",
        name: meta.title,
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
    name: meta.siteName,
    url: meta.siteUrl,
    description: `Personal portfolio of ${meta.name}, a ${meta.title.toLowerCase()} based in New Zealand.`,
  };

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
          <PortfolioDataProvider data={portfolio}>
            <TerminalModeProvider>
              <Header />
              <CommandPalette />
              <main className="flex-1">
                <MainContent>{children}</MainContent>
              </main>
            </TerminalModeProvider>
          </PortfolioDataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
