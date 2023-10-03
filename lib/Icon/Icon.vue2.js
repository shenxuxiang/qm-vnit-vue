"use strict";

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty2(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.function.name.js");
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));
var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));
var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));
var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-properties"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));
var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _vue = require("vue");
require("./font/iconfont.css");
function ownKeys(e, r) {
  var t = (0, _keys["default"])(e);
  if (_getOwnPropertySymbols["default"]) {
    var o = (0, _getOwnPropertySymbols["default"])(e);
    r && (o = (0, _filter["default"])(o).call(o, function (r) {
      return (0, _getOwnPropertyDescriptor["default"])(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var _context2, _context3;
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? (0, _forEach["default"])(_context2 = ownKeys(Object(t), !0)).call(_context2, function (r) {
      (0, _defineProperty3["default"])(e, r, t[r]);
    }) : _getOwnPropertyDescriptors["default"] ? (0, _defineProperties["default"])(e, (0, _getOwnPropertyDescriptors["default"])(t)) : (0, _forEach["default"])(_context3 = ownKeys(Object(t))).call(_context3, function (r) {
      (0, _defineProperty2["default"])(e, r, (0, _getOwnPropertyDescriptor["default"])(t, r));
    });
  }
  return e;
}
var script = exports["default"] = /*#__PURE__*/(0, _vue.defineComponent)(_objectSpread(_objectSpread({}, {
  inheritAttrs: false
}), {}, {
  __name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    },
    "class": {
      type: String,
      required: false
    },
    style: {
      type: null,
      required: false
    }
  },
  setup: function setup(__props) {
    var props = __props;
    var className = (0, _vue.toRef)(props, 'class');
    return function (_ctx, _cache) {
      var _context;
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("i", (0, _vue.mergeProps)(_ctx.$attrs, {
        style: _ctx.style,
        "class": (0, _concat["default"])(_context = "qm-vnit-iconfont qm-vnit-icon-".concat(_ctx.name)).call(_context, className.value ? ' ' + className.value : '')
      }), null, 16 /* FULL_PROPS */);
    };
  }
}));