"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _IconVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./Icon.vue2.js");
var _IconVue2 = _interopRequireDefault(require("./Icon.vue.js"));
_IconVue2["default"].install = function (app) {
  app.component(_IconVue2["default"].name, _IconVue2["default"]);
  return app;
};