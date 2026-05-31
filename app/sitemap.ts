import type { MetadataRoute } from "next";

const siteUrl = "https://vadivel-portfolio.vercel.app";

const staticRoutes = [
  "/experience",
  "/projects",
  "/education",
  "/skills",
  "/blogs",
  "/contact",
];

const projectSlugs = [
  "wordpress-development-projects",
  "n8n-workflow-automation",
  "mcp-server-using-fastapi",
  "nextjs-website-development",
  "dynamic-website-using-php-mysql",
];

const blogSlugs = [
  "how-ai-helps-me-in-web-development",
  "vibe-coding-for-web-development",
  "ai-image-generation-for-web-development",
  "prompt-engineering-for-web-image-video-generation",
  "analytics-tools-to-improve-website-performance",
  "ai-assisted-website-testing-selenium-playwright-mcp",
  "website-hosting-explained-for-web-developers",
  "ai-security-for-web-developers",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },

    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    ...projectSlugs.map((slug) => ({
      url: `${siteUrl}/projects/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    ...blogSlugs.map((slug) => ({
      url: `${siteUrl}/blogs/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}