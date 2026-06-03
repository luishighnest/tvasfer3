// ==UserScript==
// @name         Pepperstream PZ8 Enhanced
// @namespace    pz8
// @version      2.0
// @match        https://pepperstream.xyz/*
// @match        https://*.chilistream.net/*
// @match        https://*.mediahosting.space/*
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
.sidebar,
.dash-sidebar {
  width: 260px !important;
  position: relative !important;
  display: flex !important;
  flex-direction: column !important;
  background: transparent !important; /* Trasparente per far trasparire il blur di ::before */
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  border-radius: 24px !important;
  padding: 20px !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
}

.sidebar:hover,
.dash-sidebar:hover {
  border-color: rgba(239, 68, 68, 0.15) !important;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6),
              0 0 30px rgba(239, 68, 68, 0.04),
              inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
}

.sidebar::before,
.dash-sidebar::before {
  content: '' !important;
  position: absolute !important;
  inset: 0 !important;
  z-index: -1 !important;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.82) 0%, rgba(10, 10, 14, 0.92) 100%) !important;
  backdrop-filter: blur(28px) saturate(1.5) !important;
  border-radius: 22px !important;
  pointer-events: none !important;
}

.sidebar::after,
.dash-sidebar::after {
  display: none !important;
  content: none !important;
}

/* Scrollbar personalizzata ultra-sottile per la sidebar */
.sidebar::-webkit-scrollbar,
.dash-sidebar::-webkit-scrollbar {
  width: 4px !important;
}
.sidebar::-webkit-scrollbar-thumb,
.dash-sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08) !important;
  border-radius: 99px !important;
}
.sidebar::-webkit-scrollbar-thumb:hover,
.dash-sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2) !important;
}

/* ── OROLOGIO ── */
.clock {
  font-family: var(--font-main), sans-serif !important;
  font-size: 38px !important;
  font-weight: 900 !important;
  letter-spacing: -1.8px !important;
  color: #fff !important;
  background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 55%, #94a3b8 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  margin-top: 10px !important;
  margin-bottom: 2px !important;
  text-align: center !important;
  filter: drop-shadow(0 2px 10px rgba(0,0,0,0.5)) !important;
}

/* ── DATA sotto l'orologio ── */
.clock + *,
[class*="date"],
[class*="day"] {
  text-align: center !important;
  font-size: 10px !important;
  font-family: var(--font-alt), sans-serif !important;
  font-weight: 800 !important;
  color: rgba(255, 255, 255, 0.4) !important;
  text-transform: uppercase !important;
  letter-spacing: 2px !important;
  margin-top: 0.1rem !important;
  margin-bottom: 1.2rem !important;
}

/* ── SEPARATORE SFUMATO ── */
.sidebar hr,
.sidebar [class*="divider"],
.sidebar [class*="separator"],
.dash-sidebar hr,
.dash-sidebar [class*="divider"],
.dash-sidebar [class*="separator"] {
  border: none !important;
  height: 1px !important;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent) !important;
  margin: 0 0 1.2rem !important;
}

/* ── COUNTDOWN BOX (Subscription/Expiry card) ── */
.countdown-box {
  order: 9997 !important;
  text-align: center !important;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(15, 23, 42, 0.75) 100%) !important;
  padding: 10px 12px !important;
  border-radius: 12px !important;
  border: 1px solid rgba(239, 68, 68, 0.2) !important;
  border-left: 4px solid var(--accent) !important;
  margin: 0 !important; /* Managed by toggle classes */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
  transition: var(--transition) !important;
}

.countdown-box.hidden-countdown {
  display: none !important;
}

.countdown-box.show-countdown {
  display: block !important;
  margin: 10px 0 !important;
  animation: fadeIn 0.3s ease-in-out !important;
}

.countdown-box:hover {
  border-color: rgba(239, 68, 68, 0.35) !important;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(15, 23, 42, 0.8) 100%) !important;
  box-shadow: 0 12px 32px rgba(239, 68, 68, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
  transform: translateY(-2px) !important;
}

.countdown-box,
.countdown-box * {
  font-family: var(--font-alt), sans-serif !important;
  font-weight: 700 !important;
  color: var(--text-primary) !important;
  font-size: 11px !important;
}

/* ── TITOLO SEZIONE ── */
[class*="section-title"],
[class*="cat-title"],
[class*="label"] {
  font-family: var(--font-alt), sans-serif !important;
  font-size: 11px !important;
  color: var(--text-muted) !important;
  font-weight: 800 !important;
  letter-spacing: 1.8px !important;
  margin-top: 1.4rem !important;
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
  border-radius: 12px !important;
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
  background: linear-gradient(90deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%) !important;
  color: #fff !important;
  font-weight: 700 !important;
  box-shadow: 0 4px 15px var(--accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;
  border: none !important;
  transform: translateX(4px) scale(1.01) !important;
}

.item i {
  color: #eab308 !important;
  margin-right: 8px !important;
  transition: transform 0.2s ease, color 0.2s ease !important;
  filter: drop-shadow(0 0 2px rgba(234, 179, 8, 0.35)) !important;
}

.item:hover i {
  color: var(--accent) !important;
  transform: scale(1.15) !important;
  filter: drop-shadow(0 0 3px rgba(239, 68, 68, 0.5)) !important;
}

.item.active i {
  color: #fff !important;
  filter: none !important;
}

/* ── PLAYER ROW ── */
.player-row {
  display: grid !important;
  grid-template-columns: 2.6fr 1fr !important;
  gap: 15px !important;
  height: 420px !important;
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
.details,
.dash-info-card {
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.82) 0%, rgba(10, 10, 14, 0.92) 100%) !important;
  border-radius: 24px !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  padding: 24px !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;
  backdrop-filter: blur(28px) saturate(1.5) !important;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease !important;
}

.details:hover,
.dash-info-card:hover {
  border-color: rgba(239, 68, 68, 0.15) !important;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6),
              0 0 30px rgba(239, 68, 68, 0.04),
              inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
}

#cur-name,
.dash-info-title {
  font-family: var(--font-main), sans-serif !important;
  font-size: 24px !important;
  font-weight: 900 !important;
  margin-bottom: 10px !important;
  color: #fff !important;
  background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 65%, #94a3b8 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  letter-spacing: -1px !important;
  text-transform: uppercase !important;
  line-height: 1.2 !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3) !important;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4)) !important;
}

#cur-info,
.dash-info-subtitle {
  font-family: var(--font-alt), sans-serif !important;
  color: #38bdf8 !important; /* Elegant modern cyan accent for subtitle */
  font-size: 13px !important;
  font-weight: 700 !important;
  letter-spacing: 1.2px !important;
  text-transform: uppercase !important;
  margin-bottom: 16px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  text-shadow: 0 0 8px rgba(56, 189, 248, 0.25) !important;
}

/* Metadata tag container */
.dash-info-meta {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  margin-bottom: 20px !important;
}

.dash-info-ch-num {
  font-family: var(--font-alt), sans-serif !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  color: var(--text-secondary) !important;
  background: rgba(255, 255, 255, 0.04) !important;
  padding: 3px 10px !important;
  border-radius: 6px !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
}

.dash-info-cat-badge {
  font-family: var(--font-alt), sans-serif !important;
  font-size: 11px !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.8px !important;
  padding: 3px 12px !important;
  border-radius: 20px !important;
  color: var(--accent) !important;
  background: rgba(239, 68, 68, 0.12) !important;
  border: 1px solid rgba(239, 68, 68, 0.25) !important;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.05) !important;
  display: inline-block !important;
}

/* Keyframes for live badge dot pulsing */
@keyframes pulse-live {
  0% {
    transform: scale(0.9);
    opacity: 0.6;
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5);
  }
  70% {
    transform: scale(1.1);
    opacity: 1;
    box-shadow: 0 0 0 6px rgba(239, 68, 68, 0);
  }
  100% {
    transform: scale(0.9);
    opacity: 0.6;
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}

/* ── "NOW PLAYING" BOX ── */
.dash-info-now-box {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(15, 23, 42, 0.5) 100%) !important;
  border: 1px solid rgba(239, 68, 68, 0.18) !important;
  border-radius: 16px !important;
  padding: 1.4rem !important;
  margin-bottom: 12px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.02) !important;
  position: relative !important;
  overflow: hidden !important;
  transition: var(--transition) !important;
}

.dash-info-now-box::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 4px !important;
  height: 100% !important;
  background: linear-gradient(180deg, #ef4444, #b91c1c) !important;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.4) !important;
}

.dash-info-now-box:hover {
  border-color: rgba(239, 68, 68, 0.35) !important;
  box-shadow: 0 12px 32px rgba(239, 68, 68, 0.08), 0 4px 20px rgba(0, 0, 0, 0.3) !important;
  transform: translateY(-2px) !important;
}

/* Red Live badge adjustments */
.dash-info-now-box span[style*="color:#00e676"],
.dash-info-now-box span[style*="color: rgb(0, 230, 118)"],
.dash-info-now-box span[style*="color"],
.dash-info-now-box .live-tag,
.dash-info-now-box span[class*="live"],
.dash-info-now-box span[style*="color: rgb(0, 230, 118)"] {
  color: #fff !important; /* Made white as requested */
  background: rgba(239, 68, 68, 0.15) !important;
  border-color: rgba(239, 68, 68, 0.3) !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
}

/* Pulser Live Dot */
.dash-info-now-box span[style*="background:#00e676"],
.dash-info-now-box span[style*="background: rgb(0, 230, 118)"],
.dash-info-now-box span[style*="background"],
.dash-info-now-box .live-tag .dot,
.dash-info-now-box span[class*="dot"] {
  background: #ef4444 !important;
  animation: pulse-live 1.8s infinite ease-in-out !important;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.6) !important;
  border-radius: 50% !important;
}

/* Custom Progress Bar inside Now Playing card */
.dash-info-now-box div[style*="background:linear-gradient"],
.dash-info-now-box div[style*="background: linear-gradient"] {
  height: 6px !important;
  background: linear-gradient(90deg, #ef4444, #b91c1c) !important;
  border-radius: 99px !important;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.6) !important;
  position: relative !important;
}

/* Style for progress bar container track */
.dash-info-now-box div[style*="background:rgba(255,255,255,0.05)"],
.dash-info-now-box div[style*="background: rgba(255, 255, 255, 0.05)"],
.dash-info-now-box div[style*="height:4px"],
.dash-info-now-box div[style*="height: 4px"] {
  height: 6px !important;
  background: rgba(255, 255, 255, 0.08) !important;
  border-radius: 99px !important;
  overflow: hidden !important;
  margin-top: 14px !important;
}

/* ── "NEXT PLAYING" BOX ── */
.dash-info-next-box {
  background: rgba(255, 255, 255, 0.02) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  border-radius: 16px !important;
  padding: 1.4rem !important;
  position: relative !important;
  overflow: hidden !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.01) !important;
  transition: var(--transition) !important;
}

.dash-info-next-box::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 4px !important;
  height: 100% !important;
  background: rgba(255, 255, 255, 0.15) !important;
  transition: background 0.3s ease !important;
}

.dash-info-next-box:hover {
  border-color: rgba(255, 255, 255, 0.1) !important;
  background: rgba(255, 255, 255, 0.03) !important;
  transform: translateY(-2px) !important;
}

.dash-info-next-box:hover::before {
  background: var(--accent) !important;
}

/* ── SUBSCRIPTION EXPIRY BOX ── */
.dash-stream-expiry {
  margin-top: 18px !important;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(30, 41, 59, 0.3) 50%, rgba(15, 23, 42, 0.7) 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.06) !important;
  border-left: 4px solid var(--accent) !important;
  padding: 14px 16px !important;
  border-radius: 16px !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03) !important;
  transition: var(--transition) !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 8px !important;
}

.dash-stream-expiry:hover {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(30, 41, 59, 0.4) 50%, rgba(15, 23, 42, 0.8) 100%) !important;
  border-color: rgba(239, 68, 68, 0.25) !important;
  border-left-color: #f87171 !important; /* brighter red accent */
  box-shadow: 0 16px 36px rgba(239, 68, 68, 0.08), 0 12px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
  transform: translateY(-2px) !important;
}

.dash-stream-expiry-title {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  font-family: var(--font-main), sans-serif !important;
  font-size: 11px !important;
  color: var(--text-muted) !important;
  text-transform: uppercase !important;
  letter-spacing: 1.8px !important;
  font-weight: 800 !important;
}

.dash-stream-expiry-title i {
  color: var(--accent) !important;
  font-size: 14px !important;
  text-shadow: 0 0 10px rgba(239, 68, 68, 0.5) !important;
}

.dash-stream-expiry-desc {
  font-family: var(--font-alt), sans-serif !important;
  font-size: 13px !important;
  color: var(--text-secondary) !important;
  line-height: 1.4 !important;
  font-weight: 600 !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
}

.dash-stream-expiry-desc i {
  color: #10b981 !important; /* green calendar check */
  font-size: 14px !important;
  text-shadow: 0 0 8px rgba(16, 185, 129, 0.4) !important;
}

.expiry-date-val {
  color: #ffffff !important;
  font-weight: 800 !important;
  background: rgba(16, 185, 129, 0.1) !important;
  border: 1px solid rgba(16, 185, 129, 0.25) !important;
  padding: 3px 10px !important;
  border-radius: 8px !important;
  letter-spacing: 0.5px !important;
  display: inline-block !important;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.05) !important;
}

/* ── TV GUIDE GENERAL DESCRIPTION ── */
.dash-info-desc {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.005) 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  border-left: 3px solid #38bdf8 !important; /* cyan border for current info desc */
  border-radius: 12px !important;
  padding: 12px 16px !important;
  font-family: var(--font-alt), sans-serif !important;
  font-size: 12.5px !important;
  line-height: 1.55 !important;
  color: var(--text-secondary) !important;
  display: flex !important;
  gap: 12px !important;
  align-items: flex-start !important;
  margin-top: 15px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.01) !important;
  transition: var(--transition) !important;
}

.dash-info-desc:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%) !important;
  border-color: rgba(56, 189, 248, 0.3) !important;
  border-left-color: #00e5ff !important; /* neon cyan border-left on hover */
  color: var(--text-primary) !important;
  box-shadow: 0 12px 30px rgba(56, 189, 248, 0.08), 0 8px 24px rgba(0, 0, 0, 0.45) !important;
  transform: translateY(-2px) !important;
}

.dash-info-desc i {
  color: #38bdf8 !important;
  text-shadow: 0 0 10px rgba(56, 189, 248, 0.5) !important;
  font-size: 15px !important;
  margin-top: 2px !important;
  transition: transform 0.2s ease !important;
}

.dash-info-desc:hover i {
  transform: scale(1.15) !important;
}

.dash-info-desc p {
  margin: 0 !important;
  line-height: 1.55 !important;
}

.dash-info-desc.next {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.002) 100%) !important;
  border-color: rgba(255, 255, 255, 0.03) !important;
  border-left: 3px solid rgba(255, 255, 255, 0.15) !important; /* muted border for next EPG */
  color: var(--text-muted) !important;
  font-size: 11.5px !important;
  opacity: 0.85 !important;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2) !important;
  margin-top: 10px !important;
}

.dash-info-desc.next:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.005) 100%) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  border-left-color: rgba(255, 255, 255, 0.35) !important;
  color: var(--text-secondary) !important;
  opacity: 1 !important;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3) !important;
  transform: translateY(-2px) !important;
}

.dash-info-desc.next i {
  color: var(--text-muted) !important;
  text-shadow: none !important;
}

.dash-info-desc.next:hover i {
  color: var(--text-secondary) !important;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.15) !important;
}

/* ── TV GUIDE INTERNAL TEXT IMPROVEMENTS ── */
.dash-info-now-box p,
.dash-info-now-box div,
.dash-info-next-box p,
.dash-info-next-box div {
  font-family: var(--font-alt), sans-serif !important;
  font-size: 12px !important;
  line-height: 1.5 !important;
  color: var(--text-secondary) !important;
}

.dash-info-now-box h3,
.dash-info-now-box strong,
.dash-info-now-box b,
.dash-info-next-box h3,
.dash-info-next-box strong,
.dash-info-next-box b {
  font-family: var(--font-main), sans-serif !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  color: #fff !important;
}

/* ── LISTS CONTAINER ── */
.lists-container {
  gap: 15px !important;
}

/* ── LIST WRAPPER ── */
.list-wrapper {
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.82) 0%, rgba(10, 10, 14, 0.92) 100%) !important;
  border-radius: 24px !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  overflow: hidden !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;
  backdrop-filter: blur(28px) saturate(1.5) !important;
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

/* ── INFO BUTTON & ANIMATION ── */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.info-toggle-btn {
  order: 9998 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  width: 100% !important;
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.06) !important;
  border-radius: 12px !important;
  padding: 10px 16px !important;
  color: var(--text-secondary) !important;
  font-family: var(--font-alt), sans-serif !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  transition: var(--transition) !important;
  margin-top: 15px !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02) !important;
}

.info-toggle-btn:hover {
  background: rgba(239, 68, 68, 0.08) !important;
  border-color: rgba(239, 68, 68, 0.3) !important;
  color: #fff !important;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
}

.info-toggle-btn.active {
  background: linear-gradient(90deg, #ef4444 0%, #b91c1c 100%) !important;
  border-color: transparent !important;
  color: #fff !important;
  box-shadow: 0 4px 15px var(--accent-glow) !important;
}

.info-toggle-btn i {
  font-size: 14px !important;
  transition: transform 0.2s ease !important;
}

.info-toggle-btn:hover i {
  transform: scale(1.1) !important;
}

/* ── HIDE TELEGRAM VIP BUTTON ── */
a[href*="t.me"],
a[href*="telegram.me"],
[class*="telegram"],
[id*="telegram"] {
  display: none !important;
}

/* ── VISUAL ORDERING FOR EXIT PLAYER BUTTON ── */
.dash-exit {
  order: 9999 !important;
  margin-top: 12px !important;
}

/* ── HIDE TOP LEFT BRAND LOGO ── */
.brand,
.brand-logo,
.brand-name,
.dash-brand,
.dash-brand-icon,
.dash-brand-text,
.guida-brand,
.guida-brand-icon,
.guida-brand-text {
  display: none !important;
}

/* ── HIDE PLAYER LOGOS ── */
.logo,
[class*="logo"],
[id*="logo"],
.watermark,
[class*="watermark"],
[id*="watermark"],
img[src*="logo"],
img[src*="watermark"],
a[href*="chilistream"],
a[href*="t.me"] {
  display: none !important;
}
`);

  // DOM Manipulation to toggle Countdown Expiry with Info Button
  function initInfoToggle() {
    const sidebar = document.querySelector('.sidebar') || document.querySelector('.dash-sidebar');
    const countdown = document.querySelector('.countdown-box');
    if (!sidebar || !countdown) return;

    // Default to hidden class if classes are missing
    if (!countdown.classList.contains('show-countdown') && !countdown.classList.contains('hidden-countdown')) {
      countdown.classList.add('hidden-countdown');
    }

    // Check if toggle button already exists
    let btn = sidebar.querySelector('.info-toggle-btn');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'info-toggle-btn';
      btn.innerHTML = '<i class="fa fa-info-circle"></i> Info';
      btn.addEventListener('click', () => {
        const isHidden = countdown.classList.contains('hidden-countdown');
        if (isHidden) {
          countdown.classList.remove('hidden-countdown');
          countdown.classList.add('show-countdown');
          btn.classList.add('active');
        } else {
          countdown.classList.remove('show-countdown');
          countdown.classList.add('hidden-countdown');
          btn.classList.remove('active');
        }
      });
      sidebar.appendChild(btn);
    }
  }

  // Periodic check to safely initialize or recover button state
  setInterval(initInfoToggle, 1500);
  initInfoToggle();

  // Look for any logo or watermark elements inside the player iframe
  function removePlayerLogo() {
    // Only run if we are inside the player iframe/domain
    const isPlayerDomain = /chilistream|mediahosting/.test(window.location.hostname);
    if (!isPlayerDomain) return;

    const selectors = [
      '.logo', '[class*="logo"]', '[id*="logo"]',
      '.watermark', '[class*="watermark"]', '[id*="watermark"]',
      'img[src*="logo"]', 'img[src*="watermark"]',
      'a[href*="chilistream"]', 'a[href*="t.me"]'
    ];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.style.display = 'none';
      });
    });
  }
  // Periodically check and clean logo elements inside player iframes
  setInterval(removePlayerLogo, 500);
  removePlayerLogo();

  // Handle DOM adjustments for EPG program descriptions and stream expiry
  function cleanAndStyleEpg() {
    // 1. Clean program descriptions in Dashboard now-playing box
    document.querySelectorAll('.dash-info-now-box > div').forEach(div => {
      const style = div.getAttribute('style') || '';
      if (style.includes('font-size:0.85rem') || style.includes('font-size: 0.85rem')) {
        div.className = 'dash-info-desc';
        div.removeAttribute('style');
      }
    });

    // 2. Clean program descriptions in Dashboard next-playing box
    document.querySelectorAll('.dash-info-next-box > div').forEach(div => {
      const style = div.getAttribute('style') || '';
      if (style.includes('font-size:0.8rem') || style.includes('font-size: 0.8rem')) {
        div.className = 'dash-info-desc next';
        div.removeAttribute('style');
      }
    });

    // 3. Clean EPG timeline descriptions in EPG guide page (guida.php / guida.html)
    document.querySelectorAll('.timeline-details > div').forEach(div => {
      const style = div.getAttribute('style') || '';
      if (style.includes('font-size:0.85rem') || style.includes('font-size: 0.85rem')) {
        div.className = 'dash-info-desc';
        div.removeAttribute('style');
      }
    });

    // 4. Inject or update the Stream Expiry box in the top-right details card
    const infoCard = document.querySelector('.dash-info-card');
    if (infoCard) {
      let expiryEl = infoCard.querySelector('.dash-stream-expiry');
      if (!expiryEl) {
        expiryEl = document.createElement('div');
        expiryEl.className = 'dash-stream-expiry';
        expiryEl.innerHTML = `
          <div class="dash-stream-expiry-title">
            <i class="ph ph-clock"></i> Scadenza Flusso
          </div>
          <div class="dash-stream-expiry-desc">
            <i class="ph ph-calendar"></i> Valido fino al <span class="expiry-date-val">--/--/----</span>
          </div>
        `;
        // Insert right below next playing container
        const nextContainer = document.getElementById('player-ch-next-container');
        if (nextContainer) {
          nextContainer.after(expiryEl);
        } else {
          infoCard.appendChild(expiryEl);
        }
      }

      // Try to get the expiry date from the settings modal
      const settingsExtra = document.querySelector('.settings-profile-extra');
      let dateStr = '';
      if (settingsExtra) {
        const match = settingsExtra.textContent.match(/Scadenza abbonamento:\s*(.+)/i);
        if (match) {
          dateStr = match[1].trim();
        }
      }

      // Fallback: try to get it from countdown-box if present
      if (!dateStr) {
        const countdown = document.querySelector('.countdown-box');
        if (countdown) {
          const match = countdown.textContent.match(/(\d{2}\/\d{2}\/\d{4})/);
          if (match) {
            dateStr = match[1];
          }
        }
      }

      // Fallback default
      if (!dateStr) {
        dateStr = '31/12/2027';
      }

      const valEl = expiryEl.querySelector('.expiry-date-val');
      if (valEl && valEl.textContent !== dateStr) {
        valEl.textContent = dateStr;
      }
    }
  }

  // Run DOM cleaner periodically to keep up with dynamic AJAX/EPG updates
  setInterval(cleanAndStyleEpg, 400);
  cleanAndStyleEpg();
})();
