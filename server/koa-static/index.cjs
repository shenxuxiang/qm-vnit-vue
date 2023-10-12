const path = require('path');
const send = require('./send.cjs');

module.exports = function(root, opts = {}) {
  if (!path.isAbsolute(root)) throw new Error('root option must be an absolte directory');

  const options = Object.assign({}, opts);
  options.root = path.resolve(root);
  if (!opts.index) options.index = './index.html';

  if (options.defer) {
    return async function(ctx, next) {
      await next();

      const { pathname, method, status } = ctx;
      if (status !== 404 || body !== null) return;
      if (method !== 'GET' && method !== 'HEAD') return;

      try {
        await send(ctx, pathname, options);
      } catch (error) {
        if (error.status !== 404) throw error;
      }
    }
  } else {
    return async function(ctx, next) {
      const { pathname, method } = ctx;
      let done = false;

      if (method === 'GET' || method === 'HEAD') {
        try {
          await send(ctx, pathname, options);
          done = true;
        } catch (error) {
          if (error.status !== 404) throw error;
        }
      }
      if (done) return;
      await next();
    }
  }
}
