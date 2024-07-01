import { defineComponent, computed, cloneVNode, h, openBlock, createBlock, resolveDynamicComponent } from 'vue';
import { Cascader, DatePicker, Select, Input } from 'ant-design-vue';

var script = /*#__PURE__*/ defineComponent({
    ...{ name: 'RenderFormItem' },
    __name: 'RenderItem',
    props: {
        value: { type: null, required: true },
        title: { type: String, required: true },
        options: { type: Array, required: false },
        placeholder: { type: null, required: false },
        formType: { type: String, required: false },
        form: { type: null, required: true },
        component: { type: Function, required: false },
        properties: { type: Object, required: false },
        watch: { type: Function, required: false }
    },
    emits: ["update:value"],
    setup(__props, { emit: emits }) {
        const props = __props;
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
        function onChange(event) {
            const value = event?.type ? event.target.value : event;
            emits('update:value', value);
            props?.watch?.(value, props.form);
        }
        return (_ctx, _cache) => {
            return (openBlock(), createBlock(resolveDynamicComponent(vnode.value)));
        };
    }
});

export { script as default };
