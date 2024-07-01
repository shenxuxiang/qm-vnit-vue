"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _NavigationBarVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./NavigationBar.vue2.js");
var _NavigationBarVue2 = _interopRequireDefault(require("./NavigationBar.vue.js"));
_NavigationBarVue2["default"].install = function (app) {
  app.component(_NavigationBarVue2["default"].name, _NavigationBarVue2["default"]);
  return app;
};