import "core-js/modules/es.number.constructor.js";
import { defineComponent, ref, computed, watch, watchEffect, openBlock, createElementBlock, normalizeStyle, createElementVNode, normalizeClass, createVNode, unref, Fragment, renderList } from 'vue';
import getTransformProperties from '../utils/getTransformProperties.js';
import '../Image/index.js';
import '../Icon/index.js';
import './Slider.css';
import '../Icon/Icon.vue2.js';
import script$1 from '../Icon/Icon.vue.js';
import '../Image/Image.vue2.js';
import script$2 from '../Image/Image.vue.js';
var _hoisted_1 = {
  "class": "qm-vnit-preview-image-bar-slider-x"
};
var _hoisted_2 = ["onClick"];
var script = /*#__PURE__*/defineComponent({
  __name: 'Slider',
  props: {
    open: {
      type: Boolean,
      required: true
    },
    imgs: {
      type: Array,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    indicator: {
      type: Number,
      required: true
    }
  },
  emits: ["update:indicator"],
  setup: function setup(__props, _ref) {
    var emit = _ref.emit;
    var props = __props;
    var sliderRef = ref();
    var isFirstPage = ref(false);
    var isLastPage = ref(false);
    // 底部 bar 的宽度
    var foodBarWidth = computed(function () {
      if (props.imgs.length < props.pageSize) {
        return props.imgs.length * 120 + 68 + 'px';
      } else {
        return props.pageSize * 120 + 68 + 'px';
      }
    });
    watch([function () {
      return props.open;
    }, function () {
      return props.imgs;
    }, function () {
      return props.pageSize;
    }, function () {
      return props.indicator;
    }], sliderAnimation);
    // 计算 isFirstPage、isLastPage
    watchEffect(function () {
      var imgs = props.imgs,
        pageSize = props.pageSize,
        indicator = props.indicator;
      if (imgs.length <= pageSize) {
        isFirstPage.value = true;
        isLastPage.value = true;
        return;
      }
      if (indicator <= pageSize / 2) {
        isFirstPage.value = true;
        isLastPage.value = false;
      } else if (indicator > imgs.length - pageSize / 2) {
        isFirstPage.value = false;
        isLastPage.value = true;
      } else {
        isFirstPage.value = false;
        isLastPage.value = false;
      }
    });
    function sliderAnimation() {
      if (!sliderRef.value || !props.open) return;
      var imgs = props.imgs,
        pageSize = props.pageSize,
        indicator = props.indicator;
      var idx = indicator + 1;
      var length = imgs.length;
      // 如果 imgs 的长度小于 pageSize 则不需要滑动动效（偏移量始终都是 0）。
      if (length <= pageSize) {
        sliderRef.value.style.cssText = "\n        transform: translate3d(0px, 0px, 0px);\n        transition: transform 0s ease;\n      ";
        return;
      }
      var cssText = '';
      var half = pageSize / 2;
      if (idx <= half) {
        cssText = "transform: translate3d(0px, 0px, 0px); transition: transform 0.3s ease;";
      } else if (idx > length - half) {
        cssText = "transform: translate3d(".concat((pageSize - length) * 120, "px, 0px, 0px); transition: transform 0.3s ease;");
      } else {
        var distance = -(idx - half - 0.5) * 120;
        cssText = "transform: translate3d(".concat(distance, "px, 0px, 0px); transition: transform 0.3s ease;");
      }
      sliderRef.value.style.cssText = cssText;
    }
    function handleChangeIndicator(index) {
      emit('update:indicator', index);
    }
    // 上一页
    function handlePrevPage() {
      // 第一页
      if (isFirstPage.value) return;
      isLastPage.value = false;
      var _getTransformProperti = getTransformProperties(sliderRef.value),
        translateX = _getTransformProperti.translateX;
      var distance = translateX + props.pageSize * 120;
      if (distance >= 0) {
        distance = 0;
        isFirstPage.value = true;
      } else {
        isFirstPage.value = false;
      }
      sliderRef.value.style.cssText = "transform: translate3d(".concat(distance, "px, 0px, 0px); transition: transform 0.3s ease;");
    }
    // 下一页
    function handleNextPage() {
      // 最后一页
      if (isLastPage.value) return;
      isFirstPage.value = false;
      var _getTransformProperti2 = getTransformProperties(sliderRef.value),
        translateX = _getTransformProperti2.translateX;
      var max = (props.imgs.length - props.pageSize) * 120;
      var distance = translateX - props.pageSize * 120;
      if (distance <= -max) {
        distance = -max;
        isLastPage.value = true;
      } else {
        isLastPage.value = false;
      }
      sliderRef.value.style.cssText = "transform: translate3d(".concat(distance, "px, 0px, 0px); transition: transform 0.3s ease;");
    }
    return function (_ctx, _cache) {
      return openBlock(), createElementBlock("div", {
        "class": "qm-vnit-preview-image-bar",
        style: normalizeStyle({
          width: foodBarWidth.value
        })
      }, [createElementVNode("div", {
        "class": normalizeClass(['qm-vnit-preview-image-prevpage', {
          disabled: isFirstPage.value
        }]),
        onClick: handlePrevPage
      }, [createVNode(unref(script$1), {
        name: "arrow-left-bold",
        style: {
          "font-size": "30px"
        }
      })], 2 /* CLASS */), createElementVNode("div", {
        "class": normalizeClass(['qm-vnit-preview-image-nextpage', {
          disabled: isLastPage.value
        }]),
        onClick: handleNextPage
      }, [createVNode(unref(script$1), {
        name: "arrow-right-bold",
        style: {
          "font-size": "30px"
        }
      })], 2 /* CLASS */), createElementVNode("div", _hoisted_1, [createElementVNode("ul", {
        ref_key: "sliderRef",
        ref: sliderRef,
        "class": "qm-vnit-preview-image-bar-slider"
      }, [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.imgs, function (item, index) {
        return openBlock(), createElementBlock("li", {
          key: item + index,
          "class": normalizeClass(['qm-vnit-preview-image-bar-slider-item', {
            active: index === _ctx.indicator
          }]),
          onClick: function onClick($event) {
            return handleChangeIndicator(index);
          }
        }, [createVNode(unref(script$2), {
          src: item,
          alt: ""
        }, null, 8 /* PROPS */, ["src"])], 10 /* CLASS, PROPS */, _hoisted_2);
      }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */)])], 4 /* STYLE */);
    };
  }
});

export { script as default };