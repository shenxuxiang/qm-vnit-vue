const Stream = require('stream');
const statuses = require('statuses');
const getType = require('cache-content-type');

module.exports = {
  get(name) {
    return this.res.getHeader(name.toLowerCase());
  },
  has(name) {
    return this.res.hasHeader(name.toLowerCase());
  },
  set() {
    const { length, '0': v1, '1': v2 } = arguments;

    if (length === 1 && Object.prototype.toString.call(v1).slice(8, -1) === 'Object') {
      Object.keys(v1).forEach(key => this.set(kye, v1[key]));
    } else if (length === 2) {
      this.res.setHeader(v1.toLowerCase(), v2);
    } else {
      throw new Error('ctx.response.set() params is not legal');
    }
  },
  remove(name) {
    this.res.removeHeader(name.toLowerCase());
  },
  get headerSent() {
    return this.res.headersSent;
  },
  get header() {
    return this.res.getHeaders();
  },
  get headers() {
    return this.res.getHeaders();
  },
  get length() {
    if (this.has('Content-Length')) {
      return this.get('Content-Length');
    } else {
      const body = this.body;
      if (body instanceof Stream) return null;
      if (typeof body === 'string')  return Buffer.byteLength(body);
      if (Buffer.isBuffer(body)) return body.length;
      return Buffer.byteLength(JSON.stringify(body));
    }
  },
  set length(length) {
    if (this.headerSent || this.has('Transfer-Encoding')) return;

    this.set('Content-Length', length);
  },
  get type() {
    return this.get('Content-Type');
  },
  set type(type) {
    if (this.headersSent) return;

    const contentType = getType(type);
    contentType && this.set('Content-Type', contentType);
  },
  get status() {
    return this.res.statusCode;
  },
  set status(status) {
    if (this.headersSent) return;
    this.explicitStatus = true;
    this.res.statusCode = status;
  },
  get message() {
    return this.res.statusMessage || statuses.message[this.status];
  },
  set message(message) {
    this.res.statusMessage = message;
  },
  get body() {
    return this._body || null;
  },
  set body(body) {
    this._body = body;

    if (body === null) {
      if (!statuses.empty[this.status]) this.status = 204;
      this.explicitNullOfBody = true;
      this.remove('Content-Type');
      this.remove('Content-Length');
      this.remove('Transfer-Encoding');
      return;
    }


    if (!this.explicitStatus) this.status = 200;
    const hasType = this.has('Content-Type');

    if (body instanceof Stream) {
      if (!hasType) this.type = 'application/octet-stream';
      this.remove('Content-Length');
    } else if (Buffer.isBuffer(body)) {
      if (!hasType) this.type = 'application/octet-stream';
      this.length = body.length;
    } else if (typeof body === 'string') {
      if (!hasType) this.type = /<([a-zA-Z]+\d?).*<\/\1>/.test(body) ? 'text/html' : 'text/plain';
      this.length = Buffer.byteLength(body);
    } else {
      if (!hasType) this.type = 'json'
      this.length = Buffer.byteLength(JSON.stringify(body));
    }
  }
};
