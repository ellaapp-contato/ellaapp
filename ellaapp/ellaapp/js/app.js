// ══ SETORES ═══════════════════════════════════════════
const SECTORS = {
  trabalho: {l:'Trabalho',  i:'💼', c:'#7B9EC4', bg:'#F0F4FA',
    svg:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>'},
  casa:     {l:'Casa',      i:'🏡', c:'#C49B7B', bg:'#FAF4F0',
    svg:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'},
  familia:  {l:'Família',   i:'👨‍👩‍👧', c:'#7BAF8A', bg:'#F0FAF4',
    svg:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'},
  tempo:    {l:'Academia',  i:'🏋️', c:'#7BAF8A', bg:'#F0FAF4',
    svg:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16M18 4v16M6 12h12M3 8h3M18 8h3M3 16h3M18 16h3"/></svg>'},
  saude:    {l:'Saúde',     i:'💊', c:'#C47B7B', bg:'#FAF0F0',
    svg:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'},
  financas: {l:'Finanças',  i:'💰', c:'#7BAF8A', bg:'#F0FAF4',
    svg:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>'},
  estudos:  {l:'Estudos',   i:'📚', c:'#7B9EC4', bg:'#F0F4FA',
    svg:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'},
  social:   {l:'Social',    i:'🫂', c:'#C49B7B', bg:'#FAF4F0',
    svg:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>'},
};

const PRI_SVG = {
  high: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  med:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
  low:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-3.6 19.4-8.2 17.04zM2 21c0-3 1.85-5.36 5.08-6"/></svg>',
  done: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
};

const PRI = {
  high: {dot:'#E53935', bg:'#FFF0F0', label:'Urgente',      cls:'urgente', dark:'#B71C1C', svg:PRI_SVG.high},
  med:  {dot:'#C49A3C', bg:'#FFFBEA', label:'Importante',   cls:'atencao', dark:'#7A5C10', svg:PRI_SVG.med},
  low:  {dot:'#43A047', bg:'#F0FFF1', label:'Sem urgência', cls:'ok',      dark:'#1B5E20', svg:PRI_SVG.low},
};

// ══ STATE ═════════════════════════════════════════════
let profile = {name:'', city:'', sectors:['trabalho','casa','familia','tempo'], notifMin:15, togN:true};
let tasks = [];
let lists = [];      // Listas (substituiu mktItems)
let chatHist = [];
let selDay = today();
let checkDay = today();  // dia selecionado na view Hoje
let calRef = new Date();
let editId = null;
let focusSec = null;
let curPri = 'low';
let curRec = '';
let recog = null, micOn = false;
let notifTimers = [];

// ONBOARDING STATE
let obIdx = 0;
let obSels = ['trabalho','casa','familia','tempo'];

function today() { return new Date().toISOString().slice(0,10); }
function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T12:00'); d.setDate(d.getDate() + n);
  return d.toISOString().slice(0,10);
}
function load(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } }
function persist() {
  try {
    localStorage.setItem('ella_tasks',   JSON.stringify(tasks));
    localStorage.setItem('ella_profile', JSON.stringify(profile));
    localStorage.setItem('ella_lists',   JSON.stringify(lists));
  } catch(e) {}
}

// ── Carregar dados ──
profile = Object.assign({name:'', city:'', sectors:['trabalho','casa','familia','tempo'], notifMin:15, togN:true}, load('ella_profile', {}));
tasks = load('ella_tasks', []);
lists = load('ella_lists', []);

// Migrar mktItems antigos → lists
(function() {
  const old = load('ella_mkt', null);
  if (old && old.length && !localStorage.getItem('ella_mkt_migrated')) {
    const textItems = old.filter(function(m) { return !m.photo; });
    if (textItems.length) {
      lists.push({
        id: Date.now(),
        name: 'Lista de mercado',
        items: textItems.map(function(m) { return {id: m.id, text: m.title, done: m.done||false}; }),
        createdAt: Date.now()
      });
      persist();
    }
    localStorage.setItem('ella_mkt_migrated', '1');
  }
})();

// One-time cleanup: remove old seed demo tasks
if (!localStorage.getItem('ella_demos_cleared')) {
  tasks = tasks.filter(function(t) { return t.id > 4; });
  localStorage.setItem('ella_demos_cleared', '1');
  try { localStorage.setItem('ella_tasks', JSON.stringify(tasks)); } catch(e) {}
}

// ══ PLANO / TRIAL ═════════════════════════════════════
const TRIAL_DAYS = 15;
const FREE_MSG_LIMIT = 5;
const FREE_SECTORS_LIMIT = 3;
const DAY_MS = 86400000;

function ensureTrialStarted() {
  if (!profile.trialStart || typeof profile.trialStart !== 'number' || profile.trialStart > Date.now()) {
    // Só define se realmente não tiver um valor válido no passado
    if (!profile.trialStart || typeof profile.trialStart !== 'number') {
      profile.trialStart = Date.now();
      persist();
    }
  }
}

function getPlan() {
  if (profile.proUntil && profile.proUntil > Date.now()) return 'pro';
  if (profile.trialStart && typeof profile.trialStart === 'number' &&
      Date.now() < profile.trialStart + TRIAL_DAYS * DAY_MS) return 'trial';
  return 'free';
}

function trialDaysLeft() {
  if (!profile.trialStart || typeof profile.trialStart !== 'number') return TRIAL_DAYS;
  const ms = (profile.trialStart + TRIAL_DAYS * DAY_MS) - Date.now();
  return Math.max(0, Math.ceil(ms / DAY_MS));
}

function msgsTodayLeft() {
  const td = today();
  if (profile.msgDate !== td) return FREE_MSG_LIMIT;
  return Math.max(0, FREE_MSG_LIMIT - (profile.msgCount || 0));
}

function bumpMsgCount() {
  const td = today();
  if (profile.msgDate !== td) { profile.msgDate = td; profile.msgCount = 0; }
  profile.msgCount = (profile.msgCount || 0) + 1;
  persist();
}

// ══ ONBOARDING ════════════════════════════════════════
window.onload = function() {
  renderObDots();
  buildObSecs();

  if (profile.name && profile.name.length > 0) {
    ensureTrialStarted();
    document.getElementById('ob').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    initApp();
  }
};

function buildObSecs() {
  const el = document.getElementById('obSectors');
  if (!el) return;
  el.innerHTML = Object.entries(SECTORS).map(function(entry) {
    const k = entry[0], s = entry[1];
    const on = obSels.indexOf(k) > -1;
    return '<div class="ob-sec' + (on ? ' on' : '') + '" onclick="togObSec(\'' + k + '\')">' +
      '<div class="ob-sec-ico">' + (s.svg || s.i) + '</div>' +
      '<div class="ob-sec-name">' + s.l + '</div>' +
      '</div>';
  }).join('');
}

function togObSec(k) {
  const i = obSels.indexOf(k);
  if (i > -1) { if (obSels.length > 1) obSels.splice(i, 1); }
  else obSels.push(k);
  buildObSecs();
}

function renderObDots() {
  const el = document.getElementById('obDots');
  if (!el) return;
  let html = '';
  for (let i = 0; i < 4; i++) {
    html += '<div class="ob-dot' + (i === obIdx ? ' on' : '') + '"></div>';
  }
  el.innerHTML = html;
}

function obGo(d) {
  if (d > 0 && obIdx === 0) {
    const input = document.getElementById('obName');
    const n = input ? input.value.trim() : '';
    if (!n) { showToast('Digite seu nome para continuar!'); return; }
    profile.name = n;
  }
  if (d > 0 && obIdx === 1) {
    profile.sectors = obSels.slice();
  }

  obIdx = obIdx + d;
  if (obIdx < 0) obIdx = 0;
  if (obIdx > 3) obIdx = 3;

  document.querySelectorAll('#obTrack .ob-slide').forEach(function(slide, i) {
    slide.style.transform = 'translateX(' + ((i - obIdx) * 100) + '%)';
  });

  const skip = document.getElementById('obSkip');
  if (skip) skip.style.visibility = obIdx > 0 ? 'visible' : 'hidden';

  const nb = document.getElementById('obNext');
  if (nb) {
    if (obIdx === 3) {
      nb.innerHTML = 'Começar <span class="ob-next-arrow">→</span>';
      nb.onclick = startApp;
      const rh = document.getElementById('obReadyH');
      if (rh) rh.textContent = 'Olá, ' + profile.name + '!';
    } else {
      nb.innerHTML = 'Próximo <span class="ob-next-arrow">→</span>';
      nb.onclick = function() { obGo(1); };
    }
  }

  renderObDots();
  if (obIdx === 1) buildObSecs();
}

function startApp() {
  ensureTrialStarted();
  persist();
  const ob = document.getElementById('ob');
  const app = document.getElementById('app');
  if (ob) ob.style.display = 'none';
  if (app) app.style.display = 'flex';
  initApp();
}

function initApp() {
  updateAvatar();
  buildQPills();
  schedNotifs();
  renderTrialBadge();
  setTimeout(function() {
    const h = new Date().getHours();
    const g = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    const n = tasks.filter(function(t) { return t.date === today() && !t.done; }).length;
    const urg = tasks.filter(function(t) { return t.date === today() && !t.done && t.priority === 'high'; }).length;
    const firstTime = !localStorage.getItem('ella_welcomed');
    let msg = g + ', <strong>' + profile.name + '</strong>!<br><br>';
    if (firstTime && getPlan() === 'trial') {
      msg = '🎁 <strong>' + profile.name + '</strong>, você desbloqueou <strong>15 dias de Ella Pro</strong> — sem cartão!<br><br>' +
            'Aproveita tudo: voz, IA sem limite, todos os setores, notificações.<br><br>' +
            'Me conta, o que está na sua cabeça hoje?';
      localStorage.setItem('ella_welcomed', '1');
    } else {
      msg += 'Você tem <strong>' + n + ' tarefa' + (n !== 1 ? 's' : '') + '</strong> para hoje';
      if (urg > 0) msg += ' — <span style="color:#E53935;font-weight:600">' + urg + ' urgente' + (urg > 1 ? 's' : '') + '</span>';
      msg += '.<br><br>Me conta o que mais está na cabeça!';
      if (getPlan() === 'free') {
        const left = msgsTodayLeft();
        msg += '<br><br><span style="font-size:11px;color:#9A8E83">💬 ' + left + '/' + FREE_MSG_LIMIT + ' mensagens grátis hoje</span>';
      }
    }
    addMsg('ella', msg);
  }, 300);
  setTimeout(maybeShowTrialModals, 1500);
}

// ══ VIEWS ════════════════════════════════════════════
function goView(v) {
  document.querySelectorAll('.view').forEach(function(e) { e.classList.remove('on'); });
  document.querySelectorAll('.bnav-btn').forEach(function(e) { e.classList.remove('on'); });
  const view = document.getElementById('v-' + v);
  if (view) view.classList.add('on');
  // 4 tabs: chat=0, check=1, cal=2, plans=3
  const map = {chat:0, check:1, cal:2, plans:3};
  if (map[v] !== undefined) {
    const btns = document.querySelectorAll('.bnav-btn');
    if (btns[map[v]]) btns[map[v]].classList.add('on');
  }
  if (v === 'check') drawCheck();
  if (v === 'cal') drawCal();
  if (v === 'lists') drawLists();
  if (v === 'profile') loadProf();
  if (v === 'plans') drawPlans();
  renderTrialBadge();
  const sb = document.getElementById('searchBar');
  const sr = document.getElementById('searchResults');
  if (sb) sb.style.display = 'none';
  if (sr) sr.style.display = 'none';
}

// ══ SEARCH ═══════════════════════════════════════════
function toggleSearch() {
  const bar = document.getElementById('searchBar');
  if (!bar) return;
  const vis = bar.style.display === 'none' || bar.style.display === '';
  bar.style.display = vis ? '' : 'none';
  if (vis) { const si = document.getElementById('searchInput'); if (si) si.focus(); }
}

function doSearch(q) {
  const res = document.getElementById('searchResults');
  if (!res) return;
  if (!q) { res.style.display = 'none'; return; }
  res.style.display = 'block';
  const r = tasks.filter(function(t) { return t.title.toLowerCase().indexOf(q.toLowerCase()) > -1; });
  if (!r.length) { res.innerHTML = '<div style="font-size:13px;color:#888;padding:16px 0">Nenhum resultado</div>'; return; }
  res.innerHTML = r.map(function(t) {
    const p = PRI[t.priority] || PRI.low;
    const s = SECTORS[t.sector] || SECTORS.casa;
    return '<div style="padding:10px 0;border-bottom:1px solid #E8E8E8;cursor:pointer;display:flex;align-items:center;gap:10px" onclick="openEdit(' + t.id + ')">' +
      '<div style="width:8px;height:8px;border-radius:50%;background:' + p.dot + ';flex-shrink:0"></div>' +
      '<div><div style="font-size:13px;font-weight:500">' + t.title + '</div>' +
      '<div style="font-size:11px;color:#888;margin-top:2px">' + s.i + ' ' + s.l + (t.date ? ' · ' + t.date : '') + '</div></div>' +
      '</div>';
  }).join('');
}

// ══ CHAT ═════════════════════════════════════════════
function buildQPills() {
  const el = document.getElementById('qpills');
  if (!el) return;
  el.innerHTML = profile.sectors.filter(function(k) { return SECTORS[k]; }).map(function(k) {
    return '<button class="qpill" onclick="inject(\'Tenho tarefas de ' + SECTORS[k].l + ' para organizar\')"><span class="qpill-ico" style="color:' + SECTORS[k].c + '">' + (SECTORS[k].svg||'') + '</span>' + SECTORS[k].l + '</button>';
  }).join('');
}

function inject(t) {
  const ci = document.getElementById('ci');
  if (ci) ci.value = t;
  sendChat();
}

function addMsg(role, html, chips) {
  const w = document.getElementById('chatScroll');
  if (!w) return;
  const d = document.createElement('div');
  d.className = 'msg ' + role;
  let inner = '<div class="msg-who">' + (role === 'ella' ? 'ella' : 'você') + '</div><div class="bubble">' + html + '</div>';
  if (chips && chips.length) {
    inner += '<div class="chips">' + chips.map(function(c) {
      const p = PRI[c.priority] || PRI.low;
      const title = c.title.length > 22 ? c.title.slice(0, 22) + '…' : c.title;
      return '<button class="chip" onclick="flipT(' + c.id + ')"><span style="width:7px;height:7px;border-radius:50%;background:' + p.dot + ';display:inline-block;flex-shrink:0;margin-right:4px"></span>' + title + '</button>';
    }).join('') + '</div>';
  }
  d.innerHTML = inner;
  w.appendChild(d);
  w.scrollTop = w.scrollHeight;
}

function showTyping() {
  const w = document.getElementById('chatScroll');
  if (!w) return;
  const d = document.createElement('div');
  d.className = 'msg ella'; d.id = 'typing';
  d.innerHTML = '<div class="msg-who">ella</div><div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>';
  w.appendChild(d); w.scrollTop = w.scrollHeight;
}

function hideTyping() { const e = document.getElementById('typing'); if (e) e.remove(); }

function flipT(id) {
  const t = tasks.find(function(x) { return x.id === id; });
  if (t) { t.done = !t.done; persist(); showToast(t.done ? '✅ Feito!' : '↩ Desmarcado'); }
}

async function sendChat() {
  const inp = document.getElementById('ci');
  if (!inp) return;
  const txt = inp.value.trim();
  if (!txt) return;
  if (getPlan() === 'free' && msgsTodayLeft() <= 0) { showUpsell('msg'); return; }
  if (getPlan() === 'free') {
    bumpMsgCount();
    const left = msgsTodayLeft();
    if (left === 1) setTimeout(function(){ showToast('⚡ Última mensagem hoje no Grátis'); }, 800);
    else if (left === 0) setTimeout(function(){ showToast('Acabou seu limite de hoje 💕'); }, 800);
  }
  inp.value = ''; inp.style.height = 'auto';
  addMsg('user', txt.replace(/\n/g, '<br>'));
  chatHist.push({role:'user', content:txt});
  showTyping();

  // ── Datas de referência para a IA ──
  const td = today();
  const tomorrowDate = addDays(td, 1);
  const dayAfter = addDays(td, 2);
  const tl = new Date().toLocaleDateString('pt-BR', {weekday:'long', day:'numeric', month:'long'});
  const activeSecs = profile.sectors.map(function(k) {
    return (SECTORS[k] ? SECTORS[k].i + ' ' + SECTORS[k].l : k) + ' (key:"' + k + '")';
  }).join(', ');
  const snap = JSON.stringify(tasks.slice(-20));

  const sys = 'Você é Ella, assistente pessoal calorosa para mulheres multitarefas.\n' +
    'DATAS DE REFERÊNCIA:\n' +
    '- Hoje = ' + td + ' (' + tl + ')\n' +
    '- Amanhã = ' + tomorrowDate + '\n' +
    '- Depois de amanhã = ' + dayAfter + '\n' +
    'Setores ativos: ' + activeSecs + '\n' +
    'Tarefas recentes: ' + snap + '\n' +
    'REGRAS:\n' +
    '- Português brasileiro, tom acolhedor e prático\n' +
    '- CRÍTICO: datas SEMPRE no formato YYYY-MM-DD. Use as datas de referência acima exatamente.\n' +
    '- "amanhã" = ' + tomorrowDate + ' (NUNCA use ' + td + ' para tarefas de amanhã)\n' +
    '- Ao identificar tarefas inclua ao FIM da resposta:\n' +
    '  <tasks>[{"title":"...","sector":"key","date":"YYYY-MM-DD","time":"HH:MM ou vazio","priority":"high|med|low","notifMin":numero_ou_null,"recur":"daily|weekly|monthly|null"}]</tasks>\n' +
    '- priority: high=urgente, med=importante, low=sem urgência\n' +
    '- Se usuário mencionar uma lista (compras, tarefas, etc.), inclua também:\n' +
    '  <lists>[{"name":"Nome da lista","items":["item1","item2",...]}]</lists>\n' +
    '- Use apenas setores ativos. Sem <tasks> se não houver tarefas novas. Seja breve e gentil.';

  try {
    const r = await fetch('/api/chat', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({system: sys, messages: chatHist})
    });
    const data = await r.json();
    hideTyping();
    if (!r.ok || data.error) {
      addMsg('ella', 'Erro da IA: ' + (data.error || JSON.stringify(data)));
      return;
    }
    const full = (data.content || []).map(function(b) { return b.text || ''; }).join('');
    if (!full) { addMsg('ella', 'Ops! Resposta vazia. Tente novamente. 💕'); return; }
    chatHist.push({role:'assistant', content:full});

    // Extrair e salvar tarefas
    const taskMatch = full.match(/<tasks>([\s\S]*?)<\/tasks>/);
    let added = [];
    if (taskMatch) {
      try {
        JSON.parse(taskMatch[1]).forEach(function(t) {
          // Garantir que a data seja válida e no futuro se necessário
          let taskDate = t.date || td;
          if (!taskDate.match(/^\d{4}-\d{2}-\d{2}$/)) taskDate = td;
          const item = {
            id: Date.now() + Math.floor(Math.random()*9999),
            title: t.title,
            sector: t.sector || 'casa',
            date: taskDate,
            time: t.time || '',
            done: false,
            priority: t.priority || 'low',
            notifMin: t.notifMin || '',
            recur: t.recur || ''
          };
          tasks.push(item);
          added.push(item);
        });
        persist(); schedNotifs();
      } catch(e) {}
    }

    // Extrair e salvar listas
    const listMatch = full.match(/<lists>([\s\S]*?)<\/lists>/);
    if (listMatch) {
      try {
        JSON.parse(listMatch[1]).forEach(function(lst) {
          const newList = {
            id: Date.now() + Math.floor(Math.random()*9999),
            name: lst.name || 'Lista',
            items: (lst.items || []).map(function(it, idx) {
              return {id: Date.now() + idx + Math.floor(Math.random()*999), text: it, done: false};
            }),
            createdAt: Date.now()
          };
          lists.push(newList);
        });
        persist();
        showToast('Lista salva! Veja em Planos > Listas 📋');
      } catch(e) {}
    }

    const clean = full.replace(/<tasks>[\s\S]*?<\/tasks>/g, '').replace(/<lists>[\s\S]*?<\/lists>/g, '').trim();
    addMsg('ella', clean.replace(/\n/g, '<br>'), added);
    if (added.length) showToast(added.length + ' tarefa' + (added.length > 1 ? 's' : '') + ' salva' + (added.length > 1 ? 's' : '') + '! ✓');
  } catch(e) { hideTyping(); addMsg('ella', 'Erro de conexão: ' + e.message); }
}

function onEnt(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); } }
function growCi(el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 90) + 'px'; }

// ══ MIC ══════════════════════════════════════════════
function toggleMic() {
  if (getPlan() === 'free') { showUpsell('voice'); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { showToast('Use o Chrome para voz 🎙'); return; }
  if (micOn) { if (recog) recog.stop(); return; }
  recog = new SR(); recog.lang = 'pt-BR'; recog.continuous = false;
  recog.onstart = function() { micOn = true; const mb = document.getElementById('micBtn'); if (mb) mb.classList.add('rec'); };
  recog.onresult = function(e) { const ci = document.getElementById('ci'); if (ci) ci.value = e.results[0][0].transcript; sendChat(); };
  recog.onend = function() { micOn = false; const mb = document.getElementById('micBtn'); if (mb) mb.classList.remove('rec'); };
  recog.onerror = function() { micOn = false; const mb = document.getElementById('micBtn'); if (mb) mb.classList.remove('rec'); showToast('Não ouvi. Tente de novo!'); };
  recog.start();
}

// ══ NOTIFICAÇÕES ═════════════════════════════════════
function schedNotifs() {
  notifTimers.forEach(function(t) { clearTimeout(t); }); notifTimers = [];
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const now = Date.now();
  tasks.filter(function(t) { return !t.done && t.date && t.time && t.notifMin !== ''; }).forEach(function(t) {
    const dt = new Date(t.date + 'T' + t.time);
    const fireAt = dt.getTime() - (parseInt(t.notifMin || profile.notifMin || 15) * 60000);
    const diff = fireAt - now;
    if (diff > 0 && diff < 24*3600000) {
      notifTimers.push(setTimeout(function() {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('ella', {body: t.title + ' em ' + (t.notifMin||15) + ' min', icon: '/icons/icon-192.png'});
        }
        // Também mostrar banner in-app
        showInAppNotif(t);
      }, diff));
    }
  });
}

function showInAppNotif(task) {
  const banner = document.createElement('div');
  banner.style.cssText = 'position:fixed;top:calc(60px + env(safe-area-inset-top));left:12px;right:12px;z-index:800;' +
    'background:var(--pri);color:#fff;border-radius:14px;padding:14px 16px;box-shadow:0 4px 20px rgba(196,115,106,.4);' +
    'display:flex;align-items:center;gap:12px;animation:fadeUp .3s ease;cursor:pointer';
  banner.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;flex-shrink:0"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>' +
    '<div style="flex:1"><div style="font-size:12px;font-weight:700">' + task.title + '</div>' +
    '<div style="font-size:11px;opacity:.85">Em ' + (task.notifMin||15) + ' min · ' + (task.time||'') + '</div></div>' +
    '<button onclick="this.parentElement.remove()" style="background:none;border:none;color:#fff;font-size:20px;cursor:pointer;padding:0 2px">×</button>';
  banner.onclick = function(e) { if (e.target.tagName !== 'BUTTON') { goView('check'); banner.remove(); } };
  document.body.appendChild(banner);
  setTimeout(function() { if (banner.parentElement) banner.remove(); }, 8000);
}

// ══ CHECKLIST / HOJE ═════════════════════════════════

function setCheckDay(ds) {
  checkDay = ds;
  drawCheck();
}

function drawCheck() {
  const td = today();
  const now = new Date();
  const dow = now.getDay();
  const DAYS = ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'];

  const chkProg = document.getElementById('chkProg');
  const progFill = document.getElementById('progFill');
  const focusRow = document.getElementById('focusRow');
  const chkBody  = document.getElementById('chkBody');

  // ── cabeçalho com data selecionada ──
  const selDate = new Date(checkDay + 'T12:00');
  const dateLabel = selDate.toLocaleDateString('pt-BR', {weekday:'long', day:'numeric', month:'long'});
  const dateLabelUp = dateLabel.charAt(0).toUpperCase() + dateLabel.slice(1);

  // ── semana clicável ──
  let weekHtml = '<div class="week-card">' +
    '<div class="week-label">' + dateLabelUp + '</div>' +
    '<div class="week-row">';
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - dow + i);
    const ds = d.toISOString().slice(0,10);
    const isActive = ds === checkDay;
    const dayTasks = tasks.filter(function(t) { return t.date === ds && !t.done; });
    const dotHtml = dayTasks.length
      ? '<div class="week-dot-row">' + dayTasks.slice(0,3).map(function() { return '<div class="week-dot-item"></div>'; }).join('') + '</div>'
      : '<div class="week-dot-row"></div>';
    weekHtml += '<div class="week-cell' + (isActive ? ' active' : '') + '" onclick="setCheckDay(\'' + ds + '\')">' +
      '<div class="week-abbr">' + DAYS[d.getDay()] + '</div>' +
      '<div class="week-num">' + d.getDate() + '</div>' +
      dotHtml +
      '</div>';
  }
  weekHtml += '</div></div>';

  // ── notificação in-app do próximo evento do dia selecionado ──
  let notifHtml = '';
  if (checkDay === td) {
    const nowMs = Date.now();
    const upcoming = tasks.filter(function(t) {
      if (t.done || t.date !== td || !t.time) return false;
      const taskMs = new Date(td + 'T' + t.time).getTime();
      return taskMs > nowMs && taskMs - nowMs < 2 * 3600000; // próximas 2h
    }).sort(function(a, b) { return a.time.localeCompare(b.time); });
    if (upcoming.length) {
      const next = upcoming[0];
      const taskMs = new Date(td + 'T' + next.time).getTime();
      const diffMin = Math.round((taskMs - nowMs) / 60000);
      notifHtml = '<div class="notif-banner">' +
        '<div class="notif-banner-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>' +
        '<div class="notif-banner-body">' +
        '<div class="notif-banner-title">' + next.title + '</div>' +
        '<div class="notif-banner-sub">Em ' + diffMin + ' min · ' + next.time + '</div>' +
        '</div></div>';
    }
  }

  // ── filtrar tarefas do dia selecionado ──
  const all = tasks.filter(function(t) {
    if (t.date === checkDay) return true;
    if (t.recur === 'daily') return true;
    const selD = new Date(checkDay + 'T12:00');
    if (t.recur === 'weekly') return new Date(t.date + 'T12:00').getDay() === selD.getDay();
    if (t.recur === 'monthly') return parseInt(t.date.slice(8)) === selD.getDate();
    return false;
  });

  const doneCount = all.filter(function(t) { return t.done; }).length;
  const pct = all.length ? Math.round(doneCount / all.length * 100) : 0;
  if (chkProg) chkProg.textContent = doneCount + '/' + all.length;
  if (progFill) progFill.style.width = pct + '%';

  // ── tabs de setor ──
  if (focusRow) {
    let fhtml = '<button class="ftab' + (focusSec===null?' on':'') + '" onclick="setFocus(null)">Tudo</button>';
    profile.sectors.filter(function(k){return SECTORS[k];}).forEach(function(k){
      fhtml += '<button class="ftab' + (focusSec===k?' on':'') + '" onclick="setFocus(\''+k+'\')"><span class="ftab-ico" style="color:'+SECTORS[k].c+'">'+(SECTORS[k].svg||'')+'</span>'+SECTORS[k].l+'</button>';
    });
    focusRow.innerHTML = fhtml;
  }

  // ── ordenar tarefas ──
  const pri = {high:0, med:1, low:2};
  let list = (focusSec ? all.filter(function(t){return t.sector===focusSec;}) : all.slice())
    .sort(function(a,b){
      if (a.done !== b.done) return a.done ? 1 : -1;
      const pd = (pri[a.priority]||1)-(pri[b.priority]||1);
      return pd !== 0 ? pd : (a.time||'99:99').localeCompare(b.time||'99:99');
    });

  function pillHtml(t) {
    const s   = SECTORS[t.sector] || SECTORS.casa;
    const cls = t.done ? 'feita' : (t.priority==='high' ? 'urgente' : t.priority==='med' ? 'atencao' : 'ok');
    return '<div class="task-pill ' + cls + '">' +
      '<div class="pill-time">' + (t.time||'') + '</div>' +
      '<div class="pill-title' + (t.done?' done':'') + '">' + t.title +
        (t.recur ? ' <span style="font-size:10px;opacity:.45">↻</span>' : '') +
      '</div>' +
      '<div class="pill-right">' +
        '<span class="pill-ico">' + (s.svg || s.i) + '</span>' +
        '<button class="pill-check' + (t.done?' on':'') + '" onclick="tickT('+t.id+')">' +
          '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>' +
        '</button>' +
        '<button class="pill-edit" onclick="openEdit('+t.id+')">✎</button>' +
      '</div></div>';
  }

  let pillsHtml = '';
  const pending = list.filter(function(t){return !t.done;});
  const done    = list.filter(function(t){return t.done;});

  if (!list.length) {
    pillsHtml = '<div class="sec-empty">Nenhuma tarefa para este dia. ✨</div>';
  } else {
    if (pending.length) {
      pillsHtml += '<div class="tasks-section-title">Minhas tarefas</div>';
      pending.forEach(function(t){ pillsHtml += pillHtml(t); });
    }
    if (done.length) {
      pillsHtml += '<div class="tasks-section-title" style="margin-top:18px">Concluídas</div>';
      done.forEach(function(t){ pillsHtml += pillHtml(t); });
    }
  }

  if (chkBody) chkBody.innerHTML = weekHtml + notifHtml + pillsHtml;
}

function setFocus(k) { focusSec = k; drawCheck(); }

function tickT(id) {
  const t = tasks.find(function(x) { return x.id === id; });
  if (!t) return;
  t.done = !t.done; persist(); drawCheck();
  if (document.getElementById('v-cal') && document.getElementById('v-cal').classList.contains('on')) drawDayPanel();
  showToast(t.done ? '✅ Concluída!' : '↩ Desmarcada');
}

// ══ CALENDÁRIO ═══════════════════════════════════════
function mvMonth(d) { calRef = new Date(calRef.getFullYear(), calRef.getMonth()+d, 1); drawCal(); }

function drawCal() {
  const y = calRef.getFullYear(), m = calRef.getMonth();
  const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const calTitle = document.getElementById('calTitle');
  if (calTitle) calTitle.textContent = months[m].toUpperCase() + ' ' + y;
  const first = new Date(y,m,1).getDay(), last = new Date(y,m+1,0).getDate(), td = today();
  let h = ['D','S','T','Q','Q','S','S'].map(function(d) { return '<div class="cal-dn">' + d + '</div>'; }).join('');
  for (let i = 0; i < first; i++) { const pd = new Date(y,m,-(first-i-1)); h += '<div class="cal-d om"><div class="dnum">' + pd.getDate() + '</div></div>'; }
  for (let d = 1; d <= last; d++) {
    const ds = y + '-' + String(m+1).padStart(2,'0') + '-' + String(d).padStart(2,'0');
    const dt = tasks.filter(function(t) { return t.date === ds; });
    const dots = dt.slice(0,4).map(function(t) { const col = t.done ? '#BDBDBD' : (PRI[t.priority]||PRI.low).dot; return '<div class="cdot" style="background:' + col + '"></div>'; }).join('');
    h += '<div class="cal-d' + (ds===td?' today':'') + (ds===selDay?' sel':'') + '" onclick="pickDay(\'' + ds + '\')"><div class="dnum">' + d + '</div><div class="cdots">' + dots + '</div></div>';
  }
  const calGrid = document.getElementById('calGrid');
  if (calGrid) calGrid.innerHTML = h;
  drawDayPanel();
}

function pickDay(ds) { selDay = ds; drawCal(); }

function drawDayPanel() {
  const el = document.getElementById('dayPanel');
  if (!el) return;
  const dt = tasks.filter(function(t) { return t.date === selDay; }).sort(function(a,b) {
    const pm = {high:0, med:1, low:2};
    if (a.done !== b.done) return a.done ? 1 : -1;
    return (pm[a.priority]||1) - (pm[b.priority]||1);
  });
  const label = new Date(selDay+'T12:00').toLocaleDateString('pt-BR', {weekday:'long', day:'numeric', month:'long'});
  let h = '<div class="day-panel"><div class="day-panel-hdr"><div class="day-panel-title">' + label + '</div><button class="add-btn-sm" onclick="openNew(\'' + selDay + '\')">+ Adicionar</button></div>';
  if (!dt.length) h += '<div class="no-ev">Dia livre ✨</div>';
  else dt.forEach(function(t) {
    const s = SECTORS[t.sector] || SECTORS.casa;
    const p = t.done ? {dot:'#BDBDBD', label:'Concluída'} : PRI[t.priority] || PRI.low;
    const clockSvg = '<svg style="width:11px;height:11px;vertical-align:middle;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
    h += '<div class="ev"><div class="ev-sem" style="background:' + p.dot + '"></div><div class="ev-body"><div class="ev-t' + (t.done?' done':'') + '">' + t.title + '</div><div class="ev-meta"><span style="font-size:9px;font-weight:700;color:' + p.dot + '">' + p.label + '</span>' + (t.time ? '<span style="display:flex;align-items:center;gap:3px">' + clockSvg + t.time + '</span>' : '') + '<span class="ev-tag" style="background:' + s.bg + ';color:' + s.c + ';display:inline-flex;align-items:center;gap:3px"><span style="display:flex;width:12px;height:12px;flex-shrink:0">' + (s.svg||s.i) + '</span>' + s.l + '</span></div></div><div class="ev-acts"><button class="ev-act" onclick="tickCal(' + t.id + ')">' + (t.done?'↩':'✓') + '</button><button class="ev-act" onclick="openEdit(' + t.id + ')">✎</button></div></div>';
  });
  el.innerHTML = h + '</div>';
}

function tickCal(id) {
  const t = tasks.find(function(x) { return x.id===id; });
  if(t){t.done=!t.done;persist();drawDayPanel();showToast(t.done?'✅ Concluída!':'↩ Desmarcada');}
}

// ══ LISTAS ═══════════════════════════════════════════
function drawLists() {
  const body = document.getElementById('lstBody');
  if (!body) return;
  if (!lists.length) {
    body.innerHTML = '<div class="lst-empty"><div class="lst-empty-ico">📋</div>' +
      '<div>Nenhuma lista ainda.<br>Fale para a Ella criar uma ou toque em +</div></div>';
    return;
  }
  body.innerHTML = lists.map(function(lst) {
    const total = (lst.items||[]).length;
    const done  = (lst.items||[]).filter(function(i){return i.done;}).length;
    return '<div class="lst-card">' +
      '<div class="lst-card-head">' +
        '<div class="lst-card-name">' + lst.name + '</div>' +
        '<div class="lst-card-meta">' + done + '/' + total + '</div>' +
      '</div>' +
      (lst.items||[]).map(function(item) {
        return '<div class="lst-item">' +
          '<div class="lst-chkbox' + (item.done?' on':'') + '" onclick="togListItem(' + lst.id + ',' + item.id + ')">' +
            '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>' +
          '</div>' +
          '<div class="lst-item-txt' + (item.done?' done':'') + '">' + item.text + '</div>' +
          '<button class="lst-del" onclick="delListItem(' + lst.id + ',' + item.id + ')">×</button>' +
        '</div>';
      }).join('') +
      '<div style="display:flex;gap:8px;margin-top:12px;padding-top:10px;border-top:1px solid var(--border-s)">' +
        '<button style="flex:1;padding:8px;border:1.5px dashed var(--border);border-radius:8px;background:none;font-family:\'DM Sans\',sans-serif;font-size:12px;color:var(--text-m);cursor:pointer" onclick="addItemToList(' + lst.id + ')">+ Item</button>' +
        '<button style="padding:8px 14px;border:1.5px solid var(--border);border-radius:8px;background:none;font-family:\'DM Sans\',sans-serif;font-size:12px;color:var(--red);cursor:pointer" onclick="deleteList(' + lst.id + ')">Apagar</button>' +
      '</div>' +
    '</div>';
  }).join('');
}

function togListItem(listId, itemId) {
  const lst = lists.find(function(l){return l.id===listId;});
  if (!lst) return;
  const item = (lst.items||[]).find(function(i){return i.id===itemId;});
  if (item) { item.done = !item.done; persist(); drawLists(); }
}

function delListItem(listId, itemId) {
  const lst = lists.find(function(l){return l.id===listId;});
  if (!lst) return;
  lst.items = (lst.items||[]).filter(function(i){return i.id!==itemId;});
  persist(); drawLists();
}

function deleteList(listId) {
  lists = lists.filter(function(l){return l.id!==listId;});
  persist(); drawLists(); showToast('Lista removida');
}

function addItemToList(listId) {
  const text = prompt('Nome do item:');
  if (!text || !text.trim()) return;
  const lst = lists.find(function(l){return l.id===listId;});
  if (!lst) return;
  if (!lst.items) lst.items = [];
  lst.items.push({id: Date.now(), text: text.trim(), done: false});
  persist(); drawLists();
}

function openListAdd() {
  const ln = document.getElementById('lstName'); if(ln) ln.value='';
  const li = document.getElementById('lstItems'); if(li) li.value='';
  const lm = document.getElementById('listModal'); if(lm) lm.classList.add('open');
}

function saveList() {
  const ln = document.getElementById('lstName');
  const li = document.getElementById('lstItems');
  const name = ln ? ln.value.trim() : '';
  if (!name) { showToast('Digite o nome da lista!'); return; }
  const rawItems = li ? li.value.split('\n').map(function(s){return s.trim();}).filter(Boolean) : [];
  const newList = {
    id: Date.now(),
    name: name,
    items: rawItems.map(function(t, idx) { return {id: Date.now()+idx, text:t, done:false}; }),
    createdAt: Date.now()
  };
  lists.push(newList);
  persist();
  closeMod('listModal');
  drawLists();
  showToast('Lista criada ✓');
}

// ══ MODAL TASK ════════════════════════════════════════
let curSector = 'trabalho';

function buildSectorSelect() {
  const opts = document.getElementById('mSectorOpts');
  if (!opts) return;
  opts.innerHTML = Object.entries(SECTORS).map(function(entry) {
    const k = entry[0], s = entry[1];
    return '<div class="sec-drop-opt" data-key="' + k + '" onclick="setMSector(\'' + k + '\')">' +
      '<span class="sec-drop-opt-ico" style="color:' + s.c + '">' + s.svg + '</span>' + s.l + '</div>';
  }).join('');
}
buildSectorSelect();

function setMSector(key) {
  curSector = key;
  const s = SECTORS[key];
  if (!s) return;
  const ico = document.getElementById('mSectorIco');
  const lbl = document.getElementById('mSectorLbl');
  const hid = document.getElementById('mSector');
  if (ico) { ico.innerHTML = s.svg; ico.style.color = s.c; }
  if (lbl) lbl.textContent = s.l;
  if (hid) hid.value = key;
  document.querySelectorAll('.sec-drop-opt').forEach(function(el) {
    el.classList.toggle('sel', el.dataset.key === key);
  });
  closeSecDrop();
}

function toggleSecDrop() {
  const d = document.getElementById('mSectorDrop');
  if (d) d.classList.toggle('open');
}

function closeSecDrop() {
  const d = document.getElementById('mSectorDrop');
  if (d) d.classList.remove('open');
}

document.addEventListener('click', function(e) {
  const d = document.getElementById('mSectorDrop');
  if (d && !d.contains(e.target)) closeSecDrop();
});

function setPri(p) {
  curPri = p;
  const pr = document.getElementById('priRed');
  const py = document.getElementById('priYellow');
  const pg = document.getElementById('priGreen');
  if(pr) pr.className = 'pri-opt' + (p==='high'?' sel-red':'');
  if(py) py.className = 'pri-opt' + (p==='med'?' sel-yellow':'');
  if(pg) pg.className = 'pri-opt' + (p==='low'?' sel-green':'');
}

function setRec(btn) {
  curRec = btn.dataset.r;
  document.querySelectorAll('.rec-btn').forEach(function(b) { b.classList.toggle('sel', b.dataset.r === curRec); });
}

function openNew(dateStr) {
  editId = null;
  const mh = document.getElementById('mH'); if(mh) mh.textContent = 'Nova tarefa';
  const mt = document.getElementById('mTitle'); if(mt) mt.value = '';
  setMSector(profile.sectors[0] || 'casa');
  const md = document.getElementById('mDate'); if(md) md.value = dateStr || checkDay || today();
  const mti = document.getElementById('mTime'); if(mti) mti.value = '';
  const mn = document.getElementById('mNotif'); if(mn) mn.value = '';
  const mdel = document.getElementById('mDel'); if(mdel) mdel.style.display = 'none';
  document.querySelectorAll('.rec-btn').forEach(function(b) { b.classList.toggle('sel', b.dataset.r === ''); });
  curRec = '';
  setPri('low');
  const tm = document.getElementById('taskModal'); if(tm) tm.classList.add('open');
}

function openEdit(id) {
  editId = id;
  const t = tasks.find(function(x){return x.id===id;});
  if(!t) return;
  const mh = document.getElementById('mH'); if(mh) mh.textContent = 'Editar tarefa';
  const mt = document.getElementById('mTitle'); if(mt) mt.value = t.title;
  setMSector(t.sector || 'casa');
  const md = document.getElementById('mDate'); if(md) md.value = t.date;
  const mti = document.getElementById('mTime'); if(mti) mti.value = t.time||'';
  const mn = document.getElementById('mNotif'); if(mn) mn.value = t.notifMin||'';
  const mdel = document.getElementById('mDel'); if(mdel) mdel.style.display = '';
  curRec = t.recur||'';
  document.querySelectorAll('.rec-btn').forEach(function(b) { b.classList.toggle('sel', b.dataset.r === curRec); });
  setPri(t.priority||'low');
  const tm = document.getElementById('taskModal'); if(tm) tm.classList.add('open');
}

function saveTask() {
  const mt = document.getElementById('mTitle');
  const title = mt ? mt.value.trim() : '';
  if (!title) { showToast('Digite o título!'); return; }
  const ms = document.getElementById('mSector');
  const md = document.getElementById('mDate');
  const mti = document.getElementById('mTime');
  const mn = document.getElementById('mNotif');
  // Preserva a data digitada pelo usuário, fallback para checkDay ou today
  const chosenDate = (md && md.value) ? md.value : (checkDay || today());
  const item = {
    id: editId || Date.now(),
    title: title,
    sector: ms ? ms.value : 'casa',
    date: chosenDate,
    time: mti ? mti.value : '',
    done: false,
    priority: curPri,
    notifMin: mn ? mn.value : '',
    recur: curRec
  };
  if (editId) {
    const i = tasks.findIndex(function(x){return x.id===editId;});
    if(i>-1){item.done=tasks[i].done;tasks[i]=item;}
  } else {
    tasks.push(item);
  }
  persist(); schedNotifs(); closeMod('taskModal');
  const v = document.querySelector('.view.on');
  if (v && v.id==='v-check') drawCheck();
  if (v && v.id==='v-cal') drawCal();
  showToast(editId ? 'Atualizada ✓' : 'Adicionada ✓');
}

function deleteTask() {
  tasks = tasks.filter(function(x){return x.id!==editId;}); persist(); closeMod('taskModal');
  const v = document.querySelector('.view.on');
  if (v && v.id==='v-check') drawCheck();
  if (v && v.id==='v-cal') drawCal();
  showToast('Tarefa removida');
}

function closeMod(id, e) {
  if (!e || e.target.id === id) {
    const el = document.getElementById(id);
    if(el) el.classList.remove('open');
  }
}

// ══ PERFIL ═══════════════════════════════════════════
function updateAvatar() {
  const svg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
  const ta = document.getElementById('topAvatar'); if(ta) ta.innerHTML = svg;
  const pa = document.getElementById('profAv');
  if (pa) {
    if (profile.name) {
      pa.textContent = profile.name.charAt(0).toUpperCase();
      pa.style.fontFamily = "'DM Serif Display', serif";
      pa.style.fontStyle = 'normal';
    } else {
      pa.innerHTML = svg;
    }
  }
}

function loadProf() {
  const pn = document.getElementById('pName'); if(pn) pn.value = profile.name||'';
  const pc = document.getElementById('pCity'); if(pc) pc.value = profile.city||'';
  const pnb = document.getElementById('profNameBig'); if(pnb) pnb.textContent = profile.name||'Meu perfil';
  const tn = document.getElementById('togN'); if(tn) { if(profile.togN===false) tn.classList.remove('on'); else tn.classList.add('on'); }
  const pno = document.getElementById('pNotif'); if(pno) pno.value = profile.notifMin||15;
  const sg = document.getElementById('secGrid');
  if (sg) {
    sg.innerHTML = Object.entries(SECTORS).map(function(entry) {
      const k = entry[0], s = entry[1];
      const on = profile.sectors.indexOf(k) > -1;
      return '<div class="sec-pill' + (on?' on':'') + '" onclick="togSecP(\'' + k + '\')" style="display:flex;align-items:center;gap:8px">' +
        '<span style="width:18px;height:18px;display:flex;align-items:center;justify-content:center;color:' + s.c + '">' + s.svg + '</span>' +
        s.l + '</div>';
    }).join('');
  }
}

function togSecP(k) {
  const i = profile.sectors.indexOf(k);
  if (i > -1) { if (profile.sectors.length > 1) profile.sectors.splice(i,1); }
  else {
    if (getPlan() === 'free' && profile.sectors.length >= FREE_SECTORS_LIMIT) {
      showUpsell('sector'); return;
    }
    profile.sectors.push(k);
  }
  loadProf();
}

function saveProfile() {
  const pn = document.getElementById('pName'); if(pn) profile.name = pn.value.trim();
  const pc = document.getElementById('pCity'); if(pc) profile.city = pc.value.trim();
  const tn = document.getElementById('togN'); if(tn) profile.togN = tn.classList.contains('on');
  const pno = document.getElementById('pNotif'); if(pno) profile.notifMin = parseInt(pno.value)||15;
  persist(); updateAvatar(); buildQPills();
  showToast('Perfil salvo ✓');
}

// ══ UPSELL MODAL ═════════════════════════════════════
const UPSELLS = {
  voice:  { icon:'🎙', title:'A voz é Pro', sub:'Você ainda pode digitar — mas com Pro a Ella te ouve. Mais rápido nas correrias do dia.' },
  msg:    { icon:'💬', title:'Limite diário atingido', sub:'Você usou suas 5 mensagens grátis de hoje. Com Pro, conversa sem limite.' },
  sector: { icon:'🗂', title:'Mais setores é Pro', sub:'No Grátis são 3 setores. Com Pro você organiza trabalho, casa, família, saúde, finanças, estudos, social e meu tempo.' }
};

function showUpsell(type) {
  const data = UPSELLS[type] || UPSELLS.voice;
  const ic = document.getElementById('upsellIcon');
  const t  = document.getElementById('upsellTitle');
  const s  = document.getElementById('upsellSub');
  if (ic) ic.textContent = data.icon;
  if (t)  t.textContent  = data.title;
  if (s)  s.textContent  = data.sub;
  const el = document.getElementById('upsellModal');
  if (el) el.classList.add('open');
}

function showTrialModal(kind) {
  const ic = document.getElementById('trialIcon');
  const t  = document.getElementById('trialTitle');
  const s  = document.getElementById('trialSub');
  if (kind === 'ending') {
    const d = trialDaysLeft();
    if (ic) ic.textContent = d === 1 ? '🔥' : '⏰';
    if (t)  t.textContent  = d === 1 ? 'Último dia do Pro' : 'Faltam ' + d + ' dias';
    if (s)  s.textContent  = 'Seu Ella Pro acaba ' + (d === 1 ? 'hoje' : 'em breve') + '. Sem ativar, você volta pro plano Grátis.';
  } else {
    if (ic) ic.textContent = '🌸';
    if (t)  t.textContent  = 'Seus 15 dias acabaram';
    if (s)  s.textContent  = 'Agora você está no plano Grátis. Tudo continua funcionando, com limites.';
  }
  const el = document.getElementById('trialModal');
  if (el) el.classList.add('open');
}

function maybeShowTrialModals() {
  const plan = getPlan();
  if (plan === 'trial') {
    const d = trialDaysLeft();
    if (d <= 3 && !localStorage.getItem('ella_trial_warned')) {
      localStorage.setItem('ella_trial_warned', '1');
      setTimeout(function() { showTrialModal('ending'); }, 1200);
    }
  } else if (plan === 'free' && profile.trialStart && !localStorage.getItem('ella_trial_ended_shown')) {
    localStorage.setItem('ella_trial_ended_shown', '1');
    setTimeout(function() { showTrialModal('ended'); }, 1200);
  }
}

// ══ TRIAL BADGE (topbar) ═════════════════════════════
function renderTrialBadge() {
  const el = document.getElementById('trialBadge');
  if (!el) return;
  const plan = getPlan();
  if (plan === 'trial') {
    const d = trialDaysLeft();
    const urgent = d <= 3;
    el.style.display = 'flex';
    el.className = 'trial-badge' + (urgent ? ' urgent' : '');
    el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
      '<span>' + d + ' ' + (d === 1 ? 'dia' : 'dias') + ' Pro</span>';
    el.onclick = function() { goView('plans'); };
  } else {
    el.style.display = 'none';
  }
}

// ══ PLANS VIEW ═══════════════════════════════════════
function drawPlans() {
  const plan = getPlan();
  const banner  = document.getElementById('trialBanner');
  const sub     = document.getElementById('plansSub');
  const freeTag = document.getElementById('freeTag');
  const proTag  = document.getElementById('proTag');
  if (!banner) return;

  if (plan === 'trial') {
    const d = trialDaysLeft();
    banner.innerHTML = '<div style="background:var(--pri);color:#fff;border-radius:16px;padding:18px 20px;margin-bottom:22px;text-align:center;box-shadow:0 4px 18px rgba(196,115,106,.35)">' +
      '<div style="font-size:11px;font-weight:700;opacity:.85;letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px">✨ Você está no Pro</div>' +
      '<div style="font-family:\'DM Serif Display\',serif;font-size:36px;line-height:1.1;margin-bottom:4px">' + d + ' dia' + (d !== 1 ? 's' : '') + '</div>' +
      '<div style="font-size:13px;opacity:.9">grátis · sem cartão</div></div>';
    if (sub) sub.innerHTML = 'Aproveite tudo até o fim do teste.<br>Depois você escolhe.';
    if (freeTag) freeTag.innerHTML = '';
    if (proTag)  proTag.innerHTML  = 'ATIVO AGORA';
  } else if (plan === 'pro') {
    banner.innerHTML = '<div style="background:#F0FAF4;color:#2E7D4F;border:1px solid #B8E0C4;border-radius:14px;padding:14px 18px;margin-bottom:22px;text-align:center;font-size:13px;font-weight:600">💚 Você é Pro · obrigada!</div>';
    if (sub) sub.innerHTML = '';
    if (freeTag) freeTag.innerHTML = '';
    if (proTag)  proTag.innerHTML  = 'SEU PLANO';
  } else {
    banner.innerHTML = '';
    if (sub) sub.innerHTML = 'O grátis funciona — mas com a Pro você libera tudo.';
    if (freeTag) freeTag.innerHTML = '<div class="plan-tag" style="background:#EDE0D4;color:#2C2C2C">SEU PLANO</div>';
    if (proTag)  proTag.innerHTML  = 'RECOMENDADO';
  }
}

// ══ TOAST ════════════════════════════════════════════
function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(function() { el.classList.remove('show'); }, 2500);
}

function toast(msg) { showToast(msg); }
