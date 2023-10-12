module.exports = function(middlewares) {
  return function(ctx, next) {
    let index = -1;
    let fn = null;
    let length = middlewares.length;
    return dispatch(0);

    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i;
      fn = middlewares[i];
      if (i >= length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(ctx, () => dispatch(i + 1)));
      } catch(error) {
        return Promise.reject(error);
      }
    }
  }
}
