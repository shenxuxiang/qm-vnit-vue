import type { QueryList, Cols } from '../ContentFormHeader';
import type { TableProps } from 'ant-design-vue';
import type { VNode } from 'vue';
import './ContentFormTable.less';
type ReturnColumn<T> = T extends Array<infer E> ? E : never;
type TableColumns = TableProps['columns'];
type TableColumn = ReturnColumn<TableColumns>;
export type Columns = Array<TableColumn & QueryList[0] & {
    visibleInTable?: boolean;
}>;
type SorterList = Array<{
    field: string;
    order: 'ascend' | 'descend';
}>;
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    bordered: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    cols: {
        type: import("vue").PropType<Cols>;
    };
    showExport: {
        type: import("vue").PropType<boolean>;
    };
    submitButtonText: {
        type: import("vue").PropType<string>;
    };
    columns: {
        type: import("vue").PropType<Columns>;
        required: true;
    };
    scroll: {
        type: import("vue").PropType<{
            x?: string | number | true | undefined;
            y?: string | number | undefined;
        } & {
            scrollToFirstRowOnChange?: boolean | undefined;
        }>;
    };
    rowKey: {
        type: import("vue").PropType<string>;
        required: true;
    };
    rowSelection: {
        type: import("vue").PropType<import("ant-design-vue/es/table/interface").TableRowSelection<any>>;
    };
    immediate: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    paginationSize: {
        type: import("vue").PropType<"default" | "small">;
    };
    tableSize: {
        type: import("vue").PropType<"small" | "middle" | "large">;
    };
    validateFields: {
        type: import("vue").PropType<(query: any) => boolean>;
    };
    queryTableList: {
        type: import("vue").PropType<(query: any) => Promise<any>>;
        required: true;
    };
    showTotal: {
        type: import("vue").PropType<(total: number) => string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>>;
        default: (total: number) => string;
    };
    exportTableList: {
        type: import("vue").PropType<(query: any) => Promise<any>>;
    };
    customResponse: {
        type: import("vue").PropType<(data: {
            code: number;
            data: any;
            msg: string;
        }) => {
            total: number;
            tableList: any[];
        }>;
        default: ({ data }: {
            code: number;
            data: any;
            msg: string;
        }) => {
            tableList: any;
            total: any;
        };
    };
    customTableSorter: {
        type: import("vue").PropType<(data: SorterList) => any>;
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
    } | undefined;
    forceUpdate: () => Promise<void>;
    getQueryData: () => {
        [x: string]: string | number | any[];
    } | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    paginationChange: (pageNum: number, pageSize: number) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    bordered: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    cols: {
        type: import("vue").PropType<Cols>;
    };
    showExport: {
        type: import("vue").PropType<boolean>;
    };
    submitButtonText: {
        type: import("vue").PropType<string>;
    };
    columns: {
        type: import("vue").PropType<Columns>;
        required: true;
    };
    scroll: {
        type: import("vue").PropType<{
            x?: string | number | true | undefined;
            y?: string | number | undefined;
        } & {
            scrollToFirstRowOnChange?: boolean | undefined;
        }>;
    };
    rowKey: {
        type: import("vue").PropType<string>;
        required: true;
    };
    rowSelection: {
        type: import("vue").PropType<import("ant-design-vue/es/table/interface").TableRowSelection<any>>;
    };
    immediate: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    paginationSize: {
        type: import("vue").PropType<"default" | "small">;
    };
    tableSize: {
        type: import("vue").PropType<"small" | "middle" | "large">;
    };
    validateFields: {
        type: import("vue").PropType<(query: any) => boolean>;
    };
    queryTableList: {
        type: import("vue").PropType<(query: any) => Promise<any>>;
        required: true;
    };
    showTotal: {
        type: import("vue").PropType<(total: number) => string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>>;
        default: (total: number) => string;
    };
    exportTableList: {
        type: import("vue").PropType<(query: any) => Promise<any>>;
    };
    customResponse: {
        type: import("vue").PropType<(data: {
            code: number;
            data: any;
            msg: string;
        }) => {
            total: number;
            tableList: any[];
        }>;
        default: ({ data }: {
            code: number;
            data: any;
            msg: string;
        }) => {
            tableList: any;
            total: any;
        };
    };
    customTableSorter: {
        type: import("vue").PropType<(data: SorterList) => any>;
    };
}>> & {
    onPaginationChange?: ((pageNum: number, pageSize: number) => any) | undefined;
}, {
    bordered: boolean;
    immediate: boolean;
    showTotal: (total: number) => string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    customResponse: (data: {
        code: number;
        data: any;
        msg: string;
    }) => {
        total: number;
        tableList: any[];
    };
}, {}>, {
    insertHeadNode?(_: {}): any;
    extra?(_: {}): any;
    bodyCell?(_: {
        text: any;
        value: any;
        record: Record<string, any>;
        index: number;
        column: import("ant-design-vue").TableColumnType<any>;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
