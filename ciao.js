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
}

html,
body{
background:var(--bg)!important;
font-family:'Outfit',sans-serif!important;
overflow:hidden;
}

.app{
padding:15px!important;
gap:15px!important;
background:var(--bg)!important;
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

.details{
background:linear-gradient(
180deg,
#0b1020,
#090d18
)!important;

border-radius:22px!important;
border:1px solid rgba(255,255,255,.05)!important;
padding:22px!important;
}

#cur-name{
font-size:38px!important;
font-weight:800!important;
margin-bottom:15px!important;
}

#cur-info{
color:#94a3b8!important;
font-size:15px!important;
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
width:6px;
}

.grid-scroll::-webkit-scrollbar-thumb,
.events-scroll::-webkit-scrollbar-thumb,
.sidebar::-webkit-scrollbar-thumb{
background:#334155;
border-radius:20px;
}

`);
})();
