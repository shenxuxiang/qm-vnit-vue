"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");
var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");
var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _forEachInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");
var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");
var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.push.js");
var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));
var _for = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/for"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _vue = require("vue");
require("../PreviewImage/index.js");
require("./ImagePreviewGroup.css");
require("../Image/index.js");
require("../Image/Image.vue2.js");
var _ImageVue2 = _interopRequireDefault(require("../Image/Image.vue.js"));
require("../PreviewImage/PreviewImage.vue2.js");
var _PreviewImageVue2 = _interopRequireDefault(require("../PreviewImage/PreviewImage.vue.js"));
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context3, _context4; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty2(_context3 = ownKeys(Object(t), !0)).call(_context3, function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty2(_context4 = ownKeys(Object(t))).call(_context4, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var _hoisted_1 = ["onClick"];
var _hoisted_2 = ["onClick"];
var script = exports["default"] = /*#__PURE__*/(0, _vue.defineComponent)(_objectSpread(_objectSpread({}, {
  name: 'ImagePreviewGroup',
  inheritAttrs: false
}), {}, {
  __name: 'ImagePreviewGroup',
  props: {
    imageClass: {
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
    }
  },
  setup: function setup(__props) {
    var props = __props;
    var slots = (0, _vue.useSlots)();
    var indicator = (0, _vue.ref)(0);
    var showPreview = (0, _vue.ref)(false);
    var children = (0, _vue.ref)([]);
    (0, _vue.watch)(function () {
      var _slots$default;
      return (_slots$default = slots["default"]) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots);
    }, function () {
      var _slots$default2, _context;
      var newChildren = [];
      (_slots$default2 = slots["default"]) === null || _slots$default2 === void 0 || (0, _forEach["default"])(_context = _slots$default2.call(slots)).call(_context, function (item) {
        // 注意，slotsDefualt 返回的是一个数组，所以需要遍历，
        // 判断第一层的所有节点的 type 是否是文档碎片（fragment）,如果是，则说明使用的 template 模板嵌套，此时应该取它的 children。
        if (item.type === (0, _for["default"])('v-fgt')) {
          var _item$children, _item$children$forEac;
          (_item$children = item.children) === null || _item$children === void 0 || (_item$children$forEac = (0, _forEach["default"])(_item$children)) === null || _item$children$forEac === void 0 || _item$children$forEac.call(_item$children, function (child) {
            return newChildren.push((0, _vue.h)(child));
          });
        }
      });
      children.value = newChildren;
    }, {
      immediate: true
    });
    var imgs = (0, _vue.computed)(function () {
      var _slots$default3;
      if ((_slots$default3 = slots["default"]) !== null && _slots$default3 !== void 0 && _slots$default3.call(slots)) {
        var _context2;
        return (0, _map["default"])(_context2 = children.value).call(_context2, function (item) {
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
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)(_vue.Fragment, null, [(0, _vue.createElementVNode)("ul", (0, _vue.mergeProps)({
        "class": "qm-vnit-image-group"
      }, _ctx.$attrs), [_ctx.options ? ((0, _vue.openBlock)(true), (0, _vue.createElementBlock)(_vue.Fragment, {
        key: 0
      }, (0, _vue.renderList)(_ctx.options, function (item, index) {
        return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("li", {
          key: index,
          "class": (0, _vue.normalizeClass)(['qm-vnit-image-group-item', {
            bordered: _ctx.bordered
          }]),
          onClick: function onClick($event) {
            return handlePreview(index);
          }
        }, [(0, _vue.createVNode)((0, _vue.unref)(_ImageVue2["default"]), {
          src: item,
          "class": (0, _vue.normalizeClass)(_ctx.imageClass)
        }, null, 8 /* PROPS */, ["src", "class"])], 10 /* CLASS, PROPS */, _hoisted_1);
      }), 128 /* KEYED_FRAGMENT */)) : children.value ? ((0, _vue.openBlock)(true), (0, _vue.createElementBlock)(_vue.Fragment, {
        key: 1
      }, (0, _vue.renderList)(children.value, function (item, index) {
        return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("li", {
          key: index,
          "class": (0, _vue.normalizeClass)(['qm-vnit-image-group-item', {
            bordered: _ctx.bordered
          }]),
          onClick: function onClick($event) {
            return handlePreview(index);
          }
        }, [((0, _vue.openBlock)(), (0, _vue.createBlock)((0, _vue.resolveDynamicComponent)(item), {
          "class": (0, _vue.normalizeClass)(_ctx.imageClass)
        }, null, 8 /* PROPS */, ["class"]))], 10 /* CLASS, PROPS */, _hoisted_2);
      }), 128 /* KEYED_FRAGMENT */)) : (0, _vue.createCommentVNode)("v-if", true)], 16 /* FULL_PROPS */), ((0, _vue.openBlock)(), (0, _vue.createBlock)(_vue.Teleport, {
        to: "body"
      }, [(0, _vue.createVNode)((0, _vue.unref)(_PreviewImageVue2["default"]), {
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