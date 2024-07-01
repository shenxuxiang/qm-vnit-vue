import './ContentFormHeader.less';
import type { VNode } from 'vue';
export type Cols = 2 | 3 | 4 | 6 | 8 | 12 | 24;
export type QueryList = Array<{
    title: string;
    name?: string;
    properties?: any;
    formType?: string;
    initialValue?: any;
    dataIndex?: string;
    options?: Array<any>;
    component?: () => VNode;
    placeholder?: string | [string, string];
    watch?: (value: any, formModel: any) => void;
    dataFormat?: (value: any) => {
        [propName: string]: any;
    };
}>;
declare function formModelsFormat(): {
    [x: string]: string | number | any[];
};
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    reset: {
        type: import("vue").PropType<(value: any) => Promise<any>>;
    };
    submit: {
        type: import("vue").PropType<(value: any) => Promise<any>>;
    };
    cols: {
        type: import("vue").PropType<Cols>;
    };
    queryList: {
        type: import("vue").PropType<QueryList>;
        required: true;
    };
    showExport: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    defaultExpand: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    submitButtonText: {
        type: import("vue").PropType<string>;
        default: string;
    };
    hideResetButton: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    export: {
        type: import("vue").PropType<(value: any) => Promise<any>>;
    };
}, {
    form: {
        modelRef: import("ant-design-vue/es/form/useForm").Props | import("vue").Ref<import("ant-design-vue/es/form/useForm").Props>;
        rulesRef: import("ant-design-vue/es/form/useForm").Props | import("vue").Ref<import("ant-design-vue/es/form/useForm").Props>;
        initialModel: import("ant-design-vue/es/form/useForm").Props;
        validateInfos: import("ant-design-vue/es/form/useForm").validateInfos;
        resetFields: (newValues?: import("ant-design-vue/es/form/useForm").Props | undefined) => void;
        validate: <T = any>(names?: (string | string[]) | undefined, option?: import("ant-design-vue/es/form/useForm").validateOptions | undefined) => Promise<T>;
        validateField: (name: string, value: any, rules: Record<string, unknown>[], option?: import("ant-design-vue/es/form/useForm").validateOptions | undefined) => Promise<import("ant-design-vue/es/form/interface").RuleError[]>;
        mergeValidateInfo: (items: import("ant-design-vue/es/form/useForm").ValidateInfo | import("ant-design-vue/es/form/useForm").ValidateInfo[]) => import("ant-design-vue/es/form/useForm").ValidateInfo;
        clearValidate: (names?: (string | string[]) | undefined) => void;
    };
    getCurrentFormData: typeof formModelsFormat;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    reset: {
        type: import("vue").PropType<(value: any) => Promise<any>>;
    };
    submit: {
        type: import("vue").PropType<(value: any) => Promise<any>>;
    };
    cols: {
        type: import("vue").PropType<Cols>;
    };
    queryList: {
        type: import("vue").PropType<QueryList>;
        required: true;
    };
    showExport: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    defaultExpand: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    submitButtonText: {
        type: import("vue").PropType<string>;
        default: string;
    };
    hideResetButton: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    export: {
        type: import("vue").PropType<(value: any) => Promise<any>>;
    };
}>>, {
    showExport: boolean;
    defaultExpand: boolean;
    submitButtonText: string;
    hideResetButton: boolean;
}, {}>, {
    insertNode?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
