import localFont from "next/font/local";

/** Bricolage Grotesque — titulares ExtraBold, texto Regular (Branding/fuentes) */
export const bricolage = localFont({
  src: [
    {
      path: "../../public/parienta/fuentes/Bricolage_Grotesque_Variable.ttf",
      weight: "200 800",
      style: "normal",
    },
  ],
  variable: "--font-bricolage",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/** DM Mono — voz, datos y acentos tipográficos */
export const dmMono = localFont({
  src: [
    {
      path: "../../public/parienta/fuentes/DM_Mono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/parienta/fuentes/DM_Mono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-dm-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});
