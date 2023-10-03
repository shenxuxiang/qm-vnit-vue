import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import 'core-js/modules/es.number.constructor.js';
import { defineComponent, ref, watch, openBlock, createBlock, unref, withCtx, renderSlot, createVNode, createTextVNode } from 'vue';
import { Upload, Button, message } from 'ant-design-vue';
import UploadOutlined from '@ant-design/icons-vue/UploadOutlined';

var script = /*#__PURE__*/defineComponent({
  __name: 'UploadFile',
  props: {
    action: {
      type: String,
      required: true
    },
    accept: {
      type: String,
      required: false,
      "default": "*"
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
      "default": "text"
    }
  },
  emits: ["update:fileList"],
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
      if (typeof props.fileList === "undefined" || props.fileList === _fileList.value) return;
      _fileList.value = props.fileList;
      // 更新文件数量
      fileCount = props.fileList.length;
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
      emit("update:fileList", newFileList);
    }
    function beforeUpload(file) {
      var size = file.size;
      var maxSize = props.maxSize,
        maxCount = props.maxCount;
      if (maxSize && size > maxSize) {
        message.warning("文件过大，无法上传！");
        return false;
      }
      if (maxCount && fileCount + 1 > maxCount) return false;
      fileCount++;
      return true;
    }
    return function (_ctx, _cache) {
      return openBlock(), createBlock(unref(Upload), {
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
            return [createVNode(unref(Button), {
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
});

export { script as default };
