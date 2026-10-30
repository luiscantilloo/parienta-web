import Link from "next/link";
import { landingAssets } from "./assets";

export function LandingHeader({
  logoSrc = landingAssets.logoSobreCrema,
  sticky = false,
}: {
  logoSrc?: string;
  sticky?: boolean;
}) {
  return (
    <header
      className={`${sticky ? "sticky" : "fixed"} inset-x-0 top-0 z-50 border-b border-[#27683A]/10 bg-[#FBFAF3]/92 backdrop-blur-md`}
    >
      <div className="flex items-center justify-between gap-4 px-[clamp(16px,4vw,48px)] py-3">
        <Link href="/landing" aria-label="Parienta, ir al inicio" className="flex py-1">
          <img src={logoSrc} alt="Parienta" className="h-[40px] w-auto min-w-[148px]" />
        </Link>
        <Link
          href="/ingreso"
          className="inline-flex min-h-14 items-center justify-center rounded-md bg-[#F26B3A] px-7 font-texto text-lg font-bold !text-[#FBFAF3] transition hover:bg-[#e05a2a]"
        >
          Ingresar
        </Link>
      </div>
    </header>
  );
}

export function LandingFooter() {
  return (
    <footer className="relative z-10 snap-end border-t border-[#C0DFC8] bg-[#27683A] px-[clamp(16px,6vw,96px)] py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-3">
          <img
            src={landingAssets.logoClaro}
            alt="Parienta"
            className="h-8 w-auto self-start"
          />
          <p className="max-w-xl font-mono text-sm leading-snug !text-[#C0DFC8]">
            Cuidar y ser cuidado · Núcleo Care · con tecnología VITALIA
          </p>
        </div>
        <nav aria-label="Enlaces legales" className="flex flex-wrap gap-x-6 gap-y-2">
          <Link
            href="/landing/privacidad"
            className="inline-flex min-h-11 items-center font-texto text-base font-medium !text-[#FBFAF3] underline-offset-4 hover:underline"
          >
            Política de privacidad
          </Link>
          <Link
            href="/landing/tratamiento-de-datos"
            className="inline-flex min-h-11 items-center font-texto text-base font-medium !text-[#FBFAF3] underline-offset-4 hover:underline"
          >
            Tratamiento de datos
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export function IngresarCta({
  className = "",
  tone = "naranja",
}: {
  className?: string;
  tone?: "naranja" | "verde";
}) {
  const tones =
    tone === "verde"
      ? "bg-[#27683A] hover:bg-[#359A54]"
      : "bg-[#F26B3A] hover:bg-[#e05a2a]";
  return (
    <Link
      href="/ingreso"
      className={`inline-flex min-h-14 items-center justify-center rounded-md px-8 font-texto text-[19px] font-bold !text-[#FBFAF3] transition ${tones} ${className}`}
    >
      Ingresar
    </Link>
  );
}
