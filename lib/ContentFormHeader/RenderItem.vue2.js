"use strict";

require("core-js/modules/es.array.push.js");
var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");
var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");
var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");
var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");
var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");
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
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _vue = require("vue");
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var script = exports["default"] = /*#__PURE__*/(0, _vue.defineComponent)(_objectSpread(_objectSpread({}, {
  name: 'RenderFormItem'
}), {}, {
  __name: 'RenderItem',
  props: {
    value: {
      type: null,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: false
    },
    placeholder: {
      type: null,
      required: false
    },
    formType: {
      type: String,
      required: false
    },
    form: {
      type: null,
      required: true
    },
    component: {
      type: Function,
      required: false
    },
    properties: {
      type: Object,
      required: false
    },
    watch: {
      type: Function,
      required: false
    }
  },
  emits: ["update:value"],
  setup: function setup(__props, _ref) {
    var emits = _ref.emit;
    var props = __props;
    var vnode = (0, _vue.computed)(function () {
      // 对于一些需要响应式的数据，不应该使用对象解构
      var value = props.value,
        title = props.title,
        options = props.options,
        formType = props.formType,
        component = props.component,
        properties = props.properties,
        placeholder = props.placeholder;
      if (typeof component === 'function') {
        return (0, _vue.cloneVNode)(component(), {
          value: value,
          onChange: onChange,
          placeholder: placeholder
        });
      }
      switch (formType) {
        case 'input':
          return (0, _vue.h)(_input["default"], _objectSpread(_objectSpread({}, properties), {}, {
            onChange: onChange,
            value: value,
            placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(title)
          }));
        case 'select':
          return (0, _vue.h)(_select["default"], _objectSpread(_objectSpread({}, properties), {}, {
            value: value,
            options: options,
            onChange: onChange,
            placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(title)
          }));
        case 'rangePicker':
          return (0, _vue.h)(_datePicker["default"].RangePicker, _objectSpread(_objectSpread({}, properties), {}, {
            value: value,
            onChange: onChange,
            placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : ['开始时间', '结束时间']
          }));
        case 'datePicker':
          return (0, _vue.h)(_datePicker["default"], _objectSpread(_objectSpread({}, properties), {}, {
            value: value,
            onChange: onChange,
            placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : '请选择查询时间'
          }));
        case 'cascader':
          return (0, _vue.h)(_cascader["default"], _objectSpread(_objectSpread({}, properties), {}, {
            value: value,
            options: options,
            onChange: onChange,
            placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : "\u8BF7\u9009\u62E9".concat(title)
          }));
        default:
          return null;
      }
    });
    // 对于一些需要响应式的数据，不应该使用对象解构
    function onChange(event) {
      var _props$watch;
      var value = event !== null && event !== void 0 && event.type ? event.target.value : event;
      emits('update:value', value);
      props === null || props === void 0 || (_props$watch = props.watch) === null || _props$watch === void 0 || _props$watch.call(props, value, props.form);
    }
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createBlock)((0, _vue.resolveDynamicComponent)(vnode.value));
    };
  }
}));