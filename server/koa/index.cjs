const http = require('http');
const path = require('path');
const events = require('events');
const statuses = require('statuses');
const compose = require('../koa-compose/index.cjs');
const context = require('./context.cjs');
const request = require('./request.cjs');
const response = require('./response.cjs');
const Stream = require('stream');

class Koa extends events {
  constructor(options = {}) {
    super();
    this.middlewares = [];
    this.ssl = options.ssl;
    this.silent = options.silent;
    this.context     = Object.create(context);
    this.request     = Object.create(request);
    this.response    = Object.create(response);
  }

  onerror(error) {
    if (!error || this.silent) return;

    if (error.compose) return;
    const msg = error.stack.replace(/^\b/mg, '   ');
    process.stdout.write(`\n${msg}\n`);
  }

  use(fn) {
    if (typeof fn !== 'function') throw new Error('fn must be a function');
    this.middlewares.push(fn);
    return this;
  }

  createContext(req, res) {
    const ctx      = Object.create(this.context);
    const request  = Object.create(this.request);
    const response = Object.create(this.response);

    ctx.app = request.app = response.app = this;
    ctx.req = request.req = response.req = req;
    ctx.res = request.res = response.res = res;

    ctx.request  = response.request = request;
    ctx.response = request.response = response;

    request.ctx = response.ctx = ctx;
    return ctx;
  }

  handleRequest(ctx, fns) {
    ctx.res.statusCode = 404;
    const handleError = (reason) => ctx.onError(reason);
    const handleSuccess = () => this.respond(ctx);
    return fns(ctx).then(handleSuccess).catch(handleError);
  }


  callback() {
    const fns = compose(this.middlewares);
    return (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fns);
    };
  }

  listen(port, callback) {
    if (this.listenerCount('error') <= 0) this.on('error', this.onerror);

    const server = http.createServer(this.callback());
    server.listen(port, callback);
  }

  respond(ctx) {
    const { body, res, status, method } = ctx;

    if (statuses.empty[status]) {
      res.end(null);
      return;
    }

    if (method === 'HEAD') {
      if (!res.headersSent && !ctx.response.has('Content-Length')) {
        const length = ctx.response.length;
        if (typeof length === 'number') ctx.length = length;
      }

      res.end(null);
    }

    if (body === null) {
      // 如果 explicitNullOfBody 为 true，这里是业务逻辑处理的结果。
      // 此时，我们不应该去做其他的处理，而是调用 response.end()。
      if (ctx.response.explicitNullOfBody) {
        ctx.remove('Content-Type');
        ctx.remove('Transfer-Encoding');
        res.end(null);
        return;
      }

      // 如果执行流走到这里，则说明没有匹配的资源。这时，我们应该给请求返回一个 404.
      const msg = ctx.message || statuses.message[status];
      if (!res.headersSent) {
        ctx.type = 'text/html';
        ctx.length = Buffer.byteLength(msg);
      }

      res.end(msg);
      return;
    }

    if (body instanceof Stream) {
      body.pipe(res);
    } else if (Buffer.isBuffer(body) || typeof body === 'string') {
      res.end(body);
    } else {
      res.end(JSON.stringify(body));
    }
  }
}

module.exports = Koa;
