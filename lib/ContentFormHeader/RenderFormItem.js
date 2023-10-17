"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _cascader = _interopRequireDefault(require("ant-design-vue/lib/cascader"));
var _datePicker = _interopRequireDefault(require("ant-design-vue/lib/date-picker"));
var _select = _interopRequireDefault(require("ant-design-vue/lib/select"));
var _input = _interopRequireDefault(require("ant-design-vue/lib/input"));
var _vue = require("vue");
var RenderFormItem = exports["default"] = (0, _vue.defineComponent)(function (props, _ref) {
  var emit = _ref.emit;
  // 对于一些需要响应式的数据，不应该使用对象解构
  var title = props.title,
    watch = props.watch,
    formType = props.formType,
    formModel = props.formModel,
    component = props.component,
    properties = props.properties,
    placeholder = props.placeholder;
  function onChange(event) {
    var value = event !== null && event !== void 0 && event.type ? event.target.value : event;
    emit('update:value', value);
    watch === null || watch === void 0 || watch(value, formModel);
  }
  if (formType === 'input') {
    return function () {
      return (0, _vue.createVNode)(_input["default"], (0, _vue.mergeProps)(properties, {
        "onChange": onChange,
        "value": props.value,
        "placeholder": placeholder || "\u8BF7\u8F93\u5165".concat(title)
      }), null);
    };
  } else if (formType === 'select') {
    return function () {
      return (0, _vue.createVNode)(_select["default"], (0, _vue.mergeProps)(properties, {
        "onChange": onChange,
        "value": props.value,
        "options": props.options,
        "placeholder": placeholder || "\u8BF7\u8F93\u5165".concat(title)
      }), null);
    };
  } else if (formType === 'rangePicker') {
    var RangePicker = _datePicker["default"].RangePicker;
    return function () {
      return (0, _vue.createVNode)(RangePicker, (0, _vue.mergeProps)(properties, {
        "onChange": onChange,
        "value": props.value,
        "placeholder": placeholder !== null && placeholder !== void 0 ? placeholder : ['开始时间', '结束时间']
      }), null);
    };
  } else if (formType === 'datePicker') {
    return function () {
      return (0, _vue.createVNode)(_datePicker["default"], (0, _vue.mergeProps)(properties, {
        "onChange": onChange,
        "value": props.value,
        "placeholder": placeholder !== null && placeholder !== void 0 ? placeholder : '请选择查询时间'
      }), null);
    };
  } else if (formType === 'cascader') {
    return function () {
      return (0, _vue.createVNode)(_cascader["default"], (0, _vue.mergeProps)(properties, {
        "onChange": onChange,
        "value": props.value,
        "options": props.options,
        "placeholder": placeholder !== null && placeholder !== void 0 ? placeholder : "\u8BF7\u9009\u62E9".concat(title)
      }), null);
    };
  } else if (typeof component === 'function') {
    return function () {
      return (0, _vue.cloneVNode)(component(), {
        onChange: onChange,
        placeholder: placeholder,
        value: props.value
      });
    };
  }
  return function () {
    return null;
  };
}, {
  props: ['title', 'formType', 'component', 'properties', 'options', 'watch', 'placeholder', 'formModel', 'value'],
  emits: ['update:value']
});