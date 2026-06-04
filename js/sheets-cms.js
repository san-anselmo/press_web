'use strict';
/* ── Google Sheets CSV CMS Module ──────────────────────────── */
const SheetsCMS = {
  CACHE_TTL: 3600000, // 1 hour

  /* Configure these with your published Google Sheets CSV URLs */
  URLS: {
    books:   '',
    authors: '',
    team:    '',
    events:  ''
  },

  /** Parse CSV text into array of objects. Handles quoted fields, commas inside quotes, escaped quotes. */
  parseCSV(csv) {
    const lines = [];
    let cur = '';
    let inQuote = false;
    for (let i = 0; i < csv.length; i++) {
      const ch = csv[i];
      if (inQuote) {
        if (ch === '"' && csv[i + 1] === '"') { cur += '"'; i++; }
        else if (ch === '"') { inQuote = false; }
        else { cur += ch; }
      } else {
        if (ch === '"') { inQuote = true; }
        else if (ch === '\n' || (ch === '\r' && csv[i + 1] === '\n')) {
          lines.push(cur);
          cur = '';
          if (ch === '\r') i++;
        } else { cur += ch; }
      }
    }
    if (cur.trim()) lines.push(cur);
    if (!lines.length) return [];

    const splitRow = (row) => {
      const cols = [];
      let field = '';
      let q = false;
      for (let i = 0; i < row.length; i++) {
        const c = row[i];
        if (q) {
          if (c === '"' && row[i + 1] === '"') { field += '"'; i++; }
          else if (c === '"') { q = false; }
          else { field += c; }
        } else {
          if (c === '"') { q = true; }
          else if (c === ',') { cols.push(field); field = ''; }
          else { field += c; }
        }
      }
      cols.push(field);
      return cols;
    };

    const headers = splitRow(lines[0]).map(h => h.trim());
    const numericFields = new Set(['year','price','stock','issueNum']);
    return lines.slice(1).map(line => {
      const vals = splitRow(line);
      const obj = {};
      headers.forEach((h, i) => {
        let v = (vals[i] || '').trim();
        if (numericFields.has(h) && v !== '') { v = Number(v); if (isNaN(v)) v = vals[i].trim(); }
        obj[h] = v;
      });
      return obj;
    }).filter(obj => Object.values(obj).some(v => v !== ''));
  },

  getFromCache(key) {
    try {
      const ts = localStorage.getItem('sap-' + key + '-ts');
      if (!ts) return null;
      if (Date.now() - Number(ts) > this.CACHE_TTL) return null;
      const raw = localStorage.getItem('sap-' + key);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  setCache(key, data) {
    try {
      localStorage.setItem('sap-' + key, JSON.stringify(data));
      localStorage.setItem('sap-' + key + '-ts', String(Date.now()));
    } catch { /* Storage full or blocked */ }
  },

  async fetchSheet(key) {
    const url = this.URLS[key];
    if (!url) return null;
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      const csv = await res.text();
      const data = this.parseCSV(csv);
      if (data.length) { this.setCache(key, data); return data; }
      return null;
    } catch { return null; }
  },

  async getBooks()   { return this.getFromCache('books')   || await this.fetchSheet('books')   || (typeof BOOKS   !== 'undefined' ? BOOKS   : []); },
  async getAuthors() { return this.getFromCache('authors') || await this.fetchSheet('authors') || (typeof AUTHORS !== 'undefined' ? AUTHORS : []); },
  async getTeam()    { return this.getFromCache('team')    || await this.fetchSheet('team')    || (typeof TEAM    !== 'undefined' ? TEAM    : []); },
  async getEvents()  { return this.getFromCache('events')  || await this.fetchSheet('events')  || (typeof EVENTS  !== 'undefined' ? EVENTS  : []); }
};
