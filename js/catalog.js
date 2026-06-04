'use strict';
/* ── Catalog Page Logic ────────────────────────────────────── */
window._isCatalogPage = true;

let _books = [];
const CAT_ORDER_DEFAULT = ['Journal','Poetry','Fiction','Non-Fiction','Biography','Inspirational','Anthology',"Children's Literature",'General Reference'];

/* ── Search predictions (called by components.js) ── */
window._catalogSearch = function(v) {
  const pred = document.getElementById('searchPreds');
  if (!pred) return;
  if (v.length > 0) {
    const q = v.toLowerCase();
    const m = _books.filter(b =>
      b.title.toLowerCase().includes(q) || (authorDisplay(b) || '').toLowerCase().includes(q)
    ).slice(0, 7);
    if (m.length) {
      pred.innerHTML = m.map(b => `<div class="pred-item" role="option" tabindex="0"
        onclick="viewBook('${b.id}');closePreds()"
        onkeydown="if(event.key==='Enter'){viewBook('${b.id}');closePreds()}">
        <div class="pred-title">${b.title}</div>
        <div class="pred-meta">${authorDisplay(b) || 'Various'} · ${b.year} · ₱${Number(b.price).toLocaleString()}</div>
      </div>`).join('');
      pred.style.display = 'block';
    } else pred.style.display = 'none';
  } else pred.style.display = 'none';
};

/* ── Bookshelf Rendering ── */
function renderShelves(books, genreFilter) {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;
  if (!books.length) {
    grid.innerHTML = `<div class="no-results"><div class="nr-icon" aria-hidden="true">◌</div><h3>No titles found</h3><p>Try adjusting your filters.</p></div>`;
    return;
  }

  const catOrder = [...new Set(books.map(b => b.category))].sort((a, b) => {
    const ai = CAT_ORDER_DEFAULT.indexOf(a), bi = CAT_ORDER_DEFAULT.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  const grouped = {};
  catOrder.forEach(c => grouped[c] = []);
  books.forEach(b => { if (grouped[b.category]) grouped[b.category].push(b); });

  if (grouped['Journal']) grouped['Journal'].sort((a, b) => (b.issueNum || 0) - (a.issueNum || 0));

  let html = '';
  catOrder.forEach(cat => {
    const catBooks = grouped[cat];
    if (!catBooks || !catBooks.length) return;
    if (genreFilter !== 'All' && cat !== genreFilter) return;

    const rows = [];
    for (let i = 0; i < catBooks.length; i += BOOKS_PER_SHELF) rows.push(catBooks.slice(i, i + BOOKS_PER_SHELF));

    html += `<div class="shelf-section" data-cat="${cat}" role="listitem">
      <div class="shelf-header">
        <h2 class="shelf-cat-title">${cat}</h2>
        <span class="shelf-count">${catBooks.length} title${catBooks.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="shelf-wrap">
        ${rows.map((row, ri) => `
          <div class="shelf-row-books" role="list" aria-label="${cat} — row ${ri + 1}">
            ${row.map(renderCard).join('')}
          </div>
          <div class="shelf-plank" aria-hidden="true"></div>
        `).join('')}
      </div>
    </div>`;
  });

  grid.innerHTML = html || `<div class="no-results"><div class="nr-icon">◌</div><h3>No titles found</h3><p>Try adjusting your filters.</p></div>`;
}

function renderCard(b) {
  const ad = authorDisplay(b);
  const imgSrc = b.img || '';
  return `<article class="book-card" role="listitem" onclick="viewBook('${b.id}')"
    tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ')viewBook('${b.id}')"
    aria-label="${b.title}${ad ? ' by ' + ad : ''}">
    <div class="book-cover-wrap">
      ${imgSrc ? `<img class="book-cover-img" src="${imgSrc}" alt="Cover of ${b.title}"
           loading="lazy" decoding="async"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : ''}
      <div class="bk-placeholder" style="${imgSrc ? 'display:none' : 'display:flex'}" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" opacity=".35"><path d="${_SVG.book}"/></svg>
        <span class="ph-t">${b.title}</span>
      </div>
    </div>
    <div class="book-meta-area">
      <div class="book-title-txt">${b.title}</div>
      ${ad ? `<div class="book-author-txt">${ad}</div>` : ''}
      <div class="book-price-txt">₱${Number(b.price).toLocaleString()}</div>
    </div>
  </article>`;
}

/* ── View Book ── */
window.viewBook = function(id) {
  const b = _books.find(x => x.id === id);
  if (!b) return;
  const ad = authorDisplay(b);

  document.getElementById('mCategory').textContent = b.category;
  document.getElementById('mTitle').textContent = b.title;

  const mA = document.getElementById('mAuthor');
  if (ad) { mA.textContent = ad; mA.style.display = ''; } else mA.style.display = 'none';

  document.getElementById('mPrice').textContent = `₱${Number(b.price).toLocaleString()}`;
  document.getElementById('mYear').textContent = b.year;
  document.getElementById('mLang').textContent = b.lang || '—';
  document.getElementById('mBlurb').textContent = b.blurb;
  document.getElementById('mStock').innerHTML = stockHtml(b);

  const iw = document.getElementById('mIsbnWrap');
  if (b.isbn && b.isbn.trim()) { document.getElementById('mISBN').textContent = b.isbn; iw.style.display = ''; }
  else iw.style.display = 'none';

  const gw = document.getElementById('mGumroadWrap');
  if (b.gumroad) { document.getElementById('mGumroadBtn').href = b.gumroad; gw.style.display = ''; }
  else gw.style.display = 'none';

  const cv = document.getElementById('mCover'), ph = cv.nextElementSibling;
  if (b.img) { cv.src = b.img; cv.style.display = ''; ph.style.display = 'none'; cv.onerror = () => { cv.style.display = 'none'; ph.style.display = 'flex'; }; }
  else { cv.style.display = 'none'; ph.style.display = 'flex'; }

  openModal('detailModal');
};

/* ── View Author ── */
window.viewAuthor = function(name) {
  const allAuthors = typeof AUTHORS !== 'undefined' ? AUTHORS : [];
  const a = allAuthors.find(x => x.name === name);
  if (!a) return;
  const key = a.name.split(',')[0].split('(')[0].trim();
  const books = _books.filter(b => (b.author && b.author.includes(key)) || (b.editor && b.editor.includes(key)));

  document.getElementById('amAvatar').innerHTML = a.img
    ? `<img src="${a.img}" alt="${a.name}" loading="lazy" onerror="this.parentElement.textContent='${initials(a.name)}'">`
    : initials(a.name);
  document.getElementById('amName').textContent = a.name;
  document.getElementById('amBio').textContent = a.bio;
  document.getElementById('amBooks').innerHTML = books.length
    ? books.map(b => `<div role="listitem" onclick="closeModal('authorModal');viewBook('${b.id}')" style="cursor:pointer" tabindex="0" onkeydown="if(event.key==='Enter'){closeModal('authorModal');viewBook('${b.id}')}">
        <div style="aspect-ratio:2/3;background:var(--ash-light);border-radius:2px 8px 8px 2px;overflow:hidden;box-shadow:var(--shadow-book);margin-bottom:.4rem">
          ${b.img ? `<img src="${b.img}" alt="${b.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover" onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;color:var(--sepia);font-size:.6rem;text-align:center;padding:.3rem\\'>${b.title}</div>'">` : `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--sepia);font-size:.6rem;text-align:center;padding:.3rem">${b.title}</div>`}
        </div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:var(--fs-sm);line-height:1.2;color:var(--ink)">${b.title}</div>
      </div>`).join('')
    : '<p style="color:var(--sepia);font-style:italic">No listed publications.</p>';
  openModal('authorModal');
};

/* ── Filters ── */
window.applyFilters = function() {
  const min = document.getElementById('minPrice')?.value;
  const max = document.getElementById('maxPrice')?.value;
  const activeTag = document.querySelector('.genre-tag.active');
  const genre = activeTag ? activeTag.dataset.genre : 'All';
  const input = document.getElementById('searchInput');
  const q = input ? input.value.toLowerCase().trim() : '';

  const filtered = _books.filter(b => {
    const mY = yearFilter === 'All' || b.year.toString() === yearFilter;
    const mMn = !min || Number(b.price) >= parseInt(min);
    const mMx = !max || Number(b.price) <= parseInt(max);
    const mQ = !q || b.title.toLowerCase().includes(q) || (b.author || '').toLowerCase().includes(q) || (b.editor || '').toLowerCase().includes(q);
    return mY && mMn && mMx && mQ;
  });
  renderShelves(filtered, genre);
};

window.filterByGenre = function(g, el) {
  document.querySelectorAll('.genre-tag').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-pressed', 'false'); });
  el.classList.add('active'); el.setAttribute('aria-pressed', 'true');
  applyFilters();
};

window.toggleFilter = function() {
  const dd = document.getElementById('filterDropdown');
  if (!dd) return;
  const open = dd.classList.toggle('show');
  const btn = document.getElementById('filterBtn');
  if (btn) btn.setAttribute('aria-expanded', open);
};

window.toggleYearOpts = function() {
  const o = document.getElementById('yearOpts');
  if (!o) return;
  const open = o.classList.toggle('show');
  const btn = document.getElementById('yearBtn');
  if (btn) btn.setAttribute('aria-expanded', open);
};

window.selectYear = function(y) {
  yearFilter = y;
  const lbl = document.getElementById('yearLabel');
  if (lbl) lbl.textContent = y === 'All' ? 'All Years' : y;
  const o = document.getElementById('yearOpts');
  if (o) o.classList.remove('show');
  applyFilters();
};

window.resetFilters = function() {
  yearFilter = 'All';
  const lbl = document.getElementById('yearLabel');
  if (lbl) lbl.textContent = 'All Years';
  const mp = document.getElementById('minPrice'); if (mp) mp.value = '';
  const mx = document.getElementById('maxPrice'); if (mx) mx.value = '';
  document.querySelectorAll('.genre-tag').forEach(t => t.classList.remove('active'));
  const first = document.querySelector('.genre-tag');
  if (first) { first.classList.add('active'); first.setAttribute('aria-pressed', 'true'); }
  clearSearch();
  applyFilters();
};

/* ── Init ── */
document.addEventListener('DOMContentLoaded', async () => {
  injectNav('catalog');
  injectBackToTop();
  initTheme();
  initBurgerMenu();
  initScrollHandlers();

  // Load data
  _books = await SheetsCMS.getBooks().catch(() => typeof BOOKS !== 'undefined' ? BOOKS : []);

  // Year options
  const years = [...new Set(_books.map(b => b.year))].sort().reverse();
  const yearOpts = document.getElementById('yearOpts');
  if (yearOpts) {
    yearOpts.innerHTML = `<div class="cs-opt" onclick="selectYear('All')">All Years</div>` +
      years.map(y => `<div class="cs-opt" onclick="selectYear('${y}')">${y}</div>`).join('');
  }

  // Genre cloud
  const genres = ['All', ...new Set(_books.map(b => b.category))].sort((a, b) => a === 'All' ? -1 : a.localeCompare(b));
  const gc = document.getElementById('genreCloud');
  if (gc) {
    gc.innerHTML = genres.map(g =>
      `<button class="genre-tag${g === 'All' ? ' active' : ''}" data-genre="${g}" aria-pressed="${g === 'All'}">${g}</button>`
    ).join('');
    gc.addEventListener('click', e => {
      const btn = e.target.closest('.genre-tag');
      if (btn) filterByGenre(btn.dataset.genre, btn);
    });
  }

  // Render
  renderShelves(_books, 'All');

  // Handle URL params
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q) {
    const input = document.getElementById('searchInput');
    if (input) { input.value = q; handleSearch(); }
  }
  const bookId = params.get('book');
  if (bookId) viewBook(bookId);

  // Filter dropdown — close on outside click
  document.addEventListener('click', e => {
    const fd = document.getElementById('filterDropdown');
    const fb = document.getElementById('filterBtn');
    if (fd && !fd.contains(e.target) && fb && !fb.contains(e.target)) {
      fd.classList.remove('show');
      if (fb) fb.setAttribute('aria-expanded', 'false');
    }
    const yo = document.getElementById('yearOpts');
    const yb = document.getElementById('yearBtn');
    if (yo && !yo.contains(e.target) && yb && !yb.contains(e.target)) {
      yo.classList.remove('show');
      if (yb) yb.setAttribute('aria-expanded', 'false');
    }
  });
});
