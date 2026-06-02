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

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&display=swap');

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
}

html,
body{
background: #020617 !important;
background-image: radial-gradient(circle at top right, rgba(15, 23, 42, 0.4) 0%, transparent 45%),
                  radial-gradient(circle at bottom left, rgba(2, 6, 23, 0.7) 0%, transparent 45%) !important;
font-family:'Outfit',sans-serif!important;
overflow:hidden;
}

.app{
padding:15px!important;
gap:15px!important;
background:transparent!important; /* Transparent to let body gradients show */
}

.sidebar{
width:260px!important;
background:linear-gradient(
180deg,
#090d18,
#050811
)!important;
border:1px solid rgba(255,255,255,.08)!important;
border-radius:22px!important;
padding:18px!important;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5) !important;
overflow-y: auto !important;
overflow-x: hidden !important;
}

.clock{
font-size:44px!important;
font-weight:800!important;
letter-spacing:-1px;
color:#fff!important;
margin-top:15px!important;
margin-bottom:15px!important;
text-align:center!important;
text-shadow: 0 0 10px rgba(255, 255, 255, 0.1) !important;
}

.countdown-box{
background: rgba(15, 23, 42, 0.65) !important;
border-radius:18px!important;
border: 1px solid rgba(255, 255, 255, 0.06) !important;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25) !important;
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
background: linear-gradient(90deg, #ef4444 0%, #b91c1c 100%) !important;
box-shadow: 0 4px 15px rgba(239,68,68,.3) !important;
color: #ffffff !important;
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
0 0 0 1px rgba(255,255,255,.08),
0 16px 48px rgba(0,0,0,.5)!important;
}

.details{
background: linear-gradient(180deg, rgba(11, 16, 32, 0.8) 0%, rgba(9, 13, 24, 0.8) 100%) !important;
backdrop-filter: blur(24px) saturate(1.2) !important;
border-radius:22px!important;
border:1px solid rgba(255,255,255,.08)!important;
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

/* Premium inner graphics for Details card */
.dash-info-now-box {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(185, 28, 28, 0.03) 100%) !important;
  border: 1px solid rgba(239, 68, 68, 0.2) !important;
  border-radius: 14px !important;
  padding: 1.2rem !important;
  margin-bottom: 0.8rem !important;
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.05) !important;
  position: relative !important;
  overflow: hidden !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
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
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
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
  background: rgba(239, 68, 68, 0.03) !important;
  border: 1px solid rgba(239, 68, 68, 0.1) !important;
  padding: 1rem !important;
  border-radius: 10px !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
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
background: linear-gradient(180deg, rgba(11, 16, 32, 0.85) 0%, rgba(9, 13, 24, 0.85) 100%) !important;
backdrop-filter: blur(24px) saturate(1.2) !important;
border-radius:22px!important;
border:1px solid rgba(255,255,255,.08)!important;
overflow:hidden!important;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
}

.list-header{
background:rgba(255,255,255,.02)!important;
border-bottom: 1px solid rgba(255,255,255,.05)!important;
font-size:15px!important;
font-weight:800!important;
text-transform: uppercase !important;
letter-spacing: 0.5px !important;
padding:18px!important;
color: #fff !important;
}

.row{
background: rgba(17, 24, 39, 0.75) !important;
border:none!important;
border-radius:16px!important;
margin-bottom:10px!important;
padding:14px 16px!important;
transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05) !important;
}

.row:hover{
transform:translateY(-2px) !important;
background: rgba(23, 32, 54, 0.9) !important;
box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15), 0 8px 25px rgba(0,0,0,.35)!important;
}

.row.active{
background: linear-gradient(90deg, rgba(239, 68, 68, 0.15) 0%, rgba(23, 32, 54, 0.4) 100%) !important;
box-shadow: inset 4px 0 0 #ef4444, inset 0 0 0 1px rgba(239, 68, 68, 0.25), 0 8px 25px rgba(239, 68, 68, 0.05) !important;
outline: none !important;
}

.ch-info span{
font-size:16px!important;
font-weight:700!important;
color: #fff !important;
}

.ch-info small{
color:#38bdf8!important;
font-weight:600!important;
}

.event-card{
background: rgba(17, 24, 39, 0.6) !important;
border:none!important;
border-left:4px solid #facc15!important;
border-radius:16px!important;
box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03) !important;
}

.epg-card{
background: rgba(17, 24, 39, 0.6) !important;
border:none!important;
border-radius:16px!important;
box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03) !important;
}

.grid-scroll::-webkit-scrollbar,
.events-scroll::-webkit-scrollbar,
.sidebar::-webkit-scrollbar{
width:6px!important;
height:6px!important;
}

.grid-scroll::-webkit-scrollbar-thumb,
.events-scroll::-webkit-scrollbar-thumb,
.sidebar::-webkit-scrollbar-thumb{
background: rgba(255, 255, 255, 0.15) !important;
border-radius:20px!important;
transition: background 0.2s !important;
}

.grid-scroll::-webkit-scrollbar-thumb:hover,
.events-scroll::-webkit-scrollbar-thumb:hover,
.sidebar::-webkit-scrollbar-thumb:hover{
background: rgba(255, 255, 255, 0.3) !important;
}

.grid-scroll::-webkit-scrollbar-track,
.events-scroll::-webkit-scrollbar-track,
.sidebar::-webkit-scrollbar-track{
background: transparent !important;
}

`);
})();
