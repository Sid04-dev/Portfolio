(function(){
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const G = !!window.gsap && !!window.ScrollTrigger;
if (G) { gsap.registerPlugin(ScrollTrigger); ScrollTrigger.config({ ignoreMobileResize: true }); }

const FINE = matchMedia('(pointer:fine)').matches;
const BOOT = (reduce || !G) ? 0 : 1.7;
const bootEl = document.getElementById('boot');
if (!BOOT) bootEl.remove();
else {
  const log = document.getElementById('bootLog');
  const lines = ['> initialising SG-CORE', '> loading modules: html css js react node mysql <span class="ok">[ok]</span>', '> bringing up Gi0/1 – Gi0/6 ........ <span class="ok">[ok]</span>', '> link up · 1000 Mb/s full duplex'];
  lines.forEach((l, i) => gsap.delayedCall(i * .3, () => { const d = document.createElement('div'); d.innerHTML = l; log.appendChild(d); }));
  const b = document.createElement('span'); b.className = 'bar2'; b.innerHTML = '<i></i>'; bootEl.appendChild(b);
  bootEl.style.flexDirection = 'column'; bootEl.style.alignItems = 'flex-start'; bootEl.style.justifyContent = 'flex-end';
  gsap.to(b.firstChild, { scaleX: 1, duration: BOOT - .3, ease: 'power2.inOut' });
  gsap.to(bootEl, { yPercent: -100, duration: .8, ease: 'expo.inOut', delay: BOOT - .2, onComplete: () => bootEl.remove() });
}

let lenis = null;
if (G && !reduce && window.Lenis) {
  try { lenis = new Lenis({ lerp: 0.09 }); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); } catch (e) { lenis = null; }
}
if (lenis && BOOT) { lenis.stop(); setTimeout(() => lenis.start(), BOOT * 1000); }
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const t = document.querySelector(a.getAttribute('href')); if (!t) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(t, { duration: 1.6 }); else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
}));

/* copy buttons */
document.querySelectorAll('.copy').forEach(b => b.addEventListener('click', () => {
  const el = document.getElementById(b.dataset.copy), txt = el.textContent.trim();
  const done = () => { b.textContent = 'Copied'; setTimeout(() => b.textContent = 'Copy', 1600); };
  if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done).catch(() => { getSelection().selectAllChildren(el); });
  else getSelection().selectAllChildren(el);
}));


/* live console */
const out = document.getElementById('out'), cmd = document.getElementById('cmd');
const esc = t => t.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const print = (html, cls) => { const l = document.createElement('span'); l.className = 'l'; l.innerHTML = html; out.appendChild(l); out.scrollTop = out.scrollHeight; };
const wait = ms => new Promise(r => setTimeout(r, ms));
const COMMANDS = {
  help: () => ['Available commands:', '  whoami          who is this', '  projects        what I have built', '  skills          what I work with', '  ping sidharth   check if I am available', '  traceroute      where my career is routing', '  contact         how to reach me', '  date            local time in the UAE', '  sudo hire-me    a little surprise', '  clear           clear the screen'],
  whoami: () => ['Sidharth Gopakumar', 'BSc (Hons) Computer Science, University of Stirling (year 3)', 'SQA Advanced Diploma in Computing: Software Development', 'Ras Al Khaimah, UAE'],
  projects: () => ['<span class="ok">meridian</span>   Meridian Museum of Antiquities · <a href="https://glittering-crisp-75d098.netlify.app" target="_blank" rel="noopener">live ↗</a>', '<span class="ok">zenith</span>     live world-news globe (in progress)', '<span class="ok">space.ex</span>   tour of the solar system · <a href="https://phenomenal-syrniki-56bdb9.netlify.app/" target="_blank" rel="noopener">live ↗</a>', '<span class="ok">amanda-kohn</span> pianist site with playable piano · <a href="https://gilded-gaufre-72a1ad.netlify.app/" target="_blank" rel="noopener">live ↗</a>', '<span class="ok">melodify</span>   music discovery and live shows · <a href="https://zesty-choux-414d93.netlify.app/artists" target="_blank" rel="noopener">live ↗</a>', '<span class="ok">visit-saudi</span> Saudi Arabia travel guide · <a href="https://golden-bienenstitch-7b2a6c.netlify.app/" target="_blank" rel="noopener">live ↗</a>', '<span class="ok">mindease</span>   React + Node + Python ML + MySQL'],
  skills: () => ['web      HTML CSS JavaScript React Figma', 'backend  Node.js Express MySQL Python Java VB.NET', 'network  Packet Tracer · TCP/IP · <span class="lr">CCNA 200-301 in progress</span>', 'systems  Windows 11 admin · VirtualBox · Apache vhosts · WSL', 'team     team lead · Git/Gitea · change control · PDCA'],
  contact: () => ['email     <a href="mailto:sidharthgopakumar5804@gmail.com">sidharthgopakumar5804@gmail.com</a>', 'linkedin  <a href="https://www.linkedin.com/in/sidharth-gopakumar-2764a5336" target="_blank" rel="noopener">sidharth-gopakumar ↗</a>'],
  date: () => [new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', dateStyle: 'full', timeStyle: 'medium' }).format(new Date()) + ' GST'],
  async ping() {
    print('PING sidharth.dev (10.0.0.7): 56 data bytes');
    for (let i = 1; i <= 4; i++) { await wait(420); const t = (8 + Math.random() * 9).toFixed(1); print(`64 bytes from 10.0.0.7: icmp_seq=${i} ttl=64 time=${t} ms`); pingAt(innerWidth * (.55 + Math.random() * .35), innerHeight * (.2 + Math.random() * .6)); }
    await wait(300); print('<span class="ok">4 packets transmitted, 4 received, 0% packet loss. He is available.</span>'); return [];
  },
  async traceroute() {
    const hops = [['sqa-diploma.rak', '<span class="ok">completed</span>'], ['nasa-space-apps-2025', '<span class="ok">participated</span>'], ['ibm-cyber-fundamentals', '<span class="ok">completed</span>'], ['stirling-bsc-cs.rak', '<span class="lr">in progress</span>'], ['ccna-200-301', '<span class="lr">in progress</span>'], ['network-engineer.uae', '* * * awaiting your offer']];
    print('traceroute to network-engineer.uae, 30 hops max');
    for (let i = 0; i < hops.length; i++) { await wait(380); print(` ${i + 1}  ${hops[i][0].padEnd(24)} ${hops[i][1]}`); }
    return [];
  },
  sudo: () => { setTimeout(() => { const c = document.getElementById('contact'); if (lenis) lenis.scrollTo(c, { duration: 1.6 }); else c.scrollIntoView({ behavior: 'smooth' }); }, 700); return ['[sudo] access granted. Routing you to contact…']; },
  clear: () => { out.innerHTML = ''; return []; }
};
const hist = []; let hi = 0;
document.getElementById('cli').addEventListener('submit', async e => {
  e.preventDefault();
  const raw = cmd.value.trim(); cmd.value = '';
  print(`<span class="p">guest@SG-CORE#</span>${esc(raw)}`);
  if (!raw) return;
  hist.push(raw); hi = hist.length;
  const word = raw.toLowerCase().split(/\s+/)[0];
  const fn = COMMANDS[word];
  if (!fn) {
    const low = raw.toLowerCase();
    const hint = [['hire', 'sudo hire-me'], ['surprise', 'sudo hire-me'], ['you know', 'sudo hire-me'], ['ping', 'ping sidharth'], ['trace', 'traceroute'], ['who', 'whoami'], ['project', 'projects'], ['skill', 'skills'], ['contact', 'contact'], ['mail', 'contact'], ['time', 'date']].find(([k]) => low.includes(k));
    print(`${esc(raw)}`); print('^'); print('<span class="lr">% Invalid input detected at \'^\' marker.</span>');
    print(hint ? `Did you mean <span class="ok">${hint[1]}</span>? Type it exactly, or type help.` : 'Type <span class="ok">help</span> to see the commands.');
    return;
  }
  cmd.disabled = true;
  const res = await fn(raw); (res || []).forEach(l => print(l));
  cmd.disabled = false; cmd.focus();
});
cmd.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && hi > 0) { hi--; cmd.value = hist[hi]; e.preventDefault(); }
  if (e.key === 'ArrowDown') { hi = Math.min(hist.length, hi + 1); cmd.value = hist[hi] || ''; e.preventDefault(); }
});

/* click to ping the network */
const shocks = [];
function pingAt(x, y) {
  if (reduce) return;
  const n = 22 + Math.floor(Math.random() * 8);
  const bc = document.getElementById('ftBits'); if (bc) bc.textContent = (+bc.textContent.replace(/,/g, '') + n + 8).toLocaleString('en-US');
  for (let i = 0; i < n; i++) {
    const b = document.createElement('span');
    b.className = 'bit';
    b.textContent = Math.random() < .5 ? '0' : '1';
    b.style.left = x + 'px'; b.style.top = y + 'px';
    b.style.fontSize = (14 + Math.random() * 12).toFixed(0) + 'px';
    document.body.appendChild(b);
    const ang = Math.random() * Math.PI * 2, dist = 40 + Math.random() * 110;
    const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist * .8;
    const dur = 750 + Math.random() * 650;
    const flick = setInterval(() => { b.textContent = Math.random() < .5 ? '0' : '1'; }, 70);
    const anim = b.animate([
      { transform: 'translate(-50%,-50%) scale(.4)', opacity: 0 },
      { transform: `translate(calc(-50% + ${dx * .35}px), calc(-50% + ${dy * .35}px)) scale(1.15)`, opacity: 1, offset: .18 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + 26}px)) scale(.9)`, opacity: 0 }
    ], { duration: dur, easing: 'cubic-bezier(.2,.75,.3,1)', delay: Math.random() * 90, fill: 'both' });
    anim.onfinish = () => { clearInterval(flick); b.remove(); };
  }
  const word = document.createElement('span');
  word.className = 'bit bit-word';
  word.textContent = Array.from({ length: 8 }, () => Math.random() < .5 ? '0' : '1').join('');
  word.style.left = x + 'px'; word.style.top = y + 'px';
  document.body.appendChild(word);
  word.animate([
    { transform: 'translate(-50%,-50%)', opacity: 0, letterSpacing: '.6em' },
    { transform: 'translate(-50%,-50%)', opacity: 1, letterSpacing: '.18em', offset: .25 },
    { transform: 'translate(-50%,-160%)', opacity: 0, letterSpacing: '.18em' }
  ], { duration: 1100, easing: 'ease-out', fill: 'both' }).onfinish = () => word.remove();
}
addEventListener('pointerdown', e => {
  if (e.target.closest('a,button,input,form,.term,.proj,.reach,nav,.lap-wrap')) return;
  pingAt(e.clientX, e.clientY);
});

/* scramble text */
const GLYPHS = '!<>-_\\/[]{}=+*^?#01';
function scramble(el) {
  if (reduce || !el || el._busy) return;
  const orig = el.dataset.orig || (el.dataset.orig = el.textContent);
  el._busy = true; const t0 = performance.now(), dur = 520;
  (function step(now) {
    const p = Math.min(1, (now - t0) / dur), n = Math.floor(p * orig.length);
    let out = orig.slice(0, n);
    for (let i = n; i < orig.length; i++) out += orig[i] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    el.textContent = out;
    if (p < 1) requestAnimationFrame(step); else { el.textContent = orig; el._busy = false; }
  })(t0);
}
document.querySelectorAll('[data-scramble]').forEach(el => el.addEventListener('pointerenter', () => scramble(el)));

/* typed roles */
const roles = ['web_developer', 'ui/ux_designer', 'network_engineer --in-training', 'team_lead'];
const typed = document.getElementById('typed');
if (!reduce) {
  let ri = 0, ci = roles[0].length, del = true;
  setTimeout(function tick() {
    if (del) { ci--; if (ci <= 0) { del = false; ri = (ri + 1) % roles.length; } }
    else { ci++; if (ci >= roles[ri].length) { del = true; typed.textContent = roles[ri]; return setTimeout(tick, 1800); } }
    typed.textContent = roles[ri].slice(0, Math.max(0, ci));
    setTimeout(tick, del ? 35 : 70);
  }, 2600 + BOOT * 1000);
}

/* clock and HUD */
const clock = document.getElementById('clock');
const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
const tickClock = () => clock.textContent = 'GST ' + fmt.format(new Date());
tickClock(); setInterval(tickClock, 1000);
const secs = [...document.querySelectorAll('main > section')], hudSec = document.getElementById('hudSec'), hudPct = document.getElementById('hudPct');
function hud() {
  const max = document.documentElement.scrollHeight - innerHeight;
  hudPct.textContent = String(Math.round(Math.min(1, Math.max(0, scrollY / Math.max(1, max))) * 100)).padStart(3, '0');
  let id = secs[0].id;
  secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .45) id = s.id; });
  hudSec.textContent = id;
}
addEventListener('scroll', hud, { passive: true }); hud();

/* equal-height project cards */
function equalCards() {
  const cards = [...document.querySelectorAll('.proj')];
  cards.forEach(c => c.style.minHeight = '');
  const h = Math.max(...cards.map(c => c.getBoundingClientRect().height));
  cards.forEach(c => c.style.minHeight = Math.ceil(h) + 'px');
}
addEventListener('load', equalCards);
addEventListener('resize', equalCards);
if (document.fonts) document.fonts.ready.then(equalCards);
equalCards();

/* wrap project cards so scroll and hover tilt don't fight */
document.querySelectorAll('.proj').forEach(p => {
  const w = document.createElement('div'); w.className = 'pw'; p.parentNode.insertBefore(w, p); w.appendChild(p);
  const gl = document.createElement('span'); gl.className = 'glare'; p.appendChild(gl);
});

/* hover physics */
if (G && FINE && !reduce) {
  const tilt = (el, max) => {
    if (!el) return;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', (x * 100).toFixed(1) + '%'); el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      gsap.to(el, { rotationY: (x - .5) * max, rotationX: -(y - .5) * max, transformPerspective: 900, duration: .4, ease: 'power2.out' });
    });
    el.addEventListener('pointerleave', () => gsap.to(el, { rotationX: 0, rotationY: 0, duration: 1, ease: 'elastic.out(1,.45)' }));
  };
  document.querySelectorAll('.proj').forEach(p => tilt(p, 16));
  document.querySelectorAll('.reach .cell').forEach(p => tilt(p, 10));

  document.querySelectorAll('.btn, .copy, .mono-mark').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * .35, y: (e.clientY - r.top - r.height / 2) * .35, duration: .3, ease: 'power2.out' });
    });
    el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: .9, ease: 'elastic.out(1,.4)' }));
  });
}

/* colour reveal under the pointer */
(function () {
  const ph = document.querySelector('.photo'); if (!ph) return;
  const st = { r: 0 }; let target = 0;
  const setR = r => ph.style.setProperty('--r', r.toFixed(1) + 'px');
  const tween = to => { if (window.gsap && !reduce) gsap.to(st, { r: to, duration: to ? .5 : .7, ease: to ? 'power3.out' : 'power2.inOut', onUpdate: () => setR(st.r) }); else { st.r = to; setR(to); } };
  const move = e => { const b = ph.getBoundingClientRect(); ph.style.setProperty('--mx', (e.clientX - b.left) + 'px'); ph.style.setProperty('--my', (e.clientY - b.top) + 'px'); };
  ph.addEventListener('pointerenter', e => { move(e); tween(Math.max(110, ph.offsetWidth * .3)); });
  ph.addEventListener('pointermove', move);
  ph.addEventListener('pointerdown', e => { move(e); tween(Math.max(110, ph.offsetWidth * .3)); });
  ph.addEventListener('pointerleave', () => tween(0));
  ph.addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') tween(0); });
})();

/* interactive OSI stack */
(function () {
  const L = {
    7: ['Application', 'data', 'HTTP · HTTPS · DNS · SMTP', ['React', 'HTML/CSS/JS', 'Node.js APIs', 'MySQL']],
    6: ['Presentation', 'data', 'TLS · JSON · UTF-8 · JPEG', ['JSON', 'UI/UX', 'Accessibility']],
    5: ['Session', 'data', 'Sockets · auth sessions · RPC', ['Express sessions', 'Login flows']],
    4: ['Transport', 'segment', 'TCP · UDP · ports 80/443', ['Apache virtual hosts', 'Ports and services']],
    3: ['Network', 'packet', 'IPv4 · IPv6 · ICMP · OSPF', ['IP addressing', '~Subnetting', '~Routing (CCNA)']],
    2: ['Data link', 'frame', 'Ethernet · VLAN · ARP · STP', ['Packet Tracer', '~Switching and VLANs']],
    1: ['Physical', 'bits', 'Copper · fibre · Wi-Fi · NICs', ['Cabling and hardware', 'IoT (Cisco NetAcad)']]
  };
  const ENC = { 7: 'data created by the app', 6: 'encoded and encrypted', 5: 'session opened', 4: '+ TCP header → segment', 3: '+ IP header → packet', 2: '+ MAC header and trailer → frame', 1: '→ 01001000 01101001 on the wire' };
  const slabs = [...document.querySelectorAll('.slab')], stack = document.getElementById('stack'), pkt = document.getElementById('pkt');
  const $ = id => document.getElementById(id), log = $('oiLog');
  let busy = false;
  function show(n, msg) {
    const [name, pdu, proto, mine] = L[n];
    $('oiNum').textContent = 'L' + n; $('oiName').textContent = name; $('oiPdu').textContent = 'PDU · ' + pdu; $('oiProto').textContent = proto;
    $('oiMine').innerHTML = mine.map(m => m[0] === '~' ? `<span class="chip learn">${m.slice(1)} · learning</span>` : `<span class="chip">${m}</span>`).join('');
    slabs.forEach(sl => sl.classList.toggle('on', +sl.dataset.l === n));
    if (msg) log.textContent = msg;
  }
  show(7);
  slabs.forEach(sl => {
    const go = () => { if (!busy) show(+sl.dataset.l, '// layer ' + sl.dataset.l + ': where my skills sit'); };
    sl.addEventListener('pointerenter', go); sl.addEventListener('focus', go); sl.addEventListener('click', go);
  });
  const osi = $('osi');
  osi.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || reduce) return;
    const b = osi.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - .5;
    stack.style.setProperty('--rz', (-38 + x * 24).toFixed(1) + 'deg');
  });
  osi.addEventListener('pointerleave', () => stack.style.setProperty('--rz', '-38deg'));
  const wait = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
  const gap = () => parseFloat(getComputedStyle(stack).getPropertyValue('--gap')) || 24;
  $('osiSend').addEventListener('click', async () => {
    if (busy) return; busy = true; stack.classList.add('busy'); $('osiSend').textContent = 'Transmitting…';
    pkt.style.opacity = 1; pkt.style.transform = `translateZ(${7 * gap() + 60}px)`; await wait(300);
    for (let n = 7; n >= 1; n--) {
      pkt.style.transform = `translateZ(${(n - 1) * gap() + 10}px)`;
      const sl = slabs[n - 1]; show(n, `↓ L${n} ${L[n][0]}: ${ENC[n]}`); sl.classList.add('hit'); await wait(520); sl.classList.remove('hit');
    }
    log.textContent = '⇄ bits cross the link to the other host…'; pkt.style.transform = 'translateZ(-30px)'; await wait(700);
    for (let n = 1; n <= 7; n++) {
      pkt.style.transform = `translateZ(${(n - 1) * gap() + 10}px)`;
      const sl = slabs[n - 1]; show(n, `↑ L${n} ${L[n][0]}: ${n === 7 ? 'delivered. 200 OK' : 'header stripped'}`); sl.classList.add('hit'); await wait(340); sl.classList.remove('hit');
    }
    pkt.style.opacity = 0; stack.classList.remove('busy'); $('osiSend').textContent = 'Send a packet ↓'; busy = false;
  });
})();

/* rice-grain laptop */
(function () {
  const cv = document.getElementById('lap'); if (!cv) return;
  const ctx = cv.getContext('2d'), hint = document.getElementById('lapHint');
  let W = 0, H = 0, P = [], free = true, mx = -999, my = -999, visible = false, built = false;
  const AQUA = '#39f58a', PALE = '#d4f7e0', YEL = '#f2c230';
  function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
  const SILVER = '#d5dde4', DIM = '#1c4a2e', KEY = '#5d8f6c';
  function build() {
    const b = cv.getBoundingClientRect(); if (!b.width) return;
    const old = P; W = Math.floor(b.width); H = Math.floor(b.height);
    const dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const o = document.createElement('canvas'); o.width = W; o.height = H; const g = o.getContext('2d');
    const sw = Math.min(W * .66, H * 1.05), sh = sw * .64, deckH = sw * .2;
    const sx = (W - sw) / 2, sy = (H - sh - deckH - 10) / 2;
    const WHITE = '#ffffff', BLUE = '#0000ff', RED = '#ff0000', GREEN = '#00ff00';
    g.fillStyle = WHITE; rr(g, sx, sy, sw, sh, sw * .035); g.fill();
    const bz = sw * .045;
    g.fillStyle = BLUE; rr(g, sx + bz, sy + bz, sw - bz * 2, sh - bz * 2.2, 4); g.fill();
    g.fillStyle = WHITE; g.beginPath(); g.arc(sx + sw / 2, sy + bz / 2, Math.max(1.5, bz * .18), 0, 7); g.fill();
    g.fillStyle = RED; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = `800 ${Math.round(sh * .44)}px "Bricolage Grotesque","Arial Black",sans-serif`;
    g.fillText('</>', sx + sw / 2, sy + sh * .48);
    const by = sy + sh + 3, spread = sw * .11;
    g.fillStyle = WHITE; g.beginPath();
    g.moveTo(sx, by); g.lineTo(sx + sw, by); g.lineTo(sx + sw + spread, by + deckH); g.lineTo(sx - spread, by + deckH); g.closePath(); g.fill();
    g.fillRect(sx - spread, by + deckH, sw + spread * 2, Math.max(4, sw * .018));
    g.fillStyle = GREEN;
    const rows = 4, kTop = by + deckH * .12, kH = deckH * .5;
    for (let r = 0; r < rows; r++) {
      const t0 = (kTop + r * kH / rows - by) / deckH, t1 = (kTop + (r + .7) * kH / rows - by) / deckH;
      const l0 = sx - spread * t0 + sw * .07, r0 = sx + sw + spread * t0 - sw * .07, l1 = sx - spread * t1 + sw * .07, r1 = sx + sw + spread * t1 - sw * .07;
      g.beginPath(); g.moveTo(l0, by + t0 * deckH); g.lineTo(r0, by + t0 * deckH); g.lineTo(r1, by + t1 * deckH); g.lineTo(l1, by + t1 * deckH); g.closePath(); g.fill();
    }
    g.fillStyle = BLUE; const tw = sw * .26, ty = by + deckH * .7;
    g.beginPath(); g.moveTo(sx + sw / 2 - tw / 2, ty); g.lineTo(sx + sw / 2 + tw / 2, ty); g.lineTo(sx + sw / 2 + tw / 2 + spread * .12, by + deckH * .94); g.lineTo(sx + sw / 2 - tw / 2 - spread * .12, by + deckH * .94); g.closePath(); g.fill();
    const d = g.getImageData(0, 0, W, H).data, step = W < 380 ? 3.2 : 2.7;
    P = [];
    for (let y = 0; y < H; y += step) for (let x = 0; x < W; x += step) {
      const i = (Math.floor(y) * W + Math.floor(x)) * 4;
      if (d[i + 3] < 140) continue;
      const r = d[i], gg = d[i + 1], bb = d[i + 2];
      let c;
      if (r > 200 && gg > 200 && bb > 200) c = Math.random() < .14 ? AQUA : SILVER;
      else if (r > 200 && gg < 90 && bb < 90) c = Math.random() < .3 ? YEL : AQUA;
      else if (gg > 200 && r < 90) { if (Math.random() < .45) continue; c = KEY; }
      else if (bb > 200 && r < 90) { if (Math.random() < .74) continue; c = DIM; }
      else continue;
      const hx = x + (Math.random() - .5) * .8, hy = y + (Math.random() - .5) * .8, ha = .6 + (Math.random() - .5) * .5;
      const prev = old[P.length];
      P.push({ hx, hy, ha, x: prev ? prev.x : Math.random() * W, y: prev ? prev.y : Math.random() * H, vx: 0, vy: 0, a: prev ? prev.a : Math.random() * Math.PI, c });
    }
    built = true;
  }
  function burst(cx, cy, power) {
    P.forEach(p => {
      const dx = p.x - cx, dy = p.y - cy, dd = Math.hypot(dx, dy) || 1, f = power * (0.5 + Math.random()) * Math.max(.35, 1 - dd / (W * .9));
      p.vx += dx / dd * f + (Math.random() - .5) * 3; p.vy += dy / dd * f + (Math.random() - .5) * 3;
    });
  }
  const pos = e => { const b = cv.getBoundingClientRect(); mx = e.clientX - b.left; my = e.clientY - b.top; };
  cv.addEventListener('pointerenter', e => { if (e.pointerType !== 'mouse' || reduce) return; pos(e); free = true; burst(mx, my, 11); hint.textContent = 'move away to rebuild'; });
  cv.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') pos(e); });
  cv.addEventListener('pointerleave', e => { if (e.pointerType !== 'mouse') return; mx = my = -999; free = false; hint.textContent = 'hover to scatter'; });
  cv.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' || reduce) return;
    pos(e); free = !free; if (free) burst(mx, my, 11); hint.textContent = free ? 'tap to rebuild' : 'tap to scatter'; mx = my = -999;
  });
  if (matchMedia('(pointer:coarse)').matches) hint.textContent = 'tap to scatter';
  if (matchMedia('(pointer:coarse)').matches) { const ph = document.getElementById('pingHint'); if (ph) ph.textContent = 'tap anywhere to send some bits'; }
  new IntersectionObserver(es => es.forEach(en => {
    visible = en.isIntersecting;
    if (visible && !built) build();
    if (visible && free && !cv.matches(':hover')) setTimeout(() => { if (!cv.matches(':hover')) free = false; }, 250);
  }), { threshold: .25 }).observe(cv);
  let lw = innerWidth; addEventListener('resize', () => { if (built && innerWidth !== lw) { lw = innerWidth; build(); } });
  if (reduce) { free = false; }
  function frame() {
    requestAnimationFrame(frame);
    if (!visible || !built) return;
    ctx.clearRect(0, 0, W, H);
    const paths = {}; [AQUA, PALE, YEL, SILVER, DIM, KEY].forEach(c => paths[c] = new Path2D());
    for (const p of P) {
      if (reduce) { p.x = p.hx; p.y = p.hy; p.a = p.ha; }
      else {
        if (!free) { p.vx += (p.hx - p.x) * .045; p.vy += (p.hy - p.y) * .045; }
        const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
        if (d2 < 9000) { const dd = Math.sqrt(d2) || 1, f = (95 - dd) / 95 * 2.2; p.vx += dx / dd * f; p.vy += dy / dd * f; }
        const fr = free ? .94 : .84; p.vx *= fr; p.vy *= fr; p.x += p.vx; p.y += p.vy;
        if (p.x < 2 || p.x > W - 2) { p.vx *= -.5; p.x = Math.min(W - 2, Math.max(2, p.x)); }
        if (p.y < 2 || p.y > H - 2) { p.vy *= -.5; p.y = Math.min(H - 2, Math.max(2, p.y)); }
        p.a += (p.vx - p.vy) * .03;
        if (!free) p.a += (p.ha - p.a) * .06;
      }
      const ca = Math.cos(p.a) * 1.25, sa = Math.sin(p.a) * 1.25, pa = paths[p.c];
      pa.moveTo(p.x - ca, p.y - sa); pa.lineTo(p.x + ca, p.y + sa);
    }
    ctx.lineCap = 'round'; ctx.lineWidth = 1.45;
    for (const c in paths) { ctx.strokeStyle = c; ctx.stroke(paths[c]); }
  }
  frame();
})();

/* footer */
(function () {
  const t0 = Date.now(), tEl = document.getElementById('ftTime'), uEl = document.getElementById('ftUp');
  if (!tEl) return;
  const f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const pad = n => String(n).padStart(2, '0');
  const tick = () => { tEl.textContent = f.format(new Date()) + ' GST'; const s = Math.floor((Date.now() - t0) / 1000); uEl.textContent = pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60); };
  tick(); setInterval(tick, 1000);
  const mark = document.getElementById('ftMark'), st = { r: 0 };
  const setR = v => mark.style.setProperty('--fr', v.toFixed(0) + 'px');
  const tw = to => { if (window.gsap && !reduce) gsap.to(st, { r: to, duration: to ? .6 : .9, ease: 'power3.out', onUpdate: () => setR(st.r) }); else setR(st.r = to); };
  const mv = e => { const b = mark.getBoundingClientRect(); mark.style.setProperty('--fx', (e.clientX - b.left) + 'px'); mark.style.setProperty('--fy', (e.clientY - b.top) + 'px'); };
  mark.addEventListener('pointerenter', e => { mv(e); tw(Math.max(120, mark.offsetHeight * .9)); });
  mark.addEventListener('pointermove', mv);
  mark.addEventListener('pointerleave', () => tw(0));
  if (window.ScrollTrigger && !reduce) {
    ScrollTrigger.create({ trigger: mark, start: 'top 95%', end: 'bottom bottom', scrub: true, onUpdate: s => { if (!mark.matches(':hover')) { mark.style.setProperty('--fx', (s.progress * 100).toFixed(1) + '%'); mark.style.setProperty('--fy', '60%'); setR(s.progress * mark.offsetHeight * .7); } } });
    gsap.from('.ft-col', { y: 40, opacity: 0, stagger: .08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.ft-grid', start: 'top 92%', toggleActions: 'play none none reverse' } });
  }
})();

/* data stream background */
(function rain() {
  const c = document.getElementById('rain'), x = c.getContext('2d');
  const FS = 15, CW = 19;
  const GL = '0123456789ABCDEF0123456789ABCDEF<>/{}:.=#';
  const WORDS = ['SYN', 'ACK', 'TTL64', '0x45', 'GET', '200', '10.0.0.7', 'ICMP', 'ARP', 'VLAN10', 'OSPF', 'DNS', '443', 'TCP', 'UDP', 'MAC', '/24'];
  let W, H, cols, drops, speed, queue;
  function size() {
    W = c.width = innerWidth; H = c.height = innerHeight;
    cols = Math.ceil(W / CW);
    drops = Array.from({ length: cols }, () => Math.random() * -H / FS);
    speed = Array.from({ length: cols }, () => .35 + Math.random() * .75);
    queue = Array.from({ length: cols }, () => '');
    x.fillStyle = '#090d0b'; x.fillRect(0, 0, W, H);
  }
  size();
  let lastW = innerWidth, lastH = innerHeight;
  addEventListener('resize', () => { if (innerWidth !== lastW || Math.abs(innerHeight - lastH) > 160) { lastW = innerWidth; lastH = innerHeight; size(); } });
  let mx = -999, my = -999, lastY = scrollY, vel = 0;
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; });
  addEventListener('pointerleave', () => { mx = my = -999; });
  addEventListener('scroll', () => { vel = Math.min(6, vel + Math.abs(scrollY - lastY) * .02); lastY = scrollY; }, { passive: true });
  x.font = `500 ${FS - 2}px "IBM Plex Mono", ui-monospace, monospace`; x.textBaseline = 'top';
  function nextChar(i) {
    if (!queue[i] && Math.random() < .012) queue[i] = WORDS[Math.floor(Math.random() * WORDS.length)];
    if (queue[i]) { const ch = queue[i][0]; queue[i] = queue[i].slice(1); return [ch, true]; }
    return [GL[Math.floor(Math.random() * GL.length)], false];
  }
  function draw(steps) {
    x.fillStyle = 'rgba(9,13,11,.11)'; x.fillRect(0, 0, W, H);
    x.font = `500 ${FS - 2}px "IBM Plex Mono", ui-monospace, monospace`;
    for (let i = 0; i < cols; i++) {
      const px = i * CW, py = Math.floor(drops[i]) * FS;
      const [ch, word] = nextChar(i);
      const near = Math.hypot(px - mx, py - my) < 140;
      x.fillStyle = near ? '#e9eef2' : word ? '#f2c230' : (Math.random() < .04 ? '#c9ffdb' : '#39f58a');
      x.globalAlpha = near ? 1 : word ? .95 : .55 + Math.random() * .25;
      x.fillText(ch, px, py);
      x.globalAlpha = 1;
      drops[i] += speed[i] * steps * (1 + vel) * (near ? 1.8 : 1);
      if (py > H && Math.random() > .975) { drops[i] = Math.random() * -20; speed[i] = .35 + Math.random() * .75; }
    }
    vel *= .92;
  }
  if (reduce) { for (let k = 0; k < 120; k++) draw(1); return; }
  let last = 0;
  (function loop(t) { if (t - last > 33) { draw(Math.min(3, (t - last) / 50)); last = t; } requestAnimationFrame(loop); })(0);
})();

/* ---------- 3D network ---------- */
const net = { ok: false };
(function(){
  if (!window.THREE) return;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('net'), antialias: true, alpha: true }); } catch (e) { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, innerWidth < 800 ? 1.5 : 2));
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 100); cam.position.set(0, 0, 12);
  const N = 150;
  const S = [], P = [], H = [];
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.39996;
    S.push(new THREE.Vector3(Math.cos(th) * r * 3.3, y * 3.3, Math.sin(th) * r * 3.3));
    const cols = 15, gx = i % cols, gz = Math.floor(i / cols);
    P.push(new THREE.Vector3((gx - 7) * 1.0, Math.sin(gx * 0.7) * 0.35 + Math.cos(gz * 0.9) * 0.3, (gz - 4.5) * 0.9));
    const t = i / N * Math.PI * 9;
    H.push(new THREE.Vector3(Math.cos(t + (i % 2) * Math.PI) * 1.6, (i / N - 0.5) * 7.5, Math.sin(t + (i % 2) * Math.PI) * 1.6));
  }
  const edges = [];
  const seen = new Set();
  for (let i = 0; i < N; i++) {
    const d = [];
    for (let j = 0; j < N; j++) if (j !== i) d.push([S[i].distanceToSquared(S[j]), j]);
    d.sort((a, b) => a[0] - b[0]);
    for (let k = 0; k < 3; k++) { const j = d[k][1], key = i < j ? i + '-' + j : j + '-' + i; if (!seen.has(key)) { seen.add(key); edges.push([i, j]); } }
  }
  const adj = Array.from({ length: N }, () => []);
  edges.forEach(([a, b], e) => { adj[a].push(e); adj[b].push(e); });

  const pos = new Float32Array(N * 3);
  const nodeGeo = new THREE.BufferGeometry(); nodeGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dot = document.createElement('canvas'); dot.width = dot.height = 64;
  const dx = dot.getContext('2d'); const g = dx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.35, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  dx.fillStyle = g; dx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(dot);
  const nodeMat = new THREE.PointsMaterial({ size: 0.16, map: tex, color: 0xd4f7e0, transparent: true, depthWrite: false, opacity: 1 });
  const lpos = new Float32Array(edges.length * 6);
  const lineGeo = new THREE.BufferGeometry(); lineGeo.setAttribute('position', new THREE.BufferAttribute(lpos, 3));
  const lineMat = new THREE.LineBasicMaterial({ color: 0x39f58a, transparent: true, opacity: 0.22, depthWrite: false });
  const PK = 46;
  const ppos = new Float32Array(PK * 3);
  const pGeo = new THREE.BufferGeometry(); pGeo.setAttribute('position', new THREE.BufferAttribute(ppos, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.2, map: tex, color: 0xf2c230, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const packets = Array.from({ length: PK }, () => { const e = Math.floor(Math.random() * edges.length); return { e, t: Math.random(), dir: Math.random() < .5 ? 1 : -1, sp: 0.4 + Math.random() * 0.6 }; });

  const outer = new THREE.Group(), tilt = new THREE.Group(), spin = new THREE.Group();
  outer.add(tilt); tilt.add(spin); scene.add(outer);
  spin.add(new THREE.LineSegments(lineGeo, lineMat), new THREE.Points(nodeGeo, nodeMat), new THREE.Points(pGeo, pMat));

  function resize() { renderer.setSize(innerWidth, innerHeight, false); cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); }
  addEventListener('resize', resize); resize();
  Object.assign(net, { ok: true, renderer, scene, cam, outer, tilt, spin, S, P, H, pos, lpos, ppos, edges, adj, packets, nodeGeo, lineGeo, pGeo, nodeMat, lineMat, pMat, N });
})();

/* keyframes: ws/wp/wh = shape weights; nx/ny = positions on narrow screens */
const K = {
  hero:  { ws:1, wp:0, wh:0, x:2.2, y:0, nx:0, ny:1.2, s:1, tilt:.25, op:1, nop:.6, spin:1 },
  about: { ws:1, wp:0, wh:0, x:4.2, y:.6, nx:0, ny:3.4, s:.7, tilt:.25, op:.55, nop:.3, spin:.6 },
  w0:    { ws:0, wp:1, wh:0, x:4, y:-2.4, nx:3, ny:-3.2, s:1, tilt:.75, op:.6, nop:.45, spin:0 },
  w1:    { ws:0, wp:1, wh:0, x:-4, y:-2.4, nx:-3, ny:-3.2, s:1, tilt:.75, op:.6, nop:.45, spin:0 },
  skills:{ ws:0, wp:0, wh:1, x:-6.4, y:0, nx:0, ny:2.5, s:.9, tilt:.15, op:.35, nop:.25, spin:.5 },
  jour:  { ws:0, wp:0, wh:1, x:-4.4, y:.4, nx:0, ny:3, s:.75, tilt:.15, op:.5, nop:.25, spin:.4 },
  end:   { ws:1, wp:0, wh:0, x:0, y:.2, nx:0, ny:.6, s:1.25, tilt:.25, op:.8, nop:.5, spin:1 }
};
const keys = Object.keys(K.hero);
const lerpK = (a, b, t) => { const o = {}; keys.forEach(k => o[k] = a[k] + (b[k] - a[k]) * t); return o; };
const ease = t => t * t * (3 - 2 * t);

/* ---------- page animations ---------- */
let pinST = null;
if (G) {
  const splitChars = el => { el.innerHTML = el.textContent.split(' ').map(w => '<span class="wd">' + [...w].map(c => `<span class="c" style="display:inline-block">${c}</span>`).join('') + '</span>').join(' '); };
  document.querySelectorAll('.name .ln').forEach(el => el.innerHTML = [...el.textContent].map(c => `<span>${c}</span>`).join(''));
  document.querySelectorAll('.split-c').forEach(splitChars);
  if (FINE && !reduce) document.querySelectorAll('.name .ln').forEach(ln => {
    const sp = [...ln.children];
    sp.forEach((s, i) => {
      s.addEventListener('pointerenter', () => {
        [[i, -18], [i - 1, -8], [i + 1, -8]].forEach(([j, d]) => { if (sp[j]) gsap.to(sp[j], { y: d, duration: .25, ease: 'power2.out', overwrite: 'auto' }); });
        s.classList.add('hot');
      });
      s.addEventListener('pointerleave', () => {
        [i - 1, i, i + 1].forEach(j => { if (sp[j]) gsap.to(sp[j], { y: 0, duration: .8, ease: 'elastic.out(1,.35)', delay: .05 }); });
        setTimeout(() => s.classList.remove('hot'), 350);
      });
    });
  });
  document.querySelectorAll('.scrub').forEach(el => {
    el.innerHTML = el.innerHTML.replace(/<em>(.*?)<\/em>/, (m, t) => t.split(' ').map(w => `<em class="w">${w}</em>`).join(' '))
      .split(/(<em class="w">.*?<\/em>)/).map(part => part.startsWith('<em') ? part : part.trim().split(/\s+/).filter(Boolean).map(w => `<span class="w">${w}</span>`).join(' ')).join(' ');
  });

  /* nav dissolves on the way down, returns on the way up */
  const navItems = gsap.utils.toArray('nav .mono-mark, nav .links a, nav #clock, nav .btn');
  const navTl = gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } })
    .to(navItems, reduce ? { opacity: 0, duration: .3 } : { yPercent: -160, opacity: 0, filter: 'blur(6px)', duration: .55, stagger: { each: .045, from: 'edges' } })
    .set('nav', { pointerEvents: 'none' });
  let navHidden = false;
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: self => {
    const y = self.scroll(), hide = self.direction === 1 && y > 140;
    if (hide && !navHidden) { navHidden = true; navTl.timeScale(1).play(); }
    else if ((self.direction === -1 || y < 140) && navHidden) { navHidden = false; gsap.set('nav', { pointerEvents: 'auto' }); navTl.timeScale(1.4).reverse(); }
  } });

  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('.name .ln span', { yPercent: 110, rotate: 6, stagger: .045, duration: 1.4, ease: 'expo.out', delay: BOOT + .1 });
    gsap.from('.fade', { y: 30, opacity: 0, stagger: .12, duration: 1.1, ease: 'expo.out', delay: BOOT + .6 });
    gsap.to('.name .one', { xPercent: -18, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.name .two', { xPercent: 14, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-row', { y: -60, opacity: 0, ease: 'none', scrollTrigger: { trigger: '#hero', start: '35% top', end: 'bottom top', scrub: true } });

    gsap.fromTo('.photo', { clipPath: 'inset(100% 0% 0% 0% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 20px)', ease: 'none', scrollTrigger: { trigger: '.photo', start: 'top 90%', end: 'top 35%', scrub: true } });
    gsap.fromTo('.photo img', { scale: 1.35, yPercent: 8 }, { scale: 1, yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.photo', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.fromTo('.photo .cap', { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.photo', start: 'top 45%', end: 'top 25%', scrub: true } });
    gsap.fromTo('.scrub .w', { opacity: .14 }, { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: '.scrub', start: 'top 80%', end: 'bottom 45%', scrub: true } });

    const fly = { up: { y: 60 }, right: { x: 120 }, left: { x: -120 }, zoom: { scale: .85, y: 40 } };
    document.querySelectorAll('[data-fly]').forEach(el => gsap.from(el, Object.assign({ opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } }, fly[el.dataset.fly])));
    document.querySelectorAll('[data-stagger]').forEach(el => gsap.from(el.children, { y: 30, opacity: 0, scale: .8, stagger: .05, duration: .8, ease: 'back.out(1.8)', scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } }));

    const track = document.querySelector('.track');
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    const lead = () => Math.max(0, innerWidth * .6 - dist());
    const endX = () => {
      if (dist() > 0) return -dist();
      const cs = getComputedStyle(track), pl = parseFloat(cs.paddingLeft), pr = parseFloat(cs.paddingRight);
      return Math.max(0, (innerWidth - (track.scrollWidth - pl - pr)) / 2 - pl);
    };
    const horiz = gsap.fromTo(track, { x: () => endX() + dist() + lead() }, { x: () => endX(), ease: 'none', scrollTrigger: { trigger: '#work', pin: true, scrub: 1, start: 'top top', end: () => '+=' + (dist() + lead() + innerHeight * .3), invalidateOnRefresh: true } });
    pinST = horiz.scrollTrigger;
    document.querySelectorAll('.pw').forEach(p => {
      gsap.from(p, { rotationY: -38, z: -200, opacity: 0, transformPerspective: 1200, transformOrigin: '0% 50%', ease: 'power2.out', scrollTrigger: { trigger: p, containerAnimation: horiz, start: 'left 102%', end: 'left 78%', scrub: true } });
      gsap.from(p.querySelector('.cover svg'), { rotate: -90, scale: .3, ease: 'power2.out', scrollTrigger: { trigger: p, containerAnimation: horiz, start: 'left 98%', end: 'left 70%', scrub: true } });
    });

    document.querySelectorAll('h2[data-scramble]').forEach(h => ScrollTrigger.create({ trigger: h, start: 'top 85%', onEnter: () => scramble(h) }));
    gsap.from('.term .l', { clipPath: 'inset(0 100% 0 0)', stagger: .18, duration: .5, ease: 'steps(18)', scrollTrigger: { trigger: '.term', start: 'top 80%', once: true } });

    gsap.to('.marquee .row', { xPercent: -30, ease: 'none', scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: true } });

    gsap.fromTo('.tl .fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.tl', start: 'top 70%', end: 'bottom 60%', scrub: true } });
    document.querySelectorAll('.tl .item').forEach(it => ScrollTrigger.create({ trigger: it, start: 'top 65%', toggleClass: { targets: it, className: 'on' } }));

    gsap.utils.toArray('.together .c').forEach(c => {
      gsap.fromTo(c, { x: gsap.utils.random(-300, 300), y: gsap.utils.random(-260, 260), rotate: gsap.utils.random(-120, 120), opacity: 0 },
        { x: 0, y: 0, rotate: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: '#contact', start: 'top 85%', end: 'top 20%', scrub: 1 } });
    });
    gsap.from('.reach .cell', { y: 50, opacity: 0, stagger: .1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.reach', start: 'top 92%', toggleActions: 'play none none reverse' } });
  });
}
if (!G || reduce) document.querySelectorAll('.tl .item').forEach(i => i.classList.add('on'));

/* scroll positions where the network changes shape */
const st = (el, pos) => G ? ScrollTrigger.create({ trigger: el, start: pos }) : null;
const M = G ? { a0: st('#about', 'top 90%'), a1: st('#about', 'top 20%'), w0: st('#work', 'top bottom'), wTop: st('#work', 'top top'),
  s1: st('#skills', 'top 20%'), j0: st('#journey', 'top bottom'), j1: st('#journey', 'top 30%'), c0: st('#contact', 'top bottom'), c1: st('#contact', 'top 15%') } : null;
let segs = null;
function buildSegs() {
  if (!M) return null;
  const ps = pinST ? pinST.start : M.wTop.start, pe = pinST ? pinST.end : ps + innerHeight;
  return [[M.a0.start, M.a1.start, K.hero, K.about], [M.w0.start, ps, K.about, K.w0], [ps, pe, K.w0, K.w1, 1],
    [pe, M.s1.start, K.w1, K.skills], [M.j0.start, M.j1.start, K.skills, K.jour], [M.c0.start, M.c1.start, K.jour, K.end]];
}
if (G) ScrollTrigger.addEventListener('refresh', () => segs = buildSegs());
function target(y) {
  if (!segs) segs = buildSegs();
  if (!segs) return K.hero;
  let s = K.hero;
  for (const [a, b, f, t, lin] of segs) {
    if (y >= b) { s = t; continue; }
    if (y > a) { const p = (y - a) / Math.max(1, b - a); s = lerpK(f, t, lin ? p : ease(p)); } else s = f;
    break;
  }
  return s;
}

if (net.ok) {
  const cur = Object.assign({}, K.hero);
  let last = performance.now(), time = 0, mx = 0, my = 0, smx = 0, smy = 0;
  addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });
  const v = new THREE.Vector3(), u = new THREE.Vector3(), push = new Float32Array(net.N);
  let hasMouse = false; addEventListener('pointermove', e => { if (e.pointerType === 'mouse') hasMouse = true; });
  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now; time += dt;
    const y = lenis ? lenis.scroll : scrollY;
    const tg = target(y), k = reduce ? 1 : 1 - Math.exp(-dt * 4.5);
    keys.forEach(n => cur[n] += (tg[n] - cur[n]) * k);
    const narrow = innerWidth < 800;
    net.outer.updateMatrixWorld(true);
    const mnx = hasMouse ? mx * 2 : 9, mny = -my * 2, asp = net.cam.aspect;
    for (let k = shocks.length - 1; k >= 0; k--) { shocks[k].t += dt * .9; if (shocks[k].t > 1) shocks.splice(k, 1); }
    for (let i = 0; i < net.N; i++) {
      v.set(0, 0, 0).addScaledVector(net.S[i], cur.ws).addScaledVector(net.P[i], cur.wp).addScaledVector(net.H[i], cur.wh);
      if (!reduce) v.y += Math.sin(time * 1.3 + i * .5) * .04;
      if ((hasMouse || shocks.length) && !reduce) {
        u.copy(v).applyMatrix4(net.spin.matrixWorld).project(net.cam);
        const d = Math.hypot((u.x - mnx) * asp, u.y - mny), tgt = d < .5 ? (.5 - d) / .5 : 0;
        let sh = 0;
        for (const s of shocks) { const ds = Math.hypot((u.x - s.x) * asp, u.y - s.y), r = s.t * 2.2; if (Math.abs(ds - r) < .18) sh = Math.max(sh, (1 - Math.abs(ds - r) / .18) * (1 - s.t)); }
        push[i] += (Math.max(tgt, sh * 1.4) - push[i]) * .18;
        v.multiplyScalar(1 + push[i] * .5);
      }
      net.pos[i * 3] = v.x; net.pos[i * 3 + 1] = v.y; net.pos[i * 3 + 2] = v.z;
    }
    net.edges.forEach(([a, b], e) => { net.lpos.set([net.pos[a*3], net.pos[a*3+1], net.pos[a*3+2], net.pos[b*3], net.pos[b*3+1], net.pos[b*3+2]], e * 6); });
    net.packets.forEach((p, i) => {
      if (!reduce) p.t += dt * p.sp * .9;
      if (p.t >= 1) {
        const [a, b] = net.edges[p.e], end = p.dir > 0 ? b : a, opts = net.adj[end];
        p.e = opts[Math.floor(Math.random() * opts.length)]; p.t = 0; p.dir = net.edges[p.e][0] === end ? 1 : -1;
      }
      const [a, b] = net.edges[p.e], tt = p.dir > 0 ? p.t : 1 - p.t;
      for (let c = 0; c < 3; c++) net.ppos[i * 3 + c] = net.pos[a * 3 + c] + (net.pos[b * 3 + c] - net.pos[a * 3 + c]) * tt;
    });
    net.nodeGeo.attributes.position.needsUpdate = true; net.lineGeo.attributes.position.needsUpdate = true; net.pGeo.attributes.position.needsUpdate = true;
    const op = narrow ? cur.nop : cur.op;
    net.nodeMat.opacity = op; net.lineMat.opacity = .24 * op; net.pMat.opacity = op;
    const base = Math.min(1, Math.max(.55, net.cam.aspect / 1.5));
    net.outer.position.set(narrow ? cur.nx : cur.x, narrow ? cur.ny : cur.y, 0);
    net.outer.scale.setScalar(cur.s * base);
    smx += (mx - smx) * .05; smy += (my - smy) * .05;
    net.tilt.rotation.x = cur.tilt + smy * .3;
    net.tilt.rotation.z = smx * -.1;
    if (!reduce) net.spin.rotation.y += dt * .18 * cur.spin;
    net.renderer.render(net.scene, net.cam);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
if (G) addEventListener('load', () => ScrollTrigger.refresh());
})();
