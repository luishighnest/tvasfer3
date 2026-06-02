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
  --accent:               #00f2fe;
  --accent-glow:          rgba(0, 242, 254, .3);
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
  --accent2:              #4facfe;
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
  background: transparent !important;
}

/* ══════════════════════════════════
   SIDEBAR  —  identica a .dash-sidebar
═══════════════════════════════════ */
.sidebar {
  width: 260px !important;
  background: rgba(17, 17, 21, 0.65) !important;
  backdrop-filter: blur(24px) saturate(1.2) !important;
  border-radius: var(--radius) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
  display: flex !important;
  flex-direction: column !important;
  padding: 1.5rem 1rem !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
  will-change: transform, opacity !important;
}

/* Scrollbar minimale per la sidebar */
.sidebar::-webkit-scrollbar {
  width: 4px !important;
}
.sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 99px !important;
}
.sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2) !important;
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
  font-family: var(--font-alt), sans-serif !important;
  font-weight: 800 !important;
  color: var(--text-primary) !important;
  letter-spacing: 1px !important;
  line-height: 1 !important;
  background: none !important;
  -webkit-text-fill-color: var(--text-primary) !important;
  filter: none !important;
  margin: 0 0 .3rem !important;
}

/* ── DATA sotto l'orologio (identico a .dash-clock-date) ── */
.clock + *,
[class*="date"],
[class*="day"] {
  text-align: center !important;
  font-size: 0.75rem !important;
  font-family: var(--font-alt), sans-serif !important;
  font-weight: 600 !important;
  color: var(--text-muted) !important;
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
  background: var(--border-subtle) !important;
  margin: 0 0 1.2rem !important;
}

/* ── COUNTDOWN BOX (identico a .dash-sub) ── */
.countdown-box {
  text-align: center !important;
  background: #1a1a20 !important;
  padding: 0.8rem !important;
  border-radius: var(--radius-sm) !important;
  border: 1px solid var(--border-subtle) !important;
  margin: 0 0 2rem !important;
  box-shadow: none !important;
}

/* ── TITOLO SEZIONE (identico a .dash-cat-title) ── */
[class*="section-title"],
[class*="cat-title"],
[class*="label"] {
  font-size: 0.72rem !important;
  color: var(--text-muted) !important;
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
  color: var(--text-secondary) !important;
  font-weight: 600 !important;
  font-size: 0.95rem !important;
  cursor: pointer !important;
  transition: var(--transition) !important;
  text-decoration: none !important;
  border: none !important;
  background: transparent !important;
  transform: none !important;
  box-shadow: none !important;
  margin: 0 !important;
  overflow: visible !important;
  position: static !important;
  pointer-events: auto !important;
}

.item * {
  pointer-events: none !important;
}

.item i {
  font-size: 1.2rem !important;
  color: #eab308 !important;
  transition: var(--transition) !important;
}

/* rimuove pseudo-elementi shimmer */
.item::before,
.item::after {
  display: none !important;
  content: none !important;
}

.item:hover {
  background: rgba(255, 255, 255, 0.05) !important;
  color: var(--text-primary) !important;
  transform: none !important;
  border: none !important;
  box-shadow: none !important;
}

/* item attivo — identico a .dash-cat-item.active (con gradient rosso e ombra premium) */
.item.active {
  background: linear-gradient(90deg, #ef4444 0%, #b91c1c 100%) !important;
  color: #fff !important;
  font-weight: 700 !important;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3) !important;
  border: none !important;
  transform: none !important;
}

.item.active i {
  color: #fff !important;
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
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5) !important;
  position: relative !important;
}

/* ── DETAILS CARD (identico a .dash-info-card) ── */
.details {
  background: rgba(17, 17, 21, 0.65) !important;
  border-radius: var(--radius) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  padding: 1.5rem !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
  backdrop-filter: blur(24px) saturate(1.2) !important;
}

#cur-name {
  font-size: 1.6rem !important;
  font-weight: 900 !important;
  margin-bottom: 0.5rem !important;
  color: var(--text-primary) !important;
  background: none !important;
  -webkit-text-fill-color: var(--text-primary) !important;
  letter-spacing: -1px !important;
  text-transform: uppercase !important;
  line-height: 1.1 !important;
}

#cur-info {
  color: var(--text-secondary) !important;
  font-size: 0.95rem !important;
  line-height: 1.6 !important;
}

/* ── LISTS CONTAINER ── */
.lists-container {
  gap: 14px !important;
}

/* ── LIST WRAPPER (identico a .dash-panel) ── */
.list-wrapper {
  background: rgba(17, 17, 21, 0.65) !important;
  border-radius: var(--radius) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  overflow: hidden !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
  backdrop-filter: blur(24px) saturate(1.2) !important;
  display: flex !important;
  flex-direction: column !important;
}

/* ── LIST HEADER (identico a .dash-panel-header) ── */
.list-header {
  background: rgba(255, 255, 255, 0.02) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  font-size: 0.85rem !important;
  font-weight: 900 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  padding: 1.2rem 1.2rem !important;
  color: var(--text-muted) !important;
}

/* ── ROWS (identici a .dash-ch-row) ── */
.row {
  display: flex !important;
  align-items: center !important;
  gap: 1rem !important;
  padding: 0.7rem 1rem !important;
  border-radius: var(--radius-sm) !important;
  border: 1px solid transparent !important;
  cursor: pointer !important;
  transition: var(--transition) !important;
  text-decoration: none !important;
  color: inherit !important;
  background: #141419 !important;
  margin-bottom: 0.3rem !important;
}

.row:hover {
  background: #1e1e2a !important;
  border-color: rgba(255, 255, 255, 0.06) !important;
  box-shadow: inset 3px 0 0 var(--ch-hover-accent, #ef4444) !important;
  transform: none !important;
}

.row.active {
  border-color: rgba(239, 68, 68, 0.5) !important;
  background: linear-gradient(90deg, rgba(239, 68, 68, 0.15) 0%, rgba(20, 20, 25, 0.8) 100%) !important;
  box-shadow: inset 4px 0 0 #ef4444, 0 0 15px rgba(239, 68, 68, 0.15) !important;
  transform: none !important;
}

/* ── CHANNEL INFO (identici a .dash-ch-name / .dash-ch-cat) ── */
.ch-info span {
  font-size: 0.92rem !important;
  font-weight: 800 !important;
  color: #fff !important;
}

.ch-info small {
  font-size: 0.65rem !important;
  color: var(--text-muted) !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  transition: var(--transition) !important;
}

.row.active .ch-info small {
  color: #ef4444 !important;
}

/* Supporto per badge numero canale */
[class*="ch-num"], [class*="channel-num"] {
  width: 32px !important;
  height: 32px !important;
  border-radius: 6px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-family: var(--font-alt), sans-serif !important;
  font-size: 0.72rem !important;
  font-weight: 800 !important;
  color: var(--text-muted) !important;
  background: rgba(255, 255, 255, 0.04) !important;
  flex-shrink: 0 !important;
  transition: var(--transition) !important;
}

.row.active [class*="ch-num"], .row.active [class*="channel-num"] {
  color: #ef4444 !important;
  background: rgba(239, 68, 68, 0.1) !important;
}

/* ── EVENT CARD (identico a .dash-event-row) ── */
.event-card {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.4rem !important;
  padding: 1rem !important;
  background: #1a1a20 !important;
  border: 1px solid transparent !important;
  border-left: 3px solid var(--gold) !important;
  border-radius: var(--radius-sm) !important;
  box-shadow: none !important;
  transition: var(--transition) !important;
}

.event-card:hover {
  background: #1a1a20 !important;
  filter: brightness(1.2) !important;
  border-color: transparent !important;
  box-shadow: none !important;
}

/* ── EPG CARD (identico a .dash-guide-row) ── */
.epg-card {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.6rem !important;
  padding: 1rem !important;
  background: transparent !important;
  border: none !important;
  border-bottom: 1px solid var(--border-subtle) !important;
  transition: var(--transition) !important;
  border-radius: 0 !important;
}

.epg-card:last-child {
  border-bottom: none !important;
}

.epg-card:hover {
  background: rgba(255, 255, 255, 0.02) !important;
}

/* ── LIVE / BADGE ── */
[class*="live"], [class*="badge"], [class*="tag"] {
  border-radius: 99px !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
}

[class*="live-badge"], [class*="ch-live"] {
  font-size: 0.6rem !important;
  padding: 2px 6px !important;
  border-radius: 3px !important;
  background: rgba(239, 68, 68, 0.15) !important;
  color: #ef4444 !important;
  border: 1px solid rgba(239, 68, 68, 0.3) !important;
}

`);
})();
