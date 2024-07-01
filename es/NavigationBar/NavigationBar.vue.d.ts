import './index.less';
export type NavBarList = Array<{
    key: string;
    label: string;
    [propName: string]: any;
}>;
declare const _default: import("vue").DefineComponent<{
    activeKey: {
        type: import("vue").PropType<string>;
        required: true;
    };
    navBarList: {
        type: import("vue").PropType<NavBarList>;
        required: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (activeKey: string) => void;
    delete: (navBarList: NavBarList) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    activeKey: {
        type: import("vue").PropType<string>;
        required: true;
    };
    navBarList: {
        type: import("vue").PropType<NavBarList>;
        required: true;
    };
}>> & {
    onChange?: ((activeKey: string) => any) | undefined;
    onDelete?: ((navBarList: NavBarList) => any) | undefined;
}, {}, {}>;
export default _default;
