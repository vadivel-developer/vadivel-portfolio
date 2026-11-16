import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import WhatsAppButton from "./components/WhatsAppButton";
import ChatWidget from "./components/ChatWidget";
import { profile, siteUrl } from "./data/portfolio";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
 metadataBase: new URL("https://vadivel-portfolio.vercel.app/"),
  title: {
    default: "Vadivel T | WordPress & HubSpot Developer",
    template: "%s | Vadivel T",
  },
  description:
    "Portfolio of Vadivel T, a web developer with 5+ years of experience in Next.js, React, WordPress, PHP and HubSpot CMS, building fast, SEO-friendly websites, MCP servers and AI-assisted development workflows.",

     verification: {
    google: "G3YZelPkyuCSEBL5YyyiBdKlfhClw4vAJX-8owMCKek",
  },
  keywords: [
    "Vadivel T",
    "Web Developer",
    "WordPress Developer",
    "HubSpot Developer",
    "HubSpot CMS Developer",
    "PHP Developer",
    "Next.js Developer",
    "React Developer",
    "SEO Developer",
    "n8n Automation",
    "MCP Server",
    "Docker Hosting",
  ],
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Vadivel T | WordPress & HubSpot Developer",
    description:
      "Portfolio of a web developer focused on Next.js, WordPress, HubSpot CMS, SEO, AI-assisted workflows and automation.",
    url: siteUrl,
    siteName: "Vadivel T Portfolio",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/og/vadivel-webdeveloper.jpg",
        width: 1200,
        height: 630,
        alt: "Vadivel T Web Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vadivel T | WordPress & HubSpot Developer",
    description:
      "Web developer focused on Next.js, WordPress, HubSpot CMS, SEO, automation and AI-assisted workflows.",
    images: ["/images/og/vadivel-webdeveloper.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
