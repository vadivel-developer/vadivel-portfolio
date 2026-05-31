import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Be_Vietnam_Pro, Poppins } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import { profile, siteUrl } from "./data/portfolio";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-heading",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
 metadataBase: new URL("https://vadivel-portfolio.vercel.app/"),
  title: {
    default: "Vadivel T | Web Developer Portfolio",
    template: "%s | Vadivel T",
  },
  description:
    "Web Developer Portfolio of Vadivel T, specializing in WordPress, PHP, MySQL, React, Next.js, SEO, automation, AI-assisted development, MCP servers, and Docker hosting.",
  keywords: [
    "Vadivel T",
    "Senior Web Developer",
    "WordPress Developer",
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
    title: "Vadivel T | Web Developer Portfolio",
    description:
      "Portfolio of a senior web developer focused on WordPress, PHP, React, Next.js, SEO, AI-assisted workflows and automation.",
    url: siteUrl,
    siteName: "Vadivel T Portfolio",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Vadivel T Web Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vadivel T | Web Developer Portfolio",
    description:
      "Senior Web Developer focused on WordPress, React, Next.js, SEO, automation and AI-assisted workflows.",
    images: ["/images/profile.jpg"],
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
      <body className={`${beVietnamPro.variable} ${poppins.variable}`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
