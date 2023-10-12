const fs = require('fs');
const path = require('path');

module.exports = async function(ctx, pathname, options) {
  const maxage = options.maxage || options.maxAge;
  const setHeaders = options.setHeaders;
  const gzip = options.gzip !== false;
  const index = options.index;
  const root = options.root;

  let filepath = path.join(root, pathname);
  let encodingExtname = '';

  if (gzip && ctx.get('Accept-Encoding').includes('gzip') && existing(filepath + '.gz')) {
    encodingExtname = '.gz';
    filepath += '.gz';
    ctx.remove('Content-Length');
    ctx.set('Content-Encoding', 'gzip');
  }

  let stats = null;

  try {
    stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      filepath = path.join(filepath, index);
      stats = fs.statSync(filepath);
    }
  } catch (error) {
    const notFoundCode = [ 'ENOENT', 'ENOTDIR', 'ENAMETOOLONG' ];
    if (notFoundCode.includes(error.code)) {
      ctx.throw(error, 404);
    } else {
      error.code = 500;
      throw error;
    }
  }

  if (setHeaders && typeof setHeaders !== 'function') throw new Error('setHeaders must be a function');

  setHeaders && setHeaders(ctx.res, filepath, stats);

  if (!ctx.response.has('Content-Type')) {
    ctx.type = encodingExtname ? path.extname(path.basename(filepath, encodingExtname)) : path.extname(filepath);
  } else if (!ctx.response.has('Cache-Control')) {
    ctx.set('Cache-Control', `max-age=${(maxage / 1000) | 0}`);
  } else if (!ctx.response.has('Last-Modified')) {
    ctx.set('Last-Modified', stats.mtime.toUTCString());
  }

  ctx.body = fs.createReadStream(filepath);
}

function existing(file) {
  try {
    fs.accessSync(file, fs.constants.F_OK);
    return true;
  } catch(error) {
    return false;
  }
}
