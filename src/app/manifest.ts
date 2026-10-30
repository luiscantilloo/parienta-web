import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} · ${SITE_TAGLINE}`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/landing",
    display: "standalone",
    background_color: "#FBFAF3",
    theme_color: "#27683A",
    lang: "es-CO",
    icons: [
      {
        src: "/parienta/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/parienta/favicon.svg",
        sizes: "48x48",
        type: "image/svg+xml",
      },
    ],
  };
}
