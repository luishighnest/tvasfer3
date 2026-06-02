// ==UserScript==
// @name         Pepperstream PZ8 Enhanced
// @namespace    pz8
// @version      1.0
// @match        https://pepperstream.xyz/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
'use strict';

GM_addStyle(`

@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

:root{
--bg:#060912;
--card:#0b1020;
--card2:#111827;
--border:rgba(255,255,255,.06);
--red:#ef4444;
--blue:#3b82f6;
--cyan:#00e5ff;
--text:#ffffff;
--muted:#94a3b8;

/* New graphics premium variables */
--accent:               #ef4444;
--accent-glow:          rgba(239, 68, 68, .28);
--accent2:              #b91c1c;
--text-primary:         #f8fafc;
--text-secondary:       #94a3b8;
--text-muted:           #64748b;
--radius:               16px;
--radius-sm:            10px;
--radius-lg:            24px;
--transition:           all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

html,
body{
background:#0a0a0a!important;
background-image:radial-gradient(circle at top right, rgba(15, 23, 42, 0.5) 0%, transparent 40%),
                 radial-gradient(circle at bottom left, rgba(2, 6, 23, 0.8) 0%, transparent 40%)!important;
font-family:'Outfit',sans-serif!important;
overflow:hidden;
}

.app{
padding:15px!important;
gap:15px!important;
background:transparent!important; /* Transparent background to allow radial body gradient */
}

.sidebar{
width:260px!important;
background:linear-gradient(
180deg,
#090d18,
#050811
)!important;
border:1px solid rgba(255,255,255,.05)!important;
border-radius:22px!important;
padding:18px!important;
overflow-x: hidden !important;
overflow-y: auto !important; /* Make sidebar scrollable downwards */
}

.clock{
font-size:44px!important;
font-weight:800!important;
letter-spacing:-1px;
color:#fff!important;
margin-top:15px!important;
margin-bottom:15px!important;
text-align:center!important;
}

.countdown-box{
background:#0f172a!important;
border-radius:18px!important;
border:none!important;
}

.item{
background:transparent!important;
border-radius:14px!important;
margin-bottom:6px!important;
transition:.25s!important;
font-weight:600!important;
}

.item:hover{
background:rgba(255,255,255,.05)!important;
transform:translateX(4px);
}

.item.active{
background:linear-gradient(
135deg,
#ef4444,
#dc2626
)!important;

box-shadow:
0 0 20px rgba(239,68,68,.35)!important;
}

.player-row{
display:grid!important;
grid-template-columns:2fr 1.1fr!important;
gap:15px!important;
height:360px!important;
}

.pip{
background:#000!important;
border-radius:22px!important;
overflow:hidden!important;

box-shadow:
0 0 0 1px rgba(255,255,255,.04),
0 10px 40px rgba(0,0,0,.45)!important;
}

/* ── DETAILS CARD (riquadro in alto a destra) ── */
.details{
background:linear-gradient(
180deg,
#0b1020,
#090d18
)!important;

border-radius:22px!important;
border:1px solid rgba(255,255,255,.05)!important;
padding:22px!important;
box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
}

.details:hover {
  border-color: rgba(239, 68, 68, 0.2) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
}

#cur-name{
font-size:38px!important;
font-weight:800!important;
margin-bottom:15px!important;
color: #fff !important;
background: linear-gradient(135deg, #fff 0%, #94a3b8 100%) !important;
-webkit-background-clip: text !important;
-webkit-text-fill-color: transparent !important;
letter-spacing: -1.5px !important;
text-transform: uppercase !important;
line-height: 1.1 !important;
text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3) !important;
}

#cur-info{
color:#94a3b8!important;
font-size:15px!important;
}

/* Grafica premium interna per il riquadro in alto a destra (In Onda / A Seguire) */
.dash-info-now-box {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(185, 28, 28, 0.03) 100%) !important;
  border: 1px solid rgba(239, 68, 68, 0.2) !important;
  border-radius: 14px !important;
  padding: 1.2rem !important;
  margin-bottom: 0.8rem !important;
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.05) !important;
  position: relative !important;
  overflow: hidden !important;
  transition: var(--transition) !important;
}

.dash-info-now-box::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important; left: 0 !important; width: 4px !important; height: 100% !important;
  background: linear-gradient(180deg, #ef4444, #b91c1c) !important;
}

.dash-info-now-box:hover {
  border-color: rgba(239, 68, 68, 0.4) !important;
  box-shadow: 0 8px 30px rgba(239, 68, 68, 0.1) !important;
}

/* Badge LIVE rosso nel box in onda */
.dash-info-now-box span[style*="color:#00e676"],
.dash-info-now-box span[style*="color: rgb(0, 230, 118)"] {
  color: #ef4444 !important;
  background: rgba(239, 68, 68, 0.15) !important;
  border-color: rgba(239, 68, 68, 0.3) !important;
}
.dash-info-now-box span[style*="background:#00e676"],
.dash-info-now-box span[style*="background: rgb(0, 230, 118)"] {
  background: #ef4444 !important;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.6) !important;
}

/* Barra di avanzamento rossa */
.dash-info-now-box div[style*="background:linear-gradient"],
.dash-info-now-box div[style*="background: linear-gradient"] {
  background: linear-gradient(90deg, #ef4444, #b91c1c) !important;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.5) !important;
}

.dash-info-next-box {
  background: rgba(255, 255, 255, 0.02) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  border-radius: 14px !important;
  padding: 1.2rem !important;
  position: relative !important;
  overflow: hidden !important;
  transition: var(--transition) !important;
}

.dash-info-next-box::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important; left: 0 !important; width: 4px !important; height: 100% !important;
  background: rgba(239, 68, 68, 0.4) !important;
}

.dash-info-next-box:hover {
  border-color: rgba(255, 255, 255, 0.1) !important;
  background: rgba(255, 255, 255, 0.03) !important;
}

.dash-stream-expiry {
  margin-top: 20px !important;
  border-left: 4px solid #ef4444 !important;
  background: rgba(239, 68, 68, 0.03) !important;
  border: 1px solid rgba(239, 68, 68, 0.1) !important;
  padding: 1rem !important;
  border-radius: var(--radius-sm) !important;
  transition: var(--transition) !important;
}

.dash-stream-expiry:hover {
  background: rgba(239, 68, 68, 0.05) !important;
  border-color: rgba(239, 68, 68, 0.2) !important;
}

.dash-stream-expiry-title {
  font-size: 0.9rem !important;
  font-weight: 800 !important;
  color: #ef4444 !important;
  margin-bottom: 0.5rem !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
}

.lists-container{
gap:15px!important;
}

.list-wrapper{
background:linear-gradient(
180deg,
#0b1020,
#090d18
)!important;

border-radius:22px!important;
border:1px solid rgba(255,255,255,.05)!important;
overflow:hidden!important;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
}

.list-header{
background:rgba(255,255,255,.02)!important;
border:none!important;
font-size:15px!important;
font-weight:700!important;
padding:18px!important;
}

.row{
background:#111827!important;
border:none!important;
border-radius:16px!important;
margin-bottom:10px!important;
padding:14px 16px!important;
transition:.25s!important;
}

.row:hover{
transform:translateY(-2px);
background:#172036!important;

box-shadow:
0 8px 25px rgba(0,0,0,.35)!important;
}

.row.active{
background:linear-gradient(
135deg,
rgba(239,68,68,.25),
rgba(220,38,38,.12)
)!important;

outline:1px solid rgba(239,68,68,.35)!important;
}

.ch-info span{
font-size:16px!important;
font-weight:700!important;
}

.ch-info small{
color:#38bdf8!important;
font-weight:600!important;
}

.event-card{
background:#111827!important;
border:none!important;
border-left:4px solid #facc15!important;
border-radius:16px!important;
}

.epg-card{
background:#111827!important;
border:none!important;
border-radius:16px!important;
}

.grid-scroll::-webkit-scrollbar,
.events-scroll::-webkit-scrollbar,
.sidebar::-webkit-scrollbar{
width:6px!important;
}

.grid-scroll::-webkit-scrollbar-thumb,
.events-scroll::-webkit-scrollbar-thumb,
.sidebar::-webkit-scrollbar-thumb{
background:#334155!important;
border-radius:20px!important;
}

`);
})();
