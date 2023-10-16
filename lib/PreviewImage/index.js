"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "SuperPreviewImage", {
  enumerable: true,
  get: function get() {
    return _SuperPreviewImageVue2["default"];
  }
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _PreviewImageVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./SuperPreviewImage.vue.js");
require("./PreviewImage.vue2.js");
var _PreviewImageVue2 = _interopRequireDefault(require("./PreviewImage.vue.js"));
var _SuperPreviewImageVue2 = _interopRequireDefault(require("./SuperPreviewImage.vue2.js"));
_PreviewImageVue2["default"].SuperPreviewImage = _SuperPreviewImageVue2["default"];
_PreviewImageVue2["default"].install = function (app) {
  app.component(_PreviewImageVue2["default"].name, _PreviewImageVue2["default"]);
  app.component(_SuperPreviewImageVue2["default"].name, _SuperPreviewImageVue2["default"]);
  return app;
};