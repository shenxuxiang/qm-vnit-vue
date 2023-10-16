import "core-js/modules/es.array.push.js";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Button from "ant-design-vue/lib/button";
import _Upload from "ant-design-vue/lib/upload";
import _message from "ant-design-vue/lib/message";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import "core-js/modules/es.number.constructor.js";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context2, _context3; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(t), !0)).call(_context2, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context3 = ownKeys(Object(t))).call(_context3, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import { defineComponent, ref, watch, openBlock, createBlock, unref, withCtx, renderSlot, createVNode, createTextVNode } from 'vue';
import UploadOutlined from '@ant-design/icons-vue/UploadOutlined';
var script = /*#__PURE__*/defineComponent(_objectSpread(_objectSpread({}, {
  name: 'UploadFile'
}), {}, {
  __name: 'UploadFile',
  props: {
    action: {
      type: String,
      required: true
    },
    accept: {
      type: String,
      required: false,
      "default": '*'
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
      required: false,
      "default": true
    },
    disabled: {
      type: Boolean,
      required: false
    },
    headers: {
      type: Object,
      required: false
    },
    fileList: {
      type: null,
      required: false
    },
    listType: {
      type: String,
      required: false,
      "default": 'text'
    }
  },
  emits: ['update:fileList'],
  setup: function setup(__props, _ref) {
    var _props$fileList$lengt, _props$fileList;
    var emit = _ref.emit;
    var props = __props;
    // 当前文件数量，在限制文件上传数量时会被使用
    var fileCount = (_props$fileList$lengt = (_props$fileList = props.fileList) === null || _props$fileList === void 0 ? void 0 : _props$fileList.length) !== null && _props$fileList$lengt !== void 0 ? _props$fileList$lengt : 0;
    var _fileList = ref([]);
    watch([function () {
      return props.fileList;
    }], function () {
      if (typeof props.fileList === 'undefined' || props.fileList === _fileList.value) return;
      _fileList.value = props.fileList;
      // 更新文件数量
      fileCount = props.fileList.length;
    }, {
      immediate: true
    });
    function handleFileChange(field) {
      var _context;
      var maxSize = props.maxSize,
        maxCount = props.maxCount;
      var newFileList = field.fileList;
      if (maxSize) newFileList = _filterInstanceProperty(_context = field.fileList).call(_context, function (file) {
        return file.size <= maxSize;
      });
      if (maxCount) newFileList = _sliceInstanceProperty(newFileList).call(newFileList, 0, maxCount);
      _fileList.value = newFileList;
      // 更新文件数量
      fileCount = newFileList.length;
      emit('update:fileList', newFileList);
    }
    function beforeUpload(file) {
      var size = file.size;
      var maxSize = props.maxSize,
        maxCount = props.maxCount;
      if (maxSize && size > maxSize) {
        _message.warning('文件过大，无法上传！');
        return false;
      }
      if (maxCount && fileCount + 1 > maxCount) return false;
      fileCount++;
      return true;
    }
    return function (_ctx, _cache) {
      return openBlock(), createBlock(unref(_Upload), {
        accept: _ctx.accept,
        action: _ctx.action,
        headers: _ctx.headers,
        multiple: _ctx.multiple,
        disabled: _ctx.disabled,
        listType: _ctx.listType,
        "file-list": _fileList.value,
        beforeUpload: beforeUpload,
        onChange: handleFileChange
      }, {
        "default": withCtx(function () {
          return [renderSlot(_ctx.$slots, "default", {}, function () {
            return [createVNode(unref(_Button), {
              disabled: _ctx.disabled
            }, {
              "default": withCtx(function () {
                return [createTextVNode(" 上传文件"), createVNode(unref(UploadOutlined))];
              }),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["disabled"])];
          })];
        }),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["accept", "action", "headers", "multiple", "disabled", "listType", "file-list"]);
    };
  }
}));
export { script as default };