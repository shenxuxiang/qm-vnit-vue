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
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import { defineComponent, ref, onMounted, openBlock, createElementBlock } from 'vue';
import intersectionObserveImage from '../utils/intersectionObserveImage.js';
import img from '../assets/defaultImage.svg.js';
var _hoisted_1 = ["src"];
var script = /*#__PURE__*/defineComponent(_objectSpread(_objectSpread({}, {
  name: 'Image'
}), {}, {
  __name: 'Image',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  setup: function setup(__props) {
    var props = __props;
    // eslint-disable-next-line
    var imgSrc = ref(img);
    var imgRef = ref();
    onMounted(function () {
      intersectionObserveImage.addElement(imgRef.value, props.src);
    });
    return function (_ctx, _cache) {
      return openBlock(), createElementBlock("img", {
        ref_key: "imgRef",
        ref: imgRef,
        src: imgSrc.value
      }, null, 8 /* PROPS */, _hoisted_1);
    };
  }
}));
export { script as default };