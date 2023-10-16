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
import "core-js/modules/es.number.constructor.js";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import { defineComponent, ref, computed, openBlock, createElementBlock, Fragment, createVNode, unref, withCtx, createElementVNode, createCommentVNode, createBlock, Teleport, Transition } from 'vue';
import './UploadVideo.css';
import '../Icon/index.js';
import '../UploadImage/index.js';
import '../UploadImage/UploadImage.vue2.js';
import script$1 from '../UploadImage/UploadImage.vue.js';
import '../Icon/Icon.vue2.js';
import script$2 from '../Icon/Icon.vue.js';
var _hoisted_1 = ["src"];
var _hoisted_2 = ["src"];
var script = /*#__PURE__*/defineComponent(_objectSpread(_objectSpread({}, {
  name: 'UploadVideo'
}), {}, {
  __name: 'UploadVideo',
  props: {
    action: {
      type: String,
      required: true
    },
    accept: {
      type: String,
      required: false,
      "default": 'video/*'
    },
    method: {
      type: String,
      required: false
    },
    maxSize: {
      type: Number,
      required: false
    },
    maxCount: {
      type: Number,
      required: false
    },
    multiple: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    fileList: {
      type: null,
      required: false
    },
    headers: {
      type: Function,
      required: false
    }
  },
  emits: ["error", "update:fileList"],
  setup: function setup(__props, _ref) {
    var emit = _ref.emit;
    var props = __props;
    var videoURL = ref('');
    var videoRef = ref();
    var localVideos = ref([]);
    var showPreview = ref(false);
    var videoPreviewRef = ref();
    var videoList = computed({
      get: function get() {
        return props.fileList || localVideos.value;
      },
      set: function set(value) {
        return emit('update:fileList', value);
      }
    });
    function handlePreviewFile(url) {
      videoURL.value = url;
      showPreview.value = true;
    }
    function handleCanPlay(event) {
      var video = event.target;
      var videoWidth = video.videoWidth,
        videoHeight = video.videoHeight;
      var ratio = videoWidth / videoHeight;
      var maxWidth = document.documentElement.clientWidth * 0.7;
      var maxHeight = document.documentElement.clientWidth * 0.8;
      var width;
      var height;
      if (ratio > maxWidth / maxHeight) {
        if (videoWidth > maxWidth) {
          width = maxWidth;
          height = width / ratio;
        } else {
          width = videoWidth;
          height = videoHeight;
        }
      } else {
        if (videoHeight > maxHeight) {
          height = maxHeight;
          width = height / ratio;
        } else {
          width = videoWidth;
          height = videoHeight;
        }
      }
      video.width = width;
      video.height = height;
    }
    function handleClosePreview(event) {
      if (event.target === event.currentTarget) {
        videoPreviewRef.value.pause();
        showPreview.value = false;
        videoURL.value = '';
      }
    }
    return function (_ctx, _cache) {
      return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(script$1), {
        fileList: videoList.value,
        "onUpdate:fileList": _cache[0] || (_cache[0] = function ($event) {
          return videoList.value = $event;
        }),
        action: _ctx.action,
        method: _ctx.method,
        accept: _ctx.accept,
        headers: _ctx.headers,
        maxSize: _ctx.maxSize,
        multiple: _ctx.multiple,
        maxCount: _ctx.maxCount,
        disabled: _ctx.disabled,
        previewFile: handlePreviewFile,
        onError: _cache[1] || (_cache[1] = function ($event) {
          return _ctx.$emit('error', $event);
        })
      }, {
        itemRender: withCtx(function (_ref2) {
          var src = _ref2.src;
          return [src ? (openBlock(), createElementBlock("video", {
            key: 0,
            ref_key: "videoRef",
            ref: videoRef,
            "class": "qm-vnit-upload-video",
            muted: "",
            preload: "auto"
          }, [createElementVNode("source", {
            src: src
          }, null, 8 /* PROPS */, _hoisted_1)], 512 /* NEED_PATCH */)) : createCommentVNode("v-if", true)];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["fileList", "action", "method", "accept", "headers", "maxSize", "multiple", "maxCount", "disabled"]), (openBlock(), createBlock(Teleport, {
        to: "body"
      }, [createVNode(Transition, {
        name: "uploadVidePreview"
      }, {
        "default": withCtx(function () {
          return [showPreview.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            "class": "qm-vnit-upload-video-previewe",
            onClick: handleClosePreview
          }, [createElementVNode("video", {
            ref_key: "videoPreviewRef",
            ref: videoPreviewRef,
            controls: "",
            "class": "qm-vnit-upload-video-preview-content",
            onCanplay: handleCanPlay
          }, [createElementVNode("source", {
            src: videoURL.value
          }, null, 8 /* PROPS */, _hoisted_2)], 544 /* HYDRATE_EVENTS, NEED_PATCH */), createVNode(unref(script$2), {
            name: "close",
            "class": "qm-vnit-upload-video-preview-close-icon",
            onClick: handleClosePreview
          })])) : createCommentVNode("v-if", true)];
        }),
        _: 1 /* STABLE */
      })]))], 64 /* STABLE_FRAGMENT */);
    };
  }
}));

export { script as default };