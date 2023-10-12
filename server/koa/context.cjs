const createHttpError = require('../http-error/index.cjs');
const Cookies = require('../cookies/index.cjs');
const Delegate = require('./delegate.cjs');
const statuses = require('statuses');

const context = {
  throw(...args) {
    throw createHttpError(...args);
  },
  onError(error) {
    if (!error) return;
    this.app.emit('error', error);

    let status = error.status || error.statusCode;
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') status = 404;
    if (typeof status !== 'number' || !statuses(status)) status = 500;

    const msg = error.compose ? error.message : statuses.message[status];

    this.length = Buffer.byteLength(msg);
    this.type = 'text/plain';
    this.status = status;
    this.message = msg;
    this.res.end(msg);
  },
  requestBody() {
    return new Promise((resolve, reject) => {
      const req = this.req;
      const chunks = [];
      req.on('data', function(chunk) {
        chunks.push(chunk);
      });

      req.on('end', function() {
        const body = JSON.parse(Buffer.concat(chunks).toString());
        return resolve(body);
      });

      req.on('error', function() {
        return reject(new Error('Failed to obtain request body'));
      })
    })
  },
  redirect(url) {
    if (url === 'back') url = this.get('refer');

    this.set('Location', url);
    this.body = null;
    if (!statuses.redirect[this.status]) this.status = 302;
  },
  get cookies() {
    if (this._cookies) {
      return this._cookies;
    } else {
      this._cookies = new Cookies(this.req, this.res, { secure: this.app.ssl });
      return this._cookies;
    }
  },
};

module.exports = context;

new Delegate('request', context)
  .method('get')
  .getter('header')
  .getter('headers')
  .getter('url')
  .getter('method')
  .getter('httpVersion')
  .getter('host')
  .getter('protocol')
  .getter('URL')
  .getter('pathname')
  .getter('hostName')
  .getter('port')
  .getter('origin')
  .getter('query')
  .getter('querystring')
  .getter('refer')
  .getter('type')
  .getter('length');


new Delegate('response', context)
  .method('set')
  .method('has')
  .method('remove')
  .getter('headerSent')
  .getter('length')
  .getter('type')
  .getter('status')
  .getter('message')
  .getter('body')
  .setter('length')
  .setter('type')
  .setter('status')
  .setter('message')
  .setter('body');








