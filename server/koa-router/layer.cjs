const { pathToRegexp } = require('path-to-regexp');

const defaultOptions = {
  start: true,
  end: true,
  strict: false,
  sensetive: true,
}

function Layer(name, methods, middleware, options) {
  if (!(this instanceof Layer)) return new Layer(name, methods, middleware, options);

  this.options = Object.assign({}, defaultOptions, options);
  this.methods = [];
  console.log(methods);
  methods.forEach(method => {

    if (method.toUpperCase() === 'GET') {
      this.methods.push(method.toUpperCase(), 'HEAD');
    } else {
      this.methods.push(method.toUpperCase());
    }
  });

  this.name = name;
  this.middlewares = Array.isArray(middleware) ? middleware : [middleware];
  this.paramNames = [];
  this.regexp = pathToRegexp(name, this.paramNames, this.options);
}

module.exports = Layer;

Layer.prototype.setPrefix = function(prefix) {
  if (!this.name || this.name === '/') {
    this.name = prefix;
  } else {
    this.name = prefix + this.name;
  }
  this.paramNames = [];
  this.regexp = pathToRegexp(this.name, this.paramNames, this.options);
}

Layer.prototype.match = function(pathname) {
  return this.regexp.test(pathname);
}

Layer.prototype.params = function(pathname) {
  const matched = this.regexp.exec(pathname);
  if (matched) {
    const values = matched.slice(1);
    return this.paramNames.reduce((memo, key, index) => {
      memo[key.name] = values[index];
      return memo;
    }, {});
  } else {
    return null;
  }
}
