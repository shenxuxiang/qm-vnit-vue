import "core-js/modules/es.array.push.js";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import "core-js/modules/es.function.name.js";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context2, _context3; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(t), !0)).call(_context2, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context3 = ownKeys(Object(t))).call(_context3, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import { defineComponent, toRef, openBlock, createElementBlock, mergeProps } from 'vue';
import './font/iconfont.css';
var script = /*#__PURE__*/defineComponent(_objectSpread(_objectSpread({}, {
  name: 'Icon',
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
    var className = toRef(props, 'class');
    return function (_ctx, _cache) {
      var _context;
      return openBlock(), createElementBlock("i", mergeProps(_ctx.$attrs, {
        style: _ctx.style,
        "class": _concatInstanceProperty(_context = "qm-vnit-iconfont qm-vnit-icon-".concat(_ctx.name)).call(_context, className.value ? ' ' + className.value : '')
      }), null, 16 /* FULL_PROPS */);
    };
  }
}));

export { script as default };