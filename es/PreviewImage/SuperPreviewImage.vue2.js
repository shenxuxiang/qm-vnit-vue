import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _Math$sign from '@babel/runtime-corejs3/core-js-stable/math/sign';
import _setTimeout from '@babel/runtime-corejs3/core-js-stable/set-timeout';
import 'core-js/modules/es.number.constructor.js';
import { defineComponent, ref, computed, watch, openBlock, createBlock, Transition, withCtx, withDirectives, createElementVNode, createVNode, createCommentVNode, unref, createElementBlock, withModifiers, normalizeClass, vShow } from 'vue';
import getTransformProperties from '../utils/getTransformProperties.js';
import { throttle, getViewportSize } from '../utils/index.js';
import img from '../assets/defaultImage.svg.js';
import './Loading.vue.js';
import './ToolBar.vue.js';
import './Slider.vue.js';
import '../Icon/index.js';
import './PreviewImage.css';
import script$1 from './Loading.vue2.js';
import script$2 from './ToolBar.vue2.js';
import '../Icon/Icon.vue.js';
import script$3 from '../Icon/Icon.vue2.js';
import script$4 from './Slider.vue2.js';

var _hoisted_1 = {
  "class": "qm-vnit-preview-image"
};
var _hoisted_2 = ["src", "onDragstart", "onMouseup"];
var script = /*#__PURE__*/defineComponent({
  __name: 'SuperPreviewImage',
  props: {
    pageSize: {
      type: Number,
      required: false,
      "default": 9
    },
    imgs: {
      type: Array,
      required: true
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
    var _imgs = computed(function () {
      var _context;
      return _mapInstanceProperty(_context = props.imgs).call(_context, function (item) {
        return item.url;
      });
    });
    var hdImgs = computed(function () {
      var _context2;
      return _mapInstanceProperty(_context2 = props.imgs).call(_context2, function (item) {
        return item.hdUrl;
      });
    });
    var showLoading = ref(false);
    // 图片预加载器
    var imagePreloader = ref();
    var currentPreviewImageUrl = ref(img);
    // 当组件展示时，不让页面滚动。
    watch(function () {
      return props.open;
    }, function () {
      if (props.open) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "";
      }
    });
    // 当 props.index 更新时，判断是否需要更新内容的 indicator
    watch(function () {
      return props.index;
    }, function () {
      if (props.index === indicator.value) return;
      indicator.value = props.index;
    }, {
      immediate: true
    });
    // 每当图片切换时，重新设置 imagePreloader,这样就会展示一个 loading 状态，说明图片正在加载。
    watch([hdImgs, indicator], function () {
      // 展示 lading，给用户一个反馈
      showLoading.value = true;
      currentPreviewImageUrl.value = img;
      var onCleanup = arguments[2];
      // 在执行监听函数之前，先取消绑定在 imagePreloader 上的 onload 事件。
      onCleanup(function () {
        return imagePreloader.value.onload = null;
      });
      imagePreloader.value = new Image();
      imagePreloader.value.onload = function (event) {
        // 加载完成后，再将 loading 隐藏
        showLoading.value = false;
        currentPreviewImageUrl.value = event.target.src;
      };
      imagePreloader.value.src = hdImgs.value[indicator.value];
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
        imgXRef.value.style.cssText = "\n        transform: translate3d(0px, 0px, 0px); \n        transition: transform .3s ease;\n      ";
      } else {
        var _context3;
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
        imgXRef.value.style.cssText = _concatInstanceProperty(_context3 = "\n        transform: translate3d(".concat(translateX, "px, ")).call(_context3, translateY, "px, 0px); \n        transition: transform .3s ease;\n      ");
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
      var _context4;
      if (!_isMoveing) return;
      event.preventDefault();
      var clientX = event.clientX,
        clientY = event.clientY;
      var distanceX = clientX - _mouseOriginPoint.x;
      var distanceY = clientY - _mouseOriginPoint.y;
      // 注意，并不是图片在移动，而是图片外层的div容器在移动。
      // 并且，每次移动都是相对 dragStart 事件开始时的 _originPoint 点位进行计算，
      // 偏移量则是相对 dragStart 事件的 clientX、clientY 进行计算
      imgXRef.value.style.cssText = _concatInstanceProperty(_context4 = "\n      transform: translate3D(".concat(_originPoint.x + distanceX, "px, ")).call(_context4, _originPoint.y + distanceY, "px, 0px); \n    ");
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
      var _context5, _context6;
      var _getTransformProperti4 = getTransformProperties(imgRef.value),
        scaleX = _getTransformProperti4.scaleX,
        scaleY = _getTransformProperti4.scaleY,
        rotate = _getTransformProperti4.rotate;
      var x = scaleX * 0.8;
      var y = scaleY * 0.8;
      if (Math.abs(x) < 1) x = _Math$sign(x);
      if (Math.abs(y) < 1) y = _Math$sign(y);
      imgRef.value.style.cssText = _concatInstanceProperty(_context5 = _concatInstanceProperty(_context6 = "transform: scale(".concat(x, ", ")).call(_context6, y, ") rotate(")).call(_context5, rotate, "deg);");
    }
    // 放大
    function handleEnlarge() {
      var _context7, _context8;
      var _getTransformProperti5 = getTransformProperties(imgRef.value),
        scaleX = _getTransformProperti5.scaleX,
        scaleY = _getTransformProperti5.scaleY,
        rotate = _getTransformProperti5.rotate;
      imgRef.value.style.cssText = _concatInstanceProperty(_context7 = _concatInstanceProperty(_context8 = "transform: scale(".concat(scaleX * 1.25, ", ")).call(_context8, scaleY * 1.25, ") rotate(")).call(_context7, rotate, "deg);");
    }
    function handleChangeIndicator(index) {
      indicator.value = index;
      emit("update:index", index);
      imgRef.value.style.cssText = "";
      imgXRef.value.style.cssText = "";
    }
    // 上一张
    function handlePrevItem() {
      if (indicator.value <= 0) return;
      handleChangeIndicator(indicator.value - 1);
    }
    // 下一张
    function handleNextItem() {
      if (indicator.value >= _imgs.value.length - 1) return;
      handleChangeIndicator(indicator.value + 1);
    }
    // 关闭 PreviewImage 组件
    function handleClosePreview(event) {
      if (event.target === event.currentTarget) {
        emit("close");
        _setTimeout(function () {
          if (imgRef.value) imgRef.value.style.cssText = "";
          if (imgXRef.value) imgXRef.value.style.cssText = "";
        }, 300);
      }
    }
    return function (_ctx, _cache) {
      return openBlock(), createBlock(Transition, {
        name: "previewImage",
        persisted: ""
      }, {
        "default": withCtx(function () {
          return [withDirectives(createElementVNode("section", _hoisted_1, [createVNode(script$1, {
            size: "default",
            theme: "light",
            open: showLoading.value
          }, null, 8 /* PROPS */, ["open"]), createCommentVNode(" 图片预览部分 "), createElementVNode("div", {
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
          }, [(openBlock(), createElementBlock("img", {
            ref_key: "imgRef",
            ref: imgRef,
            key: currentPreviewImageUrl.value,
            src: currentPreviewImageUrl.value,
            onDragstart: withModifiers(handleDragStart, ["stop"]),
            onMouseup: withModifiers(handleMouseUp, ["stop"])
          }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_2))], 544 /* HYDRATE_EVENTS, NEED_PATCH */), createCommentVNode(" 顶部工具栏 "), createVNode(script$2, {
            imageElement: imgRef.value,
            onClose: handleClosePreview
          }, null, 8 /* PROPS */, ["imageElement"]), createElementVNode("div", {
            "class": normalizeClass(['qm-vnit-preview-image-prev-buttton', {
              disabled: indicator.value <= 0
            }]),
            onClick: handlePrevItem
          }, [createVNode(unref(script$3), {
            name: "arrow-left-bold",
            style: {
              "font-size": "60px"
            }
          })], 2 /* CLASS */), createElementVNode("div", {
            "class": normalizeClass(['qm-vnit-preview-image-next-buttton', {
              disabled: indicator.value >= _imgs.value.length - 1
            }]),
            onClick: handleNextItem
          }, [createVNode(unref(script$3), {
            name: "arrow-right-bold",
            style: {
              "font-size": "60px"
            }
          })], 2 /* CLASS */), createCommentVNode(" 顶部滑块 "), createVNode(script$4, {
            open: _ctx.open,
            imgs: _imgs.value,
            pageSize: _ctx.pageSize,
            indicator: indicator.value,
            "onUpdate:indicator": handleChangeIndicator
          }, null, 8 /* PROPS */, ["open", "imgs", "pageSize", "indicator"])], 512 /* NEED_PATCH */), [[vShow, _ctx.open]])];
        }),
        _: 1 /* STABLE */
      });
    };
  }
});

export { script as default };
