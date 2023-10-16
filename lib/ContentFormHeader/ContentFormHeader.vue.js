import "core-js/modules/es.array.push.js";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Button from "ant-design-vue/lib/button";
import _Col from "ant-design-vue/lib/col";
import _Row from "ant-design-vue/lib/row";
import _Form from "ant-design-vue/lib/form";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _reduceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/reduce";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.function.name.js";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context3, _context4; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context3 = ownKeys(Object(t), !0)).call(_context3, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context4 = ownKeys(Object(t))).call(_context4, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import { defineComponent, ref, reactive, onMounted, watch, computed, openBlock, createElementBlock, createVNode, unref, withCtx, normalizeStyle, Fragment, renderList, withDirectives, createBlock, vShow, createElementVNode, createTextVNode, toDisplayString, createCommentVNode, renderSlot } from 'vue';
import UpOutlined from '@ant-design/icons-vue/UpOutlined';
import DownOutlined from '@ant-design/icons-vue/DownOutlined';
import RenderFormItem from './RenderFormItem.js';
import { isEmpty } from '../utils/index.js';
import './ContentFormHeader.css';
var _hoisted_1 = {
  style: {
    "display": "flex",
    "justify-content": "flex-end",
    "align-items": "flex-start"
  }
};
// 定义每个 Col 元素的宽度
var ColSpanEnum;
(function (ColSpanEnum) {
  ColSpanEnum[ColSpanEnum["xxl"] = 6] = "xxl";
  ColSpanEnum[ColSpanEnum["xl"] = 8] = "xl";
  ColSpanEnum[ColSpanEnum["lg"] = 8] = "lg";
  ColSpanEnum[ColSpanEnum["md"] = 12] = "md";
  ColSpanEnum[ColSpanEnum["sm"] = 12] = "sm";
  ColSpanEnum[ColSpanEnum["xs"] = 12] = "xs";
})(ColSpanEnum || (ColSpanEnum = {}));
// 容器节点对象
var script = /*#__PURE__*/defineComponent(_objectSpread(_objectSpread({}, {
  name: 'ContentFormHeader'
}), {}, {
  __name: 'ContentFormHeader',
  props: {
    cols: {
      type: Number,
      required: false
    },
    queryList: {
      type: Array,
      required: true
    },
    showExport: {
      type: Boolean,
      required: false,
      "default": false
    },
    defaultExpand: {
      type: Boolean,
      required: false,
      "default": true
    },
    submitButtonText: {
      type: String,
      required: false,
      "default": '提交'
    },
    hideResetButton: {
      type: Boolean,
      required: false,
      "default": false
    }
  },
  emits: ['submit', 'reset', 'export'],
  setup: function setup(__props, _ref) {
    var _props$cols, _props$cols2;
    var emit = _ref.emit;
    var props = __props;
    var useForm = _Form.useForm,
      FormItem = _Form.Item;
    var containerRef = ref();
    // 一行几列
    // eslint-disable-next-line
    var colsNumber = ref((_props$cols = props === null || props === void 0 ? void 0 : props.cols) !== null && _props$cols !== void 0 ? _props$cols : 4);
    // 每列占多少个 span
    // eslint-disable-next-line
    var colSpan = ref(24 / ((_props$cols2 = props === null || props === void 0 ? void 0 : props.cols) !== null && _props$cols2 !== void 0 ? _props$cols2 : 4));
    // 表单数据
    var formModel = reactive(initialFormModal());
    // 表单对象
    var form = useForm(formModel);
    // 是否展开
    // eslint-disable-next-line
    var expand = ref(props.defaultExpand);
    onMounted(function () {
      if (typeof props.cols === 'undefined') computedColSpan();
    });
    watch(function () {
      return props.cols;
    }, function () {
      if (props.cols) {
        colsNumber.value = props.cols;
        colSpan.value = 24 / props.cols;
      }
    });
    // 一共多少行
    var rowsNumber = computed(function () {
      return Math.ceil((props.queryList.length + 1) / colsNumber.value);
    });
    // 最后一列（提交、收起按钮所在的列）的 offset
    var lastFormItemOffset = computed(function () {
      var total = props.queryList.length;
      var cols = colsNumber.value;
      var reset = total % cols;
      if (total < cols) return cols - total - 1;
      if (!expand.value) return 0;
      if (total === cols) return cols - 1;
      return cols - reset - 1;
    });
    function initialFormModal() {
      var _context;
      return _reduceInstanceProperty(_context = props.queryList).call(_context, function (memo, item) {
        var dataIndex = item.dataIndex,
          _item$name = item.name,
          name = _item$name === void 0 ? dataIndex : _item$name,
          initialValue = item.initialValue;
        memo[name] = initialValue || null;
        return memo;
      }, {});
    }
    function computedColSpan() {
      var width = containerRef.value.offsetWidth;
      var span;
      if (width >= 1600) {
        span = ColSpanEnum.xxl;
      } else if (width >= 1200) {
        span = ColSpanEnum.xl;
      } else if (width >= 992) {
        span = ColSpanEnum.lg;
      } else if (width >= 768) {
        span = ColSpanEnum.md;
      } else {
        span = ColSpanEnum.sm;
      }
      colSpan.value = span;
      colsNumber.value = 24 / span;
    }
    // 表单数据格式化，
    function formModelsFormat() {
      var _context2;
      var result = _objectSpread({}, formModel);
      _forEachInstanceProperty(_context2 = props.queryList).call(_context2, function (item) {
        var dataIndex = item.dataIndex,
          _item$name2 = item.name,
          name = _item$name2 === void 0 ? dataIndex : _item$name2,
          dataFormat = item.dataFormat;
        // 如果值为 null、undefined 则删除该数据
        // eslint-disable-next-line
        if (result[name] == null) {
          delete result[name];
        } else if (typeof dataFormat === 'function') {
          delete result[name];
          // 先判断表单项是否有值，如果有值则进行数据格式话操作。
          !isEmpty(formModel[name]) && _Object$assign(result, dataFormat(formModel[name]));
        }
      });
      return result;
    }
    function handleSubmit() {
      form.validate().then(function () {
        emit('submit', formModelsFormat());
      });
    }
    function handleReset() {
      form.resetFields();
      emit('reset', formModelsFormat());
    }
    function handleExport() {
      emit('export', formModelsFormat());
    }
    return function (_ctx, _cache) {
      return openBlock(), createElementBlock("div", {
        ref_key: "containerRef",
        ref: containerRef,
        "class": "content-form-head"
      }, [createVNode(unref(_Form), {
        model: formModel
      }, {
        "default": withCtx(function () {
          return [createVNode(unref(_Row), {
            "class": "content-form-head-row",
            style: normalizeStyle({
              height: expand.value ? "".concat(56 * rowsNumber.value, "px") : '56px'
            })
          }, {
            "default": withCtx(function () {
              return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.queryList, function (item, index) {
                return withDirectives((openBlock(), createBlock(unref(_Col), {
                  key: item.name || item.dataIndex,
                  span: colSpan.value
                }, {
                  "default": withCtx(function () {
                    return [createVNode(unref(FormItem), {
                      name: item.name || item.dataIndex,
                      label: item.title
                    }, {
                      "default": withCtx(function () {
                        return [createVNode(unref(RenderFormItem), {
                          value: formModel[item.name || item.dataIndex],
                          "onUpdate:value": function onUpdateValue($event) {
                            return formModel[item.name || item.dataIndex] = $event;
                          },
                          title: item.title,
                          watch: item.watch,
                          formModel: formModel,
                          options: item.options,
                          formType: item.formType,
                          component: item.component,
                          properties: item.properties,
                          placeholder: item.placeholder
                        }, null, 8 /* PROPS */, ["value", "onUpdate:value", "title", "watch", "formModel", "options", "formType", "component", "properties", "placeholder"])];
                      }),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["name", "label"])];
                  }),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["span"])), [[vShow, expand.value || !expand.value && index + 1 < colsNumber.value]]);
              }), 128 /* KEYED_FRAGMENT */)), createVNode(unref(_Col), {
                offset: lastFormItemOffset.value * colSpan.value,
                span: colSpan.value
              }, {
                "default": withCtx(function () {
                  return [createVNode(unref(FormItem), null, {
                    "default": withCtx(function () {
                      return [createElementVNode("div", _hoisted_1, [createVNode(unref(_Button), {
                        type: "primary",
                        onClick: handleSubmit
                      }, {
                        "default": withCtx(function () {
                          return [createTextVNode(toDisplayString(_ctx.submitButtonText), 1 /* TEXT */)];
                        }),

                        _: 1 /* STABLE */
                      }), !_ctx.hideResetButton ? (openBlock(), createBlock(unref(_Button), {
                        key: 0,
                        style: {
                          "margin-left": "8px"
                        },
                        onClick: handleReset
                      }, {
                        "default": withCtx(function () {
                          return [createTextVNode(" 重置 ")];
                        }),
                        _: 1 /* STABLE */
                      })) : createCommentVNode("v-if", true), _ctx.showExport ? (openBlock(), createBlock(unref(_Button), {
                        key: 1,
                        style: {
                          "margin-left": "8px"
                        },
                        onClick: handleExport
                      }, {
                        "default": withCtx(function () {
                          return [createTextVNode(" 导出 ")];
                        }),
                        _: 1 /* STABLE */
                      })) : createCommentVNode("v-if", true), renderSlot(_ctx.$slots, "insertNode"), _ctx.queryList.length >= colsNumber.value ? (openBlock(), createBlock(unref(_Button), {
                        key: 2,
                        type: "link",
                        onClick: _cache[0] || (_cache[0] = function ($event) {
                          return expand.value = !expand.value;
                        })
                      }, {
                        "default": withCtx(function () {
                          return [createTextVNode(toDisplayString(expand.value ? '收起' : '展开') + " ", 1 /* TEXT */), expand.value ? (openBlock(), createBlock(unref(UpOutlined), {
                            key: 0
                          })) : (openBlock(), createBlock(unref(DownOutlined), {
                            key: 1
                          }))];
                        }),
                        _: 1 /* STABLE */
                      })) : createCommentVNode("v-if", true)])];
                    }),
                    _: 3 /* FORWARDED */
                  })];
                }),

                _: 3 /* FORWARDED */
              }, 8 /* PROPS */, ["offset", "span"])];
            }),
            _: 3 /* FORWARDED */
          }, 8 /* PROPS */, ["style"])];
        }),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["model"])], 512 /* NEED_PATCH */);
    };
  }
}));

export { script as default };