// ══ CONFIGURAÇÃO ══════════════════════════════════════
// IMPORTANTE: Substitua pela sua chave da API Anthropic
const API_KEY = process.env.ELLA_API_KEY;


const SECTORS = {
  trabalho: {l:'Trabalho',   i:'💼', c:'#7B9EC4', bg:'#F0F4FA'},
  casa:     {l:'Casa',       i:'🏡', c:'#C49B7B', bg:'#FAF4F0'},
  familia:  {l:'Família',    i:'👨‍👩‍👧', c:'#7BAF8A', bg:'#F0FAF4'},
  tempo:    {l:'Meu Tempo',  i:'✨', c:'#9B7BC4', bg:'#F4F0FA'},
  saude:    {l:'Saúde',      i:'💊', c:'#C47B7B', bg:'#FAF0F0'},
  financas: {l:'Finanças',   i:'💰', c:'#7BAF8A', bg:'#F0FAF4'},
  estudos:  {l:'Estudos',    i:'📚', c:'#7B9EC4', bg:'#F0F4FA'},
  social:   {l:'Social',     i:'🫂', c:'#C49B7B', bg:'#FAF4F0'},
};

const PRI = {
  high: {dot:'#E53935', bg:'#FFF0F0', label:'Urgente',   cls:'urgente', dark:'#B71C1C'},
  med:  {dot:'#F9A825', bg:'#FFFBEA', label:'Atenção',   cls:'atencao', dark:'#E65100'},
  low:  {dot:'#43A047', bg:'#F0FFF1', label:'Tranquila', cls:'ok',      dark:'#1B5E20'},
};

// ══ STATE ═════════════════════════════════════════════
let profile = {name:'', city:'', sectors:['trabalho','casa','familia','tempo'], notifMin:15, togN:true};
let tasks = [];
let mktItems = [];
let chatHist = [];
let selDay = today();
let calRef = new Date();
let editId = null;
let focusSec = null;
let curPri = 'low';
let curRec = '';
let recog = null, micOn = false;
let pendingPhoto = null;
let notifTimers = [];
let obIdx = 0;
let obSels = ['trabalho','casa','familia','tempo'];

function today() { return new Date().toISOString().slice(0,10); }
function load(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch { return d; } }
function persist() {
  try {
    localStorage.setItem('ella_tasks', JSON.stringify(tasks));
    localStorage.setItem('ella_profile', JSON.stringify(profile));
    localStorage.setItem('ella_mkt', JSON.stringify(mktItems));
  } catch(e) {}
}

// Carregar dados salvos
profile = {...profile, ...load('ella_profile', {})};
tasks = load('ella_tasks', []);
mktItems = load('ella_mkt', []);

// Dados demo se vazio
if (!tasks.length) {
  const td = today();
  tasks = [
    {id:1, title:'Reunião com cliente — proposta urgente', sector:'trabalho', date:td, time:'14:00', done:false, priority:'high', notifMin:15, recur:''},
    {id:2, title:'Pagar conta de luz (vence hoje!)', sector:'casa', date:td, time:'', done:false, priority:'high', notifMin:'', recur:''},
    {id:3, title:'Buscar as crianças na escola', sector:'familia', date:td, time:'17:00', done:false, priority:'med', notifMin:30, recur:'daily'},
    {id:4, title:'Meditação 15 min', sector:'tempo', date:td, time:'07:00', done:true, priority:'low', notifMin:'', recur:'daily'},
    {id:5, title:'Leitura antes de dormir', sector:'tempo', date:td, time:'22:00', done:false, priority:'low', notifMin:'', recur:''},
  ];
  persist();
}

// ══ ONBOARDING ════════════════════════════════════════
function buildObSecs() {
  document.getElementById('obSectors').innerHTML = Object.entries(SECTORS).map(([k,s]) => {
    const on = obSels.includes(k);
    return `<div class="ob-sec${on?' on':''}" onclick="togObSec('${k}')">
      <div class="ob-sec-ico">${s.i}</div>
      <div class="ob-sec-name">${s.l}</div>
    </div>`;
  }).join('');
}

function togObSec(k) {
  const i = obSels.indexOf(k);
  if (i > -1) { if (obSels.length > 1) obSels.splice(i,1); }
  else obSels.push(k);
  buildObSecs();
}

function renderObDots() {
  document.getElementById('obDots').innerHTML = Array.from({length:4}, (_,i) =>
    `<div class="ob-dot${i===obIdx?' on':''}"></div>`).join('');
}

function obGo(d) {
  if (d > 0 && obIdx === 0) {
    const n = document.getElementById('obName').value.trim();
    if (!n) { alert('Por favor, digite seu nome! 💕'); return; }
    profile.name = n;
  }
  if (d > 0 && obIdx === 1) profile.sectors = obSels;
  obIdx = Math.max(0, Math.min(3, obIdx + d));
  document.getElementById('obTrack').style.transform = `translateX(-${obIdx*100}%)`;
  document.getElementById('obSkip').style.visibility = obIdx > 0 ? 'visible' : 'hidden';
  const nb = document.getElementById('obNext');
  if (obIdx === 3) {
    nb.textContent = 'Entrar →';
    nb.onclick = startApp;
    document.getElementById('obReadyH').textContent = `Olá, ${profile.name}!`;
  } else {
    nb.textContent = 'Próximo';
    nb.onclick = () => obGo(1);
  }
  renderObDots();
  if (obIdx === 1) buildObSecs();
}

function startApp() {
  persist();
  document.getElementById('ob').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  initApp();
}

// Init
renderObDots();
buildObSecs();

if (profile.name) {
  document.getElementById('ob').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  initApp();
}

function initApp() {
  updateAvatar();
  buildQPills();
  schedNotifs();
  setTimeout(() => {
    const h = new Date().getHours();
    const g = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    const n = tasks.filter(t => t.date === today() && !t.done).length;
    const urg = tasks.filter(t => t.date === today() && !t.done && t.priority === 'high').length;
    addMsg('ella', `${g}, <strong>${profile.name}</strong>! 🌿<br><br>Você tem <strong>${n} tarefas</strong> para hoje${urg > 0 ? ` — <span style="color:#E53935;font-weight:600">${urg} urgentes 🔴</span>` : ''}.<br><br>Me conta o que mais está na cabeça!`);
  }, 250);
}

// ══ VIEWS ════════════════════════════════════════════
function goView(v) {
  document.querySelectorAll('.view').forEach(e => e.classList.remove('on'));
  document.querySelectorAll('.bnav-btn').forEach(e => e.classList.remove('on'));
  document.getElementById('v-'+v).classList.add('on');
  const map = {chat:0, check:1, cal:2, mkt:3, plans:4};
  if (map[v] !== undefined) document.querySelectorAll('.bnav-btn')[map[v]].classList.add('on');
  if (v === 'check') drawCheck();
  if (v === 'cal') drawCal();
  if (v === 'mkt') drawMkt();
  if (v === 'profile') loadProf();
  document.getElementById('searchBar').style.display = 'none';
  document.getElementById('searchResults').style.display = 'none';
}

// ══ SEARCH ═══════════════════════════════════════════
function toggleSearch() {
  const bar = document.getElementById('searchBar');
  const vis = bar.style.display === 'none';
  bar.style.display = vis ? '' : 'none';
  if (vis) document.getElementById('searchInput').focus();
  else document.getElementById('searchResults').style.display = 'none';
}

function doSearch(q) {
  const res = document.getElementById('searchResults');
  if (!q) { res.style.display = 'none'; return; }
  res.style.display = 'block';
  const r = tasks.filter(t => t.title.toLowerCase().includes(q.toLowerCase()));
  if (!r.length) { res.innerHTML = '<div style="font-size:13px;color:#888;padding:16px 0">Nenhum resultado</div>'; return; }
  res.innerHTML = r.map(t => {
    const p = PRI[t.priority] || PRI.low;
    return `<div style="padding:10px 0;border-bottom:1px solid #E8E8E8;cursor:pointer;display:flex;align-items:center;gap:10px" onclick="openEdit(${t.id})">
      <div style="width:8px;height:8px;border-radius:50%;background:${p.dot};flex-shrink:0"></div>
      <div>
        <div style="font-size:13px;font-weight:500">${t.title}</div>
        <div style="font-size:11px;color:#888;margin-top:2px">${(SECTORS[t.sector]||SECTORS.casa).i} ${(SECTORS[t.sector]||SECTORS.casa).l} ${t.date ? '· '+t.date : ''}</div>
      </div>
    </div>`;
  }).join('');
}

// ══ CHAT ═════════════════════════════════════════════
function buildQPills() {
  document.getElementById('qpills').innerHTML = profile.sectors
    .filter(k => SECTORS[k])
    .map(k => `<button class="qpill" onclick="inject('Tenho tarefas de ${SECTORS[k].l} para organizar')">${SECTORS[k].i} ${SECTORS[k].l}</button>`)
    .join('');
}

function inject(t) { document.getElementById('ci').value = t; sendChat(); }

function addMsg(role, html, chips) {
  const w = document.getElementById('chatScroll');
  const d = document.createElement('div');
  d.className = 'msg ' + role;
  let inner = `<div class="msg-who">${role==='ella'?'ella':'você'}</div><div class="bubble">${html}</div>`;
  if (chips && chips.length) {
    inner += `<div class="chips">${chips.map(c => {
      const p = PRI[c.priority] || PRI.low;
      return `<button class="chip" onclick="flipT(${c.id})"><span style="width:7px;height:7px;border-radius:50%;background:${p.dot};display:inline-block;flex-shrink:0"></span>${c.title.length>22?c.title.slice(0,22)+'…':c.title}</button>`;
    }).join('')}</div>`;
  }
  d.innerHTML = inner;
  w.appendChild(d);
  w.scrollTop = w.scrollHeight;
}

function showTyping() {
  const w = document.getElementById('chatScroll');
  const d = document.createElement('div');
  d.className = 'msg ella'; d.id = 'typing';
  d.innerHTML = `<div class="msg-who">ella</div><div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`;
  w.appendChild(d); w.scrollTop = w.scrollHeight;
}
function hideTyping() { const e = document.getElementById('typing'); if (e) e.remove(); }
function flipT(id) { const t = tasks.find(x => x.id === id); if (t) { t.done = !t.done; persist(); toast(t.done ? '✅ Feito!' : '↩ Desmarcado'); } }

async function sendChat() {
  const inp = document.getElementById('ci');
  const txt = inp.value.trim(); if (!txt) return;
  inp.value = ''; inp.style.height = 'auto';
  addMsg('user', txt.replace(/\n/g,'<br>'));
  chatHist.push({role:'user', content:txt});
  showTyping();
  const tl = new Date().toLocaleDateString('pt-BR', {weekday:'long', day:'numeric', month:'long'});
  const activeSecs = profile.sectors.map(k => `${SECTORS[k]?.i} ${SECTORS[k]?.l} (key:"${k}")`).join(', ');
  const snap = JSON.stringify(tasks.slice(-20));
  const sys = `Você é Ella, assistente pessoal calorosa para mulheres multitarefas.
Hoje: ${tl} (${today()}). Setores ativos: ${activeSecs}. Tarefas: ${snap}
REGRAS:
- Português brasileiro, tom acolhedor e prático
- Ao identificar tarefas inclua ao FIM: <tasks>[{"title":"...","sector":"key","date":"YYYY-MM-DD","time":"HH:MM ou vazio","priority":"high|med|low","notifMin":numero_ou_vazio,"recur":"daily|weekly|monthly|vazio"}]</tasks>
- priority: high=🔴 urgente, med=🟡 atenção, low=🟢 tranquila
- Use apenas setores ativos. Sem <tasks> se não houver tarefas novas. Seja breve e gentil.`;
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {'Content-Type':'application/json', 'x-api-key': API_KEY, 'anthropic-version':'2023-06-01', 'anthropic-dangerous-direct-browser-access':'true'},
      body: JSON.stringify({model:'claude-sonnet-4-20250514', max_tokens:900, system:sys, messages:chatHist})
    });
    const data = await r.json();
    hideTyping();
    const full = (data.content||[]).map(b => b.text||'').join('');
    chatHist.push({role:'assistant', content:full});
    const match = full.match(/<tasks>([\s\S]*?)<\/tasks>/);
    let added = [];
    if (match) {
      try {
        JSON.parse(match[1]).forEach(t => {
          const item = {id: Date.now()+Math.random()*999|0, title:t.title, sector:t.sector||'casa', date:t.date||today(), time:t.time||'', done:false, priority:t.priority||'low', notifMin:t.notifMin||'', recur:t.recur||''};
          tasks.push(item); added.push(item);
        });
        persist(); schedNotifs();
      } catch(e) {}
    }
    addMsg('ella', full.replace(/<tasks>[\s\S]*?<\/tasks>/g,'').trim().replace(/\n/g,'<br>'), added);
    if (added.length) toast(`${added.length} tarefa${added.length>1?'s':''} salva${added.length>1?'s':''}! 🌸`);
  } catch(e) { hideTyping(); addMsg('ella', 'Ops! Verifique sua conexão e tente novamente. 💕'); }
}

function onEnt(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); } }
function growCi(el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 90)+'px'; }

// ══ MIC ══════════════════════════════════════════════
function toggleMic() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { toast('Use o Chrome para voz 🎙'); return; }
  if (micOn) { recog && recog.stop(); return; }
  recog = new SR(); recog.lang = 'pt-BR'; recog.continuous = false;
  recog.onstart = () => { micOn = true; document.getElementById('micBtn').classList.add('rec'); };
  recog.onresult = e => { document.getElementById('ci').value = e.results[0][0].transcript; sendChat(); };
  recog.onend = () => { micOn = false; document.getElementById('micBtn').classList.remove('rec'); };
  recog.onerror = () => { micOn = false; document.getElementById('micBtn').classList.remove('rec'); toast('Não ouvi. Tente de novo!'); };
  recog.start();
}

// ══ NOTIFICAÇÕES ═════════════════════════════════════
function schedNotifs() {
  notifTimers.forEach(t => clearTimeout(t)); notifTimers = [];
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const now = Date.now();
  tasks.filter(t => !t.done && t.date && t.time && t.notifMin !== '').forEach(t => {
    const dt = new Date(`${t.date}T${t.time}`);
    const fireAt = dt.getTime() - (parseInt(t.notifMin || profile.notifMin || 15) * 60000);
    const diff = fireAt - now;
    if (diff > 0 && diff < 24*3600000) {
      notifTimers.push(setTimeout(() => {
        new Notification('🌿 Ella', {body: `${t.title} em ${t.notifMin||15} min`});
      }, diff));
    }
  });
}

// ══ CHECKLIST ════════════════════════════════════════
function drawCheck() {
  const td = today();
  document.getElementById('chkTitle').textContent = new Date().toLocaleDateString('pt-BR', {weekday:'long', day:'numeric', month:'long'});
  const all = tasks.filter(t => {
    if (t.date === td) return true;
    if (t.recur === 'daily') return true;
    if (t.recur === 'weekly') return new Date(t.date+'T12:00').getDay() === new Date().getDay();
    if (t.recur === 'monthly') return parseInt(t.date.slice(8)) === new Date().getDate();
    return false;
  });
  const done = all.filter(t => t.done).length;
  const pct = all.length ? Math.round(done/all.length*100) : 0;
  document.getElementById('chkProg').textContent = `${done}/${all.length} concluídas`;
  document.getElementById('progFill').style.width = pct+'%';
  const focusRow = document.getElementById('focusRow');
  focusRow.innerHTML = `<button class="ftab${focusSec===null?' on':''}" onclick="setFocus(null)">Tudo</button>` +
    profile.sectors.filter(k => SECTORS[k]).map(k =>
      `<button class="ftab${focusSec===k?' on':''}" onclick="setFocus('${k}')">${SECTORS[k].i} ${SECTORS[k].l}</button>`
    ).join('');
  let list = focusSec ? all.filter(t => t.sector === focusSec) : all;
  const groups = [
    {key:'high', items:list.filter(t => !t.done && t.priority === 'high')},
    {key:'med',  items:list.filter(t => !t.done && t.priority === 'med')},
    {key:'low',  items:list.filter(t => !t.done && t.priority === 'low')},
    {key:'done', items:list.filter(t => t.done)},
  ];
  let html = '';
  groups.forEach(({key, items}) => {
    if (!items.length) return;
    const isDone = key === 'done';
    const p = isDone ? {dot:'#BDBDBD', label:'Concluídas', cls:'feita'} : PRI[key];
    html += `<div class="sem-section">
      <div class="sem-section-hdr">
        <div class="sem-section-dot" style="background:${p.dot}"></div>
        <div class="sem-section-title" style="color:${p.dot}">${p.label}</div>
        <div class="sem-section-count">${items.length} tarefa${items.length>1?'s':''}</div>
      </div>`;
    items.forEach(t => {
      const s = SECTORS[t.sector] || SECTORS.casa;
      const pc = isDone ? {dot:'#BDBDBD', cls:'feita'} : PRI[t.priority] || PRI.low;
      html += `<div class="chk-card ${pc.cls}">
        <div class="chk-row">
          <div class="chkbox${t.done?' on':''}" onclick="tickT(${t.id})">
            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="chk-lbl${t.done?' done':''}">${t.title}${t.recur?'<span style="font-size:10px;color:#888;margin-left:4px">🔁</span>':''}</div>
          <div class="chk-right">
            ${t.time ? `<div class="chk-time">🕐${t.time}</div>` : ''}
            <div class="sec-tag" style="background:${s.bg};color:${s.c}">${s.i}</div>
            <button class="chk-edit" onclick="openEdit(${t.id})">✎</button>
          </div>
        </div>
      </div>`;
    });
    html += '</div>';
  });
  if (!list.length) html = '<div class="sec-empty">Nenhuma tarefa para hoje. Que dia livre! ✨</div>';
  document.getElementById('chkBody').innerHTML = html;
}

function setFocus(k) { focusSec = k; drawCheck(); }
function tickT(id) {
  const t = tasks.find(x => x.id === id); if (!t) return;
  t.done = !t.done; persist(); drawCheck();
  if (document.getElementById('v-cal').classList.contains('on')) drawDayPanel();
  toast(t.done ? '✅ Concluída!' : '↩ Desmarcada');
}

// ══ CALENDÁRIO ═══════════════════════════════════════
function mvMonth(d) { calRef = new Date(calRef.getFullYear(), calRef.getMonth()+d, 1); drawCal(); }

function drawCal() {
  const y = calRef.getFullYear(), m = calRef.getMonth();
  const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  document.getElementById('calTitle').textContent = `${months[m]} ${y}`;
  const first = new Date(y,m,1).getDay(), last = new Date(y,m+1,0).getDate(), td = today();
  let h = ['D','S','T','Q','Q','S','S'].map(d => `<div class="cal-dn">${d}</div>`).join('');
  for (let i = 0; i < first; i++) { const pd = new Date(y,m,-(first-i-1)); h += `<div class="cal-d om"><div class="dnum">${pd.getDate()}</div></div>`; }
  for (let d = 1; d <= last; d++) {
    const ds = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dt = tasks.filter(t => t.date === ds);
    const dots = dt.slice(0,4).map(t => { const col = t.done ? '#BDBDBD' : (PRI[t.priority]||PRI.low).dot; return `<div class="cdot" style="background:${col}"></div>`; }).join('');
    h += `<div class="cal-d${ds===td?' today':''}${ds===selDay?' sel':''}" onclick="pickDay('${ds}')"><div class="dnum">${d}</div><div class="cdots">${dots}</div></div>`;
  }
  document.getElementById('calGrid').innerHTML = h;
  drawDayPanel();
}

function pickDay(ds) { selDay = ds; drawCal(); }

function drawDayPanel() {
  const el = document.getElementById('dayPanel');
  const dt = tasks.filter(t => t.date === selDay).sort((a,b) => {
    const pm = {high:0, med:1, low:2};
    if (a.done !== b.done) return a.done ? 1 : -1;
    return (pm[a.priority]||1) - (pm[b.priority]||1);
  });
  const label = new Date(selDay+'T12:00').toLocaleDateString('pt-BR', {weekday:'long', day:'numeric', month:'long'});
  let h = `<div class="day-panel"><div class="day-panel-hdr"><div class="day-panel-title">${label}</div><button class="add-btn-sm" onclick="openNew('${selDay}')">+ Adicionar</button></div>`;
  if (!dt.length) h += `<div class="no-ev">Dia livre ✨</div>`;
  else dt.forEach(t => {
    const s = SECTORS[t.sector] || SECTORS.casa;
    const p = t.done ? {dot:'#BDBDBD', label:'Concluída'} : PRI[t.priority] || PRI.low;
    h += `<div class="ev">
      <div class="ev-sem" style="background:${p.dot}"></div>
      <div class="ev-body">
        <div class="ev-t${t.done?' done':''}">${t.title}</div>
        <div class="ev-meta">
          <span style="font-size:9px;font-weight:700;color:${p.dot}">${p.label}</span>
          ${t.time ? `<span>🕐 ${t.time}</span>` : ''}
          <span class="ev-tag" style="background:${s.bg};color:${s.c}">${s.i} ${s.l}</span>
        </div>
      </div>
      <div class="ev-acts">
        <button class="ev-act" onclick="tickCal(${t.id})">${t.done?'↩':'✓'}</button>
        <button class="ev-act" onclick="openEdit(${t.id})">✎</button>
      </div>
    </div>`;
  });
  el.innerHTML = h + '</div>';
}

function tickCal(id) { const t = tasks.find(x => x.id===id); if(t){t.done=!t.done;persist();drawDayPanel();toast(t.done?'✅ Concluída!':'↩ Desmarcada');} }

// ══ MERCADO ══════════════════════════════════════════
function drawMkt() {
  const photos = mktItems.filter(m => m.photo);
  const grid = document.getElementById('mktGrid');
  grid.innerHTML = photos.map(m =>
    `<div class="mkt-photo${m.done?' done-p':''}" onclick="togMkt(${m.id})"><img src="${m.photo}" alt="${m.title}"></div>`
  ).join('') + `<div class="mkt-photo add" onclick="document.getElementById('photoInput').click()">+</div>`;
  const txtItems = mktItems.filter(m => !m.photo);
  const list = document.getElementById('mktList');
  if (!txtItems.length) { list.innerHTML = '<div class="sec-empty">Nenhum item de texto</div>'; return; }
  list.innerHTML = txtItems.map(m => `<div class="chk-card${m.done?' feita':''}">
    <div class="chk-row">
      <div class="chkbox${m.done?' on':''}" onclick="togMkt(${m.id})">
        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div class="chk-lbl${m.done?' done':''}">${m.title}</div>
      <button class="chk-edit" onclick="delMkt(${m.id})">✕</button>
    </div>
  </div>`).join('');
}

function openMktAdd() { pendingPhoto = null; document.getElementById('mktTxt').value = ''; document.getElementById('photoName').textContent = ''; document.getElementById('mktModal').classList.add('open'); }
function handlePhoto(e) { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = ev => { pendingPhoto = ev.target.result; document.getElementById('photoName').textContent = '📷 ' + f.name; }; r.readAsDataURL(f); }
function saveMktItem() { const title = document.getElementById('mktTxt').value.trim(); if (!title && !pendingPhoto) { toast('Digite um item ou escolha uma foto!'); return; } mktItems.push({id:Date.now(), title:title||'Item', photo:pendingPhoto||null, done:false}); persist(); closeMod('mktModal'); drawMkt(); pendingPhoto=null; toast('Item adicionado ✓'); }
function togMkt(id) { const m = mktItems.find(x => x.id===id); if(m){m.done=!m.done;persist();drawMkt();} }
function delMkt(id) { mktItems = mktItems.filter(x => x.id!==id); persist(); drawMkt(); toast('Removido'); }

// ══ MODAL TASK ════════════════════════════════════════
function buildSectorSelect() {
  document.getElementById('mSector').innerHTML = Object.entries(SECTORS).map(([k,s]) =>
    `<option value="${k}">${s.i} ${s.l}</option>`).join('');
}
buildSectorSelect();

function setPri(p) {
  curPri = p;
  document.getElementById('priRed').className = 'pri-opt' + (p==='high'?' sel-red':'');
  document.getElementById('priYellow').className = 'pri-opt' + (p==='med'?' sel-yellow':'');
  document.getElementById('priGreen').className = 'pri-opt' + (p==='low'?' sel-green':'');
}

function setRec(btn) { curRec = btn.dataset.r; document.querySelectorAll('.rec-btn').forEach(b => b.classList.toggle('sel', b.dataset.r === curRec)); }

function openNew(dateStr) {
  editId = null;
  document.getElementById('mH').textContent = 'Nova tarefa';
  document.getElementById('mTitle').value = '';
  document.getElementById('mSector').value = profile.sectors[0] || 'casa';
  document.getElementById('mDate').value = dateStr || today();
  document.getElementById('mTime').value = '';
  document.getElementById('mNotif').value = '';
  document.getElementById('mDel').style.display = 'none';
  document.querySelectorAll('.rec-btn').forEach(b => b.classList.toggle('sel', b.dataset.r === ''));
  curRec = '';
  setPri('low');
  document.getElementById('taskModal').classList.add('open');
}

function openEdit(id) {
  editId = id; const t = tasks.find(x => x.id===id); if(!t) return;
  document.getElementById('mH').textContent = 'Editar tarefa';
  document.getElementById('mTitle').value = t.title;
  document.getElementById('mSector').value = t.sector;
  document.getElementById('mDate').value = t.date;
  document.getElementById('mTime').value = t.time||'';
  document.getElementById('mNotif').value = t.notifMin||'';
  document.getElementById('mDel').style.display = '';
  curRec = t.recur||'';
  document.querySelectorAll('.rec-btn').forEach(b => b.classList.toggle('sel', b.dataset.r === curRec));
  setPri(t.priority||'low');
  document.getElementById('taskModal').classList.add('open');
}

function saveTask() {
  const title = document.getElementById('mTitle').value.trim(); if (!title) { toast('Digite o título!'); return; }
  const item = {id:editId||Date.now(), title, sector:document.getElementById('mSector').value, date:document.getElementById('mDate').value||today(), time:document.getElementById('mTime').value, done:false, priority:curPri, notifMin:document.getElementById('mNotif').value, recur:curRec};
  if (editId) { const i = tasks.findIndex(x => x.id===editId); if(i>-1){item.done=tasks[i].done;tasks[i]=item;} }
  else tasks.push(item);
  persist(); schedNotifs(); closeMod('taskModal');
  const v = document.querySelector('.view.on').id;
  if (v==='v-check') drawCheck(); if (v==='v-cal') drawCal();
  toast(editId ? 'Atualizada ✓' : 'Adicionada ✓');
}

function deleteTask() {
  tasks = tasks.filter(x => x.id!==editId); persist(); closeMod('taskModal');
  const v = document.querySelector('.view.on').id;
  if (v==='v-check') drawCheck(); if (v==='v-cal') drawCal();
  toast('Tarefa removida');
}

function closeMod(id, e) { if (!e || e.target.id===id) document.getElementById(id).classList.remove('open'); }

// ══ PERFIL ═══════════════════════════════════════════
function updateAvatar() {
  const n = profile.name || 'E';
  document.getElementById('topAvatar').textContent = n[0].toLowerCase();
  if (document.getElementById('profAv')) document.getElementById('profAv').textContent = n[0].toLowerCase();
}

function loadProf() {
  document.getElementById('pName').value = profile.name||'';
  document.getElementById('pCity').value = profile.city||'';
  document.getElementById('profNameBig').textContent = profile.name||'Meu perfil';
  if (!profile.togN) document.getElementById('togN').classList.remove('on');
  document.getElementById('pNotif').value = profile.notifMin||15;
  document.getElementById('secGrid').innerHTML = Object.entries(SECTORS).map(([k,s]) => {
    const on = profile.sectors.includes(k);
    return `<div class="sec-pill${on?' on':''}" onclick="togSecP('${k}')">${s.i} ${s.l}</div>`;
  }).join('');
}

function togSecP(k) {
  const i = profile.sectors.indexOf(k);
  if (i > -1) { if (profile.sectors.length > 1) profile.sectors.splice(i,1); }
  else profile.sectors.push(k);
  loadProf();
}

function saveProfile() {
  profile.name = document.getElementById('pName').value.trim();
  profile.city = document.getElementById('pCity').value.trim();
  profile.togN = document.getElementById('togN').classList.contains('on');
  profile.notifMin = parseInt(document.getElementById('pNotif').value)||15;
  persist(); updateAvatar(); buildQPills();
  toast('Perfil salvo ✓');
}

// ══ TOAST ════════════════════════════════════════════
function toast(msg) { const el = document.getElementById('toast'); el.textContent = msg; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2500); }
