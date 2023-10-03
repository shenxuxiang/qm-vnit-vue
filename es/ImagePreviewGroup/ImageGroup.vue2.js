import 'core-js/modules/es.array.push.js';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import { defineComponent, useSlots, ref, computed, openBlock, createElementBlock, Fragment, createElementVNode, renderList, normalizeStyle, normalizeClass, unref, createVNode, createBlock, resolveDynamicComponent, normalizeProps, guardReactiveProps, createCommentVNode, Teleport } from 'vue';
import './ImageGroup.css';
import '../Image/index.js';
import _default from '../PreviewImage/index.js';
import '../Image/Image.vue.js';
import script$1 from '../Image/Image.vue2.js';

function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context2, _context3; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(t), !0)).call(_context2, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context3 = ownKeys(Object(t))).call(_context3, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var _hoisted_1 = {
  "class": "qm-vnit-image-group"
};
var _hoisted_2 = ["onClick"];
var _hoisted_3 = ["onClick"];
var script = /*#__PURE__*/defineComponent(_objectSpread(_objectSpread({}, {
  inheritAttrs: false
}), {}, {
  __name: 'ImageGroup',
  props: {
    "class": {
      type: String,
      required: false
    },
    bordered: {
      type: Boolean,
      required: false,
      "default": true
    },
    options: {
      type: Array,
      required: false
    },
    style: {
      type: null,
      required: false
    }
  },
  setup: function setup(__props) {
    var props = __props;
    var slots = useSlots();
    var indicator = ref(0);
    var className = props["class"];
    var showPreview = ref(false);
    var children = computed(function () {
      var _slots$default, _slots$default2;
      return (_slots$default = (_slots$default2 = slots["default"]) === null || _slots$default2 === void 0 ? void 0 : _slots$default2.call(slots)) !== null && _slots$default !== void 0 ? _slots$default : [];
    });
    var imgs = computed(function () {
      var _slots$default3;
      if ((_slots$default3 = slots["default"]) !== null && _slots$default3 !== void 0 && _slots$default3.call(slots)) {
        var _context;
        return _mapInstanceProperty(_context = children.value).call(_context, function (item) {
          return item.props.src;
        });
      } else {
        return props.options;
      }
    });
    function handlePreview(index) {
      indicator.value = index;
      showPreview.value = true;
    }
    return function (_ctx, _cache) {
      return openBlock(), createElementBlock(Fragment, null, [createElementVNode("ul", _hoisted_1, [_ctx.options ? (openBlock(true), createElementBlock(Fragment, {
        key: 0
      }, renderList(_ctx.options, function (item, index) {
        return openBlock(), createElementBlock("li", {
          key: index,
          style: normalizeStyle(_ctx.style),
          "class": normalizeClass(['qm-vnit-image-group-item', unref(className), {
            bordered: _ctx.bordered
          }]),
          onClick: function onClick($event) {
            return handlePreview(index);
          }
        }, [createVNode(unref(script$1), {
          src: item
        }, null, 8 /* PROPS */, ["src"])], 14 /* CLASS, STYLE, PROPS */, _hoisted_2);
      }), 128 /* KEYED_FRAGMENT */)) : children.value ? (openBlock(true), createElementBlock(Fragment, {
        key: 1
      }, renderList(children.value, function (item, index) {
        return openBlock(), createElementBlock("li", {
          key: index,
          style: normalizeStyle(_ctx.style),
          "class": normalizeClass(['qm-vnit-image-group-item', unref(className), {
            bordered: _ctx.bordered
          }]),
          onClick: function onClick($event) {
            return handlePreview(index);
          }
        }, [(openBlock(), createBlock(resolveDynamicComponent(item), normalizeProps(guardReactiveProps(item.props)), null, 16 /* FULL_PROPS */))], 14 /* CLASS, STYLE, PROPS */, _hoisted_3);
      }), 128 /* KEYED_FRAGMENT */)) : createCommentVNode("v-if", true)]), (openBlock(), createBlock(Teleport, {
        to: "body"
      }, [createVNode(unref(_default), {
        imgs: imgs.value,
        index: indicator.value,
        open: showPreview.value,
        onClose: _cache[0] || (_cache[0] = function ($event) {
          return showPreview.value = false;
        })
      }, null, 8 /* PROPS */, ["imgs", "index", "open"])]))], 64 /* STABLE_FRAGMENT */);
    };
  }
}));

export { script as default };
