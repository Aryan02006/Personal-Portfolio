import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import PerformanceMonitor from '@/components/analytics/PerformanceMonitor';
import RobustAnalytics from '@/components/analytics/RobustAnalytics';
import ConditionalSpeedInsights from '@/components/analytics/ConditionalSpeedInsights';

// Fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// ✅ METADATA (cleaned)
export const metadata: Metadata = {
  title: {
    default: "Aryan Pandey - Full Stack Developer | React, Next.js, AI/ML Expert",
    template: "%s | Aryan Pandey - Full Stack Developer"
  },
  description:
    "🚀 Full Stack Developer & AI/ML Expert specializing in React, Next.js, TypeScript, and modern web technologies.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Node.js Developer",
    "AI ML Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Python",
    "Tailwind CSS",
    "Framer Motion",
  ],
  authors: [
    { name: "Aryan Pandey", url: "https://aryan01x-portfolio.vercel.app" },
  ],
  creator: "Aryan Pandey",
  publisher: "Aryan Pandey",

  metadataBase: new URL("https://aryan01x-portfolio.vercel.app"),

  alternates: {
    canonical: "https://aryan01x-portfolio.vercel.app",
  },

  openGraph: {
    type: "website",
    url: "https://aryan01x-portfolio.vercel.app",
    title: "Aryan Pandey - Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, and AI/ML.",
    siteName: "Aryan Pandey Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Aryan Pandey - Full Stack Developer",
    description: "React, Next.js, AI/ML Developer",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon/code-slash.svg",
  },

  manifest: "/site.webmanifest",
};

// ✅ VIEWPORT (FIXED — moved out of metadata)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aryan Pandey",
    url: "https://aryan01x-portfolio.vercel.app",
    jobTitle: "Full Stack Developer",
    sameAs: [
      "https://github.com/Aryan02006",
      "https://linkedin.com/in/aryan-pandey084/",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <RobustAnalytics />
      </head>

      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LoadingProvider>
            <Navbar />

            <main className="pt-16">
              {children}
            </main>

            <Footer />

            <AnalyticsProvider />
            <ConditionalSpeedInsights />
            <PerformanceMonitor />
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}