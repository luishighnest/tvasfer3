// ==UserScript==
// @name         Pepperstream PZ8 Enhanced
// @namespace    pz8
// @version      2.0
// @match        https://pepperstream.xyz/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
'use strict';

GM_addStyle(`

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

:root {
  --bg-base:              #020617;
  --bg-surface:           #0f172a;
  --bg-card:              #1e293b;
  --bg-hover:             #334155;
  --border-subtle:        rgba(255, 255, 255, .05);
  --border-strong:        rgba(255, 255, 255, .15);
  --accent:               #ef4444; /* Accento rosso dal CSS del cruscotto */
  --accent-glow:          rgba(239, 68, 68, .28);
  --accent2:              #b91c1c; /* Secondo colore rosso scuro per gradiente */
  --danger:               #f43f5e;
  --text-primary:         #f8fafc;
  --text-secondary:       #94a3b8;
  --text-muted:           #64748b;
  --font-main:            'Outfit', sans-serif;
  --font-alt:             'Inter', sans-serif;
  --radius:               16px;
  --radius-sm:            10px;
  --radius-lg:            24px;
  --transition:           all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  /* Legacy variables maintained for style compatibility */
  --bg:                   #020617;
  --bg2:                  #0f172a;
  --card:                 #1e293b;
  --glass:                rgba(255, 255, 255, .04);
  --glass-border:         rgba(255, 255, 255, .08);
  --glass-border-hover:   rgba(255, 255, 255, .18);
  --gold:                 #eab308;
  --text:                 #f8fafc;
  --text-sec:             #94a3b8;
  --muted:                #64748b;
  --border-sub:           rgba(255, 255, 255, .05);
}

html, body {
  background: #0a0a0a !important;
  background-image: radial-gradient(circle at top right, rgba(15, 23, 42, 0.5) 0%, transparent 40%),
                    radial-gradient(circle at bottom left, rgba(2, 6, 23, 0.8) 0%, transparent 40%) !important;
  font-family: var(--font-main), sans-serif !important;
  overflow: hidden;
  color: var(--text-primary) !important;
}

/* ── SCROLLBARS ── */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}
*::-webkit-scrollbar        { width: 5px; height: 5px; }
*::-webkit-scrollbar-track  { background: transparent; }
*::-webkit-scrollbar-thumb  {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 99px;
  transition: var(--transition);
}
*::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* ── APP WRAPPER ── */
.app {
  padding: 15px !important;
  gap: 15px !important;
  background: #0a0a0a !important;
  background-image: radial-gradient(circle at top right, rgba(15, 23, 42, 0.5) 0%, transparent 40%),
                    radial-gradient(circle at bottom left, rgba(2, 6, 23, 0.8) 0%, transparent 40%) !important;
}

/* ══════════════════════════════════
   SIDEBAR  —  Ottimizzata Graficamente
═══════════════════════════════════ */
.sidebar {
  width: 260px !important;
  position: relative !important;
  background: transparent !important; /* Trasparente per far trasparire il blur di ::before */
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 22px !important;
  padding: 18px !important;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
  overflow-y: auto !important; /* Rende la sidebar scorrevole mantenendo cliccabili i link */
  overflow-x: hidden !important;
  transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
}

.sidebar:hover {
  border-color: rgba(255, 255, 255, 0.12) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
}

.sidebar::before {
  content: '' !important;
  position: absolute !important;
  inset: 0 !important;
  z-index: -1 !important;
  background: rgba(10, 10, 14, 0.75) !important; /* Leggermente più scura e trasparente per un effetto vetro migliore */
  backdrop-filter: blur(24px) saturate(1.4) !important; /* Saturazione migliorata per il contrasto */
  border-radius: 20px !important;
  pointer-events: none !important;
}

.sidebar::after {
  display: none !important;
  content: none !important;
}

/* Scrollbar personalizzata ultra-sottile per la sidebar */
.sidebar::-webkit-scrollbar {
  width: 4px !important;
}
.sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08) !important;
  border-radius: 99px !important;
}
.sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2) !important;
}

/* ── OROLOGIO ── */
.clock {
  font-size: 38px !important;
  font-weight: 800 !important;
  letter-spacing: -1.5px !important;
  color: #fff !important;
  background: linear-gradient(135deg, #fff 0%, var(--text-secondary) 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  margin-top: 15px !important;
  margin-bottom: 5px !important;
  text-align: center !important;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5)) !important;
}

/* ── DATA sotto l'orologio ── */
.clock + *,
[class*="date"],
[class*="day"] {
  text-align: center !important;
  font-size: 0.72rem !important;
  font-family: var(--font-alt), sans-serif !important;
  font-weight: 700 !important;
  color: var(--text-muted) !important;
  text-transform: uppercase !important;
  letter-spacing: 1.5px !important;
  margin-top: 0.2rem !important;
  margin-bottom: 1.2rem !important;
}

/* ── SEPARATORE SFUMATO ── */
.sidebar hr,
.sidebar [class*="divider"],
.sidebar [class*="separator"] {
  border: none !important;
  height: 1px !important;
  background: linear-gradient(90deg, transparent, var(--border-subtle), transparent) !important;
  margin: 0 0 1.2rem !important;
}

/* ── COUNTDOWN BOX (Subscription/Expiry card) ── */
.countdown-box {
  text-align: center !important;
  background: rgba(255, 255, 255, 0.02) !important;
  padding: 0.8rem !important;
  border-radius: var(--radius-sm) !important;
  border: 1px solid var(--border-subtle) !important;
  margin: 0 0 2rem !important;
  box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.01) !important;
  transition: var(--transition) !important;
}

.countdown-box:hover {
  border-color: rgba(255, 255, 255, 0.08) !important;
  background: rgba(255, 255, 255, 0.04) !important;
}

/* ── TITOLO SEZIONE ── */
[class*="section-title"],
[class*="cat-title"],
[class*="label"] {
  font-size: 0.72rem !important;
  color: var(--text-muted) !important;
  font-weight: 700 !important;
  letter-spacing: 1.5px !important;
  margin-bottom: 0.8rem !important;
  padding-left: 0.5rem !important;
  text-transform: uppercase !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}

/* ── ITEMS SIDEBAR  —  struttura layout originale con micro-animazioni ── */
.item {
  background: transparent !important;
  border-radius: 14px !important;
  margin-bottom: 6px !important;
  transition: var(--transition) !important;
  font-weight: 600 !important;
}

.item:hover {
  background: rgba(255, 255, 255, 0.05) !important;
  transform: translateX(4px) !important;
  color: var(--text-primary) !important;
}

.item.active {
  background: linear-gradient(90deg, var(--accent) 0%, var(--accent2) 100%) !important;
  color: #fff !important;
  font-weight: 700 !important;
  box-shadow: 0 4px 15px var(--accent-glow) !important;
  border: none !important;
}

.item i {
  color: #eab308 !important;
  margin-right: 8px !important;
  transition: transform 0.2s ease, color 0.2s ease !important;
}

.item:hover i {
  color: var(--accent) !important;
  transform: scale(1.15) !important;
}

.item.active i {
  color: #fff !important;
}

/* ── PLAYER ROW ── */
.player-row {
  display: grid !important;
  grid-template-columns: 2fr 1.1fr !important;
  gap: 15px !important;
  height: 360px !important;
}

/* ── VIDEO PIP ── */
.pip {
  background: #000 !important;
  border-radius: 22px !important;
  overflow: hidden !important;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 10px 40px rgba(0, 0, 0, 0.45) !important;
}

/* ── DETAILS CARD ── */
.details {
  background: linear-gradient(180deg, #0b1020, #090d18) !important;
  border-radius: 22px !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  padding: 22px !important;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(24px) saturate(1.2) !important;
  transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
}

.details:hover {
  border-color: rgba(239, 68, 68, 0.2) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
}

#cur-name {
  font-size: 38px !important;
  font-weight: 800 !important;
  margin-bottom: 15px !important;
  color: #fff !important;
  background: linear-gradient(135deg, #fff 0%, var(--text-secondary) 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  letter-spacing: -1.5px !important;
  text-transform: uppercase !important;
  line-height: 1.1 !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3) !important;
}

#cur-info {
  color: var(--text-secondary) !important;
  font-size: 15px !important;
}

/* Premium styling overrides inside details card (now & next boxes) */
.dash-info-now-box {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(185, 28, 28, 0.03) 100%) !important;
  border: 1px solid rgba(239, 68, 68, 0.2) !important;
  border-radius: var(--radius-sm) !important;
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

/* Green Live badge/indicators in details card now-box replaced with Red */
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

/* Progress bar inside details now-box */
.dash-info-now-box div[style*="background:linear-gradient"],
.dash-info-now-box div[style*="background: linear-gradient"] {
  background: linear-gradient(90deg, #ef4444, #b91c1c) !important;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.5) !important;
}

.dash-info-next-box {
  background: rgba(255, 255, 255, 0.02) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  border-radius: var(--radius-sm) !important;
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

/* ── LISTS CONTAINER ── */
.lists-container {
  gap: 15px !important;
}

/* ── LIST WRAPPER ── */
.list-wrapper {
  background: linear-gradient(180deg, #0b1020, #090d18) !important;
  border-radius: 22px !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  overflow: hidden !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
  backdrop-filter: blur(24px) saturate(1.2) !important;
}

/* ── LIST HEADER ── */
.list-header {
  background: rgba(255, 255, 255, 0.025) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  font-size: 0.72rem !important;
  font-weight: 700 !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
  padding: 18px !important;
  color: var(--text-muted) !important;
}

/* ── ROWS  —  struttura layout originale con grafica del prima ── */
.row {
  border: none !important;
  border-radius: 16px !important;
  margin-bottom: 10px !important;
  padding: 14px 16px !important;
  transition: background .15s ease, border-color .15s ease !important;
  background: transparent !important;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02) !important;
}

.row:hover {
  background: rgba(255, 255, 255, 0.05) !important;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
  transform: translateY(-2px) !important;
}

.row.active {
  background: rgba(239, 68, 68, 0.05) !important;
  box-shadow: inset 4px 0 0 var(--accent), inset 0 0 0 1px var(--accent-glow) !important;
  transform: none !important;
}

/* ── CHANNEL INFO ── */
.ch-info span {
  font-size: 16px !important;
  font-weight: 700 !important;
  color: var(--text-primary) !important;
}

.ch-info small {
  color: #38bdf8 !important;
  font-weight: 600 !important;
}

/* ── EVENT CARD ── */
.event-card {
  background: transparent !important;
  border: 1px solid rgba(234, 179, 8, 0.15) !important;
  border-left: 4px solid var(--gold) !important;
  border-radius: 16px !important;
  box-shadow: none !important;
  transition: background .15s ease !important;
}

.event-card:hover {
  background: rgba(234, 179, 8, 0.05) !important;
  border-color: rgba(234, 179, 8, 0.25) !important;
}

/* ── EPG CARD ── */
.epg-card {
  background: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.06) !important;
  border-radius: 16px !important;
  transition: background .15s ease, border-color .15s ease !important;
}

.epg-card:hover {
  background: rgba(255, 255, 255, 0.04) !important;
  border-color: rgba(239, 68, 68, 0.18) !important;
}

/* ── LIVE / BADGE ── */
[class*="live"], [class*="badge"], [class*="tag"] {
  border-radius: 99px !important;
}

`);
})();
