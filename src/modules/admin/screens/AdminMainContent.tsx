"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { AgentPanel } from "@/components/shared/agent-panel/AgentPanel";
import { FormModal } from "@/components/shared/form-modal/FormModal";
import { PhoneInput } from "@/components/shared/phone-input/PhoneInput";
import { NaraMsgAlert } from "@/components/shared/nara-alert/NaraMsgAlert";
import { PageHead } from "@/components/shared/page-head/PageHead";
import {
  TableSearch,
  filterRowsBySearch,
} from "@/components/shared/table-search/TableSearch";
import { VisitsMap } from "@/components/shared/visits-map/VisitsMap";
import { PathRoutesPanel } from "@/modules/admin/rutas/PathRoutesPanel";
import { ix } from "./inlineStyle";

/** H-009: fecha real de hoy en Colombia, p. ej. «viernes 9 oct». */
function hoyLargo(): string {
  return new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "short",
    timeZone: "America/Bogota",
  }).replace(/\.$/, "").replace(",", "");
}

export function AdminMainContent({ v }: { v: Record<string, any> }) {
  const [expertsQ, setExpertsQ] = useState("");
  const [pfQ, setPfQ] = useState("");
  const [brQ, setBrQ] = useState("");
  const [tabQ, setTabQ] = useState("");

  const expertsRows = useMemo(
    () => filterRowsBySearch(v.experts || [], expertsQ),
    [v.experts, expertsQ],
  );
  const pfRows = useMemo(
    () => filterRowsBySearch(v.pfRows || [], pfQ),
    [v.pfRows, pfQ],
  );
  const brRows = useMemo(
    () => filterRowsBySearch(v.brRows || [], brQ),
    [v.brRows, brQ],
  );
  const tabRows = useMemo(
    () => filterRowsBySearch(v.tabRows || [], tabQ),
    [v.tabRows, tabQ],
  );

  return (
    <>
          <NaraMsgAlert
            msg={v.msg}
            actions={v.msgActions}
            onClear={() => v.clearMsg?.()}
          />
          <NaraMsgAlert
            msg={v.tfErr}
            onClear={() => v.clearTfErr?.()}
          />
          <NaraMsgAlert
            msg={v.rulesFlash}
            onClear={() => v.clearRulesFlash?.()}
          />
          <NaraMsgAlert
            msg={v.autoMsg}
            onClear={() => v.clearAutoMsg?.()}
          />

          {v.vHome && (
            <div
              className={`nara-home-grid${v.agentOpen ? " nara-home-grid--teo" : ""}`}
              style={{ paddingTop: "var(--nara-page-pad-y, 20px)" }}
            >
              {v.agentOpen ? (
                <div className="nara-home-teo-standin">
                  <button
                    type="button"
                    onClick={() => v.openAgent?.()}
                    aria-label="Aurelia está conversando. Mantener asistente abierto"
                    className="group flex cursor-pointer flex-col items-center gap-4 border-none bg-transparent p-4"
                  >
                    <span className="grid size-[200px] place-items-center rounded-[52px] bg-pl-menta shadow-[0_16px_48px_rgba(39,104,58,0.22)] transition group-hover:scale-[1.03] group-active:scale-[0.98] motion-safe:animate-[nara-float_3.6s_ease-in-out_infinite_alternate] sm:size-[260px] sm:rounded-[64px]">
                      <img
                        src="/parienta/aurelia/aurelia-base.svg"
                        alt=""
                        className="block size-[148px] sm:size-[196px]"
                      />
                    </span>
                    <span className="font-titulos text-2xl font-extrabold text-pl-verde-raiz sm:text-[28px]">
                      Aurelia
                    </span>
                    <span className="max-w-[280px] text-center font-mono text-base text-pl-texto2">
                      Aquí estoy, cuando quiera.
                    </span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="nara-home-main">
                    <AgentPanel
                      role="admin"
                      mode="home"
                      onAction={v.agentAction}
                      onOpenDrawer={v.askFromHome}
                      style={{ flex: 1, minWidth: 0, width: "100%" }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: 0 }}>
                    <Link
                      href="/informe?t=admin-weekly&back=/inicio"
                      className="flex flex-col gap-1.5 rounded-[18px] bg-pl-verde-raiz px-5 py-5 text-pl-hueso transition hover:bg-pl-verde-vivo"
                    >
                      <span className="font-mono text-[12px] text-pl-menta" data-real-date>
                        Generado el {hoyLargo()}
                      </span>
                      <span className="font-titulos text-[22px] font-extrabold leading-tight">
                        Operaciones de la semana
                      </span>
                      <span className="text-[14px] leading-[1.45] text-pl-menta">
                        Captación frente al ritmo, territorios en riesgo, control de calidad, manillas y
                        tres acciones.
                      </span>
                      <span className="mt-1.5 font-medium text-pl-lima">Abrir one-pager →</span>
                    </Link>
                    {v.homeLinks?.map((l: { id?: string; label: string; sub: string; go: () => void }) => (
                      <button
                        key={l.id || l.label}
                        type="button"
                        onClick={() => l.go()}
                        className="flex cursor-pointer flex-col gap-1 rounded-[18px] border border-pl-menta bg-pl-hueso px-4 py-3.5 text-left text-pl-verde-raiz whitespace-normal transition hover:border-pl-verde-vivo hover:bg-pl-menta/40"
                      >
                        <span className="font-medium">{l.label}</span>
                        <span className="text-[13px] text-pl-texto2">{l.sub}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          {v.hasFilter && (<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><span style={{ fontWeight: '500', padding: '6px 12px', borderRadius: '8px', background: '#C0DFC8', color: '#27683A' }}>Filtro: {v.terrFilter}</span><button onClick={() => v.clearFilter()} style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontSize: '14px', border: 'none', background: 'none', color: '#27683A', cursor: 'pointer' }}>Quitar filtro</button></div>)}
          {v.vTerr && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <PageHead>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '12px', flexWrap: 'wrap' }}><div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}><span style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontWeight: '800', fontSize: 'clamp(22px,4vw,28px)' }}>Territorios</span><span style={{ color: '#5A5A52' }}>Meta fase 1: 8.700 personas · {v.totalEvaluadas ?? v.totalCap} evaluadas · {v.totalCap} en captación</span></div><button onClick={() => v.toggleTerrForm()} style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontSize: '15px', fontWeight: '500', height: '46px', padding: '0 20px', borderRadius: '14px', border: 'none', background: '#F26B3A', color: '#FBFAF3', cursor: 'pointer', whiteSpace: 'nowrap' }}>{v.terrFormBtn}</button></div>
              </PageHead>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 500, fontSize: 16, marginRight: 'auto' }}>{v.terrCountLabel}</span>
                <TableSearch
                  value={String(v.terrQ ?? "")}
                  onChange={(q) => v.setTerrQ?.(q)}
                  placeholder="Buscar por cualquier campo…"
                />
              </div>
              <FormModal
                open={!!v.terrForm}
                onClose={() => (v.closeTerrForm || v.toggleTerrForm)()}
                title="Crear territorio"
                description="Defina meta, cuotas y contenido local del municipio."
                size="lg"
                footer={(
                  <>
                    <button type="button" onClick={() => v.saveTerr()} style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontSize: '15px', fontWeight: '500', height: '46px', padding: '0 20px', borderRadius: '14px', border: 'none', background: '#F26B3A', color: '#FBFAF3', cursor: 'pointer' }}>Guardar territorio</button>
                    <button type="button" onClick={() => (v.closeTerrForm || v.toggleTerrForm)()} style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontSize: '15px', fontWeight: '500', height: '46px', padding: '0 18px', borderRadius: '14px', border: '1.5px solid #E3DFCF', background: '#fff', color: '#27683A', cursor: 'pointer' }}>Cancelar</button>
                  </>
                )}
              >
                <div className="nara-form-grid-3">
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: '500' }}>Departamento<select value={String(v.tf.dep ?? "")} onChange={v.tfSet.dep} style={{ height: '44px', borderRadius: '9px', border: '1.5px solid #E3DFCF', padding: '0 10px', fontSize: '15px', background: '#fff' }}><option>Quindío</option><option>Risaralda</option><option>Caldas</option><option>Valle del Cauca</option></select></label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: '500' }}>Municipio<input value={String(v.tf.mun ?? "")} onChange={v.tfSet.mun} style={{ height: '44px', borderRadius: '9px', border: '1.5px solid #E3DFCF', padding: '0 12px', fontSize: '15px' }} /></label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: '500' }}>Meta de captación<input value={String(v.tf.goal ?? "")} onChange={v.tfSet.goal} style={{ height: '44px', borderRadius: '9px', border: '1.5px solid #E3DFCF', padding: '0 12px', fontSize: '15px' }} /></label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}><span style={{ fontWeight: '500' }}>Nivel</span>{v.levels?.map((l) => (<div key={l.label} onClick={() => l.pick()} style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', minHeight: '32px' }}><span style={ix`width:18px;height:18px;border-radius:50%;border:2px solid ${l.bd};background:${l.dot};box-sizing:border-box`}></span>{l.label}</div>))}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}><label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: '500' }}>Participación rural mínima (%)<input value={String(v.tf.rural ?? "")} onChange={v.tfSet.rural} style={{ height: '44px', borderRadius: '9px', border: '1.5px solid #E3DFCF', padding: '0 12px', fontSize: '15px' }} /></label><label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: '500' }}>Participación 60+ mínima (%)<input value={String(v.tf.sixty ?? "")} onChange={v.tfSet.sixty} style={{ height: '44px', borderRadius: '9px', border: '1.5px solid #E3DFCF', padding: '0 12px', fontSize: '15px' }} /></label></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}><span style={{ fontWeight: '500' }}>Contenido local</span>{v.modules?.map((m) => (<div key={m.label} onClick={() => m.toggle()} style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', minHeight: '30px' }}><span style={ix`width:18px;height:18px;border-radius:5px;border:2px solid ${m.bd};background:${m.bg};color:#fff;font-size:12px;display:grid;place-items:center;box-sizing:border-box`}>{m.mark}</span>{m.label}</div>))}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}><span style={{ fontWeight: '500' }}>Instituciones de remisión</span>{v.tinsts?.map((m) => (<div key={m.label} onClick={() => m.toggle()} style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', minHeight: '30px' }}><span style={ix`width:18px;height:18px;border-radius:5px;border:2px solid ${m.bd};background:${m.bg};color:#fff;font-size:12px;display:grid;place-items:center;box-sizing:border-box`}>{m.mark}</span>{m.label}</div>))}</div>
                  </div>
                </div>
              </FormModal>
              <div style={{ background: '#fff', border: '1px solid #E3DFCF', borderRadius: '20px', overflow: 'hidden' }}>
                <div className="nara-scroll-x">
                <div style={{ minWidth: 1100 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr) minmax(0,1.3fr) 80px minmax(0,1.6fr) minmax(0,1.1fr) 90px 100px minmax(0,1.2fr)', gap: '12px', padding: '12px 20px', background: '#FBFAF3', color: '#5A5A52', fontSize: '14px', fontWeight: '500' }}><span>Territorio</span><span>Departamento</span><span>Nivel</span><span>Expertos</span><span>Captación</span><span>Rural (real / meta)</span><span>Manillas</span><span>Instituciones</span><span>Estado</span></div>
                {v.terrs?.map((t) => (
                  <div key={t.name || t.id} onClick={() => t.open()} style={ix`display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr) minmax(0,1.3fr) 80px minmax(0,1.6fr) minmax(0,1.1fr) 90px 100px minmax(0,1.2fr);gap:12px;padding:13px 20px;border-top:1px solid #C0DFC8;align-items:center;background:${t.rowBg};cursor:pointer`} >
                    <span style={{ fontWeight: '500' }}>{t.name}</span><span>{t.dep}</span><span>{t.level}</span><span>{t.experts}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}><span>{t.capText}</span><div style={{ height: '6px', borderRadius: '3px', background: '#C0DFC8' }}><div style={ix`height:100%;width:${t.pct};border-radius:3px;background:#27683A`}></div></div></div>
                    <span>{t.rural}</span><span>{t.bracelets}</span><span>{t.insts}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}><span style={ix`flex:none;width:10px;height:10px;border-radius:50%;background:${t.sc}`}></span>{t.status}</span>
                  </div>
                ))}
                </div>
                </div>
              </div>
            </div>
          )}
      
          {v.vTeam && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <PageHead>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '12px', flexWrap: 'wrap' }}><div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}><span style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontWeight: '800', fontSize: 'clamp(22px,4vw,28px)' }}>Equipos de campo</span><span style={{ color: '#5A5A52' }}>Metas por volumen y por mezcla (rural, 60+). Solo cuentan las visitas validadas.</span></div><button onClick={() => v.toggleExpForm()} style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontSize: '15px', fontWeight: '500', height: '46px', padding: '0 20px', borderRadius: '14px', border: 'none', background: '#F26B3A', color: '#FBFAF3', cursor: 'pointer', whiteSpace: 'nowrap' }}>{v.expFormBtn}</button></div>
              <div className="nara-tabs-scroll items-center gap-2">
                {v.teamTabs?.map((tt) => (
                  <button key={tt.label} onClick={() => tt.go()} style={ix`font-family:Bricolage Grotesque, system-ui, sans-serif;font-size:15px;font-weight:500;height:44px;padding:0 16px;border:none;background:none;border-bottom:3px solid ${tt.bd};color:${tt.fg};cursor:pointer;margin-bottom:-1px;white-space:nowrap;flex:none`}>{tt.label}</button>
                ))}
                <button
                  type="button"
                  onClick={() => v.openGoalsForm?.()}
                  className="mb-0.5 ml-1 h-9 shrink-0 cursor-pointer rounded-[10px] border-[1.5px] border-nara-tinta bg-nara-blanco px-3 font-texto text-sm font-medium text-nara-tinta"
                >
                  Definición metas
                </button>
              </div>
              </PageHead>
              <FormModal
                open={!!v.goalsForm}
                onClose={() => (v.closeGoalsForm || (() => {}))()}
                title="Definición metas"
                description="Aplica a todo el equipo de campo. Solo cuentan las visitas validadas."
                size="sm"
                footer={(
                  <>
                    <button type="button" onClick={() => v.saveGoals?.()} className="h-[46px] cursor-pointer rounded-[14px] border-none bg-nara-amarillo px-5 font-texto text-[15px] font-medium text-nara-tinta">Guardar metas</button>
                    <button type="button" onClick={() => (v.closeGoalsForm || (() => {}))()} className="h-[46px] cursor-pointer rounded-[14px] border-[1.5px] border-linea bg-nara-blanco px-[18px] font-texto text-[15px] font-medium text-nara-tinta">Cancelar</button>
                  </>
                )}
              >
                <div className="flex flex-col gap-4">
                  {v.gfErr ? (
                    <p className="m-0 text-[15px] text-[#B42318]">{v.gfErr}</p>
                  ) : null}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="flex min-w-0 flex-col gap-1.5 font-medium">
                      <span className="leading-5">Meta diaria</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={String(v.gf?.daily ?? "")}
                        onChange={v.gfSet?.daily}
                        className="h-11 w-full rounded-[9px] border-[1.5px] border-linea bg-nara-blanco px-3 font-texto text-[15px] text-nara-tinta"
                      />
                    </label>
                    <label className="flex min-w-0 flex-col gap-1.5 font-medium">
                      <span className="leading-5">Meta semanal</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={String(v.gf?.weekly ?? "")}
                        readOnly
                        aria-readonly="true"
                        title="Se calcula sola: meta diaria × 5"
                        className="h-11 w-full cursor-default rounded-[9px] border-[1.5px] border-linea bg-nara-crema px-3 font-texto text-[15px] text-nara-tinta"
                      />
                    </label>
                  </div>
                  <p className="m-0 text-[15px] text-texto-secundario">
                    La meta semanal se calcula sola (diaria × 5). Puede ser 0. Al guardar, se actualizan Hoy y Semana de todos los expertos.
                  </p>
                </div>
              </FormModal>
              {v.teamTab1 && (<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <FormModal
                open={!!v.expForm}
                onClose={() => (v.closeExpForm || (() => {}))()}
                title="Crear experto"
                description="Correo para entrar a Parienta · celular de contacto. La tablet se asigna en Activos."
                size="md"
                footer={(
                  <>
                    <button type="button" onClick={() => v.saveExp()} style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontSize: '15px', fontWeight: '500', height: '46px', padding: '0 20px', borderRadius: '14px', border: 'none', background: '#F26B3A', color: '#FBFAF3', cursor: 'pointer' }}>Crear experto y enviar acceso</button>
                    <button type="button" onClick={() => (v.closeExpForm || (() => {}))()} style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontSize: '15px', fontWeight: '500', height: '46px', padding: '0 18px', borderRadius: '14px', border: '1.5px solid #E3DFCF', background: '#fff', color: '#27683A', cursor: 'pointer' }}>Cancelar</button>
                  </>
                )}
              >
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2">
                    <label className="flex min-w-0 flex-col gap-1.5 font-medium">
                      <span className="leading-5">Nombre</span>
                      <input value={String(v.ef.name ?? "")} onChange={v.efSet.name} className="h-11 w-full rounded-[9px] border-[1.5px] border-linea bg-nara-blanco px-3 font-texto text-[15px] text-nara-tinta" />
                    </label>
                    <label className="flex min-w-0 flex-col gap-1.5 font-medium">
                      <span className="leading-5">Correo (acceso)</span>
                      <div className="relative">
                        <input
                          type="email"
                          value={String(v.ef.email ?? "")}
                          onChange={v.efSet.email}
                          placeholder="nombre.apellido@parienta.co"
                          className="h-11 w-full rounded-[9px] border-[1.5px] border-linea bg-nara-blanco py-0 pl-3 pr-[5.5rem] font-texto text-[15px] text-nara-tinta"
                        />
                        <button
                          type="button"
                          onClick={() => v.genExpEmail?.()}
                          className="absolute right-1.5 top-1/2 h-8 -translate-y-1/2 cursor-pointer rounded-lg border-none bg-nara-crema px-2.5 font-texto text-xs font-medium text-nara-tinta"
                        >
                          Generar
                        </button>
                      </div>
                    </label>
                    <label className="flex min-w-0 flex-col gap-1.5 font-medium">
                      <span className="leading-5">Celular</span>
                      <PhoneInput value={String(v.ef.phone ?? "")} onChange={v.efSet.phone} placeholder="3xx xxx xxxx" />
                    </label>
                    <label className="flex min-w-0 flex-col gap-1.5 font-medium">
                      <span className="leading-5">Meta diaria de visitas</span>
                      <input value={String(v.ef.target ?? "")} onChange={v.efSet.target} className="h-11 w-full rounded-[9px] border-[1.5px] border-linea bg-nara-blanco px-3 font-texto text-[15px] text-nara-tinta" />
                    </label>
                  </div>
                  <div className="flex flex-col gap-1.5 font-medium">
                    <span className="leading-5">Territorio (uno solo)</span>
                    {v.terrNames?.length ? (
                      <select
                        value={String(v.ef?.terr ?? "")}
                        onChange={v.efSet.terr}
                        className="h-11 w-full max-w-md rounded-[9px] border-[1.5px] border-linea bg-nara-blanco px-3 font-texto text-[15px] text-nara-tinta"
                      >
                        <option value="">Seleccione…</option>
                        {v.terrNames.map((n: string) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-[15px] text-texto-secundario">Cree un territorio antes de asignar expertos.</span>
                    )}
                  </div>
                  <p className="text-[15px] text-texto-secundario">Debe completar la capacitación antes de su primera visita.</p>
                </div>
              </FormModal>
              <TableSearch
                value={expertsQ}
                onChange={setExpertsQ}
                placeholder="Buscar experto, territorio, estado…"
              />
              <div className="nara-split-panel">
                <div style={{ background: '#fff', border: '1px solid #E3DFCF', borderRadius: '20px', overflow: 'hidden' }}>
                  <div className="nara-scroll-x">
                  <div style={{ minWidth: 720 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr) 100px 110px 80px minmax(0,1.2fr)', gap: '12px', padding: '12px 18px', background: '#FBFAF3', color: '#5A5A52', fontSize: '14px', fontWeight: '500' }}><span>Experto</span><span>Territorio</span><span>Hoy</span><span>Semana</span><span>Alertas</span><span>Estado</span></div>
                  {expertsRows.map((e: any) => (
                    <div key={e.name || e.id} onClick={() => e.open()} style={ix`display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr) 100px 110px 80px minmax(0,1.2fr);gap:12px;padding:12px 18px;border-top:1px solid #C0DFC8;align-items:center;background:${e.rowBg};cursor:pointer`} ><span style={{ fontWeight: '500' }}>{e.name}</span><span>{e.terr}</span><span>{e.today}</span><span>{e.week}</span><span>{e.flags}</span><span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', lineHeight: '1.3' }}><span style={ix`flex:none;width:10px;height:10px;border-radius:50%;background:${e.sc}`}></span>{e.status}</span></div>
                  ))}
                  {!expertsRows.length ? (
                    <p style={{ margin: 0, padding: '20px', textAlign: 'center', color: '#5A5A52', fontSize: 14 }}>
                      {expertsQ.trim() ? 'Ningún experto coincide con la búsqueda.' : 'No hay expertos.'}
                    </p>
                  ) : null}
                  </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ background: '#fff', border: '1px solid #E3DFCF', borderRadius: '20px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><span style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontWeight: '600', fontSize: '20px' }}>Visitas marcadas</span><span style={{ color: '#5A5A52' }}>{v.flagCount}</span></div>
                    {v.flags?.map((f) => (
                      <div key={f.id || f.person} style={{ border: '1px solid #E3DFCF', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}><span style={{ fontWeight: '500' }}>{f.expertName} · {f.territory}</span><span style={{ color: '#5A5A52' }}>{f.when}</span></div>
                        <span>Visita a {f.person}</span>
                        {f.reasons?.map((r, ri) => (<span key={ri} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span style={{ fontSize: '12px', fontWeight: '500', padding: '2px 7px', borderRadius: '5px', background: '#F7E2D2', color: '#7A3A10' }}>Revisar</span>{r}</span>))}
                        {f.pending && (<div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}><button onClick={() => f.approve()} style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontSize: '15px', height: '42px', padding: '0 16px', borderRadius: '10px', border: '1.5px solid #27683A', background: '#fff', color: '#27683A', cursor: 'pointer' }}>Aprobar</button><button onClick={() => f.reject()} style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontSize: '15px', fontWeight: '500', height: '42px', padding: '0 16px', borderRadius: '10px', border: 'none', background: '#27683A', color: '#fff', cursor: 'pointer' }}>Rechazar</button></div>)}
                        {f.done && (<span style={{ fontWeight: '500' }}>{f.doneText}</span>)}
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#fff', border: '1px solid #E3DFCF', borderRadius: '20px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontWeight: '500', fontSize: '16px' }}>Chequeos automáticos</span>
                    {v.checks?.map((c) => (<div key={c.k} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '12px', padding: '7px 0', borderTop: '1px solid #C0DFC8', fontSize: '14px' }}><span style={{ fontWeight: '500' }}>{c.k}</span><span style={{ color: '#5A5A52' }}>{c.v}</span></div>))}
                  </div>
                </div>
              </div>
              </div>)}
              {v.teamTab2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}><label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px', color: '#5A5A52' }}>Territorio<select value={String(v.pfTerr ?? "")} onChange={v.setPfTerr} style={{ height: '40px', borderRadius: '9px', border: '1.5px solid #E3DFCF', padding: '0 10px', fontSize: '14px', background: '#fff', color: '#27683A', minWidth: '180px' }}><option value="">Todos</option>{v.terrNames?.map((n: string) => (<option key={n} value={n}>{n}</option>))}</select></label><div style={{ display: 'flex', border: '1.5px solid #27683A', borderRadius: '10px', overflow: 'hidden' }}>{v.pfPeriods?.map((p) => (<button key={p.label} onClick={() => p.go()} style={ix`font-family:Bricolage Grotesque, system-ui, sans-serif;font-size:14px;font-weight:500;height:37px;padding:0 14px;border:none;background:${p.bg};color:${p.fg};cursor:pointer`}>{p.label}</button>))}</div><TableSearch value={pfQ} onChange={setPfQ} placeholder="Buscar en rendimiento…" /><span style={{ marginLeft: 'auto', fontSize: '14px', color: '#5A5A52' }}>Toque un encabezado para ordenar · toque una fila para abrir la ficha</span></div>
                  <div style={{ background: '#fff', border: '1px solid #E3DFCF', borderRadius: '20px', overflow: 'hidden' }}>
                    <div className="nara-scroll-x">
                    <div style={{ minWidth: 980 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) repeat(6,minmax(0,.8fr)) minmax(0,1.2fr) minmax(0,.9fr)', gap: '10px', padding: '10px 18px', background: '#FBFAF3' }}>{v.pfCols?.map((c) => (<button key={c.label} onClick={() => c.go()} style={ix`font-family:Bricolage Grotesque, system-ui, sans-serif;text-align:left;border:none;background:none;padding:0;font-size:13px;font-weight:500;color:${c.fg};cursor:pointer;white-space:normal;line-height:1.3`}>{c.label}{c.arrow}</button>))}</div>
                    {pfRows.map((r: any) => (<div key={r.name} onClick={() => r.open()} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) repeat(6,minmax(0,.8fr)) minmax(0,1.2fr) minmax(0,.9fr)', gap: '10px', padding: '11px 18px', borderTop: '1px solid #C0DFC8', alignItems: 'center', fontSize: '14px', cursor: 'pointer' }} ><div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}><span style={{ fontWeight: '500' }}>{r.name}</span><span style={{ fontSize: '12px', color: '#5A5A52' }}>{r.terr}</span></div><span>{r.vpd}</span><span style={ix`font-weight:${r.durFw};color:${r.durFg};background:${r.durBg};border-radius:6px;padding:2px 6px;justify-self:start`}>{r.dur}</span><span style={ix`color:${r.gpsFg};font-weight:${r.gpsFw}`}>{r.gps}</span><span style={ix`color:${r.verFg};font-weight:${r.verFw}`}>{r.ver}</span><span>{r.rej}</span><span style={ix`color:${r.gapFg};font-weight:${r.gapFw}`}>{r.gap}</span><span style={{ lineHeight: '1.35' }}>{r.mix}</span><span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontWeight: '500' }}><span style={ix`flex:none;width:9px;height:9px;border-radius:50%;background:${r.sc}`}></span>{r.status}</span></div>))}
                    {!pfRows.length ? (
                      <p style={{ margin: 0, padding: '20px', textAlign: 'center', color: '#5A5A52', fontSize: 14 }}>
                        {pfQ.trim() ? 'Ninguna fila coincide con la búsqueda.' : 'Sin datos de rendimiento.'}
                      </p>
                    ) : null}
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) repeat(6,minmax(0,.8fr)) minmax(0,1.2fr) minmax(0,.9fr)', gap: '10px', padding: '12px 18px', borderTop: '2px solid #27683A', alignItems: 'center', fontSize: '14px', background: '#FBFAF3', fontWeight: '500' }}><span>Promedio del programa</span><span>{v.pfAvg.vpd}</span><span>{v.pfAvg.dur}</span><span>{v.pfAvg.gps}</span><span>{v.pfAvg.ver}</span><span>{v.pfAvg.rej}</span><span>{v.pfAvg.gap}</span><span>{v.pfAvg.mix}</span><span></span></div>
                    </div>
                    </div>
                  </div>
                  <div style={{ background: '#fff', border: '1px solid #E3DFCF', borderRadius: '20px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}><div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}><span style={{ fontWeight: '500', fontSize: '17px' }}>Mapa de visitas del día · {v.mapTerr}</span><span style={{ fontSize: '13px', color: '#5A5A52' }}>OpenStreetMap · ubicaciones aproximadas de veredas y visitas</span></div><div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', fontSize: '13px' }}>{v.mapLegend?.map((l: { name: string; c: string }) => (<span key={l.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={ix`width:12px;height:12px;border-radius:50%;background:${l.c}`}></span>{l.name}</span>))}<span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F26B3A', opacity: 0.7 }}></span>Vereda / barrio</span><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#B42318', boxShadow: '0 0 0 3px #FDE7E4' }}></span>Alerta de GPS</span></div></div>
                    <VisitsMap
                      center={v.mapCenter || [4.6372, -75.5706]}
                      markers={v.mapMarkers || []}
                      emptyLabel={v.mapEmpty ? `Todavía no hay visitas cerradas hoy en ${v.mapTerr}.` : undefined}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
      
          {v.vPaths && <PathRoutesPanel v={v} />}

          {v.vPeople && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <PageHead>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
                  <span style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontWeight: '800', fontSize: 'clamp(22px,4vw,28px)' }}>Personas</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: '500', padding: '6px 12px', borderRadius: '8px', background: '#fff', border: '1px solid #E3DFCF', whiteSpace: 'nowrap' }}>Datos de identidad ocultos</span>
                </div>
              </div>
              </PageHead>
              <div className="nara-kpi-grid">{v.pk?.map((k) => (<div key={k.label} style={{ background: '#fff', border: '1px solid #E3DFCF', borderRadius: '20px', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '6px' }}><span style={{ color: '#5A5A52' }}>{k.label}</span><span style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontWeight: '600', fontSize: '32px', lineHeight: '1.1' }}>{k.val}</span><span style={{ fontSize: '14px', color: '#5A5A52' }}>{k.sub}</span></div>))}</div>
              <div style={{ background: '#fff', border: '1px solid #E3DFCF', borderRadius: '20px', overflow: 'hidden' }}>
                <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid #C0DFC8' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}><span style={{ fontWeight: '500', fontSize: '16px', marginRight: 'auto' }}>{v.rosterCount}</span><TableSearch value={String(v.q ?? "")} onChange={(q) => v.setQ?.(q)} placeholder="Buscar por cualquier campo…" /><button onClick={() => v.exportRoster()} style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontSize: '14px', fontWeight: '500', height: '40px', padding: '0 14px', borderRadius: '9px', border: '1.5px solid #27683A', background: '#fff', color: '#27683A', cursor: 'pointer', whiteSpace: 'nowrap' }}>Exportar (Excel)</button></div>
                  <div className="nara-form-grid-3" style={{ display: 'grid' }}>{v.pFilters?.map((f) => (<label key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px', color: '#5A5A52' }}>{f.label}<select value={String(f.val ?? "")} onChange={f.set} style={ix`height:38px;border-radius:8px;border:1.5px solid ${f.bd};padding:0 8px;font-size:14px;background:#fff;color:#27683A`}>{f.opts?.map((o, i) => (<option key={`${f.label}-${String(o.v ?? o.l)}-${i}`} value={String(o.v ?? "")}>{o.l}</option>))}</select></label>))}</div>
                  {v.hasPF && (<button onClick={() => v.clearPF()} style={{ alignSelf: 'flex-start', fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontSize: '13px', border: 'none', background: 'none', color: '#27683A', cursor: 'pointer', padding: '0', textDecoration: 'underline' }}>Quitar filtros</button>)}
                </div>
                <div className="nara-scroll-x">
                <div style={{ minWidth: 960 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '100px minmax(0,1fr) minmax(0,1fr) 60px 70px minmax(0,1.1fr) minmax(0,1fr) minmax(0,1fr)', gap: '12px', padding: '10px 20px', background: '#FBFAF3', color: '#5A5A52', fontSize: '13px', fontWeight: '500' }}><span>Código</span><span>Territorio</span><span>Vereda o barrio</span><span>Edad</span><span>Perfil</span><span>Avance en la ruta</span><span>Experto</span><span>Estado</span></div>
                <div style={{ maxHeight: '460px', overflow: 'auto' }}>
                  {v.roster?.map((p) => (
                    <div
                      key={p.code}
                      onClick={() => p.open()}
                      className={
                        p.inCrisis
                          ? 'grid cursor-pointer items-center gap-3 border-t border-[#4A0000] bg-[#6B0000] px-5 py-2.5 text-sm text-white hover:bg-[#5A0000]'
                          : 'grid cursor-pointer items-center gap-3 border-t border-[#C0DFC8] px-5 py-2.5 text-sm text-[#27683A] hover:bg-[#FAF8F5]'
                      }
                      style={{
                        gridTemplateColumns:
                          '100px minmax(0,1fr) minmax(0,1fr) 60px 70px minmax(0,1.1fr) minmax(0,1fr) minmax(0,1fr)',
                      }}
                    >
                      <span className="font-mono text-[13px]">{p.code}</span>
                      <span>{p.terr}</span>
                      <span>{p.place}</span>
                      <span>{p.age}</span>
                      <span className="flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-sm"
                          style={{ background: p.inCrisis ? '#FFFFFF' : p.rc }}
                        />
                        {p.profile}
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className={
                            p.inCrisis
                              ? 'h-1.5 flex-1 rounded-sm bg-white/25'
                              : 'h-1.5 flex-1 rounded-sm bg-[#C0DFC8]'
                          }
                        >
                          <div
                            className="h-full rounded-sm"
                            style={{
                              width: p.pct,
                              background: p.inCrisis ? '#FFFFFF' : '#27683A',
                            }}
                          />
                        </div>
                        <span
                          className={
                            p.inCrisis
                              ? 'whitespace-nowrap text-xs text-white/75'
                              : 'whitespace-nowrap text-xs text-[#5A5A52]'
                          }
                        >
                          {p.prog}
                        </span>
                      </div>
                      <span>{p.expert}</span>
                      <span
                        className={p.inCrisis ? 'font-semibold' : undefined}
                        style={p.inCrisis ? undefined : { fontWeight: p.fw }}
                      >
                        {p.status}
                      </span>
                    </div>
                  ))}
                  {v.noRoster && (<span style={{ display: 'block', padding: '20px', color: '#5A5A52' }}>Ninguna persona coincide con el filtro.</span>)}
                </div>
                </div>
                </div>
              </div>
              <div className="nara-split-panel" style={{ display: 'grid' }}>
                <div style={{ background: '#fff', border: '1px solid #E3DFCF', borderRadius: '20px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0 }}>
                  <span style={{ fontWeight: '500', fontSize: '16px' }}>Personas por perfil</span>
                  <div className="nara-scroll-x">
                  <div style={{ display: 'grid', gridTemplateColumns: '130px repeat(3,minmax(0,1fr))', gap: '6px', minWidth: 420 }}>
                    <span></span><span style={{ textAlign: 'center', color: '#5A5A52', fontSize: '13px' }}>Digital baja</span><span style={{ textAlign: 'center', color: '#5A5A52', fontSize: '13px' }}>Media</span><span style={{ textAlign: 'center', color: '#5A5A52', fontSize: '13px' }}>Alta</span>
                    {v.heat?.map((row, rowIdx) => (
                      <span key={rowIdx} style={{ display: 'contents' } as React.CSSProperties}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#5A5A52' }}><span style={ix`width:9px;height:9px;border-radius:2px;background:${row.c}`}></span>{row.k}</span>
                        {row.cells?.map((c, ci) => (<div key={ci} style={ix`height:56px;border-radius:9px;background:${c.bg};color:${c.fg};display:flex;flex-direction:column;align-items:center;justify-content:center`}><span style={{ fontWeight: '600', fontSize: '17px' }}>{c.v}</span><span style={{ fontSize: '12px' }}>{c.code}</span></div>))}
                      </span>
                    ))}
                  </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
                  <div style={{ background: '#fff', border: '1px solid #E3DFCF', borderRadius: '20px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span style={{ fontWeight: '500', fontSize: '16px' }}>Avance en la ruta</span>
                    {v.funnel?.map((f) => (<div key={f.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(100px,140px) minmax(0,1fr) 52px', gap: '10px', alignItems: 'center' }}><span style={{ fontSize: '13px', lineHeight: 1.3 }}>{f.label}</span><div style={{ height: '22px', background: '#FBFAF3', borderRadius: '5px', minWidth: 0 }}><div style={ix`height:100%;width:${f.w};background:#27683A;border-radius:5px`}></div></div><span style={{ textAlign: 'right', fontWeight: '500' }}>{f.v}</span></div>))}
                  </div>
                  <div style={{ background: '#fff', border: '1px solid #E3DFCF', borderRadius: '20px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span style={{ fontWeight: '500', fontSize: '16px' }}>Abandono por nivel digital</span>
                    {v.dropout?.map((f) => (<div key={f.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(72px,90px) minmax(0,1fr) 44px', gap: '10px', alignItems: 'center' }}><span>{f.label}</span><div style={{ height: '22px', background: '#FBFAF3', borderRadius: '5px', minWidth: 0 }}><div style={ix`height:100%;width:${f.w};background:${f.c};border-radius:5px`}></div></div><span style={{ textAlign: 'right', fontWeight: '500' }}>{f.v}</span></div>))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {v.vAssets && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <PageHead>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}><span style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontWeight: '800', fontSize: 'clamp(22px,4vw,28px)' }}>Activos</span><span style={{ color: '#5A5A52' }}>Manillas de monitoreo y tablets de campo</span></div>
              </PageHead>
              <div className="nara-kpi-grid-5">{v.bk?.map((k) => (<div key={k.label} style={{ background: '#fff', border: '1px solid #E3DFCF', borderRadius: '20px', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '6px' }}><span style={{ color: '#5A5A52' }}>{k.label}</span><span style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontWeight: '600', fontSize: '30px', lineHeight: '1.1' }}>{k.val}</span><span style={{ fontSize: '14px', color: '#5A5A52' }}>{k.sub}</span></div>))}</div>
              <div style={{ background: '#fff', border: '1px solid #E3DFCF', borderRadius: '20px', overflow: 'hidden' }}>
                <div style={{ padding: '14px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ fontWeight: '500', fontSize: '16px' }}>Manillas por territorio</span>
                  <TableSearch value={brQ} onChange={setBrQ} placeholder="Buscar territorio o estado…" />
                </div>
                <div className="nara-scroll-x">
                <div style={{ minWidth: 860 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) repeat(5,minmax(0,1fr)) minmax(0,1.2fr)', gap: '12px', padding: '10px 20px', background: '#FBFAF3', color: '#5A5A52', fontSize: '14px', fontWeight: '500' }}><span>Territorio</span><span>Asignadas</span><span>Entregadas</span><span>Envían datos</span><span>Sin datos</span><span>Disponibles</span><span>Estado</span></div>
                {brRows.map((b: any) => (<div key={b.name} onClick={() => b.open()} style={ix`display:grid;grid-template-columns:minmax(0,1.2fr) repeat(5,minmax(0,1fr)) minmax(0,1.2fr);gap:12px;padding:12px 20px;border-top:1px solid #C0DFC8;align-items:center;cursor:pointer;background:${b.active ? '#FDF2B3' : '#fff'}`} ><span style={{ fontWeight: '500' }}>{b.name}</span><span>{b.a}</span><span>{b.d}</span><span>{b.s}</span><span>{b.n}</span><span style={{ fontWeight: '500' }}>{b.av}</span><div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>{b.low && (<span style={{ fontSize: '13px', fontWeight: '500', padding: '3px 8px', borderRadius: '5px', background: '#F9EBC8', color: '#27683A' }}>Stock bajo</span>)}{b.canAssign && (<button type="button" onClick={(e) => b.assign(e)} style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontSize: '14px', fontWeight: '500', height: '36px', padding: '0 12px', borderRadius: '14px', border: 'none', background: '#F26B3A', color: '#FBFAF3', cursor: 'pointer' }}>Asignar 100</button>)}</div></div>))}
                {!brRows.length ? (
                  <p style={{ margin: 0, padding: '20px', textAlign: 'center', color: '#5A5A52', fontSize: 14 }}>
                    {brQ.trim() ? 'Ninguna fila coincide con la búsqueda.' : 'No hay manillas registradas.'}
                  </p>
                ) : null}
                </div>
                </div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #E3DFCF', borderRadius: '20px', overflow: 'hidden' }}>
                <div style={{ padding: '14px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ fontWeight: '500', fontSize: '16px' }}>Tablets de campo · 100 en total</span>
                  <TableSearch value={tabQ} onChange={setTabQ} placeholder="Buscar territorio o sync…" />
                </div>
                <div className="nara-scroll-x">
                <div style={{ minWidth: 780 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) repeat(4,minmax(0,1fr)) minmax(0,1fr)', gap: '12px', padding: '10px 20px', background: '#FBFAF3', color: '#5A5A52', fontSize: '14px', fontWeight: '500' }}><span>Territorio</span><span>Tablets</span><span>Sin sincronizar +24 h</span><span>En reparación</span><span>Última sincronización</span><span></span></div>
                {tabRows.map((b: any) => (<div key={b.name} onClick={() => b.open()} style={ix`display:grid;grid-template-columns:minmax(0,1.2fr) repeat(4,minmax(0,1fr)) minmax(0,1fr);gap:12px;padding:12px 20px;border-top:1px solid #C0DFC8;align-items:center;cursor:${b.cur};background:${b.active ? '#FDF2B3' : '#fff'}`} ><span style={{ fontWeight: '500' }}>{b.name}</span><span>{b.n}</span><span style={ix`font-weight:${b.fw}`}>{b.ns}</span><span>{b.r}</span><span>{b.last}</span>{b.canAssign && (<button type="button" onClick={(e) => b.assign(e)} style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', fontSize: '14px', fontWeight: '500', height: '36px', padding: '0 12px', borderRadius: '14px', border: 'none', background: '#F26B3A', color: '#FBFAF3', cursor: 'pointer' }}>{b.assignLabel}</button>)}</div>))}
                {!tabRows.length ? (
                  <p style={{ margin: 0, padding: '20px', textAlign: 'center', color: '#5A5A52', fontSize: 14 }}>
                    {tabQ.trim() ? 'Ninguna fila coincide con la búsqueda.' : 'No hay tablets registradas.'}
                  </p>
                ) : null}
                </div>
                </div>
              </div>

              <FormModal
                open={!!v.assetDetail}
                onClose={() => v.assetDetail?.close?.()}
                title={String(v.assetDetail?.title || "Detalle")}
                description="Resumen y unidades registradas en el territorio."
                size="lg"
                footer={(
                  <>
                    <button
                      type="button"
                      onClick={() => v.assetDetail?.openTerr?.()}
                      className="h-11 cursor-pointer rounded-[14px] border-none bg-nara-amarillo px-5 font-texto text-[15px] font-medium text-nara-tinta"
                    >
                      Ver territorio
                    </button>
                    <button
                      type="button"
                      onClick={() => v.assetDetail?.close?.()}
                      className="h-11 cursor-pointer rounded-[14px] border-[1.5px] border-linea bg-nara-blanco px-[18px] font-texto text-[15px] font-medium text-nara-tinta"
                    >
                      Cerrar
                    </button>
                  </>
                )}
              >
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {v.assetDetail?.summary?.map((s: { label: string; val: string | number }) => (
                      <div key={s.label} className="flex flex-col gap-1 rounded-2xl border border-linea bg-nara-crema/50 px-3.5 py-3">
                        <span className="text-[13px] text-texto-secundario">{s.label}</span>
                        <span className="font-titulos text-2xl font-semibold">{s.val}</span>
                      </div>
                    ))}
                  </div>
                  {v.assetDetail?.items?.length ? (
                    <div className="overflow-hidden rounded-2xl border border-linea">
                      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] gap-2 bg-[#FBFAF3] px-3.5 py-2.5 text-[13px] font-medium text-texto-secundario sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
                        <span>Código</span>
                        <span>Asignado a</span>
                        <span>Estado</span>
                        <span className="hidden sm:inline">Sync / batería</span>
                      </div>
                      {v.assetDetail.items.map((it: { code: string; who: string; state: string; sync: string; bat: string }) => (
                        <div key={it.code} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] gap-2 border-t border-linea px-3.5 py-2.5 text-sm sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
                          <span className="font-medium">{it.code}</span>
                          <span className="min-w-0 truncate">{it.who}</span>
                          <span>{it.state}</span>
                          <span className="hidden text-texto-secundario sm:inline">{it.sync}{it.bat !== "—" ? ` · ${it.bat}` : ""}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[15px] leading-relaxed text-texto-secundario">{v.assetDetail?.empty}</p>
                  )}
                </div>
              </FormModal>
            </div>
          )}
        
    </>
  );
}
