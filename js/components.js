'use strict';
/* ── Shared Components — Nav, Footer, Theme, Utilities ─────── */

/* ── SVG icon paths (from original) ── */
const _SVG = {
  book:    'M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1z',
  info:    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
  people:  'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  edit:    'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  coffee:  'M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z',
  cal:     'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z',
  mail:    'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  cart:    'M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.9 18 9 18h12v-2H9.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.45 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z',
  burger:  'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  search:  'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z',
  sun:     'M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z',
  moon:    'M9.37 5.51A7.35 7.35 0 009.1 7.5c0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27A7.014 7.014 0 0112 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z',
  up:      'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z',
  filter:  'M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z'
};
const _icon = (path, w=17, h=17) => `<svg viewBox="0 0 24 24" width="${w}" height="${h}" fill="currentColor"><path d="${path}"/></svg>`;
const _bmIcon = (path) => `<svg class="bm-icon" viewBox="0 0 24 24"><path d="${path}"/></svg>`;

/* ── Nav items config ── */
const _NAV_ITEMS = [
  {section:'Catalog',   items:[{key:'catalog', label:'All Publications', icon:_SVG.book, href:'index.html'}]},
  {section:'About',     items:[
    {key:'about',   label:'About Us',   icon:_SVG.info,   href:'about.html'},
    {key:'team',    label:'Our Team',   icon:_SVG.people, href:'team.html'},
    {key:'authors', label:'Authors',    icon:_SVG.edit,   href:'authors.html'}
  ]},
  {section:'Community', items:[
    {key:'news',    label:'News',          icon:_SVG.coffee, href:'news.html'},
    {key:'events',  label:'Events',        icon:_SVG.cal,    href:'events.html'},
    {key:'contact', label:'Contact Us',    icon:_SVG.mail,   href:'contact.html'},
    {key:'order',   label:'How to Order',  icon:_SVG.cart,   href:'order.html'}
  ]}
];

/* ── Inject Navigation ── */
function injectNav(activePage) {
  const container = document.getElementById('navContainer');
  if (!container) return;

  // Burger backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'burger-backdrop';
  backdrop.id = 'burgerBackdrop';
  backdrop.onclick = closeBurgerMenu;

  // Burger menu
  let burgerHTML = '';
  _NAV_ITEMS.forEach(group => {
    burgerHTML += `<div class="bm-section">${group.section}</div>`;
    group.items.forEach(item => {
      const active = item.key === activePage ? ' active' : '';
      burgerHTML += `<a class="bm-btn${active}" href="${item.href}">${_bmIcon(item.icon)} ${item.label}</a>`;
    });
  });

  const burgerMenu = document.createElement('nav');
  burgerMenu.className = 'burger-menu';
  burgerMenu.id = 'burgerMenu';
  burgerMenu.setAttribute('aria-label', 'Main navigation');
  burgerMenu.setAttribute('aria-hidden', 'true');
  burgerMenu.innerHTML = burgerHTML;

  // Topbar
  const topbar = document.createElement('header');
  topbar.className = 'topbar';
  topbar.id = 'topbar';
  topbar.setAttribute('role', 'banner');
  topbar.innerHTML = `
    <button class="topbar-burger" id="burgerBtn" aria-label="Open navigation" aria-expanded="false">
      ${_icon(_SVG.burger)}
    </button>
    <a class="topbar-brand" href="index.html" aria-label="San Anselmo Publications home">
      <img src="images/San Anselmo Press logo.webp" class="topbar-logo" alt="SAP Logo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <div class="topbar-logo-fallback" style="display:none" aria-hidden="true">S</div>
    </a>
    <a class="topbar-center" href="index.html">
      <span class="topbar-center-name">San Anselmo Publications</span>
    </a>
    <div class="topbar-right">
      <div class="topbar-search" role="search">
        ${_icon(_SVG.search, 13, 13)}
        <input type="text" id="searchInput" placeholder="Search titles…" autocomplete="off" oninput="handleSearch()" aria-label="Search publications">
        <button class="clear-btn" id="clearBtn" onclick="clearSearch()" aria-label="Clear search" style="display:none">×</button>
        <div class="search-predictions" id="searchPreds" role="listbox"></div>
      </div>
      <button id="mobileSearchBtn" onclick="toggleMobileSearch()" aria-label="Toggle search" aria-expanded="false" style="display:none">
        ${_icon(_SVG.search, 20, 20)}
      </button>
      ${activePage === 'catalog' ? `
      <div class="filter-wrap">
        <button class="tb-icon" id="filterBtn" onclick="toggleFilter()" aria-label="Filters" aria-expanded="false">
          ${_icon(_SVG.filter, 15, 15)}
        </button>
        <div class="filter-dropdown" id="filterDropdown">
          <div class="f-row">
            <label>Year</label>
            <div class="cs-wrap">
              <button class="cs-btn" id="yearBtn" onclick="toggleYearOpts()" aria-expanded="false">
                <span id="yearLabel">All Years</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
              </button>
              <div class="cs-opts" id="yearOpts" role="listbox"></div>
            </div>
          </div>
          <div class="f-row">
            <label>Price Range (₱)</label>
            <div class="f-price">
              <input class="f-input" id="minPrice" type="number" placeholder="Min" onchange="applyFilters()">
              <input class="f-input" id="maxPrice" type="number" placeholder="Max" onchange="applyFilters()">
            </div>
          </div>
          <button class="f-reset" onclick="resetFilters()">Reset All</button>
        </div>
      </div>` : ''}
      <button class="tb-icon" onclick="toggleTheme()" aria-label="Toggle dark mode">
        <span id="iconSun">${_icon(_SVG.sun, 15, 15)}</span>
        <span id="iconMoon" style="display:none">${_icon(_SVG.moon, 15, 15)}</span>
      </button>
    </div>`;

  container.appendChild(backdrop);
  container.appendChild(burgerMenu);
  container.appendChild(topbar);
}

/* ── Inject Back To Top ── */
function injectBackToTop() {
  const c = document.getElementById('backToTopContainer');
  if (!c) return;
  c.innerHTML = `<button class="back-to-top" id="backToTop" aria-label="Back to top">
    ${_icon(_SVG.up)}
  </button>`;
  const btn = document.getElementById('backToTop');
  if (btn) btn.addEventListener('click', () => {
    const mc = document.getElementById('mainContent');
    if (mc && mc.scrollTop > 0) mc.scrollTo({top:0,behavior:'smooth'});
    else window.scrollTo({top:0,behavior:'smooth'});
  });
}

/* ── Theme ── */
function initTheme() {
  if (localStorage.getItem('sap-theme') === 'dark') {
    isDark = true;
    document.body.classList.add('dark');
    const sun = document.getElementById('iconSun');
    const moon = document.getElementById('iconMoon');
    if (sun) sun.style.display = 'none';
    if (moon) moon.style.display = '';
  }
}

function toggleTheme() {
  isDark = !isDark;
  document.body.classList.toggle('dark', isDark);
  const sun = document.getElementById('iconSun');
  const moon = document.getElementById('iconMoon');
  if (sun) sun.style.display = isDark ? 'none' : '';
  if (moon) moon.style.display = isDark ? '' : 'none';
  localStorage.setItem('sap-theme', isDark ? 'dark' : 'light');
}

/* ── Burger Menu ── */
function initBurgerMenu() {
  const btn = document.getElementById('burgerBtn');
  if (btn) btn.addEventListener('click', toggleBurgerMenu);
}

function toggleBurgerMenu() {
  const menu = document.getElementById('burgerMenu');
  const btn = document.getElementById('burgerBtn');
  const bd = document.getElementById('burgerBackdrop');
  if (!menu) return;
  const open = menu.classList.contains('open');
  if (open) { closeBurgerMenu(); }
  else {
    menu.classList.add('open');
    if (btn) { btn.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
    if (bd) bd.classList.add('show');
    menu.removeAttribute('aria-hidden');
  }
}

function closeBurgerMenu() {
  const menu = document.getElementById('burgerMenu');
  const btn = document.getElementById('burgerBtn');
  const bd = document.getElementById('burgerBackdrop');
  if (menu) { menu.classList.remove('open'); menu.setAttribute('aria-hidden','true'); }
  if (btn) { btn.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
  if (bd) bd.classList.remove('show');
}

/* ── Scroll Handlers ── */
function initScrollHandlers() {
  const handler = () => {
    const mc = document.getElementById('mainContent');
    const sy = (mc ? mc.scrollTop : 0) || window.scrollY || document.documentElement.scrollTop;
    const btt = document.getElementById('backToTop');
    const tb = document.getElementById('topbar');
    if (btt) btt.classList.toggle('show', sy > 400);
    if (tb) tb.classList.toggle('scrolled', sy > 20);
  };
  const mc = document.getElementById('mainContent');
  if (mc) mc.addEventListener('scroll', handler);
  window.addEventListener('scroll', handler);
}

/* ── Helpers ── */
function initials(n) {
  return n.replace(/Atty\.\s*/, '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function authorDisplay(b) {
  if (b.editor && !b.author) return 'Ed. ' + b.editor;
  if (b.author) {
    if (/\(ed\.\)/i.test(b.author)) return 'Ed. ' + b.author.replace(/\s*\(ed\.\)\s*/i, '').trim();
    return b.author;
  }
  if (b.editor) return 'Ed. ' + b.editor;
  return null;
}

function stockHtml(b) {
  if (b.stock === 0 || (b.note && b.note.toLowerCase().includes('sold out'))) {
    const sub = b.note && b.note.includes('2nd') ? ' — Awaiting 2nd Printing' : '';
    return `<span class="badge-label badge-soldout">Sold Out${sub}</span>`;
  }
  if (b.stock === -2 || (b.note && b.note.toLowerCase().includes('not available')))
    return `<span class="badge-label badge-unavail">Currently Not Available</span>`;
  return `<span class="badge-label badge-avail">Available</span>`;
}

/* ── Modals ── */
function openModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
}

/* Global modal listeners */
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', e => {
    const overlay = e.target.closest('.modal-overlay');
    if (overlay && e.target === overlay) closeModal(overlay.id);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
    }
  });
});

/* ── Search (redirect to catalog on non-catalog pages) ── */
function handleSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  const v = input.value;
  document.getElementById('clearBtn').style.display = v ? 'block' : 'none';

  // If we're NOT on the catalog page and user has typed, redirect
  if (!window._isCatalogPage && v.length > 2) {
    window.location.href = 'index.html?q=' + encodeURIComponent(v);
    return;
  }

  // Catalog page handles its own predictions via catalog.js
  if (typeof window._catalogSearch === 'function') window._catalogSearch(v);

  // Apply filters on the catalog grid in real-time
  if (window._isCatalogPage && typeof window.applyFilters === 'function') {
    window.applyFilters();
  }
}

function closePreds() {
  const p = document.getElementById('searchPreds');
  if (p) p.style.display = 'none';
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  if (input) input.value = '';
  const cb = document.getElementById('clearBtn');
  if (cb) cb.style.display = 'none';
  closePreds();

  // Reset grid filters
  if (window._isCatalogPage && typeof window.applyFilters === 'function') {
    window.applyFilters();
  }
}

function toggleMobileSearch() {
  const bar = document.querySelector('.topbar-search');
  if (!bar) return;
  const isOpen = bar.classList.toggle('mobile-open');
  const mb = document.getElementById('mobileSearchBtn');
  if (mb) mb.setAttribute('aria-expanded', isOpen);
  if (isOpen) setTimeout(() => { const i = document.getElementById('searchInput'); if (i) i.focus(); }, 50);
  else closePreds();
}

/* Close mobile search on outside click */
document.addEventListener('click', e => {
  const bar = document.querySelector('.topbar-search');
  const mBtn = document.getElementById('mobileSearchBtn');
  if (bar && !bar.contains(e.target) && !(mBtn && mBtn.contains(e.target))) {
    closePreds();
    if (bar.classList.contains('mobile-open')) {
      bar.classList.remove('mobile-open');
      if (mBtn) mBtn.setAttribute('aria-expanded', 'false');
    }
  }
});

