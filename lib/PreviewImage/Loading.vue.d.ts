import './Loading.less';
declare const _default: import("vue").DefineComponent<{
    size: {
        type: import("vue").PropType<"default" | "small" | "large">;
        default: string;
    };
    open: {
        type: import("vue").PropType<boolean>;
        required: true;
    };
    theme: {
        type: import("vue").PropType<string>;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    size: {
        type: import("vue").PropType<"default" | "small" | "large">;
        default: string;
    };
    open: {
        type: import("vue").PropType<boolean>;
        required: true;
    };
    theme: {
        type: import("vue").PropType<string>;
        default: string;
    };
}>>, {
    size: "default" | "small" | "large";
    theme: string;
}, {}>;
export default _default;
