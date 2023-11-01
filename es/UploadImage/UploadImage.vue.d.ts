import './UploadImage.less';
export type FileList = {
    uid: string;
    name: string;
    url?: string;
    response?: any;
    percent?: number;
    rawResource?: File;
    status?: 'loading' | 'done' | 'error' | 'remove';
}[];
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    disabled: {
        type: import("vue").PropType<boolean>;
    };
    multiple: {
        type: import("vue").PropType<boolean>;
    };
    fileList: {
        type: import("vue").PropType<FileList>;
    };
    action: {
        type: import("vue").PropType<string>;
        required: true;
    };
    accept: {
        type: import("vue").PropType<string>;
        default: string;
    };
    maxSize: {
        type: import("vue").PropType<number>;
    };
    maxCount: {
        type: import("vue").PropType<number>;
    };
    headers: {
        type: import("vue").PropType<() => {
            [key: string]: any;
        }>;
    };
    method: {
        type: import("vue").PropType<string>;
    };
    previewFile: {
        type: import("vue").PropType<(url: string) => void>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (error: any) => void;
    "update:fileList": (fileList: FileList) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    disabled: {
        type: import("vue").PropType<boolean>;
    };
    multiple: {
        type: import("vue").PropType<boolean>;
    };
    fileList: {
        type: import("vue").PropType<FileList>;
    };
    action: {
        type: import("vue").PropType<string>;
        required: true;
    };
    accept: {
        type: import("vue").PropType<string>;
        default: string;
    };
    maxSize: {
        type: import("vue").PropType<number>;
    };
    maxCount: {
        type: import("vue").PropType<number>;
    };
    headers: {
        type: import("vue").PropType<() => {
            [key: string]: any;
        }>;
    };
    method: {
        type: import("vue").PropType<string>;
    };
    previewFile: {
        type: import("vue").PropType<(url: string) => void>;
    };
}>> & {
    onError?: ((error: any) => any) | undefined;
    "onUpdate:fileList"?: ((fileList: FileList) => any) | undefined;
}, {
    accept: string;
}, {}>, {
    itemRender?(_: {
        src: string;
    }): any;
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
