import type { VNode } from 'vue';
declare const _default: import("vue").DefineComponent<{
    value: {
        type: import("vue").PropType<any>;
        required: true;
    };
    title: {
        type: import("vue").PropType<string>;
        required: true;
    };
    options: {
        type: import("vue").PropType<any[]>;
    };
    placeholder: {
        type: import("vue").PropType<any>;
    };
    formType: {
        type: import("vue").PropType<string>;
    };
    form: {
        type: import("vue").PropType<{
            modelRef: import("ant-design-vue/es/form/useForm").Props | import("vue").Ref<import("ant-design-vue/es/form/useForm").Props>;
            rulesRef: import("ant-design-vue/es/form/useForm").Props | import("vue").Ref<import("ant-design-vue/es/form/useForm").Props>;
            initialModel: import("ant-design-vue/es/form/useForm").Props;
            validateInfos: import("ant-design-vue/es/form/useForm").validateInfos;
            resetFields: (newValues?: import("ant-design-vue/es/form/useForm").Props | undefined) => void;
            validate: <T = any>(names?: (string | string[]) | undefined, option?: import("ant-design-vue/es/form/useForm").validateOptions | undefined) => Promise<T>;
            validateField: (name: string, value: any, rules: Record<string, unknown>[], option?: import("ant-design-vue/es/form/useForm").validateOptions | undefined) => Promise<import("ant-design-vue/es/form/interface").RuleError[]>;
            mergeValidateInfo: (items: import("ant-design-vue/es/form/useForm").ValidateInfo | import("ant-design-vue/es/form/useForm").ValidateInfo[]) => import("ant-design-vue/es/form/useForm").ValidateInfo;
            clearValidate: (names?: (string | string[]) | undefined) => void;
        }>;
        required: true;
    };
    component: {
        type: import("vue").PropType<() => VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>>;
    };
    properties: {
        type: import("vue").PropType<{
            [propName: string]: any;
        }>;
    };
    watch: {
        type: import("vue").PropType<(value: string, formModel: any) => void>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:value": (value: any) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: import("vue").PropType<any>;
        required: true;
    };
    title: {
        type: import("vue").PropType<string>;
        required: true;
    };
    options: {
        type: import("vue").PropType<any[]>;
    };
    placeholder: {
        type: import("vue").PropType<any>;
    };
    formType: {
        type: import("vue").PropType<string>;
    };
    form: {
        type: import("vue").PropType<{
            modelRef: import("ant-design-vue/es/form/useForm").Props | import("vue").Ref<import("ant-design-vue/es/form/useForm").Props>;
            rulesRef: import("ant-design-vue/es/form/useForm").Props | import("vue").Ref<import("ant-design-vue/es/form/useForm").Props>;
            initialModel: import("ant-design-vue/es/form/useForm").Props;
            validateInfos: import("ant-design-vue/es/form/useForm").validateInfos;
            resetFields: (newValues?: import("ant-design-vue/es/form/useForm").Props | undefined) => void;
            validate: <T = any>(names?: (string | string[]) | undefined, option?: import("ant-design-vue/es/form/useForm").validateOptions | undefined) => Promise<T>;
            validateField: (name: string, value: any, rules: Record<string, unknown>[], option?: import("ant-design-vue/es/form/useForm").validateOptions | undefined) => Promise<import("ant-design-vue/es/form/interface").RuleError[]>;
            mergeValidateInfo: (items: import("ant-design-vue/es/form/useForm").ValidateInfo | import("ant-design-vue/es/form/useForm").ValidateInfo[]) => import("ant-design-vue/es/form/useForm").ValidateInfo;
            clearValidate: (names?: (string | string[]) | undefined) => void;
        }>;
        required: true;
    };
    component: {
        type: import("vue").PropType<() => VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>>;
    };
    properties: {
        type: import("vue").PropType<{
            [propName: string]: any;
        }>;
    };
    watch: {
        type: import("vue").PropType<(value: string, formModel: any) => void>;
    };
}>> & {
    "onUpdate:value"?: ((value: any) => any) | undefined;
}, {}, {}>;
export default _default;
