"use strict";

require("core-js/modules/es.array.push.js");
var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");
var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");
var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _forEachInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");
var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");
var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reduce = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/reduce"));
var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));
var _assign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.finally.js");
var _button = _interopRequireDefault(require("ant-design-vue/lib/button"));
var _col = _interopRequireDefault(require("ant-design-vue/lib/col"));
var _row = _interopRequireDefault(require("ant-design-vue/lib/row"));
var _form = _interopRequireDefault(require("ant-design-vue/lib/form"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _vue = require("vue");
var _UpOutlined = _interopRequireDefault(require("@ant-design/icons-vue/UpOutlined"));
var _DownOutlined = _interopRequireDefault(require("@ant-design/icons-vue/DownOutlined"));
require("./RenderItem.vue.js");
var _index = require("../utils/index.js");
require("./ContentFormHeader.css");
var _RenderItemVue2 = _interopRequireDefault(require("./RenderItem.vue2.js"));
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context3, _context4; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty2(_context3 = ownKeys(Object(t), !0)).call(_context3, function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty2(_context4 = ownKeys(Object(t))).call(_context4, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var _hoisted_1 = {
  style: {
    "display": "flex",
    "justify-content": "flex-end",
    "align-items": "flex-start"
  }
};
var ColSpanEnum;
(function (ColSpanEnum) {
  ColSpanEnum[ColSpanEnum["xxl"] = 6] = "xxl";
  ColSpanEnum[ColSpanEnum["xl"] = 8] = "xl";
  ColSpanEnum[ColSpanEnum["lg"] = 8] = "lg";
  ColSpanEnum[ColSpanEnum["md"] = 12] = "md";
  ColSpanEnum[ColSpanEnum["sm"] = 12] = "sm";
  ColSpanEnum[ColSpanEnum["xs"] = 12] = "xs";
})(ColSpanEnum || (ColSpanEnum = {}));
var script = exports["default"] = /*#__PURE__*/(0, _vue.defineComponent)(_objectSpread(_objectSpread({}, {
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
    },
    submit: {
      type: Function,
      required: false
    },
    "export": {
      type: Function,
      required: false
    },
    reset: {
      type: Function,
      required: false
    }
  },
  setup: function setup(__props, _ref) {
    var _props$cols;
    var __expose = _ref.expose;
    var props = __props;
    // 定义每个 Col 元素的宽度
    var useForm = _form["default"].useForm,
      FormItem = _form["default"].Item;
    /**
     * @param containerRef 容器节点对象
     * @param formModel    表单数据
     * @param colsNumber   一行可以展示几列
     * @param colSpan      每列占多少个 span，一行共 24 个 span
     * @param expand       表单是否展开
     * @param form         表单对象
     */
    var containerRef = (0, _vue.shallowRef)();
    var formModel = (0, _vue.reactive)(initialFormModal()); // eslint-disable-line
    var colsNumber = (0, _vue.ref)((_props$cols = props === null || props === void 0 ? void 0 : props.cols) !== null && _props$cols !== void 0 ? _props$cols : 4); // eslint-disable-line
    var colSpan = (0, _vue.ref)(24 / colsNumber.value); // eslint-disable-line
    var expand = (0, _vue.ref)(props.defaultExpand); // eslint-disable-line
    var form = useForm(formModel);
    var submitLoading = (0, _vue.ref)(false);
    var exportLoading = (0, _vue.ref)(false);
    var resetLoading = (0, _vue.ref)(false);
    (0, _vue.onMounted)(function () {
      if (typeof props.cols === 'undefined') computedColSpan();
    });
    (0, _vue.watchEffect)(function () {
      if (props.cols) {
        colsNumber.value = props.cols;
        colSpan.value = 24 / props.cols;
      }
    });
    // 计算共多少行
    var rowsNumber = (0, _vue.computed)(function () {
      return Math.ceil((props.queryList.length + 1) / colsNumber.value);
    });
    // 最后一列（提交、收起按钮所在的列）的 offset
    var buttonGroupOffset = (0, _vue.computed)(function () {
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
      return (0, _reduce["default"])(_context = props.queryList).call(_context, function (memo, item) {
        var dataIndex = item.dataIndex,
          _item$name = item.name,
          name = _item$name === void 0 ? dataIndex : _item$name,
          initialValue = item.initialValue;
        memo[name] = (0, _vue.toRaw)(initialValue) || null;
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
      (0, _forEach["default"])(_context2 = props.queryList).call(_context2, function (item) {
        var dataIndex = item.dataIndex,
          _item$name2 = item.name,
          name = _item$name2 === void 0 ? dataIndex : _item$name2,
          dataFormat = item.dataFormat;
        var fieldValue = result[name];
        // 如果值为 null、undefined 则删除该数据
        // eslint-disable-next-line
        if (fieldValue == null) {
          delete result[name];
        } else if (typeof dataFormat === 'function') {
          delete result[name];
          // 先判断表单项是否有值，如果有值则进行数据格式话操作。
          !(0, _index.isEmpty)(fieldValue) && (0, _assign["default"])(result, dataFormat(formModel[name]));
        }
      });
      return result;
    }
    function handleSubmit() {
      var _props$submit;
      submitLoading.value = true;
      props === null || props === void 0 || (_props$submit = props.submit) === null || _props$submit === void 0 || _props$submit.call(props, formModelsFormat())["finally"](function () {
        return submitLoading.value = false;
      });
    }
    function handleReset() {
      var _props$reset;
      form.resetFields();
      resetLoading.value = true;
      props === null || props === void 0 || (_props$reset = props.reset) === null || _props$reset === void 0 || _props$reset.call(props, formModelsFormat())["finally"](function () {
        return resetLoading.value = false;
      });
    }
    function handleExport() {
      var _props$export;
      exportLoading.value = true;
      props === null || props === void 0 || (_props$export = props["export"]) === null || _props$export === void 0 || _props$export.call(props, formModelsFormat())["finally"](function () {
        return exportLoading.value = false;
      });
    }
    __expose({
      form: form,
      getCurrentFormData: formModelsFormat
    });
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", {
        ref_key: "containerRef",
        ref: containerRef,
        "class": "content-form-head"
      }, [(0, _vue.createVNode)((0, _vue.unref)(_form["default"]), {
        model: formModel
      }, {
        "default": (0, _vue.withCtx)(function () {
          return [(0, _vue.createVNode)((0, _vue.unref)(_row["default"]), {
            "class": "content-form-head-row",
            style: (0, _vue.normalizeStyle)({
              height: expand.value ? "".concat(56 * rowsNumber.value, "px") : '56px'
            })
          }, {
            "default": (0, _vue.withCtx)(function () {
              return [((0, _vue.openBlock)(true), (0, _vue.createElementBlock)(_vue.Fragment, null, (0, _vue.renderList)(_ctx.queryList, function (item, index) {
                return (0, _vue.withDirectives)(((0, _vue.openBlock)(), (0, _vue.createBlock)((0, _vue.unref)(_col["default"]), {
                  key: item.name || item.dataIndex,
                  span: colSpan.value
                }, {
                  "default": (0, _vue.withCtx)(function () {
                    return [(0, _vue.createVNode)((0, _vue.unref)(FormItem), {
                      name: item.name || item.dataIndex,
                      label: item.title
                    }, {
                      "default": (0, _vue.withCtx)(function () {
                        return [(0, _vue.createVNode)(_RenderItemVue2["default"], {
                          value: formModel[item.name || item.dataIndex],
                          "onUpdate:value": function onUpdateValue($event) {
                            return formModel[item.name || item.dataIndex] = $event;
                          },
                          form: (0, _vue.unref)(form),
                          title: item.title,
                          watch: item.watch,
                          options: item.options,
                          formType: item.formType,
                          component: item.component,
                          properties: item.properties,
                          placeholder: item.placeholder
                        }, null, 8 /* PROPS */, ["value", "onUpdate:value", "form", "title", "watch", "options", "formType", "component", "properties", "placeholder"])];
                      }),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["name", "label"])];
                  }),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["span"])), [[_vue.vShow, expand.value || !expand.value && index + 1 < colsNumber.value]]);
              }), 128 /* KEYED_FRAGMENT */)), (0, _vue.createVNode)((0, _vue.unref)(_col["default"]), {
                offset: buttonGroupOffset.value * colSpan.value,
                span: colSpan.value
              }, {
                "default": (0, _vue.withCtx)(function () {
                  return [(0, _vue.createVNode)((0, _vue.unref)(FormItem), null, {
                    "default": (0, _vue.withCtx)(function () {
                      return [(0, _vue.createElementVNode)("div", _hoisted_1, [(0, _vue.createVNode)((0, _vue.unref)(_button["default"]), {
                        type: "primary",
                        loading: submitLoading.value,
                        onClick: handleSubmit
                      }, {
                        "default": (0, _vue.withCtx)(function () {
                          return [(0, _vue.createTextVNode)((0, _vue.toDisplayString)(_ctx.submitButtonText), 1 /* TEXT */)];
                        }),

                        _: 1 /* STABLE */
                      }, 8 /* PROPS */, ["loading"]), !_ctx.hideResetButton ? ((0, _vue.openBlock)(), (0, _vue.createBlock)((0, _vue.unref)(_button["default"]), {
                        key: 0,
                        loading: resetLoading.value,
                        style: {
                          "margin-left": "8px"
                        },
                        onClick: handleReset
                      }, {
                        "default": (0, _vue.withCtx)(function () {
                          return [(0, _vue.createTextVNode)(" 重置 ")];
                        }),
                        _: 1 /* STABLE */
                      }, 8 /* PROPS */, ["loading"])) : (0, _vue.createCommentVNode)("v-if", true), _ctx.showExport ? ((0, _vue.openBlock)(), (0, _vue.createBlock)((0, _vue.unref)(_button["default"]), {
                        key: 1,
                        loading: exportLoading.value,
                        style: {
                          "margin-left": "8px"
                        },
                        onClick: handleExport
                      }, {
                        "default": (0, _vue.withCtx)(function () {
                          return [(0, _vue.createTextVNode)(" 导出 ")];
                        }),
                        _: 1 /* STABLE */
                      }, 8 /* PROPS */, ["loading"])) : (0, _vue.createCommentVNode)("v-if", true), (0, _vue.renderSlot)(_ctx.$slots, "insertNode"), _ctx.queryList.length >= colsNumber.value ? ((0, _vue.openBlock)(), (0, _vue.createBlock)((0, _vue.unref)(_button["default"]), {
                        key: 2,
                        type: "link",
                        onClick: _cache[0] || (_cache[0] = function ($event) {
                          return expand.value = !expand.value;
                        })
                      }, {
                        "default": (0, _vue.withCtx)(function () {
                          return [(0, _vue.createTextVNode)((0, _vue.toDisplayString)(expand.value ? '收起' : '展开') + " ", 1 /* TEXT */), expand.value ? ((0, _vue.openBlock)(), (0, _vue.createBlock)((0, _vue.unref)(_UpOutlined["default"]), {
                            key: 0
                          })) : ((0, _vue.openBlock)(), (0, _vue.createBlock)((0, _vue.unref)(_DownOutlined["default"]), {
                            key: 1
                          }))];
                        }),
                        _: 1 /* STABLE */
                      })) : (0, _vue.createCommentVNode)("v-if", true)])];
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