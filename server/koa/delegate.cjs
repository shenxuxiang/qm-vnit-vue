function Delegate(o, p) {
  this.o = o;
  this.p = p;
}

module.exports = Delegate;

Delegate.prototype.setter = function(name) {
  const object = this.o;
  const proto  = this.p;
  Object.defineProperty(proto, name, {
    enumerable: true,
    configurable: true,
    set: function(value) {
      this[object][name] = value;
    }
  });
  return this;
}

Delegate.prototype.getter = function(name) {
  const object = this.o;
  const proto  = this.p;
  Object.defineProperty(proto, name, {
    enumerable: true,
    configurable: true,
    get: function() {
      return this[object][name];
    }
  });
  return this;
}

Delegate.prototype.method = function(name) {
  const object = this.o;
  const proto  = this.p;
  proto[name] = function() {
    return this[object][name].apply(this[object], arguments);
  };
  return this;
}
