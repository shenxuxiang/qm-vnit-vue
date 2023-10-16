import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.number.to-fixed.js";
import "core-js/modules/es.function.name.js";
import { defineComponent, ref, onMounted, onUnmounted, openBlock, createElementBlock, normalizeClass, createCommentVNode, createElementVNode, normalizeStyle, createVNode, unref, toDisplayString, Fragment, renderSlot, createBlock } from 'vue';
import EyeOutlined from '@ant-design/icons-vue/EyeOutlined';
import DeleteOutlined from '@ant-design/icons-vue/DeleteOutlined';
import PictureOutlined from '@ant-design/icons-vue/PictureOutlined';
import Upload from './upload.js';
var _hoisted_1 = {
  key: 0,
  "class": "qm-vnit-upload-image-item-error"
};
var _hoisted_2 = {
  "class": "qm-vnit-upload-image-item-preview"
};
var _hoisted_3 = ["src"];
var _hoisted_4 = {
  "class": "qm-vnit-upload-image-item-mask"
};
var _hoisted_5 = /*#__PURE__*/createElementVNode("div", {
  "class": "qm-vnit-upload-image-item-tips"
}, "上传失败", -1 /* HOISTED */);
var script = /*#__PURE__*/defineComponent({
  __name: 'RenderItem',
  props: {
    uid: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    response: {
      type: null,
      required: false
    },
    method: {
      type: String,
      required: false,
      "default": 'POST'
    },
    rowSource: {
      type: null,
      required: false
    },
    percent: {
      type: Number,
      required: false,
      "default": 100
    },
    disabled: {
      type: Boolean,
      required: false
    },
    headers: {
      type: Function,
      required: false
    },
    status: {
      type: String,
      required: false,
      "default": 'done'
    }
  },
  emits: ["remove", "preview", "error", "success"],
  setup: function setup(__props, _ref) {
    var emit = _ref.emit;
    var props = __props;
    var easeIn = function easeIn(t, b, c, d) {
      return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    };
    var imgURL = ref('');
    var itemRef = ref();
    var cvsRef = ref();
    var ctxRef = ref();
    var uploadInstance = ref();
    // canvas 初始化
    onMounted(function () {
      var _itemRef$value;
      // 在元素刚刚挂载到 DOM 节点时，添加一个渐入式的动画。
      (_itemRef$value = itemRef.value) === null || _itemRef$value === void 0 || _itemRef$value.classList.add('enter-from');
      requestAnimationFrame(function () {
        var _itemRef$value2;
        return (_itemRef$value2 = itemRef.value) === null || _itemRef$value2 === void 0 ? void 0 : _itemRef$value2.classList.remove('enter-from');
      });
      if (props.url) {
        imgURL.value = props.url;
      } else if (props.rowSource) {
        // 预先添加了一个图片预加载的功能，在网络不太流畅时可以让图片尽早的展示出来。
        var reader = new FileReader();
        reader.readAsDataURL(props.rowSource);
        reader.onload = function () {
          imgURL.value = reader.result;
        };
      }
      if (!props.url && props.status === 'loading') {
        initialCanvas();
        uploadFile();
      }
    });
    onUnmounted(function () {
      // 销毁画布
      ctxRef.value = null;
      // 取消请求
      if (uploadInstance.value) uploadInstance.value.abort();
    });
    // 开始上传图片
    function uploadFile() {
      if (props.uid && props.status === 'loading' && props.rowSource) {
        var formData = new FormData();
        formData.append('file', props.rowSource);
        var upload = new Upload({
          headers: props.headers
        });
        var isUploadStart = true;
        // 更新上传进度
        upload.onProgress(function (progress) {
          // 如果一开始上传的时候，progress 就大于等于 1，说明网速足够快上传图片瞬间就完成了，
          // 此时，我们使用动画完成进度条，否则就是每次 onProgress 事件触发 updateProgressBar
          if (isUploadStart && progress >= 1) {
            progressBarAnimation();
          } else {
            updateProgressBar(progress);
          }
          isUploadStart = false;
        });
        // 上传成功
        upload.onSuccess( /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(res) {
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  fadeInAnimation();
                  emit('success', props.uid, res);
                  uploadInstance.value = null;
                case 3:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          return function (_x) {
            return _ref2.apply(this, arguments);
          };
        }());
        // 上传失败
        upload.onError(function (err) {
          emit('error', props.uid, err);
          uploadInstance.value = null;
        });
        // 将 xhr 实例对象赋值给 uploadInstance，在组件卸载时如果请求还没有完成将会取消请求。
        uploadInstance.value = upload.create(props.action, props.method, formData);
      }
    }
    // canvas 画布初始化
    function initialCanvas() {
      var _cvsRef$value;
      cvsRef.value.width = 84;
      cvsRef.value.height = 84;
      var ctx = ctxRef.value = (_cvsRef$value = cvsRef.value) === null || _cvsRef$value === void 0 ? void 0 : _cvsRef$value.getContext('2d');
      ctx.save();
      ctx.translate(42, 42);
    }
    // 进度条自动更新动画
    function progressBarAnimation(callback) {
      var count = 1;
      (function loop() {
        if (count >= 100) return callback === null || callback === void 0 ? void 0 : callback();
        count += 3;
        count = Math.ceil(easeIn(count, count, 100 - count, 100));
        updateProgressBar(count / 100);
        requestAnimationFrame(loop);
      })();
    }
    // 更新进度条
    function updateProgressBar(progress) {
      if (!ctxRef.value) return;
      var ctx = ctxRef.value;
      ctx.clearRect(-42, -42, 84, 84);
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.fillRect(-42, -42, 84, 84);
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.arc(0, 0, 32, -0.5 * Math.PI, Math.PI * 1.5, false);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = '#1677ff';
      ctx.arc(0, 0, 32, -0.5 * Math.PI, Math.PI * 2 * progress - 0.5 * Math.PI, false);
      ctx.stroke();
      ctx.beginPath();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'normal normal normal 14px arial';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillText((progress * 100).toFixed(0) + '%', 0, 0);
    }
    // 图片展示（渐入动画）
    function fadeInAnimation() {
      if (cvsRef.value) {
        cvsRef.value.style.display = 'none';
        // @ts-ignore
        cvsRef.value.parentNode.classList.toggle('fade-in');
        _setTimeout(function () {
          var _cvsRef$value2;
          if ((_cvsRef$value2 = cvsRef.value) !== null && _cvsRef$value2 !== void 0 && _cvsRef$value2.parentNode) {
            // @ts-ignore
            cvsRef.value.parentNode.style.display = 'none';
          }
        }, 300);
      }
    }
    function handleRemove(uid) {
      var _itemRef$value3;
      // 添加离开时的动画效果
      (_itemRef$value3 = itemRef.value) === null || _itemRef$value3 === void 0 || _itemRef$value3.classList.add('leave-from');
      requestAnimationFrame(function () {
        var _itemRef$value4, _itemRef$value5;
        (_itemRef$value4 = itemRef.value) === null || _itemRef$value4 === void 0 || _itemRef$value4.classList.remove('leave-from');
        (_itemRef$value5 = itemRef.value) === null || _itemRef$value5 === void 0 || _itemRef$value5.classList.add('leave-active');
      });
      _setTimeout(function () {
        return emit('remove', uid);
      }, 300);
    }
    return function (_ctx, _cache) {
      return openBlock(), createElementBlock("li", {
        ref_key: "itemRef",
        ref: itemRef,
        "class": normalizeClass(['qm-vnit-upload-image-item', {
          error: _ctx.status === 'error'
        }])
      }, [createCommentVNode(" 进度条 "), createElementVNode("div", {
        "class": "qm-vnit-upload-image-item-progress",
        style: normalizeStyle({
          display: _ctx.status === 'error' ? 'none' : ''
        })
      }, [createElementVNode("canvas", {
        ref_key: "cvsRef",
        ref: cvsRef,
        style: {
          "width": "84px",
          "height": "84px"
        }
      }, null, 512 /* NEED_PATCH */)], 4 /* STYLE */), createCommentVNode(" 上传失败 "), _ctx.status === 'error' ? (openBlock(), createElementBlock("div", _hoisted_1, [createVNode(unref(PictureOutlined), {
        style: {
          "font-size": "36px",
          "color": "#ff4d4f"
        }
      }), createElementVNode("p", null, toDisplayString(_ctx.name), 1 /* TEXT */)])) : _ctx.status === 'done' ? (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createCommentVNode(" 图片展示 "), createElementVNode("div", _hoisted_2, [renderSlot(_ctx.$slots, "itemRender", {
        src: imgURL.value
      }, function () {
        return [createElementVNode("img", {
          src: imgURL.value,
          "class": "qm-vnit-upload-image-item-preview-content"
        }, null, 8 /* PROPS */, _hoisted_3)];
      })])], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */)) : createCommentVNode("v-if", true), createCommentVNode(" 可操作区域 "), createElementVNode("div", _hoisted_4, [createCommentVNode(" 删除按钮 "), !_ctx.disabled ? (openBlock(), createBlock(unref(DeleteOutlined), {
        key: 0,
        "class": "qm-vnit-upload-image-item-remove-icon",
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return handleRemove(_ctx.uid);
        })
      })) : createCommentVNode("v-if", true), createCommentVNode(" 预览按钮 "), _ctx.status === 'done' ? (openBlock(), createBlock(unref(EyeOutlined), {
        key: 1,
        "class": "qm-vnit-upload-image-item-preview-icon",
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return _ctx.$emit('preview', imgURL.value);
        })
      })) : createCommentVNode("v-if", true)]), _hoisted_5], 2 /* CLASS */);
    };
  }
});

export { script as default };