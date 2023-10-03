import 'core-js/modules/es.number.constructor.js';
import { defineComponent, ref, computed, openBlock, createElementBlock, Fragment, createVNode, unref, withCtx, createElementVNode, createCommentVNode, createBlock, Teleport, Transition } from 'vue';
import './UploadVideo.css';
import '../Icon/index.js';
import '../UploadImage/index.js';
import '../UploadImage/UploadImage.vue.js';
import script$1 from '../UploadImage/UploadImage.vue2.js';
import '../Icon/Icon.vue.js';
import script$2 from '../Icon/Icon.vue2.js';

var _hoisted_1 = ["src"];
var _hoisted_2 = ["src"];
var script = /*#__PURE__*/defineComponent({
  __name: 'UploadVideo',
  props: {
    action: {
      type: String,
      required: true
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
        action: _ctx.action,
        method: _ctx.method,
        headers: _ctx.headers,
        maxSize: _ctx.maxSize,
        multiple: _ctx.multiple,
        maxCount: _ctx.maxCount,
        previewFile: handlePreviewFile,
        fileList: videoList.value,
        "onUpdate:fileList": _cache[0] || (_cache[0] = function ($event) {
          return videoList.value = $event;
        }),
        onError: _cache[1] || (_cache[1] = function ($event) {
          return _ctx.$emit('error', $event);
        })
      }, {
        itemRender: withCtx(function (_ref2) {
          var src = _ref2.src;
          return [src ? (openBlock(), createElementBlock("video", {
            key: 0,
            "class": "qm-vnit-upload-video",
            muted: "",
            ref_key: "videoRef",
            ref: videoRef,
            preload: "auto"
          }, [createElementVNode("source", {
            src: src
          }, null, 8 /* PROPS */, _hoisted_1)], 512 /* NEED_PATCH */)) : createCommentVNode("v-if", true)];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["action", "method", "headers", "maxSize", "multiple", "maxCount", "fileList"]), (openBlock(), createBlock(Teleport, {
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
            controls: "",
            onCanplay: handleCanPlay,
            ref_key: "videoPreviewRef",
            ref: videoPreviewRef,
            "class": "qm-vnit-upload-video-preview-content"
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
});

export { script as default };
