"use client";

import { useEffect, useState } from "react";
import { landingAssets } from "./assets";
import { IngresarCta, LandingFooter, LandingHeader } from "./LandingChrome";

const SERVICIOS = [
  {
    label: "Parienta en casa",
    title: "Unidades móviles y equipos en territorio.",
    detail: "Visitas cada semana · Pereira y Roldanillo",
    surface: "bg-pl-menta text-pl-verde-raiz",
    accent: "text-pl-naranja",
  },
  {
    label: "Parienta acompaña",
    title: "Valoración, plan individual y seguimiento.",
    detail: "Movilidad y bienestar",
    surface: "bg-pl-crema-sol text-pl-verde-raiz",
    accent: "text-pl-naranja",
  },
  {
    label: "Escuela Parienta",
    title: "Formación y certificación de cuidadores.",
    detail: "Talleres · acompañamiento emocional",
    surface: "bg-pl-lima text-pl-verde-raiz",
    accent: "text-pl-verde-raiz",
  },
  {
    label: "Aurelia con VITALIA",
    title: "Asistente con IA: orienta, recuerda y conecta.",
    detail: "Memoria, juego y orientación",
    surface: "bg-pl-naranja text-pl-hueso",
    accent: "text-pl-crema-sol",
  },
] as const;

const AFICHES = [
  {
    q: "¿Cómo amaneció, pariente?",
    s: "Parienta en casa · visitas cada semana",
    surface: "bg-pl-menta",
    ink: "text-pl-verde-raiz",
    dark: false,
  },
  {
    q: "El tinto sabe mejor entre parientes.",
    s: "Parienta acompaña · movilidad y bienestar",
    surface: "bg-pl-crema-sol",
    ink: "text-pl-verde-raiz",
    dark: false,
  },
  {
    q: "Pariente que cuida, pariente que se cuida.",
    s: "Escuela Parienta · talleres para cuidadores",
    surface: "bg-pl-lima",
    ink: "text-pl-verde-raiz",
    dark: false,
  },
  {
    q: "Cuénteme otra vez la del río, pariente.",
    s: "Aurelia con VITALIA · memoria y juego",
    surface: "bg-pl-verde-vivo",
    ink: "text-pl-hueso",
    dark: true,
  },
  {
    q: "Cuidar cansa. Aquí también la cuidamos.",
    s: "Escuela Parienta · acompañamiento emocional",
    surface: "bg-pl-naranja",
    ink: "text-pl-hueso",
    dark: true,
  },
  {
    q: "Escuchar también es cuidar.",
    s: "Equipo Parienta · Pereira y Roldanillo",
    surface: "bg-pl-verde-raiz",
    ink: "text-pl-crema-sol",
    dark: true,
  },
] as const;

const AURELIA_MOODS = [
  { id: "base", label: "Base", src: landingAssets.aurelia.base, verde: landingAssets.aureliaVerde.base },
  { id: "escucha", label: "Escucha", src: landingAssets.aurelia.escucha, verde: landingAssets.aureliaVerde.escucha },
  { id: "piensa", label: "Piensa", src: landingAssets.aurelia.piensa, verde: landingAssets.aureliaVerde.piensa },
  { id: "responde", label: "Responde", src: landingAssets.aurelia.responde, verde: landingAssets.aureliaVerde.responde },
  { id: "celebra", label: "Celebra", src: landingAssets.aurelia.celebra, verde: landingAssets.aureliaVerde.celebra },
] as const;

const PUBLICOS = [
  {
    label: "Personas mayores",
    quote: "Don Jaime, el martes vamos a su casa.",
    note: "De usted. Frases cortas. Letra grande y alto contraste.",
    surface: "bg-pl-menta",
  },
  {
    label: "Cuidadores",
    quote: "Cuidar cansa. Aquí también te cuidamos a ti.",
    note: "De tú. Reconoce el esfuerzo antes de enseñar.",
    surface: "bg-pl-crema-sol",
  },
  {
    label: "Equipo y aliados",
    quote: "Evidencia que vuelve al territorio.",
    note: "Claro y riguroso, sin frialdad institucional.",
    surface: "bg-pl-lima",
  },
] as const;

const NIVELES = [
  "Tecnológico",
  "Atención territorial",
  "Caracterización",
  "Intervención",
  "Formadores",
  "Recuperación integral",
  "Gestión del conocimiento",
  "Escalabilidad",
] as const;

function BrandLine({ className = "", stroke = "#F26B3A" }: { className?: string; stroke?: string }) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 600 200" fill="none">
      <path
        d="M20 40 C 120 20, 180 90, 260 110 C 340 130, 400 80, 480 100 C 520 110, 560 140, 580 170"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LandingScreen() {
  const [mood, setMood] = useState<(typeof AURELIA_MOODS)[number]["id"]>("base");
  const activeMood = AURELIA_MOODS.find((m) => m.id === mood) ?? AURELIA_MOODS[0];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    root.style.scrollSnapType = "y mandatory";
    root.style.scrollBehavior = reduce ? "auto" : "smooth";

    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let io: IntersectionObserver | undefined;

    if (!reduce && "IntersectionObserver" in window) {
      reveals.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(18px)";
        el.style.transition = "opacity .8s ease, transform .8s ease";
        el.style.transitionDelay = `${el.dataset.delay || 0}ms`;
      });
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const t = e.target as HTMLElement;
            if (!e.isIntersecting) {
              t.style.opacity = "0";
              t.style.transform = "translateY(22px)";
              return;
            }
            t.style.opacity = "1";
            t.style.transform = "none";
          });
        },
        { threshold: 0.1 },
      );
      reveals.forEach((el) => io!.observe(el));
    }

    return () => {
      io?.disconnect();
      root.style.scrollSnapType = "";
      root.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="min-h-svh overflow-x-clip bg-pl-hueso font-texto text-pl-verde-raiz">
      <LandingHeader />

      <main>
        {/* 01 Hero — verde raíz + lima + naranja */}
        <section
          id="inicio"
          className="relative flex min-h-svh snap-start snap-always flex-col justify-end overflow-hidden bg-pl-verde-raiz px-[clamp(16px,6vw,96px)] pb-16 pt-[120px]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 22%, #E0DB55 0%, transparent 42%), radial-gradient(circle at 88% 18%, #F26B3A 0%, transparent 38%), radial-gradient(circle at 70% 78%, #C0DFC8 0%, transparent 45%)",
            }}
          />
          <BrandLine
            className="pointer-events-none absolute -right-8 top-24 h-[42%] w-[58%] opacity-70 motion-safe:animate-[pl-pulse_9s_ease-in-out_infinite]"
            stroke="#E0DB55"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-pl-lima via-pl-naranja to-pl-menta"
          />

          <div data-reveal="" className="relative z-10 flex max-w-[740px] flex-col gap-5">
            <img
              src={landingAssets.logoClaro}
              alt="Parienta"
              className="h-[clamp(48px,8vw,72px)] w-auto self-start"
            />
            <h1 className="text-balance font-titulos text-[clamp(30px,5vw,52px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-pl-hueso">
              No hace falta ser familia para sentirse parte.
            </h1>
            <p className="max-w-[34rem] text-pretty font-mono text-[clamp(16px,1.8vw,20px)] leading-[1.5] text-pl-crema-sol">
              Hola, pariente. Acompañamos a mayores y a quienes cuidan — en casa, en la Escuela y con
              Aurelia.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <IngresarCta />
              <a
                href="#aurelia"
                className="inline-flex min-h-14 items-center rounded-md border-2 border-[#E0DB55] bg-transparent px-6 font-texto text-[18px] font-bold !text-[#E0DB55] transition hover:bg-[#E0DB55] hover:!text-[#27683A]"
              >
                Conocer a Aurelia
              </a>
            </div>
          </div>
        </section>

        {/* 02 Concepto */}
        <section className="relative flex min-h-svh snap-start snap-always items-center overflow-hidden bg-pl-menta px-[clamp(16px,6vw,96px)] pb-16 pt-[110px]">
          <BrandLine
            className="pointer-events-none absolute -left-10 bottom-10 w-[50%] opacity-50"
            stroke="#27683A"
          />
          <div className="relative z-10 mx-auto grid w-full max-w-[1100px] gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.2fr)] md:items-center">
            <div data-reveal="" className="relative mx-auto w-full max-w-[300px]">
              <div className="absolute -inset-6 rounded-full bg-pl-crema-sol/70 blur-2xl" />
              <img
                src={landingAssets.simbolo}
                alt=""
                aria-hidden
                className="relative w-full motion-safe:animate-[pl-pulse_7s_ease-in-out_infinite]"
              />
            </div>
            <div data-reveal="" className="flex flex-col gap-5">
              <p className="font-mono text-sm font-medium uppercase tracking-[0.16em] text-pl-naranja">
                La línea que acompaña
              </p>
              <h2 className="text-balance font-titulos text-[clamp(30px,4.2vw,48px)] font-extrabold leading-[1.12] text-pl-verde-raiz">
                Una sola línea que no se corta.
              </h2>
              <p className="text-pretty font-texto text-[clamp(18px,1.8vw,22px)] leading-[1.55] text-pl-verde-raiz/80">
                Une a quien necesita cuidado y a quien cuida. Recorre el modelo y dibuja a cada
                pariente. No habla de un servicio: habla de pertenecer.
              </p>
              <p className="font-mono text-[14px] leading-snug text-pl-verde-raiz/70">
                Dos cabezas · un abrazo · un nudo infinito. El cuidado va en las dos direcciones.
              </p>
            </div>
          </div>
        </section>

        {/* 04 Servicios — cada uno con color de marca */}
        <section className="flex min-h-svh snap-start snap-always flex-col justify-center gap-10 bg-pl-hueso px-[clamp(16px,5vw,80px)] py-24">
          <div data-reveal="" className="mx-auto max-w-[40rem] text-center">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.16em] text-pl-naranja">
              Una marca, cuatro servicios
            </p>
            <h2 className="mt-3 text-balance font-titulos text-[clamp(30px,4.5vw,48px)] font-extrabold leading-[1.12] text-pl-verde-raiz">
              Entre parientes nos cuidamos.
            </h2>
          </div>
          <div className="mx-auto grid w-full max-w-[1200px] gap-4 md:grid-cols-2">
            {SERVICIOS.map((s, i) => (
              <article
                key={s.label}
                data-reveal=""
                data-delay={String(i * 90)}
                className={`flex min-h-[220px] flex-col justify-between gap-4 rounded-[28px] p-8 ${s.surface}`}
              >
                <p className={`font-mono text-sm font-medium uppercase tracking-[0.12em] ${s.accent}`}>
                  {s.label}
                </p>
                <div>
                  <p className="font-titulos text-[clamp(22px,2.2vw,28px)] font-extrabold leading-[1.2]">
                    {s.title}
                  </p>
                  <p className="mt-3 font-mono text-[14px] opacity-80">{s.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 05 Campaña afiches — bloques de color del PDF */}
        <section className="flex min-h-svh snap-start snap-always flex-col justify-center gap-10 bg-pl-crema-sol px-[clamp(16px,5vw,80px)] py-24">
          <div data-reveal="" className="mx-auto max-w-[36rem] text-center">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.16em] text-pl-naranja">
              Campaña Los Parientes
            </p>
            <h2 className="mt-3 text-balance font-titulos text-[clamp(30px,4.5vw,48px)] font-extrabold leading-[1.12] text-pl-verde-raiz">
              La línea llega a cada pariente y le da voz.
            </h2>
          </div>
          <div className="mx-auto grid w-full max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AFICHES.map((a, i) => (
              <article
                key={a.q}
                data-reveal=""
                data-delay={String(i * 70)}
                className={`relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[24px] p-7 ${a.surface} ${a.ink}`}
              >
                <img
                  src={a.dark ? landingAssets.logoClaro : landingAssets.logo}
                  alt=""
                  aria-hidden
                  className="h-7 w-auto self-start"
                />
                <div>
                  <p className="font-titulos text-[clamp(22px,2.2vw,28px)] font-extrabold leading-[1.2]">
                    {a.q}
                  </p>
                  <p className="mt-4 font-mono text-[13px] opacity-85">{a.s}</p>
                </div>
                <svg
                  aria-hidden
                  className="pointer-events-none absolute -bottom-4 -right-4 h-28 w-40 opacity-40"
                  viewBox="0 0 160 100"
                  fill="none"
                >
                  <path
                    d="M10 70 C 40 20, 90 20, 120 50 C 140 70, 145 85, 150 95"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </article>
            ))}
          </div>
        </section>

        {/* 05b Fotografía + línea (PPT p.33) — viewport completo; el verde de abajo es Aurelia */}
        <section className="relative flex min-h-svh snap-start snap-always items-center overflow-hidden bg-[#1a1a18]">
          <div className="absolute inset-0">
            <img
              src={landingAssets.canal1Jpg}
              alt=""
              className="h-full w-full scale-105 object-cover grayscale contrast-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-pl-verde-raiz/45 via-pl-verde-raiz/30 to-[#1a1a18]/80" />
          </div>
          <BrandLine
            className="pointer-events-none absolute inset-x-[6%] top-[12%] z-10 h-[76%] w-[88%] opacity-95"
            stroke="#E0DB55"
          />
          <div data-reveal="" className="relative z-10 mx-auto flex min-h-svh w-full max-w-[40rem] flex-col items-center justify-center px-[clamp(16px,6vw,96px)] py-28 text-center">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.16em] text-pl-lima">
              Fotografía + línea
            </p>
            <h2 className="mt-3 text-balance font-titulos text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.12] text-pl-hueso">
              Blanco y negro, un objeto en color, la línea encima.
            </h2>
            <p className="mt-4 font-mono text-[15px] leading-snug text-pl-crema-sol">
              La misma línea que une a los parientes rodea y abraza a las personas.
            </p>
          </div>
        </section>

        {/* 06 Aurelia — verde raíz + mock celular */}
        <section
          id="aurelia"
          className="flex min-h-svh snap-start snap-always items-center bg-pl-verde-raiz px-[clamp(16px,6vw,96px)] py-24 text-pl-hueso"
        >
          <div className="mx-auto grid w-full max-w-[1100px] gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div data-reveal="" className="flex flex-col gap-5">
              <p className="font-mono text-sm font-medium uppercase tracking-[0.16em] text-pl-lima">
                Aurelia · con tecnología VITALIA
              </p>
              <h2 className="text-balance font-titulos text-[clamp(32px,4.5vw,50px)] font-extrabold leading-[1.1]">
                Hola, soy Aurelia.
              </h2>
              <p className="max-w-[36rem] text-pretty font-texto text-[20px] leading-[1.55] text-pl-menta">
                La pariente que siempre contesta. Habla como un pariente, no como un sistema. Siempre
                dice que es digital y, si hace falta, pasa con una persona del equipo.
              </p>

              <div className="mt-2 flex flex-wrap items-end gap-4">
                <div className="flex h-28 w-28 items-center justify-center rounded-[22px] border border-pl-lima/30 bg-pl-verde-vivo/40">
                  <img
                    key={activeMood.id}
                    src={activeMood.verde}
                    alt={`Aurelia · ${activeMood.label}`}
                    className="h-[78%] w-[78%] object-contain"
                  />
                </div>
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Estados de Aurelia">
                  {AURELIA_MOODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      role="tab"
                      aria-selected={mood === m.id}
                      onClick={() => setMood(m.id)}
                      className={`min-h-11 rounded-md px-3.5 font-mono text-sm font-medium transition ${
                        mood === m.id
                          ? "bg-pl-naranja text-pl-hueso"
                          : "bg-pl-hueso/10 text-pl-menta hover:bg-pl-hueso/20"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mock celular — p.31 */}
            <div data-reveal="" className="mx-auto w-full max-w-[340px]">
              <div className="overflow-hidden rounded-[32px] border-[3px] border-pl-lima/40 bg-pl-hueso text-pl-verde-raiz shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
                <div className="flex items-center gap-3 border-b border-pl-linea bg-pl-menta px-4 py-3">
                  <img src={landingAssets.aurelia.base} alt="" className="h-10 w-10" />
                  <div>
                    <p className="font-titulos text-[15px] font-bold leading-none">Aurelia</p>
                    <p className="mt-1 font-mono text-[11px] text-pl-texto2">asistente de Parienta</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 px-4 py-4 font-texto text-[15px] leading-snug">
                  <div className="max-w-[90%] rounded-[4px_16px_16px_16px] bg-pl-menta px-3.5 py-2.5">
                    ¡Buenos días, Doña Gloria! ¿Cómo amaneció?
                  </div>
                  <div className="ml-auto max-w-[85%] rounded-[16px_4px_16px_16px] bg-pl-crema-sol px-3.5 py-2.5">
                    Bien, mija. ¿Cuándo viene la visita?
                  </div>
                  <div className="max-w-[92%] rounded-[4px_16px_16px_16px] bg-pl-menta px-3.5 py-2.5">
                    El martes a las 9 llega Parienta en casa. ¿Le recuerdo el lunes?
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="rounded-full bg-pl-naranja px-3.5 py-2 font-mono text-[12px] font-medium text-pl-hueso">
                      Sí, recuérdeme
                    </span>
                    <span className="rounded-full border border-pl-verde-raiz/30 px-3.5 py-2 font-mono text-[12px] text-pl-verde-raiz">
                      Hablar con alguien
                    </span>
                  </div>
                </div>
                <div className="border-t border-pl-linea bg-pl-hueso px-4 py-3">
                  <p className="rounded-full bg-pl-menta/60 px-4 py-2.5 font-mono text-[13px] text-pl-texto2">
                    Escriba aquí…
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 07 Tres públicos */}
        <section className="flex min-h-svh snap-start snap-always flex-col justify-center gap-10 bg-pl-hueso px-[clamp(16px,5vw,80px)] py-24">
          <div data-reveal="" className="mx-auto max-w-[36rem] text-center">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.16em] text-pl-naranja">
              Tres públicos, una voz
            </p>
            <h2 className="mt-3 text-balance font-titulos text-[clamp(30px,4.5vw,48px)] font-extrabold leading-[1.12] text-pl-verde-raiz">
              Cada pariente, con el tono que merece.
            </h2>
          </div>
          <div className="mx-auto grid w-full max-w-[1100px] gap-4 md:grid-cols-3">
            {PUBLICOS.map((p, i) => (
              <article
                key={p.label}
                data-reveal=""
                data-delay={String(i * 100)}
                className={`flex min-h-[260px] flex-col justify-between rounded-[24px] p-7 ${p.surface}`}
              >
                <p className="font-mono text-sm font-medium uppercase tracking-[0.12em] text-pl-naranja">
                  {p.label}
                </p>
                <p className="font-titulos text-[clamp(22px,2vw,26px)] font-extrabold leading-[1.25] text-pl-verde-raiz">
                  {p.quote}
                </p>
                <p className="font-mono text-[14px] text-pl-verde-raiz/75">{p.note}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 08 Modelo — ocho niveles sobre verde vivo */}
        <section className="flex min-h-svh snap-start snap-always flex-col justify-center gap-10 bg-pl-verde-vivo px-[clamp(16px,5vw,80px)] py-24 text-pl-hueso">
          <div data-reveal="" className="mx-auto max-w-[40rem] text-center">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.16em] text-pl-lima">
              La línea recorre el modelo
            </p>
            <h2 className="mt-3 text-balance font-titulos text-[clamp(30px,4.5vw,48px)] font-extrabold leading-[1.12]">
              Ocho niveles, una sola línea.
            </h2>
          </div>
          <ol className="mx-auto grid w-full max-w-[1100px] list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {NIVELES.map((n, i) => (
              <li
                key={n}
                data-reveal=""
                data-delay={String(i * 50)}
                className="flex items-start gap-3 rounded-2xl bg-pl-verde-raiz/35 px-4 py-4"
              >
                <span className="font-mono text-lg font-medium text-pl-lima">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-titulos text-[17px] font-bold leading-snug">{n}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 09 Cierre — naranja abrazo */}
        <section className="relative flex min-h-svh snap-start snap-always flex-col">
          <div className="relative flex flex-1 items-center overflow-hidden bg-pl-naranja px-[clamp(16px,7vw,120px)] py-24">
            <BrandLine
              className="pointer-events-none absolute -right-16 top-10 h-[55%] w-[60%] opacity-40"
              stroke="#FDF2B3"
            />
            <div data-reveal="" className="relative z-10 flex max-w-[560px] flex-col gap-5">
              <h2 className="text-balance font-titulos text-[clamp(34px,5vw,54px)] font-extrabold leading-[1.08] text-pl-hueso">
                Cuidar y ser cuidado.
              </h2>
              <p className="text-pretty font-mono text-[clamp(16px,1.8vw,20px)] leading-[1.5] text-pl-crema-sol">
                Sus datos son suyos. Usted decide quién los ve. Ley 1581 de 2012.
              </p>
              <div className="pt-2">
                <IngresarCta tone="verde" />
              </div>
            </div>
          </div>
          <LandingFooter />
        </section>
      </main>
    </div>
  );
}
