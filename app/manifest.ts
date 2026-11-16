import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vadivel T Portfolio",
    short_name: "Vadivel.dev",
    description: "Portfolio of Vadivel T, a WordPress and HubSpot developer.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#6a58e0",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
