import _Cascader from "ant-design-vue/lib/cascader";
import _DatePicker from "ant-design-vue/lib/date-picker";
import _Select from "ant-design-vue/lib/select";
import _Input from "ant-design-vue/lib/input";
import { defineComponent, createVNode, mergeProps, cloneVNode } from 'vue';
var RenderFormItem = defineComponent(function (props, _ref) {
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
      return createVNode(_Input, mergeProps(properties, {
        "onChange": onChange,
        "value": props.value,
        "placeholder": placeholder || "\u8BF7\u8F93\u5165".concat(title)
      }), null);
    };
  } else if (formType === 'select') {
    return function () {
      return createVNode(_Select, mergeProps(properties, {
        "onChange": onChange,
        "value": props.value,
        "options": props.options,
        "placeholder": placeholder || "\u8BF7\u8F93\u5165".concat(title)
      }), null);
    };
  } else if (formType === 'rangePicker') {
    var RangePicker = _DatePicker.RangePicker;
    return function () {
      return createVNode(RangePicker, mergeProps(properties, {
        "onChange": onChange,
        "value": props.value,
        "options": props.options,
        "placeholder": placeholder !== null && placeholder !== void 0 ? placeholder : ['开始时间', '结束时间']
      }), null);
    };
  } else if (formType === 'datePicker') {
    return function () {
      return createVNode(_DatePicker, mergeProps(properties, {
        "onChange": onChange,
        "value": props.value,
        "options": props.options,
        "placeholder": placeholder !== null && placeholder !== void 0 ? placeholder : '请选择查询时间'
      }), null);
    };
  } else if (formType === 'cascader') {
    return function () {
      return createVNode(_Cascader, mergeProps(properties, {
        "onChange": onChange,
        "value": props.value,
        "options": props.options,
        "placeholder": placeholder !== null && placeholder !== void 0 ? placeholder : "\u8BF7\u9009\u62E9".concat(title)
      }), null);
    };
  } else if (typeof component === 'function') {
    return function () {
      return cloneVNode(component(), {
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
export { RenderFormItem as default };