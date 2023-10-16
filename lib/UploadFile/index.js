"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _UploadFileVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./UploadFile.vue2.js");
var _UploadFileVue2 = _interopRequireDefault(require("./UploadFile.vue.js"));
_UploadFileVue2["default"].install = function (app) {
  app.component(_UploadFileVue2["default"].name, _UploadFileVue2["default"]);
  return app;
};