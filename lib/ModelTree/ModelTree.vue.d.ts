import type { TreeProps } from 'ant-design-vue';
import './ModelTree.less';
type TreeDataItem = NonNullable<TreeProps['treeData']>[0] & {
    parentKey: number | string;
    children?: TreeDataItem[];
};
export type TreeData = TreeDataItem[];
declare function getParentKeys(key: string | number): (string | number)[];
declare const _default: import("vue").DefineComponent<{
    disabled: {
        type: import("vue").PropType<boolean>;
    };
    placeholder: {
        type: import("vue").PropType<string>;
        default: string;
    };
    bordered: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    checkable: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    expandedKeys: {
        type: import("vue").PropType<string[] | number[]>;
    };
    checkedKeys: {
        type: import("vue").PropType<string[] | number[]>;
    };
    selectedKeys: {
        type: import("vue").PropType<string[] | number[]>;
    };
    treeData: {
        type: import("vue").PropType<any[]>;
        required: true;
    };
    showFilter: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    computedTreeData: {
        type: import("vue").PropType<(treeData: any[]) => TreeData>;
    };
}, {
    getParentKeys: typeof getParentKeys;
    getAllParentKeys: () => (string | number)[];
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:checkedKeys": (value: string[] | number[]) => void;
    "update:expandedKeys": (value: string[] | number[]) => void;
    "update:selectedKeys": (value: string[] | number[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    disabled: {
        type: import("vue").PropType<boolean>;
    };
    placeholder: {
        type: import("vue").PropType<string>;
        default: string;
    };
    bordered: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    checkable: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    expandedKeys: {
        type: import("vue").PropType<string[] | number[]>;
    };
    checkedKeys: {
        type: import("vue").PropType<string[] | number[]>;
    };
    selectedKeys: {
        type: import("vue").PropType<string[] | number[]>;
    };
    treeData: {
        type: import("vue").PropType<any[]>;
        required: true;
    };
    showFilter: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    computedTreeData: {
        type: import("vue").PropType<(treeData: any[]) => TreeData>;
    };
}>> & {
    "onUpdate:selectedKeys"?: ((value: string[] | number[]) => any) | undefined;
    "onUpdate:checkedKeys"?: ((value: string[] | number[]) => any) | undefined;
    "onUpdate:expandedKeys"?: ((value: string[] | number[]) => any) | undefined;
}, {
    placeholder: string;
    bordered: boolean;
    checkable: boolean;
    showFilter: boolean;
}, {}>;
export default _default;
