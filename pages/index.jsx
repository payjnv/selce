"use client";
import { useState, useEffect, useRef } from "react";

// ── Animated counter ────────────────────────────────────────────────────────
function Counter({ end, suffix = "", duration = 2000 }) {
  const [v, setV] = useState(0);
  const ref = useRef();
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - t0) / duration, 1);
          setV(Math.floor((1 - Math.pow(1 - p, 3)) * end));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <span ref={ref}>{v}{suffix}</span>;
}

// ── SVG Circuit schematic (desktop hero right panel) ──────────────────────
function Schematic() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 380 520" preserveAspectRatio="xMidYMid meet" fill="none">
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="rgba(181,127,12,0.5)" />
        </marker>
      </defs>
      {/* Grid reference lines */}
      {[80,160,240,320].map(x => <line key={`gx${x}`} x1={x} y1="0" x2={x} y2="520" stroke="rgba(43,45,160,0.1)" strokeWidth="0.5" strokeDasharray="3 8"/>)}
      {[80,160,240,320,400,480].map(y => <line key={`gy${y}`} x1="0" y1={y} x2="380" y2={y} stroke="rgba(43,45,160,0.1)" strokeWidth="0.5" strokeDasharray="3 8"/>)}

      {/* Main current path 1 */}
      <path d="M 30 100 L 190 100 L 190 200" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="none"/>
      <path d="M 30 100 L 190 100 L 190 200" stroke="#B57F0C" strokeWidth="1.5" fill="none" strokeDasharray="12 60" style={{animation:"dash-flow 4s linear infinite"}}/>

      {/* Main current path 2 */}
      <path d="M 190 200 L 190 300 L 310 300" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="none"/>
      <path d="M 190 200 L 190 300 L 310 300" stroke="#B57F0C" strokeWidth="1.5" fill="none" strokeDasharray="12 60" style={{animation:"dash-flow 3s linear 0.6s infinite"}}/>

      {/* Branch path */}
      <path d="M 190 300 L 190 400 L 80 400" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="none"/>
      <path d="M 190 300 L 190 400 L 80 400" stroke="rgba(43,45,160,0.7)" strokeWidth="1.5" fill="none" strokeDasharray="12 60" style={{animation:"dash-flow 3.5s linear 1s infinite"}}/>

      {/* Return path */}
      <path d="M 310 300 L 350 300 L 350 400 L 80 400" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="none"/>
      <path d="M 310 300 L 350 300 L 350 400 L 80 400" stroke="rgba(43,45,160,0.6)" strokeWidth="1.5" fill="none" strokeDasharray="12 60" style={{animation:"dash-flow 5s linear 0.3s infinite"}}/>

      {/* Resistor at top */}
      <g transform="translate(60,100)" opacity="0.65">
        <line x1="-22" y1="0" x2="-8" y2="0" stroke="#B57F0C" strokeWidth="1"/>
        <rect x="-8" y="-6" width="16" height="12" fill="none" stroke="#B57F0C" strokeWidth="1"/>
        <line x1="8" y1="0" x2="22" y2="0" stroke="#B57F0C" strokeWidth="1"/>
        <text x="0" y="20" textAnchor="middle" fill="rgba(181,127,12,0.65)" fontSize="8" fontFamily="'Share Tech Mono','Courier New',monospace">R1 10Ω</text>
      </g>

      {/* Capacitor */}
      <g transform="translate(310,260)" opacity="0.55">
        <line x1="-18" y1="0" x2="-3" y2="0" stroke="#B57F0C" strokeWidth="1"/>
        <line x1="-3" y1="-9" x2="-3" y2="9" stroke="#B57F0C" strokeWidth="1.5"/>
        <line x1="3" y1="-9" x2="3" y2="9" stroke="#B57F0C" strokeWidth="1.5"/>
        <line x1="3" y1="0" x2="18" y2="0" stroke="#B57F0C" strokeWidth="1"/>
        <text x="0" y="20" textAnchor="middle" fill="rgba(181,127,12,0.6)" fontSize="8" fontFamily="'Share Tech Mono','Courier New',monospace">C1 100µF</text>
      </g>

      {/* Resistor at bottom */}
      <g transform="translate(160,400)" opacity="0.6">
        <line x1="-22" y1="0" x2="-8" y2="0" stroke="#B57F0C" strokeWidth="1"/>
        <rect x="-8" y="-6" width="16" height="12" fill="none" stroke="#B57F0C" strokeWidth="1"/>
        <line x1="8" y1="0" x2="22" y2="0" stroke="#B57F0C" strokeWidth="1"/>
        <text x="0" y="20" textAnchor="middle" fill="rgba(181,127,12,0.6)" fontSize="8" fontFamily="'Share Tech Mono','Courier New',monospace">R2 22Ω</text>
      </g>

      {/* Junction nodes */}
      {[[190,200],[190,300],[80,400],[310,300]].map(([cx,cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="4.5" fill="#B57F0C" style={{filter:"drop-shadow(0 0 5px rgba(181,127,12,0.9))"}}/>
      ))}

      {/* Ground */}
      <g transform="translate(190,460)" opacity="0.55">
        <line x1="0" y1="-22" x2="0" y2="0" stroke="#9BAAD4" strokeWidth="1"/>
        <line x1="-16" y1="0" x2="16" y2="0" stroke="#9BAAD4" strokeWidth="1.5"/>
        <line x1="-10" y1="7" x2="10" y2="7" stroke="#9BAAD4" strokeWidth="1"/>
        <line x1="-5" y1="14" x2="5" y2="14" stroke="#9BAAD4" strokeWidth="1"/>
        <text x="20" y="4" fill="rgba(155,170,212,0.5)" fontSize="9" fontFamily="'Share Tech Mono','Courier New',monospace">GND</text>
      </g>

      {/* Power source */}
      <g transform="translate(30,100)">
        <circle cx="0" cy="0" r="16" fill="none" stroke="rgba(43,45,160,0.6)" strokeWidth="1"/>
        <text x="0" y="-22" textAnchor="middle" fill="rgba(155,170,212,0.45)" fontSize="9" fontFamily="'Share Tech Mono','Courier New',monospace">VAC</text>
        <text x="0" y="4" textAnchor="middle" fill="#B57F0C" fontSize="14">⚡</text>
      </g>

      {/* Labels */}
      <text x="218" y="95" fill="rgba(155,170,212,0.35)" fontSize="9" fontFamily="'Share Tech Mono','Courier New',monospace">BUS PRINCIPAL</text>
      <text x="318" y="295" fill="rgba(155,170,212,0.35)" fontSize="9" fontFamily="'Share Tech Mono','Courier New',monospace">CIRC-B</text>
      <text x="198" y="295" fill="rgba(155,170,212,0.35)" fontSize="9" fontFamily="'Share Tech Mono','Courier New',monospace">NODE</text>

      {/* Border */}
      <rect x="1" y="1" width="378" height="518" fill="none" stroke="rgba(43,45,160,0.18)" strokeWidth="1"/>

      {/* Corner ticks */}
      {[[0,0],[1,0],[0,1],[1,1]].map(([fx,fy],i) => (
        <g key={i} transform={`translate(${fx*380},${fy*520})`}>
          <line x1={fx===0?1:-1} y1={fy===0?16:-16} x2={fx===0?1:-1} y2={fy===0?1:-1} stroke="rgba(181,127,12,0.4)" strokeWidth="1"/>
          <line x1={fx===0?1:16} y1={fy===0?1:-1} x2={fx===0?16:1} y2={fy===0?1:-1} stroke="rgba(181,127,12,0.4)" strokeWidth="1"/>
        </g>
      ))}

      {/* Revision block */}
      <rect x="280" y="478" width="98" height="40" fill="none" stroke="rgba(43,45,160,0.25)" strokeWidth="1"/>
      <line x1="280" y1="488" x2="378" y2="488" stroke="rgba(43,45,160,0.2)" strokeWidth="0.5"/>
      <text x="286" y="486" fill="rgba(155,170,212,0.4)" fontSize="7" fontFamily="'Share Tech Mono','Courier New',monospace">REV · SELCE-001</text>
      <text x="286" y="498" fill="rgba(155,170,212,0.3)" fontSize="7" fontFamily="'Share Tech Mono','Courier New',monospace">A-2012  B-2018</text>
      <text x="286" y="512" fill="rgba(181,127,12,0.65)" fontSize="7" fontFamily="'Share Tech Mono','Courier New',monospace">C-2025 ACTUAL ●</text>
    </svg>
  );
}

export default function SelceFinal() {
  const [scrollY, setScrollY]     = useState(0);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeIdx, setActiveIdx] = useState(null);
  const [sent, setSent]           = useState(false);
  const [form, setForm]           = useState({ nombre:"", tel:"", servicio:"", msg:"" });

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const services = [
    { code:"SVC-001", name:"Instalaciones Eléctricas",  sub:"Residencial · Comercial · Industrial", amps:"200A",   volt:"120/240V", desc:"Diseño y construcción de instalaciones eléctricas residenciales, comerciales e industriales. Trabajo limpio, seguro y a código. Entregamos plano actualizado con cada proyecto." },
    { code:"SVC-002", name:"Mantenimiento Preventivo",  sub:"Preventivo · Correctivo · Termografía", amps:"—",     volt:"Multifase", desc:"Programa de mantenimiento preventivo con inspección termográfica, medición de aislamiento y pruebas de continuidad. Detectamos fallas antes de que ocurran." },
    { code:"SVC-003", name:"Proyectos Industriales",    sub:"Plantas · Tableros · Automatización",   amps:"400A+", volt:"480V",      desc:"Diseño e implementación de sistemas eléctricos industriales. Alimentadores, tableros de distribución de alta capacidad, protecciones y automatización." },
    { code:"SVC-004", name:"Energía Solar",             sub:"Fotovoltaico · On-grid · Off-grid",      amps:"—",     volt:"DC/AC",     desc:"Instalación de sistemas fotovoltaicos on-grid y off-grid. Estudio de consumo, diseño del array, certificación e integración con EDENORTE. ROI desde 4 años." },
    { code:"SVC-005", name:"Smart Home",                sub:"Automatización · Seguridad · Control",   amps:"20A",   volt:"120V",      desc:"Automatización residencial completa. Control de iluminación, climatización y seguridad desde un solo panel. Compatible con Alexa, Google Home y Apple HomeKit." },
    { code:"SVC-006", name:"Emergencias 24/7",          sub:"Respuesta < 60 min · Santiago RD",       amps:"—",     volt:"Urgente",   desc:"Unidad de respuesta a emergencias disponible 24/7. Atendemos cortos circuitos, sobretensiones y caídas de tablero en menos de 60 minutos en Santiago." },
  ];

  const scrolled = scrollY > 50;

  return (
    <div style={{ background:"#05091C", color:"#D0D8FF", fontFamily:"'Share Tech Mono','Courier New',monospace", overflowX:"hidden" }}>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #B57F0C; color: #000; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #05091C; }
        ::-webkit-scrollbar-thumb { background: #2B2DA0; border-radius: 2px; }

        :root {
          --blue:    #2B2DA0;
          --blue2:   #3D3FC4;
          --gold:    #B57F0C;
          --gold2:   #D4960E;
          --bg:      #05091C;
          --bg2:     rgba(43,45,160,0.06);
          --line:    rgba(43,45,160,0.22);
          --linefaint: rgba(43,45,160,0.10);
          --text:    rgba(155,170,212,0.75);
          --bright:  #D0D8FF;
          --grid-big: 100px;
          --grid-sm:  20px;
        }

        /* Blueprint grid */
        .bp-grid {
          background-image:
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px),
            linear-gradient(var(--linefaint) 1px, transparent 1px),
            linear-gradient(90deg, var(--linefaint) 1px, transparent 1px);
          background-size: var(--grid-big) var(--grid-big), var(--grid-big) var(--grid-big), var(--grid-sm) var(--grid-sm), var(--grid-sm) var(--grid-sm);
        }

        /* ── Keyframes ── */
        @keyframes dash-flow   { to { stroke-dashoffset: -72; } }
        @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scan        { 0%{top:-2px} 100%{top:100%} }
        @keyframes glow-gold   { 0%,100%{text-shadow:0 0 10px rgba(181,127,12,0.35)} 50%{text-shadow:0 0 28px rgba(181,127,12,0.85),0 0 56px rgba(181,127,12,0.25)} }
        @keyframes power-on    { 0%{opacity:0;filter:blur(6px)} 60%{opacity:1;filter:blur(0)} 65%{opacity:.35} 70%{opacity:1} 100%{opacity:1} }
        @keyframes fadein      { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float-y     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes spin-slow   { to{transform:rotate(360deg)} }
        @keyframes shimmer     { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes marquee     { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .power-on { animation: power-on 1.2s ease forwards; opacity:0; }
        .d1{animation-delay:.1s} .d2{animation-delay:.35s} .d3{animation-delay:.6s} .d4{animation-delay:.85s} .d5{animation-delay:1.1s}

        /* ── Reusable ── */
        .bebas { font-family:'Bebas Neue','Arial Black',Impact,sans-serif !important; }
        .mono  { font-family:'Share Tech Mono','Courier New',monospace !important; }

        .tag {
          border: 1px solid rgba(181,127,12,0.45);
          padding: 4px 12px;
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(181,127,12,0.9);
          display: inline-block;
          font-family:'Share Tech Mono','Courier New',monospace;
        }

        .ann {
          font-size: 10px;
          letter-spacing: 1.5px;
          color: rgba(155,170,212,0.5);
          font-family:'Share Tech Mono','Courier New',monospace;
        }

        /* ── Buttons ── */
        .btn-gold {
          background: #B57F0C;
          color: #fff;
          border: none;
          padding: 15px 36px;
          font-family:'Bebas Neue','Arial Black',Impact,sans-serif;
          font-size: 20px;
          letter-spacing: 3px;
          cursor: pointer;
          transition: background .2s, box-shadow .2s;
          position: relative; overflow: hidden;
        }
        .btn-gold::after {
          content:''; position:absolute; inset:0;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent);
          transform: translateX(-100%); transition: transform .4s;
        }
        .btn-gold:hover::after { transform: translateX(100%); }
        .btn-gold:hover { background: #D4960E; box-shadow: 0 0 24px rgba(181,127,12,0.45); }

        .btn-outline {
          background: transparent;
          color: rgba(100,110,200,0.9);
          border: 1px solid #2B2DA0;
          padding: 14px 36px;
          font-family:'Bebas Neue','Arial Black',Impact,sans-serif;
          font-size: 20px;
          letter-spacing: 3px;
          cursor: pointer;
          transition: all .2s;
        }
        .btn-outline:hover { background: rgba(43,45,160,0.2); border-color: #4547D4; color: #fff; }

        /* ── Service rows ── */
        .svc-row {
          border: 1px solid rgba(43,45,160,0.25);
          padding: 24px 28px;
          cursor: pointer;
          transition: border-color .2s, background .2s;
          position: relative; overflow: hidden;
          display: grid;
          gap: 20px;
          align-items: center;
        }
        .svc-row::before {
          content:''; position:absolute; left:0; top:0; bottom:0;
          width:0; background:rgba(43,45,160,0.1);
          transition: width .3s;
        }
        .svc-row:hover::before  { width:100%; }
        .svc-row:hover          { border-color: rgba(43,45,160,0.55); }
        .svc-row.open           { border-color: #B57F0C; background: rgba(181,127,12,0.04); }

        /* ── Form inputs ── */
        .inp {
          width: 100%;
          background: rgba(43,45,160,0.08);
          border: 1px solid rgba(43,45,160,0.35);
          color: #D0D8FF;
          font-family:'Share Tech Mono','Courier New',monospace;
          font-size: 13px;
          padding: 12px 16px;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
          letter-spacing: .5px;
          border-radius: 0;
        }
        .inp:focus { border-color: #B57F0C; box-shadow: 0 0 0 1px rgba(181,127,12,0.2); }
        .inp::placeholder { color: rgba(43,45,160,0.5); }

        /* ── Nav link ── */
        .nav-lnk {
          background: none; border: none;
          color: rgba(155,170,212,0.65);
          font-family:'Share Tech Mono','Courier New',monospace;
          font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase; cursor: pointer;
          transition: color .2s;
          padding: 4px 0;
          position: relative;
        }
        .nav-lnk::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:#B57F0C; transition:width .3s; }
        .nav-lnk:hover { color:#B57F0C; }
        .nav-lnk:hover::after { width:100%; }

        /* ── Stat box ── */
        .stat-box {
          padding: 40px 32px;
          border-right: 1px solid rgba(43,45,160,0.2);
          position: relative;
          transition: background .25s;
        }
        .stat-box:hover { background: rgba(43,45,160,0.06); }
        .stat-box:last-child { border-right: none; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-cols  { flex-direction: column !important; }
          .schematic-panel { display: none !important; }
          .about-cols { flex-direction: column !important; }
          .contact-cols { flex-direction: column !important; }
          .stats-row  { grid-template-columns: 1fr 1fr !important; }
          .svc-row    { grid-template-columns: 80px 1fr 24px !important; }
          .svc-code   { display: none !important; }
          .svc-meta   { display: none !important; }
          .nav-links  { display: none !important; }
          .mob-toggle { display: flex !important; }
          .hero-title { font-size: clamp(80px, 22vw, 160px) !important; }
          .hero-sub   { font-size: clamp(36px, 10vw, 72px)  !important; }
          .cta-row    { flex-direction: column !important; }
          .footer-row { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
        }
        @media (max-width: 540px) {
          .stats-row  { grid-template-columns: 1fr 1fr !important; }
          .stat-box   { padding: 28px 20px !important; border-right: none !important; }
          .stat-box:nth-child(odd) { border-right: 1px solid rgba(43,45,160,0.2) !important; }
          .feat-grid  { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ═══════════════════════════════ NAVBAR ══════════════════════════════ */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200,
        height:"54px",
        background: scrolled ? "rgba(5,9,28,0.97)" : "rgba(5,9,28,0.7)",
        backdropFilter:"blur(14px)",
        borderBottom:"1px solid rgba(43,45,160,0.28)",
        display:"flex", alignItems:"center", padding:"0 clamp(18px,4%,48px)",
        transition:"background .35s",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.5)" : "none",
      }}>
        {/* Logo */}
        <div onClick={() => scrollTo("hero")} style={{ display:"flex", alignItems:"center", gap:"10px", cursor:"pointer", marginRight:"auto" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#B57F0C" style={{ animation:"glow-gold 3s infinite", flexShrink:0 }}>
            <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13Z"/>
          </svg>
          <span style={{ fontFamily:"'Bebas Neue','Arial Black',Impact,sans-serif", fontSize:"22px", letterSpacing:"5px", color:"#fff", lineHeight:1 }}>SELCE</span>
          <span style={{ fontFamily:"'Share Tech Mono','Courier New',monospace", fontSize:"9px", color:"rgba(155,170,212,0.4)", letterSpacing:"2px", marginTop:"2px" }}>SERVICIOS ELÉCTRICOS</span>
        </div>

        {/* Desktop nav */}
        <div style={{ display:"flex", gap:"32px", alignItems:"center" }} className="nav-links">
          {[["servicios","Servicios"],["nosotros","Nosotros"],["contacto","Contacto"]].map(([id,label]) => (
            <button key={id} className="nav-lnk" onClick={() => scrollTo(id)}>{label}</button>
          ))}
          <button className="btn-gold" onClick={() => scrollTo("contacto")} style={{ padding:"9px 24px", fontSize:"16px" }}>
            Cotizar →
          </button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          className="mob-toggle"
          style={{ display:"none", background:"none", border:"1px solid rgba(43,45,160,0.4)", color:"#D0D8FF", padding:"6px 14px", fontFamily:"'Share Tech Mono','Courier New',monospace", fontSize:"11px", cursor:"pointer", letterSpacing:"1px", alignItems:"center" }}>
          {menuOpen ? "[✕]" : "[≡]"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:199, background:"rgba(5,9,28,0.99)", display:"flex", flexDirection:"column", justifyContent:"center", padding:"clamp(24px,8%,80px)", gap:"2px", animation:"fadein .25s ease" }}>
          {[["hero","INICIO"],["servicios","SERVICIOS"],["nosotros","NOSOTROS"],["contacto","CONTACTO"]].map(([id,label],i) => (
            <div key={id} onClick={() => scrollTo(id)} style={{ fontFamily:"'Bebas Neue','Arial Black',Impact,sans-serif", fontSize:"clamp(48px,13vw,72px)", color:"#fff", letterSpacing:"4px", cursor:"pointer", borderBottom:"1px solid rgba(43,45,160,0.2)", paddingBottom:"16px", marginBottom:"16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span>{label}</span>
              <span style={{ fontSize:"18px", color:"#B57F0C" }}>0{i+1}</span>
            </div>
          ))}
          <div style={{ marginTop:"32px" }}>
            <div className="ann">⚡ EMERGENCIAS: (809) 555-0000</div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════ HERO ════════════════════════════════ */}
      <section id="hero" className="bp-grid" style={{ paddingTop:"54px", minHeight:"100vh", display:"flex", flexDirection:"column", position:"relative" }}>

        {/* Scanline */}
        <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:1 }}>
          <div style={{ position:"absolute", left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent,rgba(43,45,160,0.25),rgba(181,127,12,0.12),transparent)", animation:"scan 10s linear infinite" }}/>
        </div>

        {/* Status bar */}
        <div style={{ padding:"9px clamp(18px,4%,48px)", borderBottom:"1px solid rgba(43,45,160,0.18)", display:"flex", alignItems:"center", gap:"16px", position:"relative", zIndex:2, flexWrap:"wrap", rowGap:"6px" }}>
          <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#22C55E", boxShadow:"0 0 8px #22C55E", display:"inline-block", animation:"blink 2s infinite", flexShrink:0 }}/>
          <span className="ann">SYS: ONLINE · SELCE-SERVICIOS-RD · REV.2025</span>
          <span className="ann" style={{ marginLeft:"auto", color:"rgba(181,127,12,0.75)" }}>⚡ EMERGENCIAS: (809) 555-0000</span>
        </div>

        {/* Hero body */}
        <div style={{ flex:1, display:"flex", position:"relative", zIndex:2 }} className="hero-cols">

          {/* Left — Content */}
          <div style={{ flex:1, padding:"clamp(32px,5%,64px) clamp(18px,4%,48px)", display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight:"85vh" }}>

            {/* Top annotations */}
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <div style={{ width:"20px", height:"1px", background:"rgba(181,127,12,0.4)" }}/>
              <span className="ann">PLANO: HQ-001 · SANTIAGO, RD</span>
            </div>

            {/* Title block */}
            <div style={{ margin:"clamp(24px,4vh,40px) 0" }}>
              <div className="power-on d1" style={{ marginBottom:"20px" }}>
                <span className="tag">SERVICIOS ELÉCTRICOS PROFESIONALES</span>
              </div>

              <h1 className="power-on d2 hero-title" style={{
                fontFamily:"'Bebas Neue','Arial Black',Impact,sans-serif",
                fontSize:"clamp(80px,16vw,200px)",
                color:"#fff", lineHeight:0.82, letterSpacing:"-3px",
              }}>SELCE</h1>

              <h2 className="power-on d3 hero-sub" style={{
                fontFamily:"'Bebas Neue','Arial Black',Impact,sans-serif",
                fontSize:"clamp(36px,8vw,100px)",
                color:"rgba(155,170,212,0.32)", letterSpacing:"clamp(4px,1.5vw,12px)",
                marginBottom:"clamp(20px,3vh,32px)", lineHeight:1
              }}>SERVICIOS</h2>

              {/* Divider */}
              <div className="power-on d3" style={{ display:"flex", alignItems:"center", gap:"14px", margin:"clamp(16px,2.5vh,28px) 0" }}>
                <div style={{ flex:1, height:"1px", background:"linear-gradient(90deg,#B57F0C,rgba(43,45,160,0.3))" }}/>
                <span className="ann">120/240V · 60Hz · SANTIAGO, RD</span>
              </div>

              <p className="power-on d4" style={{ fontSize:"clamp(12px,1.4vw,15px)", color:"var(--text)", lineHeight:1.85, maxWidth:"540px", letterSpacing:".3px" }}>
                Empresa de servicios eléctricos con más de 12 años en Santiago. Instalaciones residenciales y comerciales, mantenimiento preventivo, energía solar y emergencias 24/7. Todo trabajo garantizado por escrito.
              </p>
            </div>

            {/* CTAs */}
            <div className="power-on d5">
              <div style={{ display:"flex", gap:"14px", flexWrap:"wrap", alignItems:"center", marginBottom:"clamp(16px,2vh,24px)" }} className="cta-row">
                <button className="btn-gold" onClick={() => scrollTo("contacto")}>⚡ COTIZACIÓN GRATIS</button>
                <button className="btn-outline" onClick={() => scrollTo("servicios")}>VER SERVICIOS</button>
              </div>
              <span className="ann">RESPUESTA &lt; 60 MIN EN SANTIAGO</span>
            </div>
          </div>

          {/* Right — Schematic panel (desktop only) */}
          <div className="schematic-panel" style={{
            width:"clamp(320px,35vw,460px)", flexShrink:0,
            borderLeft:"1px solid rgba(43,45,160,0.2)",
            padding:"clamp(24px,3%,40px)",
            display:"flex", flexDirection:"column", position:"relative"
          }}>
            <div style={{ position:"absolute", top:"16px", left:"16px" }}>
              <span className="ann">ESQUEMÁTICO — SELCE-001</span>
            </div>

            {/* Stats inside panel */}
            <div style={{ marginTop:"48px", marginBottom:"24px", display:"flex", flexDirection:"column", gap:"28px" }}>
              {[["500+","PROYECTOS"],["12","AÑOS DE EXP."],["24/7","DISPONIBILIDAD"]].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:"'Bebas Neue','Arial Black',Impact,sans-serif", fontSize:"clamp(48px,6vw,68px)", color:"#fff", lineHeight:1, letterSpacing:"-2px", animation:"glow-gold 4s ease-in-out infinite" }}>{n}</div>
                  <div className="ann">{l}</div>
                </div>
              ))}
            </div>

            {/* SVG schematic */}
            <div style={{ flex:1, position:"relative" }}>
              <Schematic/>
            </div>

            {/* Stamp */}
            <div style={{ position:"absolute", bottom:"56px", right:"24px", width:"88px", height:"88px", borderRadius:"50%", border:"2px solid rgba(181,127,12,0.35)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", animation:"float-y 4s ease-in-out infinite" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#B57F0C"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13Z"/></svg>
              <span style={{ fontSize:"7px", letterSpacing:"1.5px", color:"rgba(181,127,12,0.65)", marginTop:"5px", textAlign:"center", lineHeight:1.5, fontFamily:"'Share Tech Mono','Courier New',monospace" }}>CERT.<br/>2012</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ MARQUEE ═════════════════════════════ */}
      <div style={{ background:"#B57F0C", overflow:"hidden", padding:"13px 0", borderTop:"1px solid rgba(10,10,10,0.15)", borderBottom:"1px solid rgba(10,10,10,0.15)", position:"relative", zIndex:2 }}>
        <div style={{ display:"flex", animation:"marquee 28s linear infinite", width:"max-content" }}>
          {[0,1].map(k => (
            <span key={k} style={{ fontFamily:"'Bebas Neue','Arial Black',Impact,sans-serif", fontWeight:700, fontSize:"15px", letterSpacing:"4px", color:"#fff", whiteSpace:"nowrap", paddingRight:"0" }}>
              {"⚡ INSTALACIONES  ·  MANTENIMIENTO  ·  ENERGÍA SOLAR  ·  SMART HOME  ·  EMERGENCIAS 24/7  ·  SANTIAGO RD  ·  ".repeat(4)}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════ SERVICES ════════════════════════════ */}
      <section id="servicios" className="bp-grid" style={{ padding:"clamp(48px,7vw,88px) clamp(18px,4%,48px)" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>

          <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:"clamp(24px,4vw,40px)", paddingBottom:"16px", borderBottom:"1px solid rgba(43,45,160,0.3)", flexWrap:"wrap", gap:"12px" }}>
            <h2 style={{ fontFamily:"'Bebas Neue','Arial Black',Impact,sans-serif", fontSize:"clamp(36px,6vw,72px)", letterSpacing:"6px", color:"#fff" }}>SERVICIOS</h2>
            <span className="ann">06 ESPECIALIDADES · EST. 2012</span>
          </div>

          {/* Table header — desktop only */}
          <div className="nav-links" style={{ display:"grid", gridTemplateColumns:"100px 1fr 90px 100px 28px", gap:"20px", padding:"8px 28px", marginBottom:"6px" }}>
            {["CÓDIGO","SERVICIO","CORRIENTE","TENSIÓN",""].map(h => <span key={h} className="ann">{h}</span>)}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"5px" }}>
            {services.map((s,i) => (
              <div key={i}>
                <div
                  className={`svc-row ${activeIdx===i?"open":""}`}
                  onClick={() => setActiveIdx(activeIdx===i ? null : i)}
                  style={{ gridTemplateColumns:"100px 1fr 90px 100px 28px" }}
                >
                  <span className="ann svc-code" style={{ color:"#B57F0C", letterSpacing:"1px" }}>{s.code}</span>
                  <div>
                    <div style={{ fontFamily:"'Bebas Neue','Arial Black',Impact,sans-serif", fontSize:"clamp(22px,3vw,30px)", letterSpacing:"2px", color: activeIdx===i ? "#B57F0C" : "#fff", lineHeight:1 }}>{s.name}</div>
                    <div className="ann" style={{ marginTop:"3px" }}>{s.sub}</div>
                  </div>
                  <span className="ann svc-meta">{s.amps}</span>
                  <span className="ann svc-meta">{s.volt}</span>
                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"20px", color:"#B57F0C", transition:"transform .3s", display:"block", transform: activeIdx===i ? "rotate(45deg)" : "none", lineHeight:1 }}>+</span>
                </div>

                {activeIdx===i && (
                  <div style={{ background:"rgba(43,45,160,0.07)", borderLeft:"2px solid #B57F0C", padding:"clamp(16px,2.5vw,24px) clamp(18px,3vw,28px)", marginTop:"5px", animation:"fadein .25s ease" }}>
                    <p style={{ fontSize:"clamp(12px,1.3vw,14px)", color:"var(--text)", lineHeight:1.9, maxWidth:"640px", marginBottom:"20px" }}>{s.desc}</p>
                    <button className="btn-gold" style={{ fontSize:"16px", padding:"10px 24px" }} onClick={() => scrollTo("contacto")}>
                      SOLICITAR SERVICIO →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ STATS ═══════════════════════════════ */}
      <section style={{ borderTop:"1px solid rgba(43,45,160,0.2)", borderBottom:"1px solid rgba(43,45,160,0.2)", background:"rgba(43,45,160,0.05)" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderLeft:"1px solid rgba(43,45,160,0.2)" }} className="stats-row">
          {[
            { label:"PROYECTOS COMPLETADOS", end:500, suffix:"+" },
            { label:"AÑOS EN OPERACIÓN",     end:12,  suffix:"" },
            { label:"SATISFACCIÓN CLIENTE",  end:98,  suffix:"%" },
            { label:"HORAS DISPONIBLE",      end:24,  suffix:"/7" },
          ].map((s,i) => (
            <div key={i} className="stat-box">
              <div className="ann" style={{ marginBottom:"12px" }}>{s.label}</div>
              <div style={{ fontFamily:"'Bebas Neue','Arial Black',Impact,sans-serif", fontSize:"clamp(44px,6vw,72px)", color:"#B57F0C", lineHeight:1, letterSpacing:"-1px", animation:"glow-gold 4s ease-in-out infinite" }}>
                <Counter end={s.end} suffix={s.suffix}/>
              </div>
              <div style={{ position:"absolute", top:"12px", right:"12px", width:"6px", height:"6px", borderTop:"1px solid rgba(181,127,12,0.3)", borderRight:"1px solid rgba(181,127,12,0.3)" }}/>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════ STATEMENT ═══════════════════════════ */}
      <section style={{ background:"#2B2DA0", padding:"clamp(48px,7vw,88px) clamp(18px,4%,48px)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:"-40px", bottom:"-60px", fontFamily:"'Bebas Neue',sans-serif", fontWeight:900, fontSize:"clamp(120px,22vw,280px)", color:"rgba(255,255,255,0.04)", letterSpacing:"-8px", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>RD</div>
        <div style={{ maxWidth:"1000px", margin:"0 auto", display:"flex", gap:"32px", alignItems:"flex-start" }}>
          <svg width="2" height="clamp(60px,8vw,90px)" viewBox="0 2 2 90" style={{ flexShrink:0, marginTop:"8px" }}>
            <line x1="1" y1="0" x2="1" y2="90" stroke="#B57F0C" strokeWidth="2"/>
          </svg>
          <div>
            <p style={{ fontFamily:"'Bebas Neue','Arial Black',Impact,sans-serif", fontWeight:800, fontSize:"clamp(24px,4vw,54px)", color:"#fff", lineHeight:1.1, letterSpacing:"-0.5px" }}>
              "En Santiago hay muchas empresas eléctricas. Nosotros somos los que responden cuando las demás no pueden."
            </p>
            <div className="ann" style={{ marginTop:"28px", color:"rgba(255,255,255,0.4)" }}>
              SELCE SERVICIOS · +12 AÑOS · 500+ PROYECTOS COMPLETADOS
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ ABOUT ═══════════════════════════════ */}
      <section id="nosotros" className="bp-grid" style={{ padding:"clamp(48px,7vw,88px) clamp(18px,4%,48px)", borderTop:"1px solid rgba(43,45,160,0.2)" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", gap:"clamp(32px,6vw,80px)", alignItems:"flex-start", flexWrap:"wrap" }} className="about-cols">

          {/* Big number */}
          <div style={{ flexShrink:0 }}>
            <div style={{ fontFamily:"'Bebas Neue','Arial Black',Impact,sans-serif", fontSize:"clamp(96px,18vw,220px)", color:"#2B2DA0", lineHeight:0.85, letterSpacing:"-6px" }}>12</div>
            <div className="ann" style={{ marginTop:"14px" }}>AÑOS EN EL MERCADO</div>
            <div style={{ width:"48px", height:"3px", background:"#B57F0C", marginTop:"12px" }}/>
          </div>

          {/* Text block */}
          <div style={{ flex:1, minWidth:"260px", paddingTop:"16px" }}>
            <div className="ann" style={{ color:"#B57F0C", marginBottom:"20px" }}>// SOBRE SELCE SERVICIOS</div>

            <h2 style={{ fontFamily:"'Bebas Neue','Arial Black',Impact,sans-serif", fontSize:"clamp(28px,4vw,52px)", color:"#fff", letterSpacing:"-0.5px", lineHeight:0.9, marginBottom:"24px" }}>
              EXPERTOS ELÉCTRICOS<br/>EN SANTIAGO DESDE<br/>HACE MÁS DE UNA DÉCADA
            </h2>

            <p style={{ fontSize:"clamp(12px,1.3vw,14px)", color:"var(--text)", lineHeight:1.9, marginBottom:"18px" }}>
              Fundada en Santiago en 2012, Selce Servicios nació para resolver los problemas eléctricos que otras empresas no querían atender. Hoy somos una empresa reconocida en todo el Cibao por nuestra puntualidad, transparencia en precios y calidad garantizada por escrito.
            </p>
            <p style={{ fontSize:"clamp(12px,1.3vw,14px)", color:"var(--text)", lineHeight:1.9, marginBottom:"clamp(24px,3vw,36px)" }}>
              No prometemos lo que no podemos cumplir. Cada trabajo se entrega con garantía escrita, plano técnico actualizado y soporte post-instalación.
            </p>

            {/* Feature grid */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", border:"1px solid rgba(43,45,160,0.25)", background:"rgba(43,45,160,0.25)" }} className="feat-grid">
              {[["Certificados NEC","Código Eléctrico Nacional"],["Garantía escrita","En cada trabajo"],["Técnicos propios","Sin subcontratos"],["Presupuesto 0$","Sin costo ni compromiso"]].map(([title,sub],i) => (
                <div key={i} style={{ padding:"clamp(14px,2vw,22px)", background:"#05091C", transition:"background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background="rgba(43,45,160,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background="#05091C"}>
                  <div style={{ fontFamily:"'Bebas Neue','Arial Black',Impact,sans-serif", fontSize:"clamp(16px,2vw,20px)", letterSpacing:"1px", color:"#fff", marginBottom:"4px" }}>{title}</div>
                  <div className="ann">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ EMERGENCY CTA ═══════════════════════ */}
      <div style={{ background:"rgba(181,127,12,0.08)", borderTop:"1px solid rgba(181,127,12,0.2)", borderBottom:"1px solid rgba(181,127,12,0.2)", padding:"clamp(32px,5vw,56px) clamp(18px,4%,48px)" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"32px", flexWrap:"wrap" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#B57F0C"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13Z"/></svg>
              <span className="ann" style={{ color:"#B57F0C" }}>EMERGENCIAS ELÉCTRICAS</span>
            </div>
            <h3 style={{ fontFamily:"'Bebas Neue','Arial Black',Impact,sans-serif", fontSize:"clamp(28px,4vw,52px)", color:"#fff", letterSpacing:"-0.5px", lineHeight:0.95 }}>
              ¿APAGÓN O CORTO CIRCUITO?<br/>RESPONDEMOS EN 60 MINUTOS.
            </h3>
          </div>
          <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
            <a href="tel:+18095550000" style={{ textDecoration:"none" }}>
              <button className="btn-gold" style={{ background:"#fff", color:"#0A0A0A", fontSize:"17px" }}>📞 LLAMAR AHORA</button>
            </a>
            <a href="https://wa.me/18095550000" style={{ textDecoration:"none" }}>
              <button className="btn-gold" style={{ background:"#25D366", fontSize:"17px" }}>💬 WHATSAPP</button>
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════ CONTACT ═════════════════════════════ */}
      <section id="contacto" style={{ borderTop:"1px solid rgba(43,45,160,0.2)", background:"rgba(3,5,16,0.8)" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", flexWrap:"wrap" }} className="contact-cols">

          {/* Left info */}
          <div style={{ flex:"0 0 clamp(260px,35%,400px)", padding:"clamp(40px,6vw,72px) clamp(18px,4%,40px)", borderRight:"1px solid rgba(43,45,160,0.18)" }}>
            <span className="tag" style={{ marginBottom:"24px", display:"inline-block" }}>TERMINAL DE CONTACTO</span>
            <h2 style={{ fontFamily:"'Bebas Neue','Arial Black',Impact,sans-serif", fontSize:"clamp(44px,7vw,80px)", color:"#fff", letterSpacing:"2px", lineHeight:0.85, marginBottom:"40px" }}>
              INICIA<br/>EL<br/><span style={{ color:"#B57F0C" }}>CIRCUITO.</span>
            </h2>

            <div style={{ width:"100%", height:"1px", background:"rgba(43,45,160,0.2)", marginBottom:"36px" }}/>

            {[["LOC://","Santiago de los Caballeros\nRepública Dominicana"],["TEL://","(809) 555-0000\nEmergencias 24 horas"],["EMAIL://","info@selceservicios.com"],["HORARIO://","Lun–Vie 8am–6pm\nSáb 8am–2pm · 24h emergencias"]].map(([k,v]) => (
              <div key={k} style={{ marginBottom:"28px" }}>
                <div className="ann" style={{ color:"#B57F0C", marginBottom:"5px" }}>{k}</div>
                <div style={{ fontSize:"clamp(13px,1.5vw,15px)", color:"#D0D8FF", lineHeight:1.65, whiteSpace:"pre-line" }}>{v}</div>
              </div>
            ))}

            <div style={{ marginTop:"32px", paddingTop:"28px", borderTop:"1px solid rgba(43,45,160,0.18)" }}>
              <div className="ann" style={{ marginBottom:"14px" }}>REDES SOCIALES</div>
              <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
                {["Facebook","Instagram","WhatsApp"].map(s => (
                  <button key={s} style={{ background:"none", border:"1px solid rgba(43,45,160,0.35)", color:"rgba(155,170,212,0.55)", padding:"8px 16px", fontFamily:"'Share Tech Mono','Courier New',monospace", fontSize:"11px", letterSpacing:"1px", cursor:"pointer", transition:"all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="#B57F0C"; e.currentTarget.style.color="#B57F0C"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(43,45,160,0.35)"; e.currentTarget.style.color="rgba(155,170,212,0.55)"; }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div style={{ flex:1, padding:"clamp(40px,6vw,72px) clamp(18px,4%,40px)", minWidth:"280px" }}>
            {sent ? (
              <div style={{ height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", animation:"fadein .35s ease" }}>
                <span className="tag" style={{ borderColor:"#22C55E", color:"#22C55E", marginBottom:"20px" }}>TRANSMISIÓN EXITOSA</span>
                <h3 style={{ fontFamily:"'Bebas Neue','Arial Black',Impact,sans-serif", fontSize:"clamp(48px,7vw,80px)", color:"#fff", letterSpacing:"2px", lineHeight:0.88 }}>MENSAJE<br/>RECIBIDO.</h3>
                <p style={{ fontSize:"13px", color:"var(--text)", marginTop:"20px", lineHeight:1.85 }}>Respondemos en menos de 2 horas en días hábiles.<br/>Para emergencias llama al (809) 555-0000.</p>
              </div>
            ) : (
              <div>
                <span className="tag" style={{ marginBottom:"clamp(24px,3vw,36px)", display:"inline-block" }}>FORMULARIO DE SOLICITUD</span>
                <div style={{ display:"flex", flexDirection:"column", gap:"clamp(16px,2.5vw,22px)", maxWidth:"520px" }}>

                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(12px,2vw,18px)" }}>
                    {[["nombre","// NOMBRE COMPLETO","Juan García"],["tel","// TELÉFONO","809-000-0000"]].map(([k,l,ph]) => (
                      <div key={k}>
                        <label className="ann" style={{ display:"block", marginBottom:"6px" }}>{l}</label>
                        <input className="inp" placeholder={ph} value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})}/>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="ann" style={{ display:"block", marginBottom:"6px" }}>// SERVICIO REQUERIDO</label>
                    <select className="inp" value={form.servicio} onChange={e => setForm({...form,servicio:e.target.value})} style={{ cursor:"pointer" }}>
                      <option value="" style={{ background:"#05091C" }}>Seleccionar servicio...</option>
                      {services.map(s => <option key={s.name} value={s.name} style={{ background:"#05091C" }}>{s.name}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="ann" style={{ display:"block", marginBottom:"6px" }}>// DESCRIPCIÓN DEL TRABAJO</label>
                    <textarea className="inp" rows={4} placeholder="Describe tu necesidad eléctrica con el mayor detalle posible..." value={form.msg} onChange={e => setForm({...form,msg:e.target.value})} style={{ resize:"vertical" }}/>
                  </div>

                  <div style={{ display:"flex", alignItems:"center", gap:"20px", flexWrap:"wrap" }}>
                    <button className="btn-gold" onClick={() => { if(form.nombre && form.tel) setSent(true); }}>
                      TRANSMITIR →
                    </button>
                    <span className="ann">RESPUESTA &lt; 2H DÍAS HÁBILES</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ FOOTER ══════════════════════════════ */}
      <footer style={{ borderTop:"1px solid rgba(43,45,160,0.2)", padding:"clamp(16px,2.5vw,24px) clamp(18px,4%,48px)", background:"#05091C", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"14px" }} className="footer-row">
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#B57F0C"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13Z"/></svg>
          <span style={{ fontFamily:"'Bebas Neue','Arial Black',Impact,sans-serif", letterSpacing:"5px", fontSize:"16px", color:"#fff" }}>SELCE SERVICIOS</span>
        </div>
        <span className="ann">© {new Date().getFullYear()} · SANTIAGO DE LOS CABALLEROS · REPÚBLICA DOMINICANA</span>
        <span className="ann" style={{ color:"#B57F0C", animation:"blink 3s infinite" }}>● SISTEMA OPERATIVO</span>
      </footer>

    </div>
  );
}
