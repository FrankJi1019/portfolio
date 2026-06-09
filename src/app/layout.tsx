import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandPalette } from "@/components/command-palette";
import { TerminalModeProvider } from "@/components/terminal-mode-provider";
import { MainContent } from "@/components/main-content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.frankji.com"),
  title: "Frank Ji | Front-End Developer",
  description:
    "Front-end developer specialising in Angular, React, and enterprise e-commerce platforms. Building performant, accessible web experiences.",
  keywords: [
    "Frank Ji",
    "front-end developer",
    "Angular developer",
    "React developer",
    "TypeScript",
    "New Zealand",
    "web developer",
    "SAP Composable Storefront",
  ],
  authors: [{ name: "Frank Ji", url: "https://www.frankji.com" }],
  creator: "Frank Ji",
  alternates: {
    canonical: "https://www.frankji.com",
  },
  verification: {
    google: "4KPYDEWwqJxCzwzysop1BZMZc7HAIVdr9EwM2LZXEVk",
  },
  openGraph: {
    title: "Frank Ji | Front-End Developer",
    description:
      "Front-end developer specialising in Angular, React, and enterprise e-commerce platforms.",
    url: "https://www.frankji.com",
    siteName: "Frank Ji",
    type: "website",
    locale: "en_NZ",
  },
  twitter: {
    card: "summary",
    title: "Frank Ji | Front-End Developer",
    description:
      "Front-end developer specialising in Angular, React, and enterprise e-commerce platforms.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Frank Ji",
  url: "https://www.frankji.com",
  jobTitle: "Front-End Developer",
  knowsAbout: [
    "Angular",
    "React",
    "TypeScript",
    "SAP Composable Storefront",
    "AWS",
    "Next.js",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "University of Auckland",
  },
  workLocation: {
    "@type": "Place",
    name: "New Zealand",
  },
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
