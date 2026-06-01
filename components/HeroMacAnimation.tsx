"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const CONVO = [
  {
    who: "user" as const,
    text: "No sé cómo revisar si el modelo está bien. ¿Lo reviso en Revit o lo exporto?",
  },
  {
    who: "ai" as const,
    text: "Exportá el IFC y arrastralo acá. Lo analizo con criterio BIM — niveles, fases, elementos duplicados.",
  },
];

const WEEKS = [
  "S1 · Mentalidad BIM y setup",
  "S2 · Estructura y muros",
  "S3 · Aberturas y materialidad",
  "S4 · Losas y cubierta",
  "S5 · Documentación 1",
  "S6 · Documentación 2",
  "S7 · Cuantificación",
  "S8 · Presentación",
];

const FILES = [
  { icon: "▤", title: "Criterio BIM vs CAD", sub: "lectura · 8 min" },
  { icon: "▤", title: "Paso a paso · Revit®", sub: "video · 14 min" },
  { icon: "▤", title: "Paso a paso · ArchiCAD®", sub: "video · 13 min" },
  { icon: "▤", title: "Del CAD al BIM", sub: "lectura · 6 min" },
  { icon: "◆", title: "Validación IFC", sub: "checkpoint para pasar a S2" },
];

export default function HeroMacAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chatStreamRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const [flat, setFlat] = useState(false);
  const [dimmed, setDimmed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorTop, setCursorTop] = useState("48%");
  const [cursorLeft, setCursorLeft] = useState("42%");
  const [fabPressed, setFabPressed] = useState(false);
  const [fabHidden, setFabHidden] = useState(false);
  const [dropVisible, setDropVisible] = useState(false);
  const [dropHot, setDropHot] = useState(false);
  const [chipGone, setChipGone] = useState(false);
  const [checkpointGreen, setCheckpointGreen] = useState(false);
  const [s1Done, setS1Done] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.innerWidth < 768) return; // skip animation on mobile

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          runAnimation();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function typeText(el: HTMLElement, text: string, speed: number, done?: () => void) {
    el.classList.add("ht-caret");
    let i = 0;
    const tick = () => {
      if (i <= text.length) {
        el.textContent = text.slice(0, i++);
        setTimeout(tick, speed);
      } else {
        el.classList.remove("ht-caret");
        done?.();
      }
    };
    tick();
  }

  function appendUserMsg(text: string, done: () => void) {
    const stream = chatStreamRef.current;
    if (!stream) { done(); return; }
    const bub = document.createElement("div");
    bub.className = "ht-bub ht-user";
    const span = document.createElement("span");
    bub.appendChild(span);
    stream.appendChild(bub);
    typeText(span, text, 22, () => setTimeout(done, 360));
  }

  function appendAiMsg(text: string, done: () => void) {
    const stream = chatStreamRef.current;
    if (!stream) { done(); return; }
    const wrap = document.createElement("div");
    wrap.className = "ht-bub ht-ai";
    const tag = document.createElement("span");
    tag.className = "ht-aitag";
    tag.textContent = "forastero · asistente";
    const dots = document.createElement("div");
    dots.className = "ht-dots";
    dots.innerHTML = "<span></span><span></span><span></span>";
    wrap.append(tag, dots);
    stream.appendChild(wrap);
    setTimeout(() => {
      dots.remove();
      const body = document.createElement("span");
      wrap.appendChild(body);
      typeText(body, text, 13, () => setTimeout(done, 480));
    }, 720);
  }

  function afterChat() {
    const t = (ms: number, fn: () => void) => setTimeout(fn, ms);
    t(400, () => setDropVisible(true));
    t(900, () => { setCursorVisible(true); setCursorTop("65%"); setCursorLeft("58%"); });
    t(1700, () => { setCursorTop("82%"); setCursorLeft("64%"); });
    t(2900, () => { setDropHot(true); setChipGone(true); setCursorVisible(false); });
    t(3400, () => { setCheckpointGreen(true); setS1Done(true); });
    t(4400, () => setCtaVisible(true));
  }

  function runAnimation() {
    setFlat(false); setDimmed(false); setDrawerOpen(false);
    setCursorVisible(false); setCursorTop("48%"); setCursorLeft("42%");
    setFabPressed(false); setFabHidden(false);
    setDropVisible(false); setDropHot(false); setChipGone(false);
    setCheckpointGreen(false); setS1Done(false); setCtaVisible(false);
    if (chatStreamRef.current) chatStreamRef.current.innerHTML = "";

    const t = (ms: number, fn: () => void) => setTimeout(fn, ms);

    t(700, () => setCursorVisible(true));
    t(1300, () => { setCursorTop("86%"); setCursorLeft("88%"); });
    t(2500, () => setFabPressed(true));
    t(2800, () => {
      setFabPressed(false); setFabHidden(true);
      setFlat(true); setDimmed(true); setDrawerOpen(true);
      setCursorVisible(false);
    });
    t(3600, () => {
      let step = 0;
      const next = () => {
        if (step >= CONVO.length) { afterChat(); return; }
        const m = CONVO[step++];
        if (m.who === "user") appendUserMsg(m.text, next);
        else appendAiMsg(m.text, next);
      };
      next();
    });
  }

  const winTransform = flat ? "rotateX(2deg) rotateY(-4deg)" : "rotateX(6deg) rotateY(-10deg)";

  return (
    <>
      <style>{`
        .ht-caret::after{content:"▍";margin-left:1px;animation:ht-blink .7s steps(1) infinite;}
        @keyframes ht-blink{50%{opacity:0;}}
        .ht-bub{max-width:92%;padding:7px 10px;font-size:10px;line-height:1.4;opacity:0;transform:translateY(5px);animation:ht-rise .4s ease forwards;}
        .ht-user{align-self:flex-end;background:#ecebe8;color:#1c1c1a;border-radius:10px 10px 3px 10px;}
        .ht-ai{align-self:flex-start;border-left:2px solid #1c1c1a;padding-left:10px;color:#1c1c1a;}
        .ht-aitag{display:block;font-family:'JetBrains Mono',monospace;font-size:6.5px;letter-spacing:.12em;text-transform:uppercase;color:#9a9893;margin-bottom:3px;}
        .ht-dots span{display:inline-block;width:4px;height:4px;margin-right:3px;border-radius:50%;background:#9a9893;animation:ht-dotblink 1.2s infinite;}
        .ht-dots span:nth-child(2){animation-delay:.2s;}.ht-dots span:nth-child(3){animation-delay:.4s;}
        @keyframes ht-dotblink{0%,60%,100%{opacity:.25;}30%{opacity:1;}}
        @keyframes ht-rise{to{opacity:1;transform:translateY(0);}}
        @keyframes ht-fadein{from{opacity:0;}to{opacity:1;}}
        @media(max-width:767px){
          .ht-macwin{transform:rotateX(1deg) rotateY(-2deg) !important;box-shadow:0 20px 50px -10px rgba(40,38,32,0.18) !important;}
        }
      `}</style>

      <div ref={containerRef} style={{ perspective: "2400px", perspectiveOrigin: "50% 40%" }}>
        <div
          className="ht-macwin"
          style={{
            background: "#fafaf9",
            border: "1px solid #e2e0db",
            borderRadius: "13px",
            overflow: "hidden",
            boxShadow: "0 45px 90px -20px rgba(40,38,32,0.32), 0 25px 45px -28px rgba(40,38,32,0.25)",
            transform: winTransform,
            transformStyle: "preserve-3d",
            transition: "transform 0.7s cubic-bezier(0.22,0.61,0.36,1)",
          }}
        >
          {/* Title bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 13px", background: "#efeeeb", borderBottom: "1px solid #e2e0db" }}>
            <div style={{ display: "flex", gap: "7px" }}>
              {(["#ec6a5e", "#f4bf4f", "#61c554"] as const).map((c, i) => (
                <span key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, display: "block" }} />
              ))}
            </div>
            <span style={{ fontSize: "10px", color: "#9a9893", fontWeight: 500 }}>forastero.lms — Bootcamp CAD → BIM</span>
            <div style={{ width: "40px" }} />
          </div>

          {/* 16:9 stage */}
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>

            {/* Sidebar + Main */}
            <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "148px 1fr" }}>

              {/* Sidebar */}
              <div style={{ background: "#f5f4f2", borderRight: "1px solid #e2e0db", padding: "12px 8px", display: "flex", flexDirection: "column", gap: "2px", overflow: "hidden" }}>
                <div style={{ fontSize: "12px", fontWeight: 500, letterSpacing: ".08em", color: "#1c1c1a", marginBottom: "11px" }}>
                  forastero<span style={{ color: "#9a9893" }}>.lms</span>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "7px", letterSpacing: ".1em", textTransform: "uppercase", color: "#9a9893", marginBottom: "5px", padding: "0 5px" }}>
                  Bootcamp CAD → BIM
                </div>
                {WEEKS.map((label, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: "8.5px",
                      color: i === 0 ? "#1c1c1a" : "#6b6a66",
                      padding: "4px 6px",
                      borderRadius: "5px",
                      lineHeight: 1.2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: i === 0 ? "#ecebe8" : "transparent",
                      borderLeft: i === 0 ? "2px solid #1c1c1a" : "none",
                      fontWeight: i === 0 ? 500 : 400,
                    }}
                  >
                    <span>{label}</span>
                    {i === 0 && s1Done && (
                      <span style={{ color: "#1d9e75", fontSize: "8px", marginLeft: "4px" }}>✓</span>
                    )}
                  </div>
                ))}
                <div style={{ height: "1px", background: "#e2e0db", margin: "7px 4px" }} />
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "7px", color: "#9a9893", padding: "0 5px", letterSpacing: ".04em" }}>
                  Ariel · acceso de por vida
                </div>
              </div>

              {/* Main panel */}
              <div style={{ padding: "18px 20px", overflow: "hidden", transition: "filter .5s ease", filter: dimmed ? "saturate(0.55) opacity(0.45)" : "none" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "8px", letterSpacing: ".12em", textTransform: "uppercase", color: "#9a9893", marginBottom: "7px" }}>
                  Semana 1 · Módulo de inicio
                </div>
                <div style={{ fontSize: "19px", fontWeight: 600, letterSpacing: "-0.7px", color: "#1c1c1a", marginBottom: "9px" }}>
                  Mentalidad BIM y setup
                </div>
                <p style={{ fontSize: "11px", lineHeight: 1.5, color: "#6b6a66", marginBottom: "15px", maxWidth: "94%" }}>
                  Antes de dibujar un muro: cómo pensar el modelo, definir niveles según cotas reales y exportar tu primer IFC vacío.
                </p>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "7.5px", letterSpacing: ".1em", textTransform: "uppercase", color: "#9a9893", marginBottom: "8px" }}>
                  Contenido de la semana
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {FILES.map((f, i) => {
                    const isCheckpoint = i === FILES.length - 1;
                    const green = isCheckpoint && checkpointGreen;
                    return (
                      <div
                        key={i}
                        style={{
                          padding: "7px 10px",
                          background: green ? "rgba(29,158,117,0.08)" : isCheckpoint ? "#ecebe8" : "#f5f4f2",
                          border: `1px solid ${green ? "#1d9e75" : isCheckpoint ? "#cbc8c1" : "#e2e0db"}`,
                          borderRadius: "7px",
                          display: "flex",
                          alignItems: "center",
                          gap: "9px",
                          transition: "background .4s ease, border-color .4s ease",
                        }}
                      >
                        <span style={{ color: green ? "#1d9e75" : "#9a9893", fontSize: "9px" }}>
                          {green ? "✓" : f.icon}
                        </span>
                        <div>
                          <div style={{ fontSize: "10.5px", color: green ? "#1d9e75" : "#1c1c1a", lineHeight: 1.2, transition: "color .4s ease" }}>{f.title}</div>
                          <div style={{ fontSize: "8px", color: "#9a9893", fontFamily: "'JetBrains Mono',monospace", marginTop: "1px" }}>{f.sub}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Agent drawer — slides from right */}
            <div style={{
              position: "absolute", top: 0, right: 0, width: "56%", height: "100%",
              background: "#fafaf9", borderLeft: "1px solid #e2e0db",
              boxShadow: "-20px 0 50px -20px rgba(40,38,32,0.18)",
              padding: "14px 16px", display: "flex", flexDirection: "column",
              transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.6s cubic-bezier(0.22,0.61,0.36,1)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "10px", marginBottom: "4px", borderBottom: "1px solid #e2e0db" }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "8px", letterSpacing: ".12em", textTransform: "uppercase", color: "#9a9893" }}>
                  forastero · asistente
                </span>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1d9e75" }} />
              </div>

              {/* Chat stream (DOM-manipulated via ref) */}
              <div ref={chatStreamRef} style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "6px", overflow: "hidden", flex: 1 }} />

              {/* IFC chip + drop zone */}
              {dropVisible && (
                <div style={{ marginTop: "8px", animation: "ht-fadein .35s ease" }}>
                  {!chipGone && (
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: "5px",
                      background: "#ecebe8", border: "1px solid #cbc8c1",
                      borderRadius: "5px", padding: "3px 8px",
                      fontFamily: "'JetBrains Mono',monospace", fontSize: "7.5px", color: "#1c1c1a",
                      marginBottom: "6px", cursor: "default",
                    }}>
                      <span style={{ fontSize: "9px", color: "#9a9893" }}>◈</span>
                      refugio_s1.ifc
                    </div>
                  )}
                  <div style={{
                    border: `1.5px dashed ${dropHot ? "#1d9e75" : "#cbc8c1"}`,
                    borderRadius: "8px", padding: "10px 12px",
                    background: dropHot ? "rgba(29,158,117,0.07)" : "#f5f4f2",
                    transition: "all .45s ease",
                    textAlign: "center",
                  }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "7px", letterSpacing: ".1em", textTransform: "uppercase", color: dropHot ? "#1d9e75" : "#9a9893" }}>
                      {dropHot ? "✓  archivo detectado — validando" : "arrastrá el .ifc acá"}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* FAB — Asistente button */}
            <div style={{
              position: "absolute", bottom: "13px", right: "13px",
              background: "#1c1c1a", color: "#fafaf9",
              fontSize: "9px", fontFamily: "'JetBrains Mono',monospace",
              letterSpacing: ".08em", textTransform: "uppercase",
              padding: "7px 12px", borderRadius: "7px",
              zIndex: 5, display: "flex", alignItems: "center", gap: "5px",
              transform: fabPressed ? "scale(0.88)" : "scale(1)",
              opacity: fabHidden ? 0 : 1,
              transition: "transform .2s ease, opacity .3s ease",
              pointerEvents: "none",
              userSelect: "none",
            }}>
              <span style={{ fontSize: "11px" }}>◇</span> Asistente
            </div>

            {/* Mouse cursor */}
            <div style={{
              position: "absolute", zIndex: 20, pointerEvents: "none",
              opacity: cursorVisible ? 1 : 0,
              top: cursorTop, left: cursorLeft,
              transition: "top 1.1s cubic-bezier(0.4,0,0.2,1), left 1.1s cubic-bezier(0.4,0,0.2,1), opacity .3s ease",
              filter: "drop-shadow(0 1px 2px rgba(40,38,32,0.3))",
            }}>
              <svg width="22" height="22" viewBox="0 0 22 22">
                <path d="M2 2 L2 16 L6 12 L9 19 L11 18 L8 11 L14 11 Z" fill="#1c1c1a" stroke="#fafaf9" strokeWidth="1" />
              </svg>
            </div>

            {/* CTA overlay */}
            {ctaVisible && (
              <div style={{
                position: "absolute", inset: 0, zIndex: 30,
                background: "rgba(28,28,26,0.76)",
                display: "flex", alignItems: "center", justifyContent: "center",
                animation: "ht-fadein .6s ease",
              }}>
                <div style={{ textAlign: "center", padding: "0 24px" }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "8px", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(250,250,249,0.5)", marginBottom: "10px" }}>
                    Tu próxima formación profesional
                  </div>
                  <div style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.5px", color: "#fafaf9", marginBottom: "18px" }}>
                    Bootcamp CAD → BIM
                  </div>
                  <Link
                    href="/bootcamp"
                    style={{
                      display: "inline-block",
                      background: "#fafaf9", color: "#1c1c1a",
                      borderRadius: "100px", padding: "9px 20px",
                      fontSize: "11px", fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Más información →
                  </Link>
                </div>
              </div>
            )}

          </div>{/* end 16:9 stage */}
        </div>{/* end mac window */}
      </div>
    </>
  );
}
