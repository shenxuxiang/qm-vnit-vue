import type { CSSProperties, VNode } from 'vue';
import './ImagePreviewGroup.less';
export type ImageGroupSlots = {
    default: () => Array<VNode>;
};
export type ImageGroupProps = {
    style?: CSSProperties;
    imageClass?: string;
    bordered?: boolean;
    options?: string[];
    class?: string;
};
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    options: {
        type: import("vue").PropType<string[]>;
    };
    bordered: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    class: {
        type: import("vue").PropType<string>;
    };
    style: {
        type: import("vue").PropType<CSSProperties>;
    };
    imageClass: {
        type: import("vue").PropType<string>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: import("vue").PropType<string[]>;
    };
    bordered: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    class: {
        type: import("vue").PropType<string>;
    };
    style: {
        type: import("vue").PropType<CSSProperties>;
    };
    imageClass: {
        type: import("vue").PropType<string>;
    };
}>>, {
    bordered: boolean;
}, {}>, Readonly<ImageGroupSlots>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
