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
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _Math$sign from "@babel/runtime-corejs3/core-js-stable/math/sign";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import "core-js/modules/es.number.constructor.js";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context7, _context8; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context7 = ownKeys(Object(t), !0)).call(_context7, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context8 = ownKeys(Object(t))).call(_context8, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import { defineComponent, ref, watch, openBlock, createBlock, Transition, withCtx, withDirectives, createElementVNode, createCommentVNode, unref, withModifiers, createVNode, normalizeClass, vShow } from 'vue';
import { throttle, getViewportSize } from '../utils/index.js';
import getTransformProperties from '../utils/getTransformProperties.js';
import './ToolBar.vue.js';
import './Slider.vue.js';
import '../Icon/index.js';
import './PreviewImage.css';
import script$1 from './ToolBar.vue2.js';
import '../Icon/Icon.vue2.js';
import script$2 from '../Icon/Icon.vue.js';
import script$3 from './Slider.vue2.js';
var _hoisted_1 = {
  "class": "qm-vnit-preview-image"
};
var _hoisted_2 = ["src", "onDragstart", "onMouseup"];
var script = /*#__PURE__*/defineComponent(_objectSpread(_objectSpread({}, {
  name: 'PreviewImage',
  inheritAttrs: false
}), {}, {
  __name: 'PreviewImage',
  props: {
    imgs: {
      type: Array,
      required: true
    },
    pageSize: {
      type: Number,
      required: false,
      "default": 9
    },
    index: {
      type: Number,
      required: false,
      "default": 0
    },
    open: {
      type: Boolean,
      required: true
    }
  },
  emits: ["update:index", "close"],
  setup: function setup(__props, _ref) {
    var emit = _ref.emit;
    var props = __props;
    // 开关，表示用户正在拖拽图片（当为true时，图片将跟随用户鼠标进行移动）
    var _isMoveing = false;
    // 鼠标指针起始位置
    var _mouseOriginPoint = {
      x: 0,
      y: 0
    };
    // 原始点位
    var _originPoint = {
      x: 0,
      y: 0
    };
    var imgRef = ref();
    var imgXRef = ref();
    // 指示器（当前展示的是第几张图片）
    var indicator = ref(0);
    // 当组件展示时，不让页面滚动。
    watch(function () {
      return props.open;
    }, function () {
      if (props.open) {
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = '';
      }
    });
    watch(function () {
      return props.index;
    }, function () {
      if (props.index === indicator.value) return;
      indicator.value = props.index;
    }, {
      immediate: true
    });
    // 监听 mousewheel 事件，对图片进行缩放
    var onMouseWheel = throttle(scrollMouseWheel, 50);
    // 监听 mousemove 事件，对图片进行拖拽
    var onMouseMove = throttle(handleMouseMove, 20);
    // 当用户放开鼠标时触发。
    function handleMouseUp(event) {
      event.preventDefault();
      var _imgRef$value = imgRef.value,
        offsetWidth = _imgRef$value.offsetWidth,
        offsetHeight = _imgRef$value.offsetHeight;
      var _getTransformProperti = getTransformProperties(imgRef.value),
        scaleX = _getTransformProperti.scaleX,
        scaleY = _getTransformProperti.scaleY;
      var width = Math.abs(offsetWidth * scaleX);
      var height = Math.abs(offsetHeight * scaleY);
      var viewportSize = getViewportSize();
      if (width <= viewportSize.width && height <= viewportSize.height) {
        imgXRef.value.style.cssText = "\n        transform: translate3d(0px, 0px, 0px);\n        transition: transform .3s ease;\n      ";
      } else {
        var _context;
        var limitedX = 0;
        var limitedY = 0;
        if (width > viewportSize.width) {
          limitedX = (width - viewportSize.width) / 2;
        }
        if (height > viewportSize.height) {
          limitedY = (height - viewportSize.height) / 2;
        }
        var _getTransformProperti2 = getTransformProperties(imgXRef.value),
          translateX = _getTransformProperti2.translateX,
          translateY = _getTransformProperti2.translateY;
        if (limitedX) {
          if (translateX > limitedX) {
            translateX = limitedX;
          } else if (translateX < -limitedX) {
            translateX = -limitedX;
          }
        } else {
          translateX = 0;
        }
        if (limitedY) {
          if (translateY > limitedY) {
            translateY = limitedY;
          } else if (translateY < -limitedY) {
            translateY = -limitedY;
          }
        } else {
          translateY = 0;
        }
        imgXRef.value.style.cssText = _concatInstanceProperty(_context = "\n        transform: translate3d(".concat(translateX, "px, ")).call(_context, translateY, "px, 0px);\n        transition: transform .3s ease;\n      ");
      }
      _isMoveing = false;
    }
    // 图片开始拖拽事件
    function handleDragStart(event) {
      // 阻止默认行为，这样可以避免触发img元素的拖拽。
      event.preventDefault();
      _isMoveing = true;
      var _getTransformProperti3 = getTransformProperties(imgXRef.value),
        translateX = _getTransformProperti3.translateX,
        translateY = _getTransformProperti3.translateY;
      _mouseOriginPoint.x = event.clientX;
      _mouseOriginPoint.y = event.clientY;
      _originPoint.x = translateX;
      _originPoint.y = translateY;
    }
    // 当鼠标在 imgXRef 元素上移动时，图片将跟随鼠标移动
    function handleMouseMove(event) {
      var _context2;
      if (!_isMoveing) return;
      event.preventDefault();
      var clientX = event.clientX,
        clientY = event.clientY;
      var distanceX = clientX - _mouseOriginPoint.x;
      var distanceY = clientY - _mouseOriginPoint.y;
      // 注意，并不是图片在移动，而是图片外层的div容器在移动。
      // 并且，每次移动都是相对 dragStart 事件开始时的 _originPoint 点位进行计算，
      // 偏移量则是相对 dragStart 事件的 clientX、clientY 进行计算
      imgXRef.value.style.cssText = _concatInstanceProperty(_context2 = "\n      transform: translate3D(".concat(_originPoint.x + distanceX, "px, ")).call(_context2, _originPoint.y + distanceY, "px, 0px);\n    ");
    }
    // 鼠标滚轮事件
    function scrollMouseWheel(event) {
      if (event.deltaY < 0) {
        handleEnlarge();
      } else {
        handleShrink();
      }
      // 每当鼠标滚轮滑动时，将重置 imgXRef 元素的位置。
      imgXRef.value.style.cssText = "transform: translate3D(0px, 0px, 0px);";
    }
    // 缩小
    function handleShrink() {
      var _context3, _context4;
      var _getTransformProperti4 = getTransformProperties(imgRef.value),
        scaleX = _getTransformProperti4.scaleX,
        scaleY = _getTransformProperti4.scaleY,
        rotate = _getTransformProperti4.rotate;
      var x = scaleX * 0.8;
      var y = scaleY * 0.8;
      if (Math.abs(x) < 1) x = _Math$sign(x);
      if (Math.abs(y) < 1) y = _Math$sign(y);
      imgRef.value.style.cssText = _concatInstanceProperty(_context3 = _concatInstanceProperty(_context4 = "transform: scale(".concat(x, ", ")).call(_context4, y, ") rotate(")).call(_context3, rotate, "deg);");
    }
    // 放大
    function handleEnlarge() {
      var _context5, _context6;
      var _getTransformProperti5 = getTransformProperties(imgRef.value),
        scaleX = _getTransformProperti5.scaleX,
        scaleY = _getTransformProperti5.scaleY,
        rotate = _getTransformProperti5.rotate;
      imgRef.value.style.cssText = _concatInstanceProperty(_context5 = _concatInstanceProperty(_context6 = "transform: scale(".concat(scaleX * 1.25, ", ")).call(_context6, scaleY * 1.25, ") rotate(")).call(_context5, rotate, "deg);");
    }
    function handleChangeIndicator(index) {
      indicator.value = index;
      emit('update:index', index);
      imgRef.value.style.cssText = '';
      imgXRef.value.style.cssText = '';
    }
    // 上一张
    function handlePrevItem() {
      if (indicator.value <= 0) return;
      handleChangeIndicator(indicator.value - 1);
    }
    // 下一张
    function handleNextItem() {
      if (indicator.value >= props.imgs.length - 1) return;
      handleChangeIndicator(indicator.value + 1);
    }
    // 关闭 PreviewImage 组件
    function handleClosePreview(event) {
      if (event.target === event.currentTarget) {
        emit('close');
        _setTimeout(function () {
          if (imgRef.value) imgRef.value.style.cssText = '';
          if (imgXRef.value) imgXRef.value.style.cssText = '';
        }, 300);
      }
    }
    return function (_ctx, _cache) {
      return openBlock(), createBlock(Transition, {
        name: "previewImage",
        persisted: ""
      }, {
        "default": withCtx(function () {
          return [withDirectives(createElementVNode("section", _hoisted_1, [createCommentVNode(" 图片预览部分 "), createElementVNode("div", {
            ref_key: "imgXRef",
            ref: imgXRef,
            "class": "qm-vnit-preview-image-x",
            onMousewheel: _cache[0] || (_cache[0] =
            //@ts-ignore
            function () {
              return unref(onMouseWheel) && unref(onMouseWheel).apply(void 0, arguments);
            }),
            onMousemove: _cache[1] || (_cache[1] =
            //@ts-ignore
            function () {
              return unref(onMouseMove) && unref(onMouseMove).apply(void 0, arguments);
            }),
            onClick: handleClosePreview
          }, [createElementVNode("img", {
            ref_key: "imgRef",
            ref: imgRef,
            src: _ctx.imgs[indicator.value],
            onDragstart: withModifiers(handleDragStart, ["stop"]),
            onMouseup: withModifiers(handleMouseUp, ["stop"])
          }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_2)], 544 /* HYDRATE_EVENTS, NEED_PATCH */), createCommentVNode(" 顶部工具栏 "), createVNode(script$1, {
            imageElement: imgRef.value,
            onClose: handleClosePreview
          }, null, 8 /* PROPS */, ["imageElement"]), createElementVNode("div", {
            "class": normalizeClass(['qm-vnit-preview-image-prev-buttton', {
              disabled: indicator.value <= 0
            }]),
            onClick: handlePrevItem
          }, [createVNode(unref(script$2), {
            name: "arrow-left-bold",
            style: {
              "font-size": "60px"
            }
          })], 2 /* CLASS */), createElementVNode("div", {
            "class": normalizeClass(['qm-vnit-preview-image-next-buttton', {
              disabled: indicator.value >= _ctx.imgs.length - 1
            }]),
            onClick: handleNextItem
          }, [createVNode(unref(script$2), {
            name: "arrow-right-bold",
            style: {
              "font-size": "60px"
            }
          })], 2 /* CLASS */), createCommentVNode(" 顶部滑块 "), createVNode(script$3, {
            open: _ctx.open,
            imgs: _ctx.imgs,
            pageSize: _ctx.pageSize,
            indicator: indicator.value,
            "onUpdate:indicator": handleChangeIndicator
          }, null, 8 /* PROPS */, ["open", "imgs", "pageSize", "indicator"])], 512 /* NEED_PATCH */), [[vShow, _ctx.open]])];
        }),
        _: 1 /* STABLE */
      });
    };
  }
}));

export { script as default };