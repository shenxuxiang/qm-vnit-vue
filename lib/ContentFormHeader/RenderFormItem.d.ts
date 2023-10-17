import type { VNode } from 'vue';
type IProps = {
    value: any;
    title: string;
    formModel: any;
    options?: any[];
    placeholder?: any;
    formType?: string;
    component?: () => VNode;
    properties?: {
        [propName: string]: any;
    };
    watch?: (value: string, formModel: any) => void;
};
declare const _default: (props: IProps & {
    "onUpdate:value"?: ((value: any) => any) | undefined;
}) => any;
export default _default;
