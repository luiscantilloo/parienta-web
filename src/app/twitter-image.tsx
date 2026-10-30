import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${SITE_NAME} · ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  const [extraBold, mono] = await Promise.all([
    readFile(join(process.cwd(), "public/parienta/fuentes/BricolageGrotesque-ExtraBold.ttf")),
    readFile(join(process.cwd(), "public/parienta/fuentes/DM_Mono-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #FBFAF3 0%, #C0DFC8 45%, #27683A 160%)",
          padding: 64,
          fontFamily: "Bricolage Grotesque",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#F26B3A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
              color: "#FBFAF3",
            }}
          >
            P
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#27683A",
              letterSpacing: "-0.02em",
            }}
          >
            {SITE_NAME}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 900 }}>
          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: "#222220",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {SITE_TAGLINE}
          </div>
          <div style={{ fontSize: 22, color: "#5A5A52", fontFamily: "DM Mono" }}>
            Aurelia · con tecnología VITALIA
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage Grotesque", data: extraBold, style: "normal", weight: 800 },
        { name: "DM Mono", data: mono, style: "normal", weight: 500 },
      ],
    },
  );
}
