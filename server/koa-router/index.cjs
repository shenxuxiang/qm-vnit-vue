const Layer = require('./layer.cjs');
const compose = require('../koa-compose/index.cjs');
const methods = [ 'get', 'head', 'post', 'delete', 'put', 'options' ];

function Router(options = {}) {
  this.stack = [];
  this.options = options;
}

module.exports = Router;



methods.forEach(method => {
  Router.prototype[method] = function (path) {
    const middlewares = [].slice.call(arguments, 1);
    this.registry(path, [method], middlewares);
  }
});




Router.prototype.registry = function(path, methods, middlewares) {
  if (Array.isArray(path)) {
    for (let i = 0; i < path.length; i++) {
      this.registry(path[i], methods, middlewares);
    }
    return;
  }

  const layer = new Layer(path, methods, middlewares);
  if (this.options.prefix) layer.setPrefix(this.options.prefix);
  this.stack.push(layer);
}




Router.prototype.prefix = function(prefix) {
  this.options.prefix = prefix;
  for (let i = 0; i < this.stack.length; i++) {
    this.stack[i].setPrefix(prefix);
  }
}




Router.prototype.match = function(method, pathname) {
  const matched = {
    path: [],
    routes: false,
    pathAndMethod: []
  }

  for (let i = 0; i < this.stack.length; i++) {
    const layer = this.stack[i];
    if (layer.match(pathname)) {
      matched.path.push(layer);
      if (layer.methods.length <= 0 || layer.methods.includes(method)) {
        matched.pathAndMethod.push(layer);
        if (~layer.methods.length) {
          matched.routes = true;
        }
      }
    }
  }

  return matched;
}




// 生成 koa 中间件函数 function (ctx, next)
Router.prototype.routes = function() {
  const router = this;
  dispatch.router = router;
  return dispatch;

  function dispatch(ctx, next) {
    const { method, url } = ctx;
    const matched = router.match(method, url);

    if (!matched.routes) return next();

    const nestedLayers = matched.pathAndMethod;
    const chain = nestedLayers.reduce((memo, layer) => {
      memo.push(function(ctx, next) {
        ctx.params = layer.params(url);
        return next();
      });
      return memo.concat(layer.middlewares);
    }, []);
    return compose(chain)(ctx, next);
  }
}




Router.prototype.use = function() {
  if (Array.isArray(arguments[0]) && typeof arguments[0][0] === 'string') {
    const paths = arguments[0];

    for (let i = 0; i < paths.length; i++) {
      this.use.apply(this, [].slice.call(arguments, 1));
    }
    return;
  }

  const path = typeof arguments[0] === 'string' ? arguments[0] : null;
  const middlewares = [].slice.call(arguments, path === null ? 0 : 1);

  for (let i = 0; i < middlewares.length; i++) {
    const middleware = middlewares[i];
    if (middleware.router) {
      const cloneRouter = Object.assign(Object.create(Router.prototype), middleware.router);
      const nestedLayers = cloneRouter.stack;
      for (let i = 0; i < nestedLayers.length; i++) {
        const cloneLayer = Object.assign(Object.create(Layer.prototype), nestedLayers[i]);

        if (path) cloneLayer.setPrefix(path);
        if (this.options.prefix) cloneLayer.setPrefix(this.options.prefix);
        this.stack.push(cloneLayer);
      }
    } else {
      this.registry(path || '/', [], middleware);
    }
  }
}




Router.prototype.all = function() {
  if (Array.isArray(arguments[0])) {
    const paths = arguments[0];
    for (let i = 0; i < paths.length; i++) {
      this.all.call(this, paths[i], ...[].slice.call(arguments, 1));
    }
    return;
  }

  const path = arguments[0];
  const middlewares = [].slice.call(arguments, 1);
  this.registry(path, methods, middlewares);
}




Router.prototype.redirect = function(source, dest, code) {
  this.all(source, function(ctx) {
    ctx.redirect(dest);
    ctx.status = code;
  });
}
