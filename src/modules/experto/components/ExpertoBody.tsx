"use client";
// @ts-nocheck

import { useMemo, useState } from "react";
import { FormModal } from "@/components/shared/form-modal/FormModal";
import { NaraMsgAlert } from "@/components/shared/nara-alert/NaraMsgAlert";
import { PhoneInput } from "@/components/shared/phone-input/PhoneInput";
import {
  TableSearch,
  filterRowsBySearch,
} from "@/components/shared/table-search/TableSearch";
import { UserMenu } from "@/components/shared/user-menu/UserMenu";

export function ExpertoTopbar({ v }: { v: Record<string, any> }) {
  return (
    <header className="nara-topbar gap-2 px-3 sm:gap-4 sm:px-6">
      <button
        type="button"
        onClick={() => v.goList?.()}
        className="flex shrink-0 cursor-pointer items-center border-none bg-transparent p-0 text-[#27683A]"
      >
        <img
          src="/parienta/logo/parienta-horizontal-principal.svg"
          alt="Parienta"
          className="block h-7 w-auto sm:h-[34px]"
        />
      </button>
      <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
        {v.dev ? (
          <span className="hidden rounded-[5px] border border-[#C0DFC8] px-1.5 py-0.5 font-mono text-[11px] text-[#5A5A52] md:inline">
            {v.screenCode}
          </span>
        ) : null}
        <button
          type="button"
          onClick={() => v.openAgent?.()}
          aria-label="Abrir Aurelia, asistente de Parienta"
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-[#C0DFC8] bg-[#FBFAF3] px-2.5 font-texto text-sm font-medium text-[#27683A] transition hover:bg-[#C0DFC8]/70 sm:h-11 sm:px-4 sm:text-base"
        >
          <img
            src="/parienta/aurelia/aurelia-base.svg"
            alt=""
            className="block h-7 w-7 sm:-ml-2 sm:h-8 sm:w-8"
          />
          <span className="hidden flex-col items-start leading-none sm:flex">
            <span>Aurelia</span>
            <span className="mt-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[#5A5A52]">
              asistente
            </span>
          </span>
        </button>
        <div
          className="flex max-w-[42vw] items-center gap-2 truncate rounded-full border border-linea px-2.5 py-1.5 text-xs font-medium sm:max-w-none sm:px-3.5 sm:py-2 sm:text-[15px]"
          style={{ background: v.connBg }}
          title={v.connText}
        >
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ background: v.connDot }}
          />
          <span className="truncate">{v.connText}</span>
        </div>
        <UserMenu notifKey={v.ex} />
      </div>
    </header>
  );
}

export function ExpertoBody({ v }: { v: Record<string, any> }) {
  const [worklistQ, setWorklistQ] = useState("");
  const worklistRows = useMemo(
    () => filterRowsBySearch(v.worklist || [], worklistQ),
    [v.worklist, worklistQ],
  );

  return (
    <>
      <NaraMsgAlert msg={v.newMsg} onClear={() => v.clearNewMsg?.()} />
      <NaraMsgAlert msg={v.consentMsg} onClear={() => v.clearConsentMsg?.()} />
      <NaraMsgAlert msg={v.reasonErr} onClear={() => v.clearReasonErr?.()} />
      <div
        data-screen-label="Experto"
        className="min-w-0 w-full bg-[#FBFAF3] font-texto text-[#27683A]"
      >
            <div ref={v.scrollRef} className="relative">
              <div className="mx-auto box-border w-full max-w-[1280px] px-3 sm:px-7">
              {v.isList ? (
                <div
                  className="flex flex-col gap-5 py-4 sm:py-6"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                  }}
                >
                  {(v.notices || []).map((n: Record<string, any>, i: number) => (
                    <div
                      key={i}
                      style={{
                        background: "#fff",
                        border: "1px solid #C0DFC8",
                        borderRadius: 12,
                        padding: "14px 18px",
                        display: "flex",
                        gap: 14,
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          padding: "4px 10px",
                          borderRadius: 6,
                          background: n.tagBg,
                          color: n.tagFg,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {n.tag}
                      </span>
                      <span style={{ fontSize: 16, lineHeight: 1.45, flex: 1 }}>
                        {n.text}
                      </span>
                      <button
                        type="button"
                        onClick={() => n.dismiss?.()}
                        style={{
                          fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                          fontSize: 15,
                          border: "none",
                          background: "none",
                          color: "#27683A",
                          cursor: "pointer",
                          padding: "4px 8px",
                        }}
                      >
                        Entendido
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center gap-3.5 rounded-xl border border-[#C0DFC8] bg-white px-4 py-2.5">
                    <img
                      src="/parienta/aurelia/aurelia-base.svg"
                      alt=""
                      className="block h-9 w-9 shrink-0"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-pretty font-texto text-base leading-snug text-[#27683A]">
                        {v.briefLine}
                      </span>
                      <span className="font-mono text-[12px] text-[#5A5A52]">
                        {v.briefSub}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => v.openAgent?.()}
                      className="h-11 shrink-0 cursor-pointer rounded-md border-0 bg-[#F26B3A] px-5 font-texto text-base font-bold !text-[#FBFAF3] transition hover:bg-[#e05a2a]"
                    >
                      Preguntar
                    </button>
                  </div>
                  <div className="nara-page-head flex flex-wrap items-end justify-between gap-3">
                    <div className="flex min-w-0 flex-col gap-1">
                      <h1 className="m-0 font-titulos text-[clamp(24px,4vw,28px)] font-extrabold leading-tight text-[#27683A]">
                        Visitas de hoy
                      </h1>
                      {/* H-009: fecha real de hoy; la capa de fechas relativas no debe volver a correrla. */}
                      <span
                        className="font-mono text-sm text-[#5A5A52]"
                        data-real-date
                      >
                        {(v.quotaDateLabel as string) || "Hoy"} · Solo cuentan
                        las visitas validadas
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => v.goNew?.()}
                      className="h-12 cursor-pointer whitespace-nowrap rounded-md border-[1.5px] border-[#27683A] bg-white px-5 font-texto text-[17px] font-bold !text-[#27683A] transition hover:bg-[#C0DFC8]/40"
                    >
                      + Nueva persona
                    </button>
                  </div>
                  <div className="nara-kpi-grid gap-3.5">
                    {(v.quotaCards || []).map((q: Record<string, any>, i: number) => (
                      <div
                        key={i}
                        className="flex flex-col gap-2 rounded-2xl border border-[#C0DFC8] bg-white px-[18px] py-4"
                      >
                        <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-[#5A5A52]">
                          {q.label}
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-titulos text-[34px] font-extrabold leading-none text-[#27683A]">
                            {q.val}
                          </span>
                          <span className="font-texto text-base text-[#5A5A52]">
                            de {q.target}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-sm bg-[#C0DFC8]">
                          <div
                            className="h-full rounded-sm bg-[#27683A]"
                            style={{ width: q.pct }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <TableSearch
                    value={worklistQ}
                    onChange={setWorklistQ}
                    placeholder="Buscar visita, persona, lugar, perfil…"
                    className="sm:max-w-md"
                  />
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid #C0DFC8",
                      borderRadius: 20,
                      overflow: "hidden",
                    }}
                  >
                    <div className="nara-scroll-x">
                      <div style={{ minWidth: 940 }}>
                    {worklistRows.map((w: Record<string, any>, i: number) => (
                      <div
                        key={w.id ?? i}
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "70px minmax(0,1.6fr) minmax(0,1.3fr) 90px minmax(0,1.6fr) 190px",
                          alignItems: "center",
                          gap: 14,
                          padding: "14px 20px",
                          borderBottom: "1px solid #C0DFC8",
                          background: w.rowBg,
                          boxShadow: w.rowShadow,
                        }}
                      >
                        <span style={{ fontSize: 17, fontWeight: 500 }}>
                          {w.time}
                        </span>
                        <div className="flex flex-col">
                          <span className="font-titulos text-[17px] font-extrabold text-[#27683A]">
                            {w.name}
                          </span>
                          <span className="font-mono text-[13px] text-[#5A5A52]">
                            {w.age} años
                          </span>
                        </div>
                        <span style={{ fontSize: 16 }}>{w.place}</span>
                        <span style={{ fontSize: 15, color: "#5A5A52" }}>
                          {w.zone}
                        </span>
                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            className="rounded-md px-2.5 py-1 font-mono text-[12px] font-medium"
                            style={{
                              background: w.tagBg,
                              color: w.tagFg,
                            }}
                          >
                            {w.tag}
                          </span>
                          {w.hasProfile ? (
                            <span
                              style={{
                                fontSize: 14,
                                fontWeight: 500,
                                padding: "5px 10px",
                                borderRadius: 6,
                                border: "1px solid #C0DFC8",
                                background: "#fff",
                              }}
                            >
                              {w.profile}
                            </span>
                          ) : null}
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                          {w.hasAction ? (
                            <button
                              type="button"
                              onClick={() => w.onAction?.()}
                              className="h-12 cursor-pointer whitespace-nowrap rounded-md border-[1.5px] border-[#27683A] px-[18px] font-texto text-base font-bold transition hover:opacity-90"
                              style={{
                                background: w.btnBg,
                                color: w.btnFg,
                              }}
                            >
                              {w.action}
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ))}
                    {!worklistRows.length ? (
                      <p
                        style={{
                          margin: 0,
                          padding: "28px 20px",
                          textAlign: "center",
                          fontSize: 15,
                          color: "#5A5A52",
                          borderTop: "1px solid #C0DFC8",
                        }}
                      >
                        {worklistQ.trim()
                          ? "Ninguna visita coincide con la búsqueda."
                          : "No hay visitas en la lista de hoy."}
                      </p>
                    ) : null}
                      </div>
                    </div>
                  </div>
                  {v.hasGroups ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                        fontWeight: 800,
                          fontSize: 22,
                        }}
                      >
                        Sesiones PM+ y grupos de apoyo
                      </span>
                      {(v.groups || []).map((g: Record<string, any>, gi: number) => (
                        <div
                          key={g.id ?? gi}
                          style={{
                            background: "#fff",
                            border: "1px solid #C0DFC8",
                            borderRadius: 20,
                            padding: "14px 20px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                          }}
                        >
                          <div
                            className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[70px_minmax(0,1fr)_auto] sm:gap-3.5"
                            style={{
                              display: "grid",
                              alignItems: "center",
                            }}
                          >
                            <span style={{ fontSize: 17, fontWeight: 500 }}>
                              {g.time}
                            </span>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  gap: 8,
                                  alignItems: "center",
                                  flexWrap: "wrap",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    padding: "4px 9px",
                                    borderRadius: 6,
                                    background: "#C0DFC8",
                                    color: "#27683A",
                                  }}
                                >
                                  {g.kind}
                                </span>
                                <span style={{ fontSize: 17, fontWeight: 500 }}>
                                  {g.title}
                                </span>
                              </div>
                              <span style={{ fontSize: 15, color: "#5A5A52" }}>
                                {g.place} · {g.attText}
                              </span>
                            </div>
                            {g.canClose ? (
                              <button
                                type="button"
                                onClick={() => g.close?.()}
                                style={{
                                  fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                                  fontSize: 16,
                                  fontWeight: 500,
                                  height: 46,
                                  padding: "0 16px",
                                  borderRadius: 10,
                                  border: "1.5px solid #27683A",
                                  background: "#fff",
                                  color: "#27683A",
                                  cursor: "pointer",
                                }}
                              >
                                Guardar asistencia
                              </button>
                            ) : null}
                            {g.closed ? (
                              <span
                                style={{
                                  fontSize: 15,
                                  fontWeight: 500,
                                  color: "#27683A",
                                }}
                              >
                                Asistencia guardada
                              </span>
                            ) : null}
                          </div>
                          <div className="nara-tabs-scroll" style={{ gap: 6 }}>
                            <button
                              type="button"
                              onClick={() => g.tabAtt?.()}
                              style={{
                                fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                                fontSize: 15,
                                fontWeight: 500,
                                height: 44,
                                padding: "0 14px",
                                border: "none",
                                background: "none",
                                borderBottom: `3px solid ${g.attBd}`,
                                color: "#27683A",
                                cursor: "pointer",
                                marginBottom: -1,
                              }}
                            >
                              Asistencia
                            </button>
                            <button
                              type="button"
                              onClick={() => g.tabGuide?.()}
                              style={{
                                fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                                fontSize: 15,
                                fontWeight: 500,
                                height: 44,
                                padding: "0 14px",
                                border: "none",
                                background: "none",
                                borderBottom: `3px solid ${g.guideBd}`,
                                color: "#27683A",
                                cursor: "pointer",
                                marginBottom: -1,
                              }}
                            >
                              Guía de la sesión
                            </button>
                          </div>
                          {g.isGuide ? (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 15,
                                  fontWeight: 600,
                                }}
                              >
                                Técnica de cierre
                              </span>
                              <span style={{ fontSize: 16 }}>{g.tech}</span>
                              <span style={{ fontSize: 14, color: "#5A5A52" }}>
                                La lista de asistencia está en la pestaña
                                «Asistencia».
                              </span>
                            </div>
                          ) : null}
                          {g.isAtt ? (
                            <div
                              style={{
                                display: "flex",
                                gap: 8,
                                flexWrap: "wrap",
                              }}
                            >
                              {(g.who || []).map(
                                (p: Record<string, any>, pi: number) => (
                                  <button
                                    key={pi}
                                    type="button"
                                    onClick={() => p.toggle?.()}
                                    style={{
                                      fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                                      fontSize: 15,
                                      height: 44,
                                      padding: "0 14px",
                                      borderRadius: 22,
                                      border: `1.5px solid ${p.bd}`,
                                      background: p.bg,
                                      color: p.fg,
                                      cursor: "pointer",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 8,
                                    }}
                                  >
                                    <span style={{ fontWeight: 600 }}>{p.mark}</span>
                                    {p.name}
                                  </button>
                                ),
                              )}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}

              <FormModal
                open={!!v.isNew}
                onClose={() => v.closeNewForm?.()}
                title={v.formTitle || "Nueva persona"}
                description={v.formDesc || "Complete la ficha. Territorio, experto, clínico y códigos se asignan solos."}
                size={v.formSize || "lg"}
                footer={(
                  <>
                    <button
                      type="button"
                      onClick={() => v.newSave?.()}
                      className="h-[46px] w-full cursor-pointer rounded-[14px] border-none bg-nara-amarillo px-5 font-texto text-[15px] font-medium text-nara-tinta sm:w-auto"
                    >
                      {v.newSaveRetry
                        ? "Reintentar"
                        : v.formSaveLabel || "Agregar y empezar visita"}
                    </button>
                    <button
                      type="button"
                      onClick={() => v.closeNewForm?.()}
                      className="h-[46px] w-full cursor-pointer rounded-[14px] border-[1.5px] border-linea bg-nara-blanco px-[18px] font-texto text-[15px] font-medium text-nara-tinta sm:w-auto"
                    >
                      Cancelar
                    </button>
                  </>
                )}
              >
                <div className="flex flex-col gap-6">
                  {(v.newSections || []).map((sec: { title: string; fields: Record<string, any>[] }) => (
                    <section key={sec.title} className="flex flex-col gap-3">
                      <h3 className="font-titulos text-base font-semibold text-nara-tinta">{sec.title}</h3>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {sec.fields.map((f: Record<string, any>) => {
                          const inputClass =
                            "h-11 w-full rounded-[9px] border-[1.5px] border-linea px-3 font-texto text-[15px] text-nara-tinta outline-none " +
                            (f.readOnly || f.kind === "readonly"
                              ? "cursor-default bg-nara-crema"
                              : "bg-nara-blanco");
                          return (
                            <label
                              key={f.key || f.label}
                              className={`flex w-full flex-col gap-1.5 font-medium ${f.span === 2 ? "sm:col-span-2" : ""}`}
                            >
                              <span className="leading-5">{f.label}</span>
                              {f.kind === "phone" ? (
                                <PhoneInput
                                  value={f.value}
                                  onChange={f.onChange}
                                  placeholder={f.ph}
                                />
                              ) : f.kind === "select" ? (
                                <select
                                  value={f.value}
                                  onChange={f.onChange}
                                  className={inputClass}
                                >
                                  <option value="">Seleccione…</option>
                                  {(f.options || []).map((o: string) => (
                                    <option key={o} value={o}>
                                      {o}
                                    </option>
                                  ))}
                                </select>
                              ) : f.onGenerate ? (
                                <div className="relative">
                                  <input
                                    type={f.kind === "email" ? "email" : "text"}
                                    value={f.value}
                                    onChange={f.readOnly || f.kind === "readonly" ? undefined : f.onChange}
                                    readOnly={!!f.readOnly || f.kind === "readonly"}
                                    placeholder={f.ph}
                                    autoComplete={f.kind === "password" ? "new-password" : undefined}
                                    className={`${inputClass} pr-[5.5rem]`}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => f.onGenerate?.()}
                                    className="absolute right-1.5 top-1/2 h-8 -translate-y-1/2 cursor-pointer rounded-lg border-none bg-nara-crema px-2.5 font-texto text-xs font-medium text-nara-tinta"
                                  >
                                    Generar
                                  </button>
                                </div>
                              ) : (
                                <input
                                  type={f.kind === "date" ? "date" : f.kind === "email" ? "email" : "text"}
                                  value={f.value}
                                  onChange={f.readOnly || f.kind === "readonly" ? undefined : f.onChange}
                                  readOnly={!!f.readOnly || f.kind === "readonly"}
                                  placeholder={f.ph}
                                  className={inputClass}
                                />
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
                {v.dupShow ? (
                  <div className="mt-4 flex flex-col gap-3 rounded-[14px] border-[1.5px] border-nara-tinta bg-nara-blanco p-4">
                    <span className="w-fit rounded-md bg-nara-crema px-2.5 py-1 text-sm font-medium">
                      Posible duplicado
                    </span>
                    <p className="text-[15px] leading-relaxed text-nara-tinta">
                      El teléfono ya está registrado para Marleny Osorio (Vereda Cocora). Puede ser un familiar que comparte teléfono.
                    </p>
                    <button
                      type="button"
                      onClick={() => v.dupConfirm?.()}
                      className="h-11 w-fit cursor-pointer rounded-[10px] border-none bg-nara-tinta px-4 font-texto text-[15px] font-medium text-nara-blanco"
                    >
                      Es otra persona
                    </button>
                  </div>
                ) : null}
              </FormModal>

              {v.inVisit ? (
                <div
                  style={{
                    padding: "18px 28px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                        fontWeight: 800,
                        fontSize: 24,
                      }}
                    >
                      {v.personName}
                    </span>
                    <span style={{ fontSize: 15, color: "#5A5A52" }}>
                      {v.personMeta}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {(v.steps || []).map((s: Record<string, any>, si: number) => (
                      <div
                        key={si}
                        style={{ display: "flex", alignItems: "center", gap: 8 }}
                      >
                        <span
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            fontSize: 15,
                            fontWeight: 500,
                            background: s.bg,
                            color: s.fg,
                            border: `1.5px solid ${s.bd}`,
                          }}
                        >
                          {s.n}
                        </span>
                        <span style={{ fontSize: 16, fontWeight: s.fw }}>
                          {s.label}
                        </span>
                        {s.arrow ? (
                          <span style={{ color: "#5A5A52", padding: "0 6px" }}>
                            →
                          </span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {v.isConsent ? (
                <div
                  className="nara-split-panel py-4 sm:py-7"
                  style={{
                    gap: 20,
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid #C0DFC8",
                      borderRadius: 20,
                      padding: "20px 22px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <span style={{ fontSize: 16, color: "#5A5A52" }}>
                      Lea cada punto en voz alta y marque lo que la persona acepta.
                    </span>
                    {(v.consentItems || []).map(
                      (c: Record<string, any>, ci: number) => (
                        <div
                          key={ci}
                          onClick={() => c.toggle?.()}
                          style={{
                            display: "flex",
                            gap: 14,
                            alignItems: "flex-start",
                            padding: "12px 14px",
                            borderRadius: 12,
                            border: `1.5px solid ${c.bd}`,
                            background: c.bg,
                            cursor: "pointer",
                            minHeight: 48,
                            boxSizing: "border-box",
                          }}
                        >
                          <span
                            style={{
                              flex: "none",
                              width: 28,
                              height: 28,
                              borderRadius: 7,
                              border: `2px solid ${c.boxBd}`,
                              background: c.boxBg,
                              color: "#fff",
                              display: "grid",
                              placeItems: "center",
                              fontSize: 17,
                              fontWeight: 700,
                            }}
                          >
                            {c.mark}
                          </span>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 3,
                              flex: 1,
                            }}
                          >
                            <span style={{ fontSize: 16, lineHeight: 1.4 }}>
                              {c.text}
                            </span>
                            <span
                              style={{
                                fontSize: 13,
                                fontWeight: 500,
                                color: c.kindFg,
                              }}
                            >
                              {c.kind}
                            </span>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    <div
                      style={{
                        background: "#fff",
                        border: "1px solid #C0DFC8",
                        borderRadius: 20,
                        padding: "20px 22px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontSize: 17, fontWeight: 500 }}>
                          {v.sigTitle}
                        </span>
                        <button
                          type="button"
                          onClick={() => v.sigClear?.()}
                          style={{
                            fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                            fontSize: 15,
                            border: "none",
                            background: "none",
                            color: "#27683A",
                            cursor: "pointer",
                          }}
                        >
                          Borrar
                        </button>
                      </div>
                      <canvas
                        ref={v.sigRef}
                        width={440}
                        height={150}
                        style={{
                          width: "100%",
                          height: 150,
                          border: "1.5px dashed #5A5A52",
                          borderRadius: 10,
                          background: "#FAF8F5",
                          touchAction: "none",
                          cursor: "crosshair",
                        }}
                      />
                      <span style={{ fontSize: 14, color: "#5A5A52" }}>
                        {v.sigHint}
                      </span>
                      <div
                        onClick={() => v.toggleRuego?.()}
                        style={{
                          display: "flex",
                          gap: 12,
                          alignItems: "center",
                          cursor: "pointer",
                          minHeight: 44,
                        }}
                      >
                        <span
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 7,
                            border: `2px solid ${v.ruegoBd}`,
                            background: v.ruegoBg,
                            color: "#fff",
                            display: "grid",
                            placeItems: "center",
                            fontWeight: 700,
                          }}
                        >
                          {v.ruegoMark}
                        </span>
                        <span style={{ fontSize: 16 }}>
                          Firma a ruego (un testigo firma por quien no puede
                          escribir)
                        </span>
                      </div>
                      {v.ruego ? (
                        <input
                          value={v.witness}
                          onChange={v.setWitness}
                          placeholder="Nombre del testigo"
                          style={{
                            height: 50,
                            borderRadius: 10,
                            border: "1.5px solid #C0DFC8",
                            padding: "0 14px",
                            fontSize: 16,
                          }}
                        />
                      ) : null}
                    </div>
                    <div
                      style={{
                        background: "#fff",
                        border: "1px solid #C0DFC8",
                        borderRadius: 20,
                        padding: "16px 22px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      <span style={{ fontSize: 15, fontWeight: 500 }}>
                        Evidencia de la visita · automática
                      </span>
                      {(v.evidence || []).map(
                        (e: Record<string, any>, ei: number) => (
                          <div
                            key={ei}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: 15,
                              gap: 12,
                            }}
                          >
                            <span style={{ color: "#5A5A52" }}>{e.k}</span>
                            <span>{e.v}</span>
                          </div>
                        ),
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => v.consentNext?.()}
                      style={{
                        fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                        fontSize: 17,
                        fontWeight: 500,
                        height: 56,
                        borderRadius: 12,
                        border: "none",
                        background: v.consentBtnBg,
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      Continuar a la evaluación
                    </button>
                  </div>
                </div>
              ) : null}

              {v.isEval ? (
                <div
                  style={{
                    padding: "14px 28px 28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  {v.crisis ? (
                    <div
                      style={{
                        background: "#FDE7E4",
                        border: "2px solid #B42318",
                        borderRadius: 14,
                        padding: "20px 22px",
                        display: "flex",
                        gap: 22,
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: "#fff",
                            background: "#B42318",
                            alignSelf: "flex-start",
                            padding: "4px 10px",
                            borderRadius: 6,
                          }}
                        >
                          Crisis · protocolo activado
                        </span>
                        <span
                          style={{
                            fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                        fontWeight: 800,
                            fontSize: 24,
                          }}
                        >
                          {v.crisisStay}
                        </span>
                        <span style={{ fontSize: 17, lineHeight: 1.5 }}>
                          La alerta ya se envió a la Dra. Lucía Marín, clínica de
                          turno. La meta es que llame en menos de 30 minutos. Si hay
                          peligro ahora: llame al 123. Si la persona necesita hablar
                          con alguien: Línea 192, opción 4.
                        </span>
                        <div
                          style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "center",
                            background: "#fff",
                            borderRadius: 10,
                            padding: "10px 14px",
                            fontSize: 16,
                          }}
                        >
                          <span style={{ fontWeight: 500 }}>
                            Estado de la alerta:
                          </span>
                          <span>{v.alertStatusText}</span>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                          minWidth: 220,
                        }}
                      >
                        {(v.crisisLines || []).map(
                          (cl: Record<string, any>, cli: number) => (
                            <a
                              key={cli}
                              href={cl.tel}
                              style={{
                                minHeight: 54,
                                padding: "6px 12px",
                                boxSizing: "border-box",
                                borderRadius: 12,
                                border: "2px solid #B42318",
                                background: cl.bg,
                                color: cl.fg,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 17,
                                fontWeight: 500,
                                textAlign: "center",
                                textDecoration: "none",
                              }}
                            >
                              <span>{cl.label}</span>
                              <span style={{ fontSize: 12, fontWeight: 400 }}>
                                {cl.sub}
                              </span>
                            </a>
                          ),
                        )}
                        <button
                          type="button"
                          onClick={() => v.goResult?.()}
                          style={{
                            fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                            fontSize: 16,
                            fontWeight: 500,
                            height: 54,
                            borderRadius: 12,
                            border: "1.5px solid #27683A",
                            background: "#fff",
                            color: "#27683A",
                            cursor: "pointer",
                          }}
                        >
                          Ver ruta de crisis
                        </button>
                      </div>
                    </div>
                  ) : null}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <span style={{ fontSize: 16 }}>
                      <b style={{ fontWeight: 500 }}>{v.progressOk}</b>
                      <span style={{ color: "#27683A" }}>{v.progressDraft}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => v.calc?.()}
                      style={{
                        fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                        fontSize: 17,
                        fontWeight: 500,
                        height: 50,
                        padding: "0 22px",
                        borderRadius: 12,
                        border: "none",
                        background: v.calcBg,
                        color: v.calcFg,
                        cursor: "pointer",
                      }}
                    >
                      Calcular resultado
                    </button>
                  </div>
                  <div
                    style={{ display: "flex", gap: 16, alignItems: "stretch" }}
                  >
                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                        width: "100%",
                        background: "#fff",
                        border: "1px solid #C0DFC8",
                        borderRadius: 20,
                        display: "flex",
                        flexDirection: "column",
                        height: 540,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          borderBottom: "1px solid #C0DFC8",
                        }}
                      >
                        {(v.secTabs || []).map(
                          (t: Record<string, any>, ti: number) => (
                            <button
                              key={ti}
                              type="button"
                              onClick={() => t.go?.()}
                              style={{
                                flex: 1,
                                fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                                fontSize: 16,
                                fontWeight: 500,
                                height: 54,
                                border: "none",
                                borderBottom: `3px solid ${t.bd}`,
                                background: "#fff",
                                color: t.fg,
                                cursor: "pointer",
                              }}
                            >
                              {t.label}{" "}
                              <span
                                style={{
                                  fontSize: 14,
                                  color: "#5A5A52",
                                  fontWeight: 400,
                                }}
                              >
                                {t.count}
                              </span>
                            </button>
                          ),
                        )}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          overflow: "auto",
                          padding: "12px 16px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                        }}
                      >
                        {(v.rows || []).map((r: Record<string, any>, ri: number) => (
                          <div
                            key={ri}
                            style={{
                              border: `1.5px solid ${r.bd}`,
                              borderRadius: 12,
                              padding: "12px 14px",
                              display: "flex",
                              flexDirection: "column",
                              gap: 10,
                              background: "#fff",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 12,
                                alignItems: "flex-start",
                              }}
                            >
                              <span style={{ fontSize: 16, lineHeight: 1.4 }}>
                                <b style={{ fontWeight: 500 }}>{r.n}.</b> {r.q}
                              </span>
                              <span
                                style={{
                                  flex: "none",
                                  fontSize: 13,
                                  fontWeight: 500,
                                  padding: "4px 9px",
                                  borderRadius: 6,
                                  background: r.tagBg,
                                  color: r.tagFg,
                                  border: `1px solid ${r.tagBd}`,
                                }}
                              >
                                {r.tag}
                              </span>
                            </div>
                            {r.sensitive ? (
                              <div
                                style={{
                                  background: "#FBFAF3",
                                  borderLeft: 0,
                                  borderRadius: 8,
                                  padding: "10px 12px",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 4,
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 500,
                                    color: "#27683A",
                                  }}
                                >
                                  Pregunta sensible · lea esta redacción exacta
                                </span>
                                <span style={{ fontSize: 16, lineHeight: 1.45 }}>
                                  «{v.q9}»
                                </span>
                              </div>
                            ) : null}
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 8,
                              }}
                            >
                              {(r.opts || []).map(
                                (o: Record<string, any>, oi: number) => (
                                  <button
                                    key={oi}
                                    type="button"
                                    onClick={() => o.pick?.()}
                                    style={{
                                      fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                                      fontSize: 15,
                                      minHeight: 44,
                                      padding: "0 14px",
                                      borderRadius: 10,
                                      border: `1.5px solid ${o.bd}`,
                                      background: o.bg,
                                      color: o.fg,
                                      cursor: "pointer",
                                    }}
                                  >
                                    {o.label}
                                  </button>
                                ),
                              )}
                              {r.isDraft ? (
                                <button
                                  type="button"
                                  onClick={() => r.confirm?.()}
                                  style={{
                                    fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                                    fontSize: 15,
                                    fontWeight: 500,
                                    minHeight: 44,
                                    padding: "0 14px",
                                    borderRadius: 14,
                                    border: "none",
                                    background: "#F26B3A",
                                    color: "#FBFAF3",
                                    cursor: "pointer",
                                    marginLeft: "auto",
                                  }}
                                >
                                  Confirmar
                                </button>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        style={{
                          borderTop: "1px solid #C0DFC8",
                          padding: "10px 16px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontSize: 14, color: "#5A5A52" }}>
                          {v.secNote}
                        </span>
                        <button
                          type="button"
                          onClick={() => v.confirmSection?.()}
                          style={{
                            fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                            fontSize: 15,
                            fontWeight: 500,
                            height: 44,
                            padding: "0 16px",
                            borderRadius: 10,
                            border: `1.5px solid ${(v.confirmBtnBd as string) || "#27683A"}`,
                            background: (v.confirmBtnBg as string) || "#fff",
                            color: (v.confirmBtnFg as string) || "#27683A",
                            cursor: "pointer",
                          }}
                        >
                          {v.secDraftN
                            ? `Confirmar las revisadas · ${v.secDraftN}`
                            : "Confirmar las revisadas"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {v.isResult ? (
                <div
                  className="flex flex-col gap-4 py-3.5 sm:py-7"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <button
                      type="button"
                      onClick={() => v.saveVisit?.()}
                      className="h-[58px] w-full shrink-0 cursor-pointer rounded-[14px] border-0 bg-[#F26B3A] px-6 font-texto text-lg font-medium text-[#FBFAF3] sm:w-auto sm:min-w-[220px]"
                    >
                      Guardar visita
                    </button>
                    <span className="text-[15px] text-[#5A5A52]">
                      {v.saveNote as string}
                    </span>
                  </div>
                  {v.crisis ? (
                    <div
                      className="flex flex-wrap items-center gap-5"
                      style={{
                        background: "#FDE7E4",
                        border: "2px solid #B42318",
                        borderRadius: 14,
                        padding: "18px 22px",
                        gap: 22,
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: "#fff",
                            background: "#B42318",
                            alignSelf: "flex-start",
                            padding: "4px 10px",
                            borderRadius: 6,
                          }}
                        >
                          Crisis · el perfil queda suspendido
                        </span>
                        <span style={{ fontSize: 17, lineHeight: 1.5 }}>
                          {v.crisisStay} La Dra. Lucía Marín tiene la alerta. Si hay
                          peligro ahora: llame al 123. Si la persona necesita hablar
                          con alguien: Línea 192, opción 4.
                        </span>
                        <span style={{ fontSize: 16 }}>
                          <b style={{ fontWeight: 500 }}>Estado:</b>{" "}
                          {v.alertStatusText}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                          minWidth: 220,
                        }}
                      >
                        {(v.crisisLines || []).map(
                          (cl: Record<string, any>, cli: number) => (
                            <a
                              key={cli}
                              href={cl.tel}
                              style={{
                                minHeight: 52,
                                padding: "6px 18px",
                                boxSizing: "border-box",
                                borderRadius: 12,
                                border: "2px solid #B42318",
                                background: cl.bg,
                                color: cl.fg,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 17,
                                fontWeight: 500,
                                textAlign: "center",
                                textDecoration: "none",
                              }}
                            >
                              <span>{cl.label}</span>
                              <span style={{ fontSize: 12, fontWeight: 400 }}>
                                {cl.sub}
                              </span>
                            </a>
                          ),
                        )}
                      </div>
                    </div>
                  ) : null}
                  <div className="nara-form-grid-3" style={{ gap: 16, alignItems: "start" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                      }}
                    >
                      <div
                        style={{
                          background: "#fff",
                          border: "1px solid #C0DFC8",
                          borderRadius: 20,
                          padding: "18px 20px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 12,
                        }}
                      >
                        <span style={{ fontSize: 15, color: "#5A5A52" }}>
                          Salud mental · PHQ-9
                        </span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: 10,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                        fontWeight: 800,
                              fontSize: 30,
                            }}
                          >
                            {v.riskName}
                          </span>
                          <span style={{ fontSize: 17, color: "#5A5A52" }}>
                            {v.phqTotal} de 27
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: 4 }}>
                          {(v.riskScale || []).map(
                            (s: Record<string, any>, si: number) => (
                              <div
                                key={si}
                                style={{
                                  flex: 1,
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 6,
                                }}
                              >
                                <div
                                  style={{
                                    height: 12,
                                    borderRadius: 3,
                                    background: s.c,
                                    opacity: s.op,
                                    outline: s.ol,
                                    outlineOffset: 2,
                                  }}
                                />
                                <span
                                  style={{
                                    fontSize: 12,
                                    color: s.fg,
                                    fontWeight: s.fw,
                                  }}
                                >
                                  {s.k}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          background: "#fff",
                          border: "1px solid #C0DFC8",
                          borderRadius: 20,
                          padding: "18px 20px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                        }}
                      >
                        <span style={{ fontSize: 15, color: "#5A5A52" }}>
                          Capacidad digital
                        </span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: 10,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                        fontWeight: 800,
                              fontSize: 30,
                            }}
                          >
                            {v.digName}
                          </span>
                          <span style={{ fontSize: 17, color: "#5A5A52" }}>
                            {v.digTotal} de 11
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: 4 }}>
                          {(v.digScale || []).map(
                            (s: Record<string, any>, si: number) => (
                              <div
                                key={si}
                                style={{
                                  flex: 1,
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 6,
                                }}
                              >
                                <div
                                  style={{
                                    height: 12,
                                    borderRadius: 3,
                                    background: s.c,
                                    opacity: s.op,
                                    outline: s.ol,
                                    outlineOffset: 2,
                                  }}
                                />
                                <span
                                  style={{
                                    fontSize: 12,
                                    color: s.fg,
                                    fontWeight: s.fw,
                                  }}
                                >
                                  {s.k}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                        <span style={{ fontSize: 15, color: "#27683A" }}>
                          {v.digNote}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        background: "#fff",
                        border: "1px solid #C0DFC8",
                        borderRadius: 20,
                        padding: "18px 20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <span style={{ fontSize: 15, color: "#5A5A52" }}>Perfil</span>
                      <div className="nara-scroll-x">
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "96px repeat(3,minmax(0,1fr))",
                          gap: 5,
                          fontSize: 13,
                          minWidth: 300,
                        }}
                      >
                        <span />
                        <span style={{ textAlign: "center", color: "#5A5A52" }}>
                          Baja
                        </span>
                        <span style={{ textAlign: "center", color: "#5A5A52" }}>
                          Media
                        </span>
                        <span style={{ textAlign: "center", color: "#5A5A52" }}>
                          Alta
                        </span>
                        {(v.matrix || []).flatMap(
                          (row: Record<string, any>, ri: number) => [
                            <span
                              key={`${ri}-k`}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                color: "#5A5A52",
                              }}
                            >
                              <span
                                style={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: 2,
                                  background: row.c,
                                }}
                              />
                              {row.k}
                            </span>,
                            ...(row.cells || []).map(
                              (cell: Record<string, any>, ci: number) => (
                                <div
                                  key={`${ri}-${ci}`}
                                  style={{
                                    height: 42,
                                    borderRadius: 8,
                                    display: "grid",
                                    placeItems: "center",
                                    fontSize: 14,
                                    fontWeight: cell.fw,
                                    background: cell.bg,
                                    color: cell.fg,
                                    border: `2px ${cell.bs} ${cell.bd}`,
                                  }}
                                >
                                  {cell.label}
                                </div>
                              ),
                            ),
                          ],
                        )}
                      </div>
                      </div>
                      <span style={{ fontSize: 17, fontWeight: 500 }}>
                        {v.profileLine}
                      </span>
                    </div>
                    <div
                      style={{
                        background: "#fff",
                        border: "1px solid #C0DFC8",
                        borderRadius: 20,
                        padding: "16px 18px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      <span style={{ fontSize: 15, fontWeight: 500 }}>
                        Evidencia de la visita
                      </span>
                      {(v.evidenceEnd || []).map(
                        (e: Record<string, any>, ei: number) => (
                          <div
                            key={ei}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: 15,
                              gap: 12,
                            }}
                          >
                            <span style={{ color: "#5A5A52" }}>{e.k}</span>
                            <span style={{ textAlign: "right" }}>{e.v}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="nara-split-panel" style={{ gap: 16, alignItems: "start" }}>
                    <div
                      style={{
                        background: "#fff",
                        border: "1px solid #C0DFC8",
                        borderRadius: 20,
                        padding: "18px 20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                        fontWeight: 800,
                            fontSize: 22,
                          }}
                        >
                          {v.pathTitle}
                        </span>
                        <span style={{ fontSize: 16, color: "#5A5A52" }}>
                          {v.pathDuration}
                        </span>
                      </div>
                      {(v.path || []).map((p: Record<string, any>, pi: number) => (
                        <div
                          key={pi}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "10px 0",
                            borderTop: "1px solid #C0DFC8",
                          }}
                        >
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              gap: 2,
                            }}
                          >
                            <span style={{ fontSize: 16, fontWeight: 500 }}>
                              {p.name}
                            </span>
                            <span style={{ fontSize: 14, color: "#5A5A52" }}>
                              {p.sub}
                            </span>
                          </div>
                          {p.main ? (
                            <span
                              style={{
                                fontSize: 13,
                                fontWeight: 500,
                                padding: "4px 9px",
                                borderRadius: 6,
                                background: "#27683A",
                                color: "#fff",
                              }}
                            >
                              Servicio principal
                            </span>
                          ) : null}
                          <span
                            style={{
                              fontSize: 15,
                              minWidth: 130,
                              textAlign: "right",
                            }}
                          >
                            {p.freq}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 14,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => v.saveVisit?.()}
                        style={{
                          fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                          fontSize: 18,
                          fontWeight: 500,
                          height: 58,
                          borderRadius: 14,
                          border: "none",
                          background: "#F26B3A",
                          color: "#FBFAF3",
                          cursor: "pointer",
                        }}
                      >
                        Guardar visita
                      </button>
                      <span style={{ fontSize: 15, color: "#5A5A52" }}>
                        {v.saveNote}
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}

              {v.toast ? (
                <div
                  style={{
                    position: "sticky",
                    bottom: 18,
                    margin: "0 auto",
                    width: "max-content",
                    maxWidth: "90%",
                    background: "#27683A",
                    color: "#fff",
                    borderRadius: 12,
                    padding: "14px 20px",
                    fontSize: 16,
                  }}
                >
                  {v.toastText}
                </div>
              ) : null}
              </div>
            </div>
      </div>

      <FormModal
        open={!!v.crisisConfirmOpen}
        title="Confirmar respuesta de crisis"
        description="Marcó una respuesta distinta de «Nunca» en la pregunta 9. Si confirma, se activará el protocolo de crisis y se avisará a la clínica de turno."
        size="sm"
        footer={
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => v.cancelCrisisPick?.()}
              className="h-11 w-full rounded-xl border border-[#C0DFC8] bg-white px-4 font-texto text-sm text-[#27683A] sm:w-auto"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => v.confirmCrisisPick?.()}
              className="h-11 w-full rounded-xl bg-[#B42318] px-4 font-texto text-sm font-medium text-white sm:w-auto"
            >
              Confirmar y activar crisis
            </button>
          </div>
        }
      >
        <p className="font-texto text-[15px] leading-snug text-[#27683A]">
          Respuesta elegida:{" "}
          <span className="font-medium">{v.crisisConfirmLabel || "—"}</span>
        </p>
        <p className="mt-2 font-texto text-sm text-[#5A5A52]">
          Si fue un toque por error, cancele y elija de nuevo.
        </p>
      </FormModal>

    </>
  );
}
