"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _ImagePreviewGroupVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./ImagePreviewGroup.vue.js");
var _ImagePreviewGroupVue2 = _interopRequireDefault(require("./ImagePreviewGroup.vue2.js"));
_ImagePreviewGroupVue2["default"].install = function (app) {
  app.component(_ImagePreviewGroupVue2["default"].name, _ImagePreviewGroupVue2["default"]);
  return app;
};