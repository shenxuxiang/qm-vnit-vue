import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _Array$from from '@babel/runtime-corejs3/core-js-stable/array/from';
import _spliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/splice';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _Date$now from '@babel/runtime-corejs3/core-js-stable/date/now';
import _findInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import 'core-js/modules/es.number.constructor.js';
import 'core-js/modules/es.function.name.js';
import 'core-js/modules/es.error.to-string.js';
import 'core-js/modules/es.date.to-string.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.regexp.to-string.js';
import 'core-js/modules/es.array.push.js';
import { defineComponent, ref, watch, openBlock, createElementBlock, Fragment, createElementVNode, renderList, createBlock, mergeProps, withCtx, renderSlot, withDirectives, createVNode, unref, vShow, Teleport, createCommentVNode, normalizeClass, nextTick } from 'vue';
import _default from '../PreviewImage/index.js';
import PlusOutlined from '@ant-design/icons-vue/PlusOutlined';
import './RenderItem.vue.js';
import { message } from 'ant-design-vue';
import './UploadImage.css';
import script$1 from './RenderItem.vue2.js';

var _hoisted_1 = {
  "class": "qm-vnit-upload-image"
};
var _hoisted_2 = {
  "class": /*#__PURE__*/normalizeClass(['qm-vnit-upload-image-list'])
};
var _hoisted_3 = {
  "class": "qm-vnit-upload-image-slot"
};
var _hoisted_4 = /*#__PURE__*/createElementVNode("div", null, "上传图片", -1 /* HOISTED */);
var _hoisted_5 = ["multiple"];
var script = /*#__PURE__*/defineComponent({
  __name: 'UploadImage',
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
      type: Array,
      required: false
    },
    previewFile: {
      type: Function,
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
    var _fileList = ref([]);
    var inputRef = ref();
    var uploadButtonRef = ref();
    var previewIdx = ref(0);
    var previewImgs = ref([]);
    var showPreviewImage = ref(false);
    watch(function () {
      return props.fileList;
    }, function () {
      if (props.fileList === _fileList.value) return;
      _fileList.value = props.fileList;
    }, {
      immediate: true
    });
    function handleFileChange(event) {
      var _fileList$value;
      var newFiles = _Array$from(event.target.files);
      // 需要每次都将 input.value 给清空，这样用户再次上传时就可以选择相同的文件了。
      inputRef.value.value = '';
      if (props.maxCount && _fileList.value.length >= props.maxCount) return;
      if (props.maxSize) {
        var length = newFiles.length;
        while (length--) {
          var file = newFiles[length];
          if (file.size > props.maxSize) {
            _spliceInstanceProperty(newFiles).call(newFiles, length, 1);
            message.warning(file.name + '文件过大无法上传！');
          }
        }
        if (newFiles.length <= 0) return;
      }
      if (props.maxCount) {
        var surplus = props.maxCount - _fileList.value.length;
        newFiles = _sliceInstanceProperty(newFiles).call(newFiles, 0, surplus);
      }
      var newFileList = _mapInstanceProperty(newFiles).call(newFiles, function (file) {
        var _context;
        return {
          percent: 0,
          uid: _sliceInstanceProperty(_context = Math.random().toString(32)).call(_context, 2) + _Date$now(),
          name: file.name,
          rowSource: file,
          status: 'loading'
        };
      });
      (_fileList$value = _fileList.value).push.apply(_fileList$value, _toConsumableArray(newFileList));
      triggerUpdateFileList();
      // 需要每次都将 input.value 给清空，这样用户再次上传时就可以选择相同的文件了。
      inputRef.value.value = '';
      // 每次上传时，给上传按钮一个向右移动的动效。
      uploadButtonRef.value.classList.add('enter-from');
      requestAnimationFrame(function () {
        return uploadButtonRef.value.classList.remove('enter-from');
      });
    }
    function handleClick() {
      var _inputRef$value;
      (_inputRef$value = inputRef.value) === null || _inputRef$value === void 0 || _inputRef$value.click();
    }
    // 图片上传成功
    function handleUploadSuccess(uid, res) {
      var _context2;
      var target = _findInstanceProperty(_context2 = _fileList.value).call(_context2, function (file) {
        return file.uid === uid;
      });
      if (target) {
        target.status = 'done';
        target.percent = 100;
        target.response = res;
        triggerUpdateFileList();
      }
    }
    // 图片上传失败
    function handleUploadError(uid, error) {
      var _context3;
      emit('error', error);
      var target = _findInstanceProperty(_context3 = _fileList.value).call(_context3, function (file) {
        return file.uid === uid;
      });
      if (target) {
        target.status = 'error';
        triggerUpdateFileList();
      }
    }
    // 移除
    function handleRemoveItem(uid) {
      var _context4;
      _fileList.value = _filterInstanceProperty(_context4 = _fileList.value).call(_context4, function (file) {
        return file.uid !== uid;
      });
      triggerUpdateFileList();
    }
    function handlePreviewImage(url) {
      if (props.previewFile) {
        props.previewFile(url);
      } else {
        previewImgs.value = [url];
        showPreviewImage.value = true;
      }
    }
    // 触发 'update:fileList' 事件
    function triggerUpdateFileList() {
      nextTick(function () {
        return emit('update:fileList', _fileList.value);
      });
    }
    return function (_ctx, _cache) {
      return openBlock(), createElementBlock(Fragment, null, [createElementVNode("div", _hoisted_1, [createElementVNode("ul", _hoisted_2, [(openBlock(true), createElementBlock(Fragment, null, renderList(_fileList.value, function (file) {
        return openBlock(), createBlock(script$1, mergeProps({
          key: file.uid
        }, file, {
          metod: _ctx.method,
          action: _ctx.action,
          headers: _ctx.headers,
          onError: handleUploadError,
          onRemove: handleRemoveItem,
          onPreview: handlePreviewImage,
          onSuccess: handleUploadSuccess
        }), {
          itemRender: withCtx(function (_ref2) {
            var src = _ref2.src;
            return [renderSlot(_ctx.$slots, "itemRender", {
              src: src
            })];
          }),
          _: 2 /* DYNAMIC */
        }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["metod", "action", "headers"]);
      }), 128 /* KEYED_FRAGMENT */)), withDirectives(createElementVNode("li", {
        "class": "qm-vnit-upload-image-label",
        onClick: handleClick,
        ref_key: "uploadButtonRef",
        ref: uploadButtonRef
      }, [renderSlot(_ctx.$slots, "default", {}, function () {
        return [createElementVNode("div", _hoisted_3, [createVNode(unref(PlusOutlined), {
          style: {
            "font-size": "16px",
            "margin-bottom": "10px",
            "color": "rgba(0, 0, 0, 0.8)"
          }
        }), _hoisted_4])];
      }), createElementVNode("input", {
        type: "file",
        multiple: _ctx.multiple,
        style: {
          "display": "none"
        },
        ref_key: "inputRef",
        ref: inputRef,
        onChange: handleFileChange
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_5)], 512 /* NEED_PATCH */), [[vShow, !_ctx.maxCount || _fileList.value.length < _ctx.maxCount]])])]), !_ctx.previewFile ? (openBlock(), createBlock(Teleport, {
        key: 0,
        to: "body"
      }, [createVNode(unref(_default), {
        pageSize: 1,
        imgs: previewImgs.value,
        index: previewIdx.value,
        open: showPreviewImage.value,
        onClose: _cache[0] || (_cache[0] = function ($event) {
          return showPreviewImage.value = !showPreviewImage.value;
        })
      }, null, 8 /* PROPS */, ["imgs", "index", "open"])])) : createCommentVNode("v-if", true)], 64 /* STABLE_FRAGMENT */);
    };
  }
});

export { script as default };
