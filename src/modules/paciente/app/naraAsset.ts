/**
 * Resuelve assets de marca Parienta.
 * Acepta rutas legadas (nara-*, plateado/*, teo-*) y las mapea a Parienta / Aurelia.
 */
const LEGACY_FILE: Record<string, string> = {
  "nara-isotipo.svg": "parienta-simbolo-verde.svg",
  "nara-logo.svg": "parienta-horizontal-principal.svg",
  "nara-logo-negativo.svg": "parienta-horizontal-una-tinta-hueso.svg",
  "plateado-isotipo.svg": "parienta-simbolo-verde.svg",
  "plateado-logo.svg": "parienta-horizontal-principal.svg",
  "plateado-logo-claro.svg": "parienta-horizontal-una-tinta-hueso.svg",
  "nara-calma.svg": "aurelia-base.svg",
  "nara-curiosidad.svg": "aurelia-escucha.svg",
  "nara-duda.svg": "aurelia-piensa.svg",
  "nara-energia.svg": "aurelia-celebra.svg",
  "teo-calma.svg": "aurelia-base.svg",
  "teo-curiosidad.svg": "aurelia-escucha.svg",
  "teo-duda.svg": "aurelia-piensa.svg",
  "teo-energia.svg": "aurelia-celebra.svg",
  "teo-isotipo.svg": "aurelia-base.svg",
};

const TEO_MOOD: Record<string, string> = {
  calma: "base",
  curiosidad: "escucha",
  duda: "piensa",
  energia: "celebra",
};

function mapLegacySegment(seg: string): string {
  return LEGACY_FILE[seg] || seg;
}

function rewritePath(path: string): string {
  let p = path.replace(/^\/+/, "");

  // Prefijos legacy → parienta
  if (p.startsWith("nara/")) p = `parienta/${p.slice("nara/".length)}`;
  if (p.startsWith("plateado/marca/")) p = `parienta/${p.slice("plateado/marca/".length)}`;
  if (p.startsWith("plateado/") && !p.startsWith("plateado/herramientas/") && !p.startsWith("plateado/recursos/")) {
    p = `parienta/${p.slice("plateado/".length)}`;
  }

  if (
    !p.startsWith("parienta/") &&
    !p.startsWith("plateado/") &&
    !p.startsWith("marca/") &&
    !p.startsWith("recursos/") &&
    !p.startsWith("herramientas/")
  ) {
    p = `marca/${p}`;
  }
  if (p.startsWith("marca/")) p = `parienta/${p.slice("marca/".length)}`;
  if (!p.startsWith("parienta/") && !p.startsWith("plateado/")) p = `parienta/${p}`;

  // personajes / teo emotions → aurelia moods
  p = p.replace(
    /(?:marca\/)?(?:personajes|teo)\/(?:nara|teo)-(calma|curiosidad|duda|energia)\.svg/,
    (_, emo: string) => `aurelia/aurelia-${TEO_MOOD[emo] || "base"}.svg`,
  );
  p = p.replace(
    /parienta\/(?:personajes|teo)\/(?:nara|teo)-(calma|curiosidad|duda|energia)\.svg/,
    (_, emo: string) => `parienta/aurelia/aurelia-${TEO_MOOD[emo] || "base"}.svg`,
  );

  // logos plateado/nara → parienta
  p = p.replace(/parienta\/logo\/(?:nara-isotipo|plateado-isotipo)\.svg/, "parienta/logo/parienta-simbolo-verde.svg");
  p = p.replace(
    /parienta\/logo\/(?:nara-logo|plateado-logo)(-negativo|-claro)?\.svg/,
    (_, neg) =>
      neg
        ? "parienta/logo/parienta-horizontal-una-tinta-hueso.svg"
        : "parienta/logo/parienta-horizontal-principal.svg",
  );
  p = p.replace(/parienta\/logo\/teo-isotipo\.svg/, "parienta/aurelia/aurelia-base.svg");

  // teo folder under parienta
  p = p.replace(
    /parienta\/teo\/teo-(calma|curiosidad|duda|energia)\.svg/,
    (_, emo: string) => `parienta/aurelia/aurelia-${TEO_MOOD[emo] || "base"}.svg`,
  );

  const parts = p.split("/");
  const last = parts[parts.length - 1]!;
  parts[parts.length - 1] = mapLegacySegment(last);

  // If mapped to aurelia-* but still under logo/, fix folder
  const mapped = parts[parts.length - 1]!;
  if (mapped.startsWith("aurelia-") && parts.includes("logo")) {
    return `/parienta/aurelia/${mapped}`;
  }
  if (mapped.startsWith("parienta-") && parts.includes("teo")) {
    return `/parienta/logo/${mapped}`;
  }
  if (mapped.startsWith("aurelia-") && !parts.includes("aurelia")) {
    return `/parienta/aurelia/${mapped}`;
  }

  return "/" + parts.join("/");
}

export function naraAsset(path: string): string {
  if (!path) return path;
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) {
    if (
      path.startsWith("/nara/") ||
      path.startsWith("/plateado/marca/") ||
      path.includes("nara-") ||
      path.includes("plateado-") ||
      path.includes("/personajes/") ||
      path.includes("/teo/")
    ) {
      return rewritePath(path);
    }
    return path;
  }
  return rewritePath(path);
}
