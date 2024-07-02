import './ImagePreviewGroup.less';
import type { VNode } from 'vue';
export type ImageGroupSlots = {
    default: () => Array<VNode>;
};
export type ImageGroupProps = {
    imageClass?: string;
    bordered?: boolean;
    options?: string[];
};
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    options: {
        type: import("vue").PropType<string[]>;
    };
    bordered: {
        type: import("vue").PropType<boolean>;
        default: boolean;
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
