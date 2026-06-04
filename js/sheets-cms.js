'use strict';
/* ── Google Sheets CSV CMS Module ──────────────────────────── */
const SheetsCMS = {
    } catch { return null; }
  },
  async getBooks()   { return this.getFromCache('books')   || await this.fetchSheet('books')   || (typeof BOOKS   !== 'undefined' ? BOOKS   : []); },
  async getAuthors() { return this.getFromCache('authors') || await this.fetchSheet('authors') || (typeof AUTHORS !== 'undefined' ? AUTHORS : []); },
  async getTeam()    { return this.getFromCache('team')    || await this.fetchSheet('team')    || (typeof TEAM    !== 'undefined' ? TEAM    : []); },
  async getEvents()  { return this.getFromCache('events')  || await this.fetchSheet('events')  || (typeof EVENTS  !== 'undefined' ? EVENTS  : []); }
  async getBooks() {
    const cached = this.getFromCache('books');
    if (cached && cached.length) return cached;
    const fetched = await this.fetchSheet('books');
    if (fetched && fetched.length) return fetched;
    return typeof BOOKS !== 'undefined' ? BOOKS : [];
  },
  async getAuthors() {
    const cached = this.getFromCache('authors');
    if (cached && cached.length) return cached;
    const fetched = await this.fetchSheet('authors');
    if (fetched && fetched.length) return fetched;
    return typeof AUTHORS !== 'undefined' ? AUTHORS : [];
  },
  async getTeam() {
    const cached = this.getFromCache('team');
    if (cached && cached.length) return cached;
    const fetched = await this.fetchSheet('team');
    if (fetched && fetched.length) return fetched;
    return typeof TEAM !== 'undefined' ? TEAM : [];
  },
  async getEvents() {
    const cached = this.getFromCache('events');
    if (cached && cached.length) return cached;
    const fetched = await this.fetchSheet('events');
    if (fetched && fetched.length) return fetched;
    return typeof EVENTS !== 'undefined' ? EVENTS : [];
  }
};
