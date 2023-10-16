"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _ModelTreeVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./ModelTree.vue2.js");
var _ModelTreeVue2 = _interopRequireDefault(require("./ModelTree.vue.js"));
_ModelTreeVue2["default"].install = function (app) {
  app.component(_ModelTreeVue2["default"].name, _ModelTreeVue2["default"]);
  return app;
};