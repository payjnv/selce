import { useState, useEffect, useRef } from "react";

const CSS = [
  "@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&family=DM+Mono:wght@400;500&display=swap');",
  "*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}",
  "html{scroll-behavior:smooth}",
  "::selection{background:#C8900A;color:#fff}",
  "::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#070B1A}::-webkit-scrollbar-thumb{background:#2B2DA0}",
  ".bb{font-family:'Bebas Neue','Arial Black',Impact,sans-serif!important}",
  ".mm{font-family:'DM Mono','Courier New',monospace!important}",
  ".tag{display:inline-flex;align-items:center;gap:6px;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#C8900A;padding:5px 12px;border:1px solid rgba(200,144,10,0.35);line-height:1}",
  ".bp{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#C8900A;color:#fff;border:none;padding:14px 28px;font-family:'DM Sans',sans-serif;font-weight:500;font-size:15px;cursor:pointer;transition:background .2s,transform .15s;text-decoration:none;white-space:nowrap}",
  ".bp:hover{background:#E5A812;transform:translateY(-1px)}",
  ".bs{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:transparent;color:rgba(232,234,246,0.75);border:1px solid rgba(43,45,160,0.5);padding:13px 28px;font-family:'DM Sans',sans-serif;font-weight:500;font-size:15px;cursor:pointer;transition:border-color .2s,color .2s;white-space:nowrap}",
  ".bs:hover{border-color:#2B2DA0;color:#fff}",
  ".inp{width:100%;background:rgba(43,45,160,0.06);border:1px solid rgba(43,45,160,0.3);color:#E8EAF6;font-family:'DM Sans',sans-serif;font-size:14px;padding:14px 16px;outline:none;transition:border-color .2s;border-radius:0;-webkit-appearance:none}",
  ".inp:focus{border-color:#C8900A}",
  ".inp::placeholder{color:rgba(43,45,160,0.35)}",
  ".inp option{background:#0C1128}",
  ".na{background:none;border:none;color:rgba(232,234,246,0.55);font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;padding:4px 0;transition:color .2s;text-transform:uppercase;letter-spacing:.5px}",
  ".na:hover{color:#fff}",
  ".grd{background-image:linear-gradient(rgba(43,45,160,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(43,45,160,0.12) 1px,transparent 1px);background-size:60px 60px}",
  ".card{border:1px solid rgba(43,45,160,0.2);padding:28px 24px;cursor:pointer;transition:border-color .2s,background .2s;position:relative;overflow:hidden}",
  ".card:hover{border-color:rgba(43,45,160,0.5);background:rgba(43,45,160,0.04)}",
  ".card.on{border-color:#C8900A;background:rgba(200,144,10,0.04)}",
  ".card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:#C8900A;transform:scaleY(0);transform-origin:bottom;transition:transform .3s}",
  ".card:hover::before,.card.on::before{transform:scaleY(1)}",
  ".st{padding:32px 24px;transition:background .2s}",
  ".st:hover{background:rgba(43,45,160,0.05)}",
  "@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}",
  "@keyframes flow{to{stroke-dashoffset:-67}}",
  "@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}",
  "@keyframes up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}",
  ".f1{animation:up .7s .1s both}.f2{animation:up .7s .3s both}.f3{animation:up .7s .5s both}.f4{animation:up .7s .7s both}.f5{animation:up .7s .9s both}",
  ".hero{display:flex;flex-direction:column}",
  ".hero-r{display:none}",
  ".stats{display:grid;grid-template-columns:1fr 1fr}",
  ".st{border-bottom:1px solid rgba(43,45,160,0.2)}",
  ".st:last-child,.st:nth-last-child(2){border-bottom:none}",
  ".svcs{display:grid;grid-template-columns:1fr;gap:6px}",
  ".abt{display:flex;flex-direction:column;gap:40px}",
  ".ctt{display:flex;flex-direction:column}",
  ".emg{display:flex;flex-direction:column;gap:20px}",
  ".emgb{display:flex;flex-direction:column;gap:10px;width:100%}",
  ".emgb a{display:block}",
  ".emgb .bp{width:100%;justify-content:center}",
  ".hbtns{display:flex;flex-direction:column;gap:10px;margin-bottom:36px}",
  ".hbtns .bp,.hbtns .bs{width:100%;justify-content:center}",
  ".ci{border-bottom:1px solid rgba(43,45,160,0.15)}",
  ".form2col{display:grid;grid-template-columns:1fr;gap:12px}",
  "@media(min-width:480px){.form2col{grid-template-columns:1fr 1fr}}",
  ".mbt{display:flex!important}",
  "@media(min-width:768px){",
  ".hero{display:grid;grid-template-columns:1fr 420px}",
  ".hero-r{display:block!important}",
  ".stats{grid-template-columns:repeat(4,1fr)}",
  ".st{border-right:1px solid rgba(43,45,160,0.2);border-bottom:none}",
  ".st:last-child{border-right:none}",
  ".svcs{grid-template-columns:1fr 1fr}",
  ".abt{flex-direction:row;gap:64px;align-items:start}",
  ".ctt{flex-direction:row;align-items:start}",
  ".emg{flex-direction:row;align-items:center;justify-content:space-between}",
  ".emgb{flex-direction:row;width:auto}",
  ".emgb a{display:inline}",
  ".emgb .bp{width:auto}",
  ".hbtns{flex-direction:row;margin-bottom:36px}",
  ".hbtns .bp,.hbtns .bs{width:auto}",
  ".ci{border-right:1px solid rgba(43,45,160,0.15);border-bottom:none;min-width:340px}",
  ".ndl{display:flex!important}",
  ".mbt{display:none!important}",
  "}"
].join("\n");

function Counter({ to, suffix }) {
  const [n, setN] = useState(0);
  const el = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / 1800, 1);
        setN(Math.floor((1 - Math.pow(1 - p, 4)) * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    if (el.current) io.observe(el.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={el}>{n}{suffix}</span>;
}

const SVCS = [
  { n:"01", t:"Instalaciones Eléctricas", d:"Residencial, comercial e industrial. Trabajo a código, garantía escrita y plano técnico en cada proyecto.", i:"M13 2L4.5 13.5H11L10 22L19.5 10.5H13Z" },
  { n:"02", t:"Mantenimiento Preventivo", d:"Inspección termográfica, medición de aislamiento y pruebas de continuidad. Detectamos fallas antes de que ocurran.", i:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" },
  { n:"03", t:"Proyectos Industriales", d:"Tableros de alta capacidad, alimentadores, protecciones y automatización para plantas y fábricas.", i:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" },
  { n:"04", t:"Energia Solar", d:"Sistemas fotovoltaicos en red y fuera de red. Estudio de consumo, diseño, certificación e integración con EDENORTE.", i:"M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1z" },
  { n:"05", t:"Hogar Inteligente", d:"Automatización de iluminación, climatización y seguridad. Compatible con Alexa, Google Home y Apple HomeKit.", i:"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" },
  { n:"06", t:"Emergencias 24/7", d:"Respuesta en menos de 60 minutos en Santiago. Cortos circuitos, sobretensiones y caidas de tablero a cualquier hora.", i:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" },
];

function Bolt() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#C8900A">
      <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13Z"/>
    </svg>
  );
}

function Circuit() {
  const pts = [[220,80],[220,200],[220,340],[100,480],[340,340]];
  const corners = [[0,0,1,1],[1,0,-1,1],[0,1,1,-1],[1,1,-1,-1]];
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 700"
      preserveAspectRatio="xMidYMid slice" fill="none"
      style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.65 }}>
      {[0,60,120,180,240,300,360].map(x =>
        <line key={"gx"+x} x1={x} y1="0" x2={x} y2="700" stroke="rgba(43,45,160,0.15)" strokeWidth="0.5"/>
      )}
      {[0,60,120,180,240,300,360,420,480,540,600,660].map(y =>
        <line key={"gy"+y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(43,45,160,0.15)" strokeWidth="0.5"/>
      )}
      <path d="M60 80 L220 80 L220 200" stroke="#2B2DA0" strokeWidth="1.5" opacity="0.7"/>
      <path d="M60 80 L220 80 L220 200" stroke="#C8900A" strokeWidth="1.5" strokeDasharray="12 55" style={{animation:"flow 3.5s linear infinite"}}/>
      <path d="M220 200 L220 340 L340 340" stroke="#2B2DA0" strokeWidth="1.5" opacity="0.6"/>
      <path d="M220 200 L220 340 L340 340" stroke="#C8900A" strokeWidth="1.5" strokeDasharray="12 55" style={{animation:"flow 4.5s linear 0.8s infinite"}}/>
      <path d="M220 340 L220 480 L100 480" stroke="#2B2DA0" strokeWidth="1.2" opacity="0.5"/>
      <path d="M220 340 L220 480 L100 480" stroke="#C8900A" strokeWidth="1.2" strokeDasharray="10 50" style={{animation:"flow 5s linear 0.4s infinite"}} opacity="0.7"/>
      <path d="M340 340 L340 560 L60 560 L60 640" stroke="#2B2DA0" strokeWidth="1" opacity="0.35"/>
      <path d="M60 80 L60 200 L140 200" stroke="#2B2DA0" strokeWidth="1" opacity="0.3"/>
      <path d="M100 480 L100 620 L280 620" stroke="#2B2DA0" strokeWidth="0.8" opacity="0.2"/>
      {pts.map(([cx,cy]) =>
        <circle key={cx+","+cy} cx={cx} cy={cy} r="5.5" fill="#C8900A" style={{filter:"drop-shadow(0 0 7px rgba(200,144,10,0.8))"}}/>
      )}
      <g transform="translate(140,80)" opacity="0.85">
        <line x1="-35" y1="0" x2="-12" y2="0" stroke="#C8900A" strokeWidth="1.5"/>
        <rect x="-12" y="-8" width="24" height="16" fill="none" stroke="#C8900A" strokeWidth="1.5"/>
        <line x1="12" y1="0" x2="35" y2="0" stroke="#C8900A" strokeWidth="1.5"/>
        <text x="0" y="26" textAnchor="middle" fill="rgba(200,144,10,0.6)" fontSize="10" fontFamily="monospace">R1</text>
      </g>
      <g transform="translate(200,480)" opacity="0.6">
        <line x1="-30" y1="0" x2="-10" y2="0" stroke="#C8900A" strokeWidth="1.2"/>
        <rect x="-10" y="-7" width="20" height="14" fill="none" stroke="#C8900A" strokeWidth="1.2"/>
        <line x1="10" y1="0" x2="30" y2="0" stroke="#C8900A" strokeWidth="1.2"/>
        <text x="0" y="24" textAnchor="middle" fill="rgba(200,144,10,0.5)" fontSize="9" fontFamily="monospace">R2</text>
      </g>
      <g transform="translate(340,440)" opacity="0.75">
        <line x1="0" y1="-32" x2="0" y2="-9" stroke="#C8900A" strokeWidth="1.5"/>
        <line x1="-14" y1="-9" x2="14" y2="-9" stroke="#C8900A" strokeWidth="2.5"/>
        <line x1="-14" y1="-2" x2="14" y2="-2" stroke="#C8900A" strokeWidth="2.5"/>
        <line x1="0" y1="-2" x2="0" y2="32" stroke="#C8900A" strokeWidth="1.5"/>
        <text x="22" y="4" fill="rgba(200,144,10,0.55)" fontSize="10" fontFamily="monospace">C1</text>
      </g>
      <g transform="translate(60,640)" opacity="0.55">
        <line x1="0" y1="-24" x2="0" y2="0" stroke="#9BA0D0" strokeWidth="1.5"/>
        <line x1="-18" y1="0" x2="18" y2="0" stroke="#9BA0D0" strokeWidth="2.5"/>
        <line x1="-12" y1="8" x2="12" y2="8" stroke="#9BA0D0" strokeWidth="1.8"/>
        <line x1="-6" y1="16" x2="6" y2="16" stroke="#9BA0D0" strokeWidth="1.2"/>
        <text x="26" y="4" fill="rgba(155,160,208,0.4)" fontSize="10" fontFamily="monospace">GND</text>
      </g>
      <g transform="translate(60,80)">
        <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(43,45,160,0.7)" strokeWidth="1.8"/>
        <text x="0" y="6" textAnchor="middle" fill="#C8900A" fontSize="16" fontFamily="monospace">~</text>
        <text x="0" y="-28" textAnchor="middle" fill="rgba(200,144,10,0.55)" fontSize="10" fontFamily="monospace">VAC</text>
      </g>
      <text x="236" y="76" fill="rgba(232,234,246,0.2)" fontSize="10" fontFamily="monospace">BUS PRINCIPAL</text>
      <text x="236" y="336" fill="rgba(232,234,246,0.15)" fontSize="10" fontFamily="monospace">RAMAL-B</text>
      <text x="116" y="476" fill="rgba(232,234,246,0.12)" fontSize="10" fontFamily="monospace">NODO-C</text>
      <rect x="2" y="2" width="396" height="696" fill="none" stroke="rgba(43,45,160,0.12)" strokeWidth="1"/>
      {corners.map(([fx,fy,sx,sy],i) => (
        <g key={"corner"+i} transform={"translate("+(fx*400)+","+(fy*700)+")"}>
          <line x1={sx*2} y1={sy*18} x2={sx*2} y2={sy*2} stroke="rgba(200,144,10,0.3)" strokeWidth="1"/>
          <line x1={sx*2} y1={sy*2} x2={sx*18} y2={sy*2} stroke="rgba(200,144,10,0.3)" strokeWidth="1"/>
        </g>
      ))}
    </svg>
  );
}

export default function Selce() {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre:"", tel:"", servicio:"", msg:"" });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  const P = { background:"#070B1A", color:"#E8EAF6", fontFamily:"'DM Sans','Segoe UI',sans-serif", overflowX:"hidden" };

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={P}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* NAV */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100, height:"56px",
        background: scrolled ? "rgba(7,11,26,0.97)" : "rgba(7,11,26,0.85)",
        backdropFilter:"blur(16px)",
        borderBottom:"1px solid rgba(43,45,160,0.2)",
        display:"flex", alignItems:"center",
        padding:"0 clamp(16px,4%,48px)", gap:"16px",
      }}>
        <button onClick={() => go("inicio")} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"10px", marginRight:"auto" }}>
          <Bolt/>
          <span className="bb" style={{ fontSize:"22px", letterSpacing:"5px", color:"#fff" }}>SELCE</span>
          {isDesktop && <span className="mm" style={{ fontSize:"9px", color:"rgba(232,234,246,0.3)", letterSpacing:"1.5px" }}>SERVICIOS</span>}
        </button>

        {isDesktop ? (
          <div style={{ display:"flex", alignItems:"center", gap:"28px" }}>
            {[["servicios","Servicios"],["nosotros","Nosotros"],["contacto","Contacto"]].map(([id,lb]) => (
              <button key={id} className="na" onClick={() => go(id)}>{lb}</button>
            ))}
            <button className="bp" onClick={() => go("contacto")} style={{ padding:"9px 20px", fontSize:"13px" }}>Cotizar</button>
          </div>
        ) : (
          <button onClick={() => setMenu(!menu)} style={{
            background:"none", border:"1px solid rgba(43,45,160,0.4)",
            color:"#E8EAF6", padding:"7px 16px", fontFamily:"monospace", fontSize:"18px", cursor:"pointer", lineHeight:1,
          }}>
            {menu ? "✕" : "☰"}
          </button>
        )}
      </nav>

      {/* MOBILE MENU */}
      {menu && (
        <div style={{ position:"fixed", inset:0, zIndex:99, background:"rgba(7,11,26,0.98)", display:"flex", flexDirection:"column", justifyContent:"center", padding:"48px 32px" }}>
          {[["inicio","INICIO"],["servicios","SERVICIOS"],["nosotros","NOSOTROS"],["contacto","CONTACTO"]].map(([id,lb],i) => (
            <button key={id} onClick={() => go(id)} style={{ background:"none", border:"none", borderBottom:"1px solid rgba(43,45,160,0.15)", padding:"20px 0", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer" }}>
              <span className="bb" style={{ fontSize:"clamp(40px,12vw,60px)", color:"#fff", letterSpacing:"3px" }}>{lb}</span>
              <span className="mm" style={{ fontSize:"13px", color:"#C8900A" }}>{"0"+(i+1)}</span>
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="inicio" className="grd hero" style={{ paddingTop:"56px", position:"relative", overflow:"hidden" }}>

        {/* Circuito mobile background — solo visible en mobile */}
        {!isDesktop && (
          <div style={{ position:"absolute", inset:0, zIndex:0, opacity:0.18, pointerEvents:"none" }}>
            <Circuit/>
          </div>
        )}

        {/* LEFT */}
        <div style={{ padding:"clamp(40px,6vw,80px) clamp(16px,5%,64px)", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", zIndex:1 }}>
          <div className="f1" style={{ marginBottom:"20px" }}>
            <span className="tag">
              <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#22C55E", display:"inline-block", animation:"blink 2s infinite" }}/>
              Servicios Electricos · Santiago RD
            </span>
          </div>
          <h1 className="bb f2" style={{ fontSize:"clamp(80px,18vw,160px)", lineHeight:0.85, letterSpacing:"-2px", color:"#fff", marginBottom:"6px" }}>SELCE</h1>
          <div className="bb f2" style={{ fontSize:"clamp(36px,8vw,72px)", letterSpacing:"clamp(6px,2vw,14px)", color:"rgba(43,45,160,0.5)", lineHeight:1, marginBottom:"28px" }}>SERVICIOS</div>
          <div className="f3" style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"18px" }}>
            <div style={{ width:"40px", height:"2px", background:"#C8900A" }}/>
            <span className="mm" style={{ fontSize:"11px", letterSpacing:"1.5px", color:"rgba(232,234,246,0.4)" }}>120/240V · 60Hz · Est. 2012</span>
          </div>
          <p className="f3" style={{ fontSize:"clamp(14px,1.6vw,16px)", color:"rgba(232,234,246,0.65)", lineHeight:1.85, maxWidth:"480px", marginBottom:"36px" }}>
            Mas de 12 anos resolviendo proyectos electricos en Santiago. Instalaciones, mantenimiento, energia solar y emergencias 24/7. Todo trabajo entregado con garantia escrita.
          </p>
          <div className="hbtns f4">
            <button className="bp" onClick={() => go("contacto")}>Cotizacion Gratis</button>
            <button className="bs" onClick={() => go("servicios")}>Ver Servicios</button>
          </div>
          <div className="f5" style={{ paddingTop:"24px", borderTop:"1px solid rgba(43,45,160,0.15)", display:"flex", gap:"clamp(20px,4vw,40px)", flexWrap:"wrap", justifyContent: isDesktop ? "flex-start" : "center" }}>
            {[["500+","Proyectos"],["12","Anos"],["24/7","Disponible"]].map(([v,l]) => (
              <div key={l} style={{ textAlign: isDesktop ? "left" : "center" }}>
                <div className="bb" style={{ fontSize: isDesktop ? "clamp(28px,4vw,38px)" : "48px", color:"#C8900A", lineHeight:1 }}>{v}</div>
                <div className="mm" style={{ fontSize: isDesktop ? "10px" : "12px", color:"rgba(232,234,246,0.4)", letterSpacing:"1px", marginTop:"4px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — circuit */}
        <div className="hero-r" style={{ borderLeft:"1px solid rgba(43,45,160,0.15)", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(160deg,rgba(43,45,160,0.05) 0%,transparent 60%)", zIndex:0 }}/>
          <div className="mm" style={{ position:"absolute", top:"20px", left:"20px", zIndex:2, fontSize:"10px", color:"rgba(232,234,246,0.22)", letterSpacing:"1.5px" }}>SELCE-001 / REV.C-2025</div>
          <div style={{ position:"absolute", top:"52px", left:"24px", zIndex:2, display:"flex", flexDirection:"column", gap:"18px" }}>
            {[["500+","PROYECTOS"],["12","ANOS"],["24/7","DISPONIBLE"]].map(([v,l]) => (
              <div key={l}>
                <div className="bb" style={{ fontSize:"clamp(38px,5vw,52px)", color:"rgba(255,255,255,0.1)", lineHeight:1 }}>{v}</div>
                <div className="mm" style={{ fontSize:"9px", color:"rgba(232,234,246,0.12)", letterSpacing:"1.5px" }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ position:"absolute", bottom:"32px", left:"24px", zIndex:2, display:"flex", alignItems:"center", gap:"12px" }}>
            <div style={{ width:"52px", height:"52px", borderRadius:"50%", border:"1.5px solid rgba(200,144,10,0.2)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
              <Bolt/>
              <span className="mm" style={{ fontSize:"6px", color:"rgba(200,144,10,0.35)", marginTop:"3px", textAlign:"center", lineHeight:1.4 }}>CERT<br/>2012</span>
            </div>
            <div className="mm" style={{ fontSize:"9px", color:"rgba(232,234,246,0.18)", lineHeight:1.6 }}>INSTALADOR CERT.<br/>NORMA NEC DOM</div>
          </div>
          <Circuit/>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background:"#C8900A", overflow:"hidden", padding:"11px 0" }}>
        <div style={{ display:"flex", animation:"mq 25s linear infinite", width:"max-content" }}>
          {[0,1].map(k => (
            <span key={k} className="mm" style={{ fontSize:"11px", letterSpacing:"3px", color:"#fff", whiteSpace:"nowrap", paddingRight:"40px" }}>
              INSTALACIONES ELECTRICAS  x  MANTENIMIENTO  x  ENERGIA SOLAR  x  HOGAR INTELIGENTE  x  EMERGENCIAS 24/7  x  SANTIAGO RD  x  INSTALACIONES ELECTRICAS  x  MANTENIMIENTO  x  ENERGIA SOLAR  x  HOGAR INTELIGENTE  x  EMERGENCIAS 24/7  x  SANTIAGO RD  x
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div style={{ borderBottom:"1px solid rgba(43,45,160,0.2)" }}>
        <div className="stats" style={{ maxWidth:"1200px", margin:"0 auto" }}>
          {[{l:"Proyectos completados",n:500,s:"+"},{l:"Anos en operacion",n:12,s:""},{l:"Satisfaccion cliente",n:98,s:"%"},{l:"Horas disponible",n:24,s:"/7"}].map(d => (
            <div key={d.l} className="st">
              <div className="mm" style={{ fontSize:"10px", color:"rgba(232,234,246,0.3)", letterSpacing:"1px", marginBottom:"10px", textTransform:"uppercase" }}>{d.l}</div>
              <div className="bb" style={{ fontSize:"clamp(44px,6vw,64px)", color:"#C8900A", lineHeight:1 }}>
                <Counter to={d.n} suffix={d.s}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICIOS */}
      <section id="servicios" style={{ padding:"clamp(56px,8vw,96px) clamp(16px,4%,48px)", borderBottom:"1px solid rgba(43,45,160,0.2)" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"clamp(32px,5vw,56px)", flexWrap:"wrap", gap:"16px" }}>
            <div>
              <span className="tag" style={{ marginBottom:"14px", display:"block" }}>Nuestros servicios</span>
              <h2 className="bb" style={{ fontSize:"clamp(40px,7vw,72px)", color:"#fff", letterSpacing:"2px", lineHeight:0.9 }}>06 ESPECIALIDADES</h2>
            </div>
            <p style={{ fontSize:"14px", color:"rgba(232,234,246,0.45)", maxWidth:"260px", lineHeight:1.7 }}>Fundados en 2012. Mas de 500 proyectos en Santiago y el Cibao.</p>
          </div>
          <div className="svcs">
            {SVCS.map((s,i) => (
              <div key={i} className={"card"+(open===i?" on":"")} onClick={() => setOpen(open===i?null:i)}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"14px" }}>
                  <div style={{ display:"flex", gap:"14px", alignItems:"flex-start" }}>
                    <div style={{ width:"36px", height:"36px", background:open===i?"rgba(200,144,10,0.15)":"rgba(43,45,160,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background .2s" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={open===i?"#C8900A":"rgba(232,234,246,0.4)"}><path d={s.i}/></svg>
                    </div>
                    <div>
                      <div className="mm" style={{ fontSize:"10px", color:"rgba(200,144,10,0.6)", letterSpacing:"1px", marginBottom:"4px" }}>{s.n}</div>
                      <h3 className="bb" style={{ fontSize:"clamp(20px,2.5vw,26px)", color:open===i?"#C8900A":"#fff", letterSpacing:"1px", lineHeight:1 }}>{s.t}</h3>
                    </div>
                  </div>
                  <span style={{ color:"rgba(200,144,10,0.7)", fontSize:"22px", lineHeight:1, flexShrink:0, display:"inline-block", transform:open===i?"rotate(45deg)":"none", transition:"transform .25s" }}>+</span>
                </div>
                {open===i && (
                  <div style={{ marginTop:"18px", paddingTop:"18px", borderTop:"1px solid rgba(43,45,160,0.2)", animation:"up .25s both" }}>
                    <p style={{ fontSize:"14px", color:"rgba(232,234,246,0.65)", lineHeight:1.85, marginBottom:"16px" }}>{s.d}</p>
                    <button className="bp" onClick={() => go("contacto")} style={{ fontSize:"13px", padding:"10px 20px" }}>Solicitar servicio</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="grd" style={{ padding:"clamp(40px,6vw,72px) clamp(16px,4%,48px)", borderBottom:"1px solid rgba(43,45,160,0.2)" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>

          {/* Header row */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"16px", marginBottom:"40px", paddingBottom:"28px", borderBottom:"1px solid rgba(43,45,160,0.15)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"24px" }}>
              <span className="tag">Quienes somos</span>
              <div style={{ display:"flex", alignItems:"baseline", gap:"8px" }}>
                <span className="bb" style={{ fontSize:"clamp(48px,7vw,80px)", color:"#C8900A", lineHeight:1 }}>12</span>
                <span className="mm" style={{ fontSize:"11px", color:"rgba(232,234,246,0.3)", letterSpacing:"1.5px" }}>ANOS EN EL MERCADO</span>
              </div>
            </div>
            <h2 className="bb" style={{ fontSize:"clamp(22px,3vw,36px)", color:"#fff", letterSpacing:"1px", lineHeight:1, textAlign:"right" }}>
              EXPERTOS ELECTRICOS<br/>
              <span style={{ color:"rgba(43,45,160,0.6)" }}>SANTIAGO · DESDE 2012</span>
            </h2>
          </div>

          {/* Content grid */}
          <div className="abt" style={{ gap:"48px" }}>

            {/* Left — texto + quote */}
            <div>
              <p style={{ fontSize:"clamp(14px,1.5vw,15px)", color:"rgba(232,234,246,0.65)", lineHeight:1.85, marginBottom:"18px" }}>
                Fundada en Santiago en 2012, Selce Servicios nacio para resolver los proyectos electricos que otras empresas no querian atender. Hoy somos referencia en todo el Cibao, reconocidos por puntualidad, precios transparentes y calidad garantizada.
              </p>
              <p style={{ fontSize:"clamp(14px,1.5vw,15px)", color:"rgba(232,234,246,0.65)", lineHeight:1.85, marginBottom:"28px" }}>
                No prometemos lo que no podemos cumplir. Cada proyecto se entrega con garantia escrita, plano tecnico actualizado y soporte post-instalacion incluido.
              </p>
              <blockquote style={{ borderLeft:"2px solid #C8900A", paddingLeft:"18px", marginBottom:"28px" }}>
                <p style={{ fontSize:"clamp(14px,1.5vw,16px)", color:"#E8EAF6", lineHeight:1.75, fontStyle:"italic" }}>
                  "En Santiago hay muchas empresas electricas. Nosotros somos los que responden cuando las demas no pueden."
                </p>
                <div className="mm" style={{ fontSize:"10px", color:"rgba(232,234,246,0.3)", letterSpacing:"1px", marginTop:"10px" }}>SELCE SERVICIOS · DESDE 2012</div>
              </blockquote>
              <button className="bp" onClick={() => go("contacto")} style={{ fontSize:"13px", padding:"11px 22px" }}>
                Contactar ahora
              </button>
            </div>

            {/* Right — 4 puntos + stats */}
            <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
              {[
                ["Certificados NEC","Trabajo bajo norma electrica dominicana e internacional."],
                ["Garantia escrita","Cada proyecto entregado con garantia firmada."],
                ["Tecnicos propios","Sin subcontratos. Tu proyecto, nuestros tecnicos."],
                ["Presupuesto gratis","Cotizamos sin costo ni compromiso."],
              ].map(([t,d]) => (
                <div key={t} style={{ display:"flex", gap:"16px", padding:"16px", border:"1px solid rgba(43,45,160,0.18)", transition:"border-color .2s, background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor="rgba(200,144,10,0.3)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor="rgba(43,45,160,0.18)"}>
                  <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#C8900A", flexShrink:0, marginTop:"6px" }}/>
                  <div>
                    <div style={{ fontSize:"14px", fontWeight:"500", color:"#fff", marginBottom:"3px" }}>{t}</div>
                    <div style={{ fontSize:"13px", color:"rgba(232,234,246,0.45)", lineHeight:1.5 }}>{d}</div>
                  </div>
                </div>
              ))}

              {/* Mini stats row */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", background:"rgba(43,45,160,0.2)", marginTop:"4px", border:"1px solid rgba(43,45,160,0.2)" }}>
                {[["500+","Proyectos"],["12","Anos"],["98%","Satisfaccion"]].map(([v,l]) => (
                  <div key={l} style={{ background:"#070B1A", padding:"14px 12px", textAlign:"center" }}>
                    <div className="bb" style={{ fontSize:"28px", color:"#C8900A", lineHeight:1 }}>{v}</div>
                    <div className="mm" style={{ fontSize:"9px", color:"rgba(232,234,246,0.3)", letterSpacing:"1px", marginTop:"2px" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMERGENCIAS */}
      <div style={{ background:"#2B2DA0", padding:"clamp(36px,5vw,56px) clamp(16px,4%,48px)", borderBottom:"1px solid rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }} className="emg">
          <div>
            <div className="mm" style={{ fontSize:"10px", color:"rgba(255,255,255,0.5)", letterSpacing:"2px", marginBottom:"10px", display:"flex", alignItems:"center", gap:"8px" }}>
              <Bolt/> EMERGENCIAS ELECTRICAS
            </div>
            <h3 className="bb" style={{ fontSize:"clamp(26px,4vw,48px)", color:"#fff", lineHeight:0.95 }}>
              APAGON O CORTO CIRCUITO?<br/>RESPONDEMOS EN 60 MINUTOS.
            </h3>
          </div>
          <div className="emgb">
            <a href="tel:+18095550000">
              <button className="bp" style={{ background:"#fff", color:"#0A0A0A" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#0A0A0A"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                Llamar Ahora
              </button>
            </a>
            <a href="https://wa.me/18095550000">
              <button className="bp" style={{ background:"#25D366" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* CONTACTO */}
      <section id="contacto" style={{ borderBottom:"1px solid rgba(43,45,160,0.2)", paddingBottom:"clamp(32px,5vw,56px)" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", alignItems:"start" }} className="ctt">
          <div className="ci" style={{ padding:"clamp(32px,5vw,56px) clamp(16px,4%,40px) 0", position:"sticky", top:"56px" }}>
            <span className="tag" style={{ marginBottom:"20px", display:"inline-block" }}>Contactanos</span>
            <h2 className="bb" style={{ fontSize:"clamp(36px,5.5vw,60px)", color:"#fff", lineHeight:0.85, letterSpacing:"1px", marginBottom:"24px" }}>
              INICIA<br/>EL<br/><span style={{ color:"#C8900A" }}>CIRCUITO.</span>
            </h2>
            <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
              {[["UBICACION","Santiago de los Caballeros\nRepublica Dominicana"],["TELEFONO","(809) 555-0000\nEmergencias 24 horas"],["CORREO","info@selceservicios.com"],["HORARIO","Lun-Vie 8am-6pm\nSab 8am-2pm · 24h emergencias"]].map(([k,v]) => (
                <div key={k}>
                  <div className="mm" style={{ fontSize:"10px", color:"#C8900A", letterSpacing:"1.5px", marginBottom:"5px" }}>{k}</div>
                  <div style={{ fontSize:"14px", color:"rgba(232,234,246,0.7)", lineHeight:1.7, whiteSpace:"pre-line" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding:"clamp(32px,5vw,56px) clamp(16px,4%,40px) 0" }}>
            {sent ? (
              <div style={{ animation:"up .4s both" }}>
                <div style={{ width:"48px", height:"48px", background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.3)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"20px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#22C55E"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                </div>
                <h3 className="bb" style={{ fontSize:"clamp(36px,5vw,56px)", color:"#fff", letterSpacing:"1px", marginBottom:"12px" }}>MENSAJE ENVIADO!</h3>
                <p style={{ fontSize:"14px", color:"rgba(232,234,246,0.55)", lineHeight:1.8 }}>Respondemos en menos de 2 horas en dias habiles. Emergencias: (809) 555-0000.</p>
              </div>
            ) : (
              <div>
                <span className="tag" style={{ marginBottom:"24px", display:"inline-block" }}>Formulario de solicitud</span>
                <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                  <div className="form2col" style={{ gap:"12px" }}>
                    <div>
                      <label className="mm" style={{ fontSize:"10px", color:"rgba(232,234,246,0.3)", letterSpacing:"1px", display:"block", marginBottom:"6px" }}>NOMBRE</label>
                      <input className="inp" style={{ padding:"18px 16px" }} placeholder="Juan Garcia" value={form.nombre} onChange={e => setForm({...form,nombre:e.target.value})}/>
                    </div>
                    <div>
                      <label className="mm" style={{ fontSize:"10px", color:"rgba(232,234,246,0.3)", letterSpacing:"1px", display:"block", marginBottom:"6px" }}>TELEFONO</label>
                      <input className="inp" style={{ padding:"18px 16px" }} placeholder="809-000-0000" value={form.tel} onChange={e => setForm({...form,tel:e.target.value})}/>
                    </div>
                  </div>
                  <div>
                    <label className="mm" style={{ fontSize:"10px", color:"rgba(232,234,246,0.3)", letterSpacing:"1px", display:"block", marginBottom:"6px" }}>SERVICIO</label>
                    <select className="inp" style={{ padding:"18px 16px" }} value={form.servicio} onChange={e => setForm({...form,servicio:e.target.value})}>
                      <option value="">Seleccionar servicio...</option>
                      {SVCS.map(s => <option key={s.n} value={s.t}>{s.t}</option>)}
                    </select>
                  </div>
                  <div style={{ flex:1 }}>
                    <label className="mm" style={{ fontSize:"10px", color:"rgba(232,234,246,0.3)", letterSpacing:"1px", display:"block", marginBottom:"6px" }}>DESCRIPCION</label>
                    <textarea className="inp" rows={8} placeholder="Describe tu necesidad electrica..." value={form.msg} onChange={e => setForm({...form,msg:e.target.value})} style={{ resize:"none", width:"100%" }}/>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:"20px", flexWrap:"wrap" }}>
                    <button className="bp" style={{ padding:"16px 32px", fontSize:"16px" }} onClick={() => { if(form.nombre && form.tel) setSent(true); }}>Enviar Solicitud</button>
                    <span className="mm" style={{ fontSize:"10px", color:"rgba(232,234,246,0.3)", letterSpacing:"1px" }}>RESPUESTA &lt; 2H</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:"clamp(16px,2.5vw,24px) clamp(16px,4%,48px)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <Bolt/>
          <span className="bb" style={{ fontSize:"16px", letterSpacing:"4px", color:"#fff" }}>SELCE SERVICIOS</span>
        </div>
        <span className="mm" style={{ fontSize:"10px", color:"rgba(232,234,246,0.25)", letterSpacing:"1px" }}>
          {new Date().getFullYear()} · SANTIAGO · RD
        </span>
        <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
          <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#22C55E", display:"inline-block", animation:"blink 2.5s infinite" }}/>
          <span className="mm" style={{ fontSize:"10px", color:"rgba(34,197,94,0.6)", letterSpacing:"1px" }}>SISTEMA EN LINEA</span>
        </div>
      </footer>
    </div>
  );
}
