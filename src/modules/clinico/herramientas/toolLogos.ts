/** Logos de las casillas de Herramientas (ficha clínico / app paciente). */
export const HERRAMIENTA_LOGOS: Record<string, string> = {
  mood: "/parienta/herramientas/mood.png",
  clin: "/parienta/herramientas/clin.png",
  ia: "/parienta/aurelia/aurelia-base.svg",
  juegos: "/parienta/herramientas/juegos.svg",
};

export function logoForHerramienta(id: string): string | undefined {
  return HERRAMIENTA_LOGOS[id];
}
