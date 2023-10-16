import { defineComponent, cloneVNode } from 'vue';
import { Input, Select, DatePicker, Cascader } from 'ant-design-vue';

export default defineComponent(
  (props, { emit }) => {
    // 对于一些需要响应式的数据，不应该使用对象解构
    const { title, watch, formType, formModel, component, properties, placeholder } = props;

    function onChange(event: any) {
      const value = event?.type ? event.target.value : event;
      emit('update:value', value);
      watch?.(value, formModel);
    }

    if (formType === 'input') {
      return () => (
        <Input {...properties} onChange={onChange} value={props.value} placeholder={placeholder || `请输入${title}`} />
      );
    } else if (formType === 'select') {
      return () => (
        <Select
          {...properties}
          onChange={onChange}
          value={props.value}
          options={props.options}
          placeholder={placeholder || `请输入${title}`}
        />
      );
    } else if (formType === 'rangePicker') {
      const { RangePicker } = DatePicker;
      return () => (
        <RangePicker
          {...properties}
          onChange={onChange}
          value={props.value}
          options={props.options}
          placeholder={placeholder ?? ['开始时间', '结束时间']}
        />
      );
    } else if (formType === 'datePicker') {
      return () => (
        <DatePicker
          {...properties}
          onChange={onChange}
          value={props.value}
          options={props.options}
          placeholder={placeholder ?? '请选择查询时间'}
        />
      );
    } else if (formType === 'cascader') {
      return () => (
        <Cascader
          {...properties}
          onChange={onChange}
          value={props.value}
          options={props.options}
          placeholder={placeholder ?? `请选择${title}`}
        />
      );
    } else if (typeof component === 'function') {
      return () =>
        cloneVNode(component(), {
          onChange,
          placeholder,
          value: props.value,
        });
    }

    return () => null;
  },
  {
    props: ['title', 'formType', 'component', 'properties', 'options', 'watch', 'placeholder', 'formModel', 'value'],
    emits: ['update:value'],
  },
);
