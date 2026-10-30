import { logoForHerramienta } from "@/modules/clinico/herramientas/toolLogos";
import type { PacienteHerramientaId, PacienteHerramientaMeta } from "./types";

type ToolItem = PacienteHerramientaMeta & {
  on: boolean;
  go: () => void;
  disabled?: boolean;
};

/**
 * Grilla de las 6 herramientas en el home del paciente.
 * Mismos logos y mismas rutas que la barra inferior.
 */
export function PacienteHomeTools({ items }: { items: ToolItem[] }) {
  if (!items.length) return null;

  return (
    <section
      className="overflow-hidden rounded-2xl border border-[#C0DFC8] bg-white"
      aria-label="Herramientas"
    >
      <p className="m-0 border-b border-[#C0DFC8] bg-[#FBFAF3] px-4 py-3 font-mono text-sm font-medium uppercase tracking-[0.12em] text-[#F26B3A]">
        Herramientas
      </p>
      <div className="grid grid-cols-3 gap-2.5 p-4">
        {items.map((t) => {
          const src = logoForHerramienta(t.id as PacienteHerramientaId);
          const className = [
            "flex aspect-square flex-col items-center justify-center gap-1.5 rounded-2xl border border-[#C0DFC8] px-2 py-3 text-center font-texto",
            t.disabled
              ? "cursor-not-allowed opacity-45 grayscale"
              : "cursor-pointer bg-[#FBFAF3] transition hover:bg-[#C0DFC8]/40 active:scale-[0.98]",
            t.on && !t.disabled ? "border-[#27683A] bg-[#FDF2B3]/60" : "",
          ]
            .filter(Boolean)
            .join(" ");

          const body = (
            <>
              {src ? (
                <span className="grid size-14 place-items-center rounded-2xl bg-[#C0DFC8]/70 sm:size-16">
                  <img
                    src={src}
                    alt=""
                    className="h-10 w-10 object-contain sm:h-11 sm:w-11"
                  />
                </span>
              ) : null}
              <span className="line-clamp-2 font-mono text-[11px] font-medium leading-tight text-[#27683A] sm:text-[12px]">
                {t.navLabel}
              </span>
              {t.disabled ? (
                <span className="font-mono text-[10px] text-[#5A5A52]">
                  Próximamente
                </span>
              ) : null}
            </>
          );

          if (t.disabled) {
            return (
              <div
                key={t.id}
                className={className}
                aria-disabled
                title="Próximamente"
              >
                {body}
              </div>
            );
          }

          return (
            <button
              key={t.id}
              type="button"
              onClick={t.go}
              title={t.name}
              className={className}
            >
              {body}
            </button>
          );
        })}
      </div>
    </section>
  );
}
