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
  --bg:           #020617;
  --bg2:          #0f172a;
  --card:         #1e293b;
  --glass:        rgba(255,255,255,.04);
  --glass-border: rgba(255,255,255,.08);
  --glass-border-hover: rgba(255,255,255,.18);
  --accent:       #00f2fe;
  --accent-glow:  rgba(0,242,254,.28);
  --accent2:      #4facfe;
  --danger:       #f43f5e;
  --gold:         #eab308;
  --text:         #f8fafc;
  --text-sec:     #94a3b8;
  --muted:        #64748b;
  --radius:       16px;
  --radius-sm:    10px;
  --border-sub:   rgba(255,255,255,.05);
}

html, body {
  background: var(--bg) !important;
  font-family: 'Outfit', sans-serif !important;
  overflow: hidden;
  color: var(--text) !important;
}

/* ── SCROLLBARS ── */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(0,242,254,.3) transparent;
}
*::-webkit-scrollbar        { width: 5px; height: 5px; }
*::-webkit-scrollbar-track  { background: transparent; }
*::-webkit-scrollbar-thumb  {
  background: linear-gradient(180deg, var(--accent), var(--accent2));
  border-radius: 99px;
}

/* ── APP WRAPPER ── */
.app {
  padding: 15px !important;
  gap: 15px !important;
  background: var(--bg) !important;
}

/* ══════════════════════════════════
   SIDEBAR  —  identica a .dash-sidebar
═══════════════════════════════════ */
.sidebar {
  width: 260px !important;
  background: rgba(17,17,21,.65) !important;
  backdrop-filter: blur(24px) saturate(1.2) !important;
  border-radius: var(--radius) !important;
  border: 1px solid rgba(255,255,255,.08) !important;
  box-shadow: 0 8px 32px rgba(0,0,0,.3) !important;
  display: flex !important;
  flex-direction: column !important;
  padding: 1.5rem 1rem !important;
  overflow: hidden !important;
}

/* rimuove qualsiasi pseudo-elemento precedente */
.sidebar::before,
.sidebar::after {
  display: none !important;
  content: none !important;
}

/* ── OROLOGIO (identico a .dash-clock) ── */
.clock {
  text-align: center !important;
  font-size: 1.6rem !important;
  font-family: 'Inter', sans-serif !important;
  font-weight: 800 !important;
  color: var(--text) !important;
  letter-spacing: 1px !important;
  line-height: 1 !important;
  background: none !important;
  -webkit-text-fill-color: var(--text) !important;
  filter: none !important;
  margin: 0 0 .3rem !important;
}

/* ── DATA sotto l'orologio (identico a .dash-clock-date) ── */
.clock + *,
[class*="date"],
[class*="day"] {
  text-align: center !important;
  font-size: 0.75rem !important;
  font-family: 'Inter', sans-serif !important;
  font-weight: 600 !important;
  color: var(--muted) !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
  margin-top: 0.3rem !important;
  margin-bottom: 1rem !important;
}

/* ── SEPARATORE (identico a .dash-clock-divider) ── */
.sidebar hr,
.sidebar [class*="divider"],
.sidebar [class*="separator"] {
  border: none !important;
  height: 1px !important;
  background: var(--border-sub) !important;
  margin: 0 0 1.2rem !important;
}

/* ── COUNTDOWN BOX (identico a .dash-sub) ── */
.countdown-box {
  text-align: center !important;
  background: #1a1a20 !important;
  padding: 0.8rem !important;
  border-radius: var(--radius-sm) !important;
  border: 1px solid var(--border-sub) !important;
  margin: 0 0 2rem !important;
  box-shadow: none !important;
}

/* ── TITOLO SEZIONE (identico a .dash-cat-title) ── */
[class*="section-title"],
[class*="cat-title"],
[class*="label"] {
  font-size: 0.72rem !important;
  color: var(--muted) !important;
  font-weight: 700 !important;
  letter-spacing: 1px !important;
  margin-bottom: 0.8rem !important;
  padding-left: 0.5rem !important;
  text-transform: uppercase !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}

/* ══════════════════════════════════
   ITEMS SIDEBAR  —  identici a .dash-cat-item
═══════════════════════════════════ */
.item {
  display: flex !important;
  align-items: center !important;
  gap: 0.8rem !important;
  padding: 0.8rem 1rem !important;
  border-radius: var(--radius-sm) !important;
  color: var(--text-sec) !important;
  font-weight: 600 !important;
  font-size: 0.95rem !important;
  cursor: pointer !important;
  /* nessuna animazione */
  transition: background .15s ease, color .15s ease !important;
  text-decoration: none !important;
  /* azzera eventuali bordi e trasformazioni */
  border: none !important;
  background: transparent !important;
  transform: none !important;
  box-shadow: none !important;
  margin: 0 !important;
  overflow: visible !important;
  position: static !important;
}

/* rimuove pseudo-elementi shimmer */
.item::before,
.item::after {
  display: none !important;
  content: none !important;
}

.item:hover {
  background: rgba(255,255,255,.05) !important;
  color: var(--text) !important;
  transform: none !important;
  border: none !important;
  box-shadow: none !important;
}

/* item attivo — identico a .dash-cat-item.active (ma con accent cyan) */
.item.active {
  background: linear-gradient(90deg, var(--accent) 0%, var(--accent2) 100%) !important;
  color: #000 !important;
  font-weight: 700 !important;
  box-shadow: 0 4px 15px var(--accent-glow) !important;
  border: none !important;
  transform: none !important;
}

.item.active::before,
.item.active::after {
  display: none !important;
  content: none !important;
}

/* ── PLAYER ROW ── */
.player-row {
  display: grid !important;
  grid-template-columns: 2fr 1.1fr !important;
  gap: 14px !important;
  height: 355px !important;
}

/* ── VIDEO PIP ── */
.pip {
  background: #000 !important;
  border-radius: var(--radius) !important;
  overflow: hidden !important;
  border: 1px solid rgba(255,255,255,.08) !important;
  box-shadow: 0 10px 40px rgba(0,0,0,.5) !important;
  position: relative !important;
}

/* ── DETAILS CARD (identico a .dash-info-card) ── */
.details {
  background: rgba(17,17,21,.65) !important;
  border-radius: var(--radius) !important;
  border: 1px solid rgba(255,255,255,.08) !important;
  padding: 1.5rem !important;
  box-shadow: 0 8px 32px rgba(0,0,0,.3) !important;
  backdrop-filter: blur(24px) saturate(1.2) !important;
}

#cur-name {
  font-size: 2rem !important;
  font-weight: 900 !important;
  margin-bottom: 0.5rem !important;
  color: var(--text) !important;
  background: none !important;
  -webkit-text-fill-color: var(--text) !important;
  letter-spacing: -1px !important;
  text-transform: uppercase !important;
  line-height: 1 !important;
}

#cur-info {
  color: var(--text-sec) !important;
  font-size: 0.9rem !important;
  line-height: 1.6 !important;
}

/* ── LISTS CONTAINER ── */
.lists-container {
  gap: 14px !important;
}

/* ── LIST WRAPPER (identico a .dash-info-card) ── */
.list-wrapper {
  background: rgba(17,17,21,.65) !important;
  border-radius: var(--radius) !important;
  border: 1px solid rgba(255,255,255,.08) !important;
  overflow: hidden !important;
  box-shadow: 0 8px 32px rgba(0,0,0,.3) !important;
  backdrop-filter: blur(24px) saturate(1.2) !important;
}

/* ── LIST HEADER ── */
.list-header {
  background: rgba(255,255,255,.025) !important;
  border-bottom: 1px solid rgba(255,255,255,.08) !important;
  font-size: 0.72rem !important;
  font-weight: 700 !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
  padding: 1rem 1.2rem !important;
  color: var(--muted) !important;
}

/* ── ROWS (identici a .ch-row) ── */
.row {
  display: flex !important;
  align-items: center !important;
  gap: 1.2rem !important;
  padding: .8rem 1rem !important;
  background: transparent !important;
  border: 1px solid transparent !important;
  border-radius: var(--radius-sm) !important;
  margin-bottom: 4px !important;
  transition: background .15s ease, border-color .15s ease !important;
}

.row:hover {
  background: rgba(255,255,255,.05) !important;
  border-color: rgba(255,255,255,.1) !important;
  transform: none !important;
  box-shadow: none !important;
}

.row.active {
  border-left: 4px solid var(--accent) !important;
  background: rgba(0,242,254,.05) !important;
  border-color: var(--accent-glow) !important;
  box-shadow: none !important;
  transform: none !important;
}

/* ── CHANNEL INFO ── */
.ch-info span {
  font-size: 1rem !important;
  font-weight: 700 !important;
  color: var(--text) !important;
}

.ch-info small {
  font-size: .75rem !important;
  color: var(--accent) !important;
  font-weight: 600 !important;
}

/* ── EVENT CARD ── */
.event-card {
  background: transparent !important;
  border: 1px solid rgba(234,179,8,.15) !important;
  border-left: 3px solid var(--gold) !important;
  border-radius: var(--radius-sm) !important;
  box-shadow: none !important;
  transition: background .15s ease !important;
}

.event-card:hover {
  background: rgba(234,179,8,.05) !important;
  border-color: rgba(234,179,8,.25) !important;
  box-shadow: none !important;
}

/* ── EPG CARD ── */
.epg-card {
  background: transparent !important;
  border: 1px solid rgba(255,255,255,.06) !important;
  border-radius: var(--radius-sm) !important;
  transition: background .15s ease, border-color .15s ease !important;
}

.epg-card:hover {
  background: rgba(255,255,255,.04) !important;
  border-color: rgba(0,242,254,.18) !important;
}

/* ── LIVE / BADGE ── */
[class*="live"], [class*="badge"], [class*="tag"] {
  border-radius: 99px !important;
}

`);
})();