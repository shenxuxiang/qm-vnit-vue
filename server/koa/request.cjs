module.exports = {
  get(name) {
    return this.header[name.toLowerCase()];
  },
  get header() {
    return this.req.headers;
  },
  get headers() {
    return this.req.headers;
  },
  get url() {
    return this.req.url;
  },
  get method() {
    return this.req.method;
  },
  get httpVersion() {
    return this.req.httpVersion;
  },
  get protocol() {
    return this.app.ssl ? 'https' : 'http';
  },
  get host() {
    return this.get('host');
  },
  get refer() {
    return this.get('referer');
  },
  get URL() {
    const protocol = this.protocol;
    const host = this.host;
    return new URL(this.url, protocol + '://' + host);
  },
  get pathname() {
    return this.URL.pathname;
  },
  get hostName() {
    return this.URL.hostName;
  },
  get port() {
    return this.URL.port;
  },
  get origin() {
    return this.URL.origin;
  },
  get query() {
    const query = {};
    this.URL.searchParams.forEach((value, key) => query[key] = value);
    return query;
  },
  get querystring() {
    return this.URL.search;
  },
  get type() {
    return this.get('Content-Type');
  },
  get length() {
    return this.get('Content-Length');
  },
};
