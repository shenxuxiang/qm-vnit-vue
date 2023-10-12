function Cookies(req, res) {
  this.req = req;
  this.res = res;
}

module.exports = Cookies;

Cookies.prototype.set = function(name, value, attr) {
  const cookies = this.res.getHeader('set-cookie') || [];
  const cookie = new Cookie(name, value, attr);

  let isExisted = false;
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].startsWith(cookie.name)) {
      cookies[i] = cookie.toHeader();
      isExisted = true;
      break;
    }
  }

  if (!isExisted) cookies.push(cookie.toHeader());
  this.res.setHeader('set-cookie', cookies);
}

Cookies.prototype.get = function(name) {
  const regexp = pattern(name);
  const matched = regexp.exec(this.req.headers.cookie);
  if (!matched) return null;

  return matched[1];
}

function pattern(name) {
  return new RegExp(
    '(?:^|;\\s*)' +
    name.replace(/[-\[\](){}+?*|\\/^$\s]/, '\\$&') +
    '=([^;]+)'
  )
}

function Cookie(name, value, attr) {
  this.name = name;
  this.value = value;
  for (let key in attr) {
    if (attr.hasOwnProperty(key)) this[key] = attr[key];
  }
}

Cookie.prototype.domain = undefined;
Cookie.prototype.path = '/';
Cookie.prototype.maxage = 0;
Cookie.prototype.httponly = false;
Cookie.prototype.secure = false;
Cookie.prototype.sameSite = undefined;
Cookie.prototype.expires = undefined;

Cookie.prototype.toString = function() {
  return this.name + '=' + this.value;
}

Cookie.prototype.toHeader = function() {
  let cookie = this.toString();
  if (this.maxage) this.expires = new Date(Date.now() + this.maxage * 1000).toUTCString();

  if (this.domain)   cookie += `; domain=${this.domain}`;
  if (this.path)     cookie += `; path=${this.path}`;
  if (this.expires)  cookie += `; expires=${this.expires}`;
  if (this.sameSite) cookie += `; ${this.sameSite === true ? 'strict' : this.sameSite.toLowerCase()}`;
  if (this.httponly) cookie += '; httponly';
  if (this.secure)   cookie += '; secure';
  return cookie;
}

