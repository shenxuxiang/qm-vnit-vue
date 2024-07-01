<script setup lang="ts">
import type { VNode } from 'vue';
import type { Form } from 'ant-design-vue';
import { cloneVNode, computed, h } from 'vue';
import { Input, Select, DatePicker, Cascader } from 'ant-design-vue';

type FormInstance = ReturnType<typeof Form.useForm>;
type RenderItemProps = {
  value: any;
  title: string;
  options?: any[];
  placeholder?: any;
  formType?: string;
  form: FormInstance;
  component?: () => VNode;
  properties?: { [propName: string]: any };
  watch?: (value: string, formModel: any) => void;
};
type RenderItemEmits = {
  'update:value': [value: any];
};

const props = withDefaults(defineProps<RenderItemProps>(), {});
const emits = defineEmits<RenderItemEmits>();
defineOptions({ name: 'RenderFormItem' });

const vnode = computed(() => {
  // 对于一些需要响应式的数据，不应该使用对象解构
  const { value, title, options, formType, component, properties, placeholder } = props;

  if (typeof component === 'function') {
    return cloneVNode(component(), {
      value,
      onChange,
      placeholder,
    });
  }

  switch (formType) {
    case 'input':
      return h(Input, { ...properties, onChange, value, placeholder: placeholder || `请输入${title}` });

    case 'select':
      return h(Select, {
        ...properties,
        value,
        options,
        onChange,
        placeholder: placeholder || `请输入${title}`,
      });

    case 'rangePicker':
      return h(DatePicker.RangePicker, {
        ...properties,
        value,
        onChange,
        placeholder: placeholder ?? ['开始时间', '结束时间'],
      });

    case 'datePicker':
      return h(DatePicker, {
        ...properties,
        value,
        onChange,
        placeholder: placeholder ?? '请选择查询时间',
      });

    case 'cascader':
      return h(Cascader, {
        ...properties,
        value,
        options,
        onChange,
        placeholder: placeholder ?? `请选择${title}`,
      });
    default:
      return null;
  }
});

// 对于一些需要响应式的数据，不应该使用对象解构
function onChange(event: any) {
  const value = event?.type ? event.target.value : event;
  emits('update:value', value);
  props?.watch?.(value, props.form);
}
</script>

<template>
  <component :is="vnode" />
</template>
