import './Loading.less';
declare const _default: import("vue").DefineComponent<{
    open: {
        type: import("vue").PropType<boolean>;
        required: true;
    };
    size: {
        type: import("vue").PropType<"default" | "small" | "large">;
        default: string;
    };
    theme: {
        type: import("vue").PropType<string>;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    open: {
        type: import("vue").PropType<boolean>;
        required: true;
    };
    size: {
        type: import("vue").PropType<"default" | "small" | "large">;
        default: string;
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
