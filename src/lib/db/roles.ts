/** Catálogo canónico de roles Parienta (colección `roles` + alta de cuentas). */

export const PROGRAM_ORG = "Programa Parienta";

export const NARA_ROLES = [
  {
    id: "admin",
    slug: "admin",
    name: "Administrador",
    description: "Configura el programa: territorios, equipos, usuarios, rutas, activos e informes.",
    href: "/inicio",
    nk: "admin",
  },
  {
    id: "experto",
    slug: "experto",
    name: "Gestor de campo",
    description: "Visitas, captación, listas de trabajo y revisitas.",
    href: "/experto",
    nk: null,
  },
  {
    id: "gestor",
    slug: "gestor",
    name: "Gestor de campo",
    description: "Alias de configuración (base: experto).",
    href: "/experto",
    nk: null,
    base: "experto",
  },
  {
    id: "clinico",
    slug: "clinico",
    name: "Clínica",
    description: "Casos clínicos, alertas y carga.",
    href: "/clinico",
    nk: "clin",
  },
  {
    id: "paciente",
    slug: "paciente",
    name: "Persona acompañada",
    description: "App de la persona y plan de cuidado.",
    href: "/paciente",
    nk: null,
  },
  {
    id: "persona",
    slug: "persona",
    name: "Persona acompañada",
    description: "Alias de configuración (base: paciente).",
    href: "/paciente",
    nk: null,
    base: "paciente",
  },
  {
    id: "observador",
    slug: "observador",
    name: "Observador",
    description: "Solo lectura agregada.",
    href: "/observador",
    nk: null,
  },
  {
    id: "cuidador",
    slug: "cuidador",
    name: "Cuidadora / familiar",
    description: "Resumen, citas y avisos; no ve lo clínico.",
    href: "/cuidador",
    nk: null,
  },
] as const;

/** Etiquetas del desplegable de alta de cuentas (sin aliases internos).
 *  Cuidador no se crea aquí: solo desde la ficha de persona acompañada. */
export const ACCOUNT_ROLE_LABELS = [
  "Administrador",
  "Gestor de campo",
  "Clínica",
  "Observador",
  "Persona acompañada",
] as const;

export type NaraRoleId = (typeof NARA_ROLES)[number]["id"];

/** Etiquetas UI (formas de género y alias legados) → roleId operativo. */
export const ROLE_LABEL_TO_ID: Record<string, NaraRoleId> = {
  Administrador: "admin",
  Administradora: "admin",
  "Gestor de campo": "experto",
  Gestor: "experto",
  "Experto de campo": "experto",
  "Experta de campo": "experto",
  Clínico: "clinico",
  Clínica: "clinico",
  Observador: "observador",
  "Persona acompañada": "paciente",
  Persona: "paciente",
  Paciente: "paciente",
  "Cuidadora / familiar": "cuidador",
  Cuidadora: "cuidador",
  Cuidador: "cuidador",
};

export const STAFF_ROLE_IDS: NaraRoleId[] = ["admin", "experto", "gestor", "clinico"];
export const PROGRAM_ROLE_IDS: NaraRoleId[] = [
  "admin",
  "experto",
  "gestor",
  "clinico",
  "observador",
];
export const MUTATING_ROLE_IDS: NaraRoleId[] = ["admin", "experto", "gestor", "clinico"];

export function isAdminRole(role?: string | null) {
  return !!role && /Admin/i.test(role);
}

export function isAdminRoleId(roleId?: string | null) {
  return roleId === "admin";
}

export function isGestorRole(role?: string | null) {
  return !!role && /^(Gestor de campo|Experto de campo|Experta de campo)$/i.test(role);
}

export function isPersonaRole(role?: string | null) {
  return !!role && /^(Persona acompañada|Paciente)$/i.test(role);
}

export function isCuidadorRole(role?: string | null) {
  return !!role && /Cuidador/i.test(role);
}

export function hrefForRoleId(roleId?: string | null) {
  return NARA_ROLES.find((r) => r.id === roleId)?.href || "/ingreso";
}

/** Bandeja de notificaciones: nk fijo del rol, o id de cuenta si el rol no tiene bandeja compartida. */
export function resolveNotifKey(roleId: string | null | undefined, accountId: string) {
  const role = NARA_ROLES.find((r) => r.id === roleId);
  if (!role) return accountId;
  if (role.nk) return role.nk;
  return accountId;
}

export function roleIdFromLabel(role?: string | null): NaraRoleId | null {
  if (!role) return null;
  return ROLE_LABEL_TO_ID[role] || null;
}
