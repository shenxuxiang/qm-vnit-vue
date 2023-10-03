"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _vue = require("vue");
var _intersectionObserveImage = _interopRequireDefault(require("../utils/intersectionObserveImage.js"));
var _defaultSvg = _interopRequireDefault(require("./default.svg.js"));
var _hoisted_1 = ["src"];
var script = exports["default"] = /*#__PURE__*/(0, _vue.defineComponent)({
  __name: 'Image',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  setup: function setup(__props) {
    var props = __props;
    var imgSrc = (0, _vue.ref)(_defaultSvg["default"]);
    var imgRef = (0, _vue.ref)();
    (0, _vue.onMounted)(function () {
      _intersectionObserveImage["default"].addElement(imgRef.value, props.src);
    });
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("img", {
        src: imgSrc.value,
        ref_key: "imgRef",
        ref: imgRef
      }, null, 8 /* PROPS */, _hoisted_1);
    };
  }
});