type AjaxOptions = {
    timeout?: number;
    withCredentials?: boolean;
    headers?: () => {
        [key: string]: any;
    };
};
export default class Ajax {
    opts: AjaxOptions;
    headers: {
        [key: string]: any;
    };
    handleError: (error: any) => void;
    handleSuccess: (response: any) => void;
    handleProgress: (progress: number) => void;
    constructor(options?: AjaxOptions);
    onProgress(callback: (progress: number) => void): void;
    onSuccess(callback: (response: any) => void): void;
    onError(callback: (error: any) => void): void;
    create(url: string, method: string, query: any): XMLHttpRequest;
}
export {};
