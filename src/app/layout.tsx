import type { Metadata, Viewport } from "next";
import { NaraProvider } from "@/providers/nara-provider";
import {
  DEFAULT_SITE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  getSiteUrl,
} from "@/lib/site";
import { bricolage, dmMono } from "@/styles/fonts";
import "@/styles/globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || DEFAULT_SITE_URL),
  title: {
    default: `${SITE_NAME} · ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Núcleo Care · Parienta" }],
  creator: "Núcleo Care",
  publisher: "Núcleo Care",
  keywords: [
    "Parienta",
    "Aurelia",
    "personas mayores",
    "cuidadores",
    "VITALIA",
    "Núcleo Care",
    "Colombia",
  ],
  category: "health",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME} · ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: {
    icon: [{ url: "/parienta/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/parienta/favicon.svg" }],
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBFAF3" },
    { media: "(prefers-color-scheme: dark)", color: "#27683A" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "Núcleo Care · Parienta",
    url: siteUrl,
    description: SITE_DESCRIPTION,
    areaServed: {
      "@type": "Country",
      name: "Colombia",
    },
    inLanguage: "es-CO",
  };

  return (
    <html
      lang="es-CO"
      className={`${bricolage.variable} ${dmMono.variable} font-texto`}
    >
      <body className={`${bricolage.className} font-texto antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NaraProvider>{children}</NaraProvider>
      </body>
    </html>
  );
}
