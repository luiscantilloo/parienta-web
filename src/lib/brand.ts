/**
 * Marca Parienta — rutas y copy de producto.
 * No usar /nara ni la palabra NARA en UI de este front.
 */
import { SITE_NAME, SITE_TAGLINE, getSiteUrl } from "@/lib/site";

export const BRAND = {
  name: SITE_NAME,
  tagline: SITE_TAGLINE,
  org: "Núcleo Care",
  programLabel: "Parienta",
  agentName: "Aurelia",
  agentRole: "asistente de Parienta",
  techLabel: "VITALIA",
  emailPlaceholder: "correo@parienta.co",
  siteHost: () => {
    try {
      return new URL(getSiteUrl()).host;
    } catch {
      return "localhost:3003";
    }
  },
} as const;

const ROOT = "/parienta";
const LEGACY = "/plateado/marca";

export type AureliaMood = "base" | "escucha" | "piensa" | "responde" | "celebra";

/** Emociones legacy TEO → estados Aurelia. */
export const TEO_TO_AURELIA: Record<string, AureliaMood> = {
  calma: "base",
  curiosidad: "escucha",
  duda: "piensa",
  energia: "celebra",
};

export const brandAsset = {
  logo: `${ROOT}/logo/parienta-horizontal-principal.svg`,
  logoClaro: `${ROOT}/logo/parienta-horizontal-una-tinta-hueso.svg`,
  logoSobreVerde: `${ROOT}/logo/parienta-horizontal-sobre-verde.svg`,
  logoSobreCrema: `${ROOT}/logo/parienta-horizontal-sobre-crema.svg`,
  logoSobreNaranja: `${ROOT}/logo/parienta-horizontal-sobre-naranja.svg`,
  logoVertical: `${ROOT}/logo/parienta-vertical-principal.svg`,
  logoVerticalSobreVerde: `${ROOT}/logo/parienta-vertical-sobre-verde.svg`,
  logoVerticalSobreCrema: `${ROOT}/logo/parienta-vertical-sobre-crema.svg`,
  isotipo: `${ROOT}/logo/parienta-simbolo-verde.svg`,
  isotipoNaranja: `${ROOT}/logo/parienta-simbolo-naranja.svg`,
  isotipoLima: `${ROOT}/logo/parienta-simbolo-lima.svg`,
  isotipoHueso: `${ROOT}/logo/parienta-simbolo-hueso.svg`,
  favicon: `${ROOT}/favicon.svg`,
  aurelia: {
    base: `${ROOT}/aurelia/aurelia-base.svg`,
    escucha: `${ROOT}/aurelia/aurelia-escucha.svg`,
    piensa: `${ROOT}/aurelia/aurelia-piensa.svg`,
    responde: `${ROOT}/aurelia/aurelia-responde.svg`,
    celebra: `${ROOT}/aurelia/aurelia-celebra.svg`,
  } satisfies Record<AureliaMood, string>,
  aureliaVerde: {
    base: `${ROOT}/aurelia/aurelia-base-verde.svg`,
    escucha: `${ROOT}/aurelia/aurelia-escucha-verde.svg`,
    piensa: `${ROOT}/aurelia/aurelia-piensa-verde.svg`,
    responde: `${ROOT}/aurelia/aurelia-responde-verde.svg`,
    celebra: `${ROOT}/aurelia/aurelia-celebra-verde.svg`,
  } satisfies Record<AureliaMood, string>,
  /** Alias TEO (rutas legacy usadas en pantallas). */
  teo: {
    calma: `${LEGACY}/teo/teo-calma.svg`,
    curiosidad: `${LEGACY}/teo/teo-curiosidad.svg`,
    duda: `${LEGACY}/teo/teo-duda.svg`,
    energia: `${LEGACY}/teo/teo-energia.svg`,
  },
  herramienta: (id: string) => `/parienta/herramientas/${id}.png`,
} as const;

/** Tres públicos · tono de voz (PPT p.32) */
export const BRAND_VOICE = {
  mayores: {
    label: "Personas mayores",
    address: "usted" as const,
    guidance: "De usted. Frases cortas. Letra grande y alto contraste.",
  },
  cuidadores: {
    label: "Cuidadores",
    address: "tú" as const,
    guidance: "De tú. Reconoce el esfuerzo antes de enseñar.",
  },
  equipo: {
    label: "Equipo y aliados",
    address: "usted" as const,
    guidance: "Claro y riguroso, sin frialdad institucional.",
  },
} as const;

/** Regla de oro Aurelia (PPT p.30) */
export const AURELIA_DISCLOSURE_ES =
  "Soy Aurelia, asistente digital de Parienta (con tecnología VITALIA). Si prefiere, en cualquier momento puede hablar con una persona del equipo.";

export const AURELIA_HANDOFF_LABEL = "Hablar con alguien";

export const AURELIA_HANDOFF_REPLY_ES =
  "Claro. Puedo orientarle aquí o conectarle con alguien del equipo Parienta. Si es urgente o prefiere voz humana, use «Hablar con alguien» o llame a su contacto de territorio.";

export function aureliaAsset(mood: AureliaMood | string, variant: "crema" | "verde" = "crema"): string {
  const key = (TEO_TO_AURELIA[mood] || mood) as AureliaMood;
  const safe: AureliaMood = brandAsset.aurelia[key as AureliaMood] ? (key as AureliaMood) : "base";
  if (variant === "verde") return `${ROOT}/aurelia/aurelia-${safe}-verde.svg`;
  return brandAsset.aurelia[safe];
}

/** Voz Aurelia / prompts: contexto Parienta. */
export const AURELIA_CONTEXT_ES =
  "Parienta, acompañamiento a personas mayores y cuidadores en Colombia (Núcleo Care). Aurelia es la asistente digital con tecnología VITALIA. Siempre se presenta como asistente digital y ofrece hablar con una persona del equipo cuando haga falta. Con mayores: de usted, frases cortas. Con cuidadores: de tú, reconoce el esfuerzo.";

/** @deprecated usar AURELIA_CONTEXT_ES */
export const TEO_CONTEXT_ES = AURELIA_CONTEXT_ES;
