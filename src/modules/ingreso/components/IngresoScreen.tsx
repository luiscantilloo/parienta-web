"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NaraMsgAlert } from "@/components/shared/nara-alert/NaraMsgAlert";
import { BRAND } from "@/lib/brand";
import { applySessionUser } from "@/lib/auth/applySessionUser";
import { ensureSession } from "@/lib/auth/ensureSession";
import { passwordPolicyError } from "@/lib/auth/passwordPolicy";
import { apiJson } from "@/lib/api/client";
import { hydrateProgramData } from "@/lib/store/hydrateProgram";
import { useNaraStore } from "@/providers/nara-provider";

type LoginUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  roleId: string;
  terr: string;
  org: string;
  contact: string;
  status: string;
  href: string;
  nk: string | null;
};

// SPEC-01 mínima: «olvido» solo informa a quién pedir ayuda; «cambiar» crea la clave nueva tras una clave temporal.
type Mode = "login" | "olvido" | "cambiar";

const labelClass =
  "flex flex-col gap-1.5 font-texto text-[15px] font-medium text-[#27683A]";
const primaryBtnClass =
  "inline-flex h-14 w-full cursor-pointer items-center justify-center rounded-md border-0 bg-[#F26B3A] font-texto text-[18px] font-bold !text-[#FBFAF3] transition hover:bg-[#e05a2a] disabled:cursor-wait disabled:opacity-70";
const linkBtnClass =
  "cursor-pointer self-center border-0 bg-transparent p-0 font-mono text-[13px] font-medium text-[#27683A] underline underline-offset-4";

export function IngresoScreen() {
  const store = useNaraStore();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pendingUser, setPendingUser] = useState<LoginUser | null>(null);
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [err, setErr] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [taps, setTaps] = useState(0);
  const [panel, setPanel] = useState(false);
  const [done, setDone] = useState(false);
  const [dev, setDev] = useState(false);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDev(store.devMode());
  }, [store]);

  // Si ya hay cookie de sesión (p. ej. Atrás del navegador a /ingreso), no mostrar login: volver a su app.
  useEffect(() => {
    let cancelled = false;
    const bounceIfLoggedIn = async () => {
      const u = await ensureSession(store);
      if (cancelled) return;
      const href = (u as { href?: string } | null)?.href;
      if (u?.id && href) {
        router.replace(href);
        return;
      }
      setCheckingSession(false);
    };
    void bounceIfLoggedIn();
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) void bounceIfLoggedIn();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => {
      cancelled = true;
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [store, router]);

  const goLogin = () => {
    setMode("login");
    setPendingUser(null);
    setNewPass("");
    setNewPass2("");
    setErr("");
  };

  const enter = async () => {
    setErr("");
    setOkMsg("");
    setLoading(true);
    try {
      const { res, data } = await apiJson<{ ok?: boolean; error?: string; user?: LoginUser }>(
        "/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password: pass }),
        },
      );
      if (!res.ok || !data.ok || !data.user) {
        setErr(data.error || "No se pudo ingresar.");
        return;
      }
      if ((data.user as { mustChangePassword?: boolean }).mustChangePassword) {
        setPendingUser(data.user);
        setPass("");
        setMode("cambiar");
        return;
      }
      applySessionUser(data.user);
      await hydrateProgramData(store, { force: true });
      // replace: Atrás no debe volver al login ni parecer un cierre de sesión.
      router.replace(data.user.href || "/inicio");
    } catch {
      setErr("No se pudo conectar. Intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    setErr("");
    const policyErr = passwordPolicyError({
      password: newPass,
      email: pendingUser?.email || email,
      name: pendingUser?.name || "",
      role: pendingUser?.role || pendingUser?.roleId || "",
    });
    if (policyErr) {
      setErr(policyErr);
      return;
    }
    if (newPass !== newPass2) {
      setErr("Las dos claves no coinciden.");
      return;
    }
    setLoading(true);
    try {
      const { res, data } = await apiJson<{ ok?: boolean; error?: string }>("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ newPassword: newPass }),
      });
      if (!res.ok || !data.ok) {
        setErr(data.error || "No se pudo guardar la clave.");
        return;
      }
      const u = pendingUser;
      goLogin();
      if (u) {
        applySessionUser({ ...u, mustChangePassword: false } as LoginUser);
        await hydrateProgramData(store, { force: true });
        router.replace(u.href || "/inicio");
      }
    } catch {
      setErr("No se pudo conectar. Intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div
        data-screen-label="Ingresar"
        className="box-border flex min-h-screen items-center justify-center bg-[#FBFAF3] font-texto text-[#5A5A52]"
      >
        <p className="font-mono text-sm">Comprobando sesión…</p>
      </div>
    );
  }

  return (
    <div
      data-screen-label="Ingresar"
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        if (tapTimer.current) clearTimeout(tapTimer.current);
        const n = taps + 1;
        if (n >= 5) {
          setTaps(0);
          setPanel((p) => !p);
          setDone(false);
        } else {
          setTaps(n);
          tapTimer.current = setTimeout(() => setTaps(0), 1500);
        }
      }}
      className="relative box-border flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden bg-[#FBFAF3] px-5 py-8 font-texto text-[#27683A]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 45% at 15% 10%, rgba(192,223,200,0.55), transparent 55%), radial-gradient(ellipse 55% 40% at 90% 15%, rgba(224,219,85,0.22), transparent 50%), radial-gradient(ellipse 50% 35% at 70% 90%, rgba(242,107,58,0.14), transparent 55%)",
        }}
      />

      <NaraMsgAlert msg={err} onClear={() => setErr("")} />
      <NaraMsgAlert msg={okMsg} onClear={() => setOkMsg("")} />

      <div className="relative z-10 flex w-full max-w-[420px] flex-col gap-7">
        <div className="flex flex-col items-center gap-3">
          <Link
            href="/landing"
            aria-label={`${BRAND.name}, ir al inicio`}
            className="flex items-center justify-center"
          >
            <img
              src="/parienta/logo/parienta-horizontal-principal.svg"
              alt={BRAND.name}
              className="block h-12 w-auto min-w-[150px] sm:h-14"
            />
          </Link>
          <p className="m-0 max-w-sm text-center font-titulos text-[clamp(1.15rem,3.5vw,1.35rem)] font-extrabold leading-snug text-[#27683A]">
            No hace falta ser familia para sentirse parte
          </p>
          <p className="m-0 max-w-sm text-center font-mono text-sm leading-snug text-[#5A5A52]">
            Hola, pariente. Ingrese con su correo de {BRAND.name}.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-[#C0DFC8] bg-white px-6 py-[26px] shadow-[0_12px_40px_rgba(39,104,58,0.08)]">
          {mode === "login" ? (
            <>
              <p className="m-0 font-mono text-sm font-medium uppercase tracking-[0.14em] text-[#F26B3A]">
                Ingreso
              </p>
              <label className={labelClass}>
                Correo
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErr("");
                  }}
                  autoComplete="username"
                  placeholder={BRAND.emailPlaceholder}
                  className="pl-field"
                />
              </label>

              <label className={labelClass}>
                Contraseña
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => {
                    setPass(e.target.value);
                    setErr("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !loading) void enter();
                  }}
                  autoComplete="current-password"
                  className="pl-field"
                />
              </label>

              <button
                type="button"
                onClick={() => void enter()}
                disabled={loading}
                className={primaryBtnClass}
              >
                {loading ? "Ingresando…" : "Ingresar"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setErr("");
                  setOkMsg("");
                  setMode("olvido");
                }}
                className={linkBtnClass}
              >
                ¿Olvidó su contraseña?
              </button>
            </>
          ) : null}

          {mode === "olvido" ? (
            <>
              <p className="m-0 font-mono text-sm font-medium uppercase tracking-[0.14em] text-[#F26B3A]">
                Recuperar acceso
              </p>
              <p className="m-0 font-texto text-[15px] leading-relaxed text-[#5A5A52]">
                Pídale a su experto de campo o al administrador del programa que le restablezca la clave.
                Le darán una clave temporal de 6 dígitos para entrar y crear una nueva.
              </p>
              <button type="button" onClick={goLogin} className={linkBtnClass}>
                Volver a ingresar
              </button>
            </>
          ) : null}

          {mode === "cambiar" ? (
            <>
              <p className="m-0 font-mono text-sm font-medium uppercase tracking-[0.14em] text-[#F26B3A]">
                Nueva clave
              </p>
              <p className="m-0 font-texto text-[15px] leading-relaxed text-[#5A5A52]">
                Entró con una clave temporal. Cree su clave nueva para continuar.
              </p>
              <label className={labelClass}>
                Nueva clave
                <input
                  type="password"
                  autoComplete="new-password"
                  value={newPass}
                  onChange={(e) => {
                    setNewPass(e.target.value);
                    setErr("");
                  }}
                  className="pl-field"
                />
              </label>
              <label className={labelClass}>
                Repita la nueva clave
                <input
                  type="password"
                  autoComplete="new-password"
                  value={newPass2}
                  onChange={(e) => {
                    setNewPass2(e.target.value);
                    setErr("");
                  }}
                  className="pl-field"
                />
              </label>
              <button
                type="button"
                onClick={() => void changePassword()}
                disabled={loading}
                className={primaryBtnClass}
              >
                {loading ? "Guardando…" : "Guardar clave"}
              </button>
            </>
          ) : null}
        </div>

        {panel ? (
          <div className="flex min-w-60 flex-col gap-1.5 self-center rounded-xl border border-[#C0DFC8] bg-white px-3 py-2.5 text-sm">
            <button
              type="button"
              onClick={() => {
                store.reset();
                setDone(true);
              }}
              className="cursor-pointer border-0 bg-transparent px-1 py-2 text-left font-texto text-sm text-[#27683A]"
            >
              Reiniciar datos
            </button>
            <div
              onClick={() => {
                store.setDevMode(!dev);
                setDev(!dev);
              }}
              className="flex cursor-pointer items-center justify-between px-1 py-2"
            >
              <span className="font-texto text-sm text-[#27683A]">Modo desarrollador</span>
              <span
                className={`relative h-6 w-10 rounded-xl ${dev ? "bg-[#27683A]" : "bg-[#C0DFC8]"}`}
              >
                <span
                  className={`absolute top-[3px] h-[18px] w-[18px] rounded-[9px] bg-white ${dev ? "left-[19px]" : "left-[3px]"}`}
                />
              </span>
            </div>
            {done ? (
              <span className="px-1 pb-1 font-mono text-[12px] text-[#27683A]">
                Datos reiniciados
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
