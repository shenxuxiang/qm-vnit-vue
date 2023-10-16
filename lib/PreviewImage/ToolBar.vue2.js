import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _Math$sign from "@babel/runtime-corejs3/core-js-stable/math/sign";
import { defineComponent, openBlock, createElementBlock, createVNode, unref } from 'vue';
import getTransformProperties from '../utils/getTransformProperties.js';
import '../Icon/index.js';
import './ToolBar.css';
import '../Icon/Icon.vue2.js';
import script$1 from '../Icon/Icon.vue.js';
var _hoisted_1 = {
  "class": "qm-vnit-preview-image-header"
};
var script = /*#__PURE__*/defineComponent({
  __name: 'ToolBar',
  props: {
    imageElement: {
      type: null,
      required: true
    }
  },
  emits: ["close"],
  setup: function setup(__props) {
    var props = __props;
    // Y轴镜像
    function handleMirrorY() {
      var _context, _context2;
      var _getTransformProperti = getTransformProperties(props.imageElement),
        scaleX = _getTransformProperti.scaleX,
        scaleY = _getTransformProperti.scaleY,
        rotate = _getTransformProperti.rotate;
      props.imageElement.style.cssText = _concatInstanceProperty(_context = _concatInstanceProperty(_context2 = "transform: scale(".concat(scaleX, ", ")).call(_context2, scaleY * -1, ") rotate(")).call(_context, rotate, "deg);");
    }
    // X轴镜像
    function handleMirrorX() {
      var _context3, _context4;
      var _getTransformProperti2 = getTransformProperties(props.imageElement),
        scaleX = _getTransformProperti2.scaleX,
        scaleY = _getTransformProperti2.scaleY,
        rotate = _getTransformProperti2.rotate;
      props.imageElement.style.cssText = _concatInstanceProperty(_context3 = _concatInstanceProperty(_context4 = "transform: scale(".concat(scaleX * -1, ", ")).call(_context4, scaleY, ") rotate(")).call(_context3, rotate, "deg);");
    }
    // 缩小
    function handleShrink() {
      var _context5, _context6;
      var _getTransformProperti3 = getTransformProperties(props.imageElement),
        scaleX = _getTransformProperti3.scaleX,
        scaleY = _getTransformProperti3.scaleY,
        rotate = _getTransformProperti3.rotate;
      var x = scaleX * 0.8;
      var y = scaleY * 0.8;
      if (Math.abs(x) < 1) x = _Math$sign(x);
      if (Math.abs(y) < 1) y = _Math$sign(y);
      props.imageElement.style.cssText = _concatInstanceProperty(_context5 = _concatInstanceProperty(_context6 = "transform: scale(".concat(x, ", ")).call(_context6, y, ") rotate(")).call(_context5, rotate, "deg);");
    }
    // 放大
    function handleEnlarge() {
      var _context7, _context8;
      var _getTransformProperti4 = getTransformProperties(props.imageElement),
        scaleX = _getTransformProperti4.scaleX,
        scaleY = _getTransformProperti4.scaleY,
        rotate = _getTransformProperti4.rotate;
      props.imageElement.style.cssText = _concatInstanceProperty(_context7 = _concatInstanceProperty(_context8 = "transform: scale(".concat(scaleX * 1.25, ", ")).call(_context8, scaleY * 1.25, ") rotate(")).call(_context7, rotate, "deg);");
    }
    // 顺时针旋转
    function handleRotateLeft() {
      var _context9, _context10;
      var _getTransformProperti5 = getTransformProperties(props.imageElement),
        scaleX = _getTransformProperti5.scaleX,
        scaleY = _getTransformProperti5.scaleY,
        rotate = _getTransformProperti5.rotate;
      props.imageElement.style.cssText = _concatInstanceProperty(_context9 = _concatInstanceProperty(_context10 = "transform: scale(".concat(scaleX, ", ")).call(_context10, scaleY, ") rotate(")).call(_context9, rotate + 90, "deg);");
    }
    // 逆时针旋转
    function handleRotateRight() {
      var _context11, _context12;
      var _getTransformProperti6 = getTransformProperties(props.imageElement),
        scaleX = _getTransformProperti6.scaleX,
        scaleY = _getTransformProperti6.scaleY,
        rotate = _getTransformProperti6.rotate;
      props.imageElement.style.cssText = _concatInstanceProperty(_context11 = _concatInstanceProperty(_context12 = "transform: scale(".concat(scaleX, ", ")).call(_context12, scaleY, ") rotate(")).call(_context11, rotate - 90, "deg);");
    }
    return function (_ctx, _cache) {
      return openBlock(), createElementBlock("div", _hoisted_1, [createVNode(unref(script$1), {
        name: "swap-outline",
        style: {
          "transform": "rotate(90deg)"
        },
        "class": "qm-vnit-preview-image-icon",
        onClick: handleMirrorY
      }), createVNode(unref(script$1), {
        name: "swap-outline",
        "class": "qm-vnit-preview-image-icon",
        onClick: handleMirrorX
      }), createVNode(unref(script$1), {
        name: "rotate-left",
        "class": "qm-vnit-preview-image-icon",
        onClick: handleRotateRight
      }), createVNode(unref(script$1), {
        name: "rotate-right",
        "class": "qm-vnit-preview-image-icon",
        onClick: handleRotateLeft
      }), createVNode(unref(script$1), {
        name: "minus-circle",
        "class": "qm-vnit-preview-image-icon",
        onClick: handleShrink
      }), createVNode(unref(script$1), {
        name: "plus-circle",
        "class": "qm-vnit-preview-image-icon",
        onClick: handleEnlarge
      }), createVNode(unref(script$1), {
        name: "close",
        "class": "qm-vnit-preview-image-icon",
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return _ctx.$emit('close', $event);
        })
      })]);
    };
  }
});
export { script as default };