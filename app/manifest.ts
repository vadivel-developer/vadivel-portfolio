import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vadivel T Portfolio",
    short_name: "Vadivel.dev",
    description: "Senior Web Developer portfolio website.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#087ea4",
    icons: [
      {
        src: "/images/profile.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
