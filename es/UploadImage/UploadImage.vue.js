import { defineComponent, ref, watch, openBlock, createElementBlock, Fragment, createElementVNode, renderList, createBlock, mergeProps, withCtx, renderSlot, withDirectives, normalizeClass, createVNode, unref, vShow, Teleport, createCommentVNode, nextTick } from 'vue';
import PlusOutlined from '@ant-design/icons-vue/PlusOutlined';
import '../PreviewImage/index.js';
import './RenderItem.vue.js';
import { message } from 'ant-design-vue';
import './UploadImage.css';
import script$1 from './RenderItem.vue2.js';
import '../PreviewImage/PreviewImage.vue2.js';
import script$2 from '../PreviewImage/PreviewImage.vue.js';

const _hoisted_1 = { class: "qm-vnit-upload-image" };
const _hoisted_2 = {
    class: /*#__PURE__*/ normalizeClass(['qm-vnit-upload-image-list'])
};
const _hoisted_3 = { class: "qm-vnit-upload-image-slot" };
const _hoisted_4 = /*#__PURE__*/ createElementVNode("div", null, "上传图片", -1 /* HOISTED */);
const _hoisted_5 = ["accept", "disabled", "multiple"];
var script = /*#__PURE__*/ defineComponent({
    ...{ name: 'UploadImage' },
    __name: 'UploadImage',
    props: {
        action: { type: String, required: true },
        accept: { type: String, required: false, default: 'image/*' },
        method: { type: String, required: false },
        maxSize: { type: Number, required: false },
        maxCount: { type: Number, required: false },
        multiple: { type: Boolean, required: false },
        disabled: { type: Boolean, required: false },
        fileList: { type: Array, required: false },
        previewFile: { type: Function, required: false },
        headers: { type: Function, required: false }
    },
    emits: ["error", "update:fileList"],
    setup(__props, { emit }) {
        const props = __props;
        const _fileList = ref([]);
        const inputRef = ref();
        const uploadButtonRef = ref();
        const previewIdx = ref(0);
        const previewImgs = ref([]);
        const showPreviewImage = ref(false);
        watch(() => props.fileList, () => {
            if (props.fileList === _fileList.value)
                return;
            _fileList.value = props.fileList;
        }, { immediate: true });
        function handleFileChange(event) {
            let newFiles = Array.from(event.target.files);
            // 需要每次都将 input.value 给清空，这样用户再次上传时就可以选择相同的文件了。
            inputRef.value.value = '';
            if (props.maxCount && _fileList.value.length >= props.maxCount)
                return;
            if (props.maxSize) {
                let length = newFiles.length;
                while (length--) {
                    const file = newFiles[length];
                    if (file.size > props.maxSize) {
                        newFiles.splice(length, 1);
                        message.warning(file.name + '文件过大无法上传！');
                    }
                }
                if (newFiles.length <= 0)
                    return;
            }
            if (props.maxCount) {
                const surplus = props.maxCount - _fileList.value.length;
                newFiles = newFiles.slice(0, surplus);
            }
            const newFileList = newFiles.map((file) => ({
                percent: 0,
                uid: Math.random().toString(32).slice(2) + Date.now(),
                name: file.name,
                rowSource: file,
                status: 'loading',
            }));
            _fileList.value.push(...newFileList);
            triggerUpdateFileList();
            // 需要每次都将 input.value 给清空，这样用户再次上传时就可以选择相同的文件了。
            inputRef.value.value = '';
            // 每次上传时，给上传按钮一个向右移动的动效。
            uploadButtonRef.value.classList.add('enter-from');
            requestAnimationFrame(() => uploadButtonRef.value.classList.remove('enter-from'));
        }
        function handleClick() {
            inputRef.value?.click();
        }
        // 图片上传成功
        function handleUploadSuccess(uid, res) {
            const target = _fileList.value.find((file) => file.uid === uid);
            if (target) {
                target.status = 'done';
                target.percent = 100;
                target.response = res;
                triggerUpdateFileList();
            }
        }
        // 图片上传失败
        function handleUploadError(uid, error) {
            emit('error', error);
            const target = _fileList.value.find((file) => file.uid === uid);
            if (target) {
                target.status = 'error';
                triggerUpdateFileList();
            }
        }
        // 移除
        function handleRemoveItem(uid) {
            _fileList.value = _fileList.value.filter((file) => file.uid !== uid);
            triggerUpdateFileList();
        }
        function handlePreviewImage(url) {
            if (props.previewFile) {
                props.previewFile(url);
            }
            else {
                previewImgs.value = [url];
                showPreviewImage.value = true;
            }
        }
        // 触发 'update:fileList' 事件
        function triggerUpdateFileList() {
            nextTick(() => emit('update:fileList', _fileList.value));
        }
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock(Fragment, null, [
                createElementVNode("div", _hoisted_1, [
                    createElementVNode("ul", _hoisted_2, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(_fileList.value, (file) => {
                            return (openBlock(), createBlock(script$1, mergeProps({
                                key: file.uid
                            }, file, {
                                metod: _ctx.method,
                                action: _ctx.action,
                                headers: _ctx.headers,
                                disabled: _ctx.disabled,
                                onError: handleUploadError,
                                onRemove: handleRemoveItem,
                                onPreview: handlePreviewImage,
                                onSuccess: handleUploadSuccess
                            }), {
                                itemRender: withCtx(({ src }) => [
                                    renderSlot(_ctx.$slots, "itemRender", { src: src })
                                ]),
                                _: 2 /* DYNAMIC */
                            }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["metod", "action", "headers", "disabled"]));
                        }), 128 /* KEYED_FRAGMENT */)),
                        withDirectives(createElementVNode("li", {
                            ref_key: "uploadButtonRef",
                            ref: uploadButtonRef,
                            class: normalizeClass(['qm-vnit-upload-image-label', { disabled: _ctx.disabled }]),
                            onClick: handleClick
                        }, [
                            renderSlot(_ctx.$slots, "default", {}, () => [
                                createElementVNode("div", _hoisted_3, [
                                    createVNode(unref(PlusOutlined), { style: { "font-size": "16px", "margin-bottom": "10px", "color": "rgba(0, 0, 0, 0.8)" } }),
                                    _hoisted_4
                                ])
                            ]),
                            createElementVNode("input", {
                                ref_key: "inputRef",
                                ref: inputRef,
                                type: "file",
                                style: { "display": "none" },
                                accept: _ctx.accept,
                                disabled: _ctx.disabled,
                                multiple: _ctx.multiple,
                                onChange: handleFileChange
                            }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_5)
                        ], 2 /* CLASS */), [
                            [vShow, !_ctx.maxCount || _fileList.value.length < _ctx.maxCount]
                        ])
                    ])
                ]),
                (!_ctx.previewFile)
                    ? (openBlock(), createBlock(Teleport, {
                        key: 0,
                        to: "body"
                    }, [
                        createVNode(unref(script$2), {
                            pageSize: 1,
                            imgs: previewImgs.value,
                            index: previewIdx.value,
                            open: showPreviewImage.value,
                            onClose: _cache[0] || (_cache[0] = ($event) => (showPreviewImage.value = !showPreviewImage.value))
                        }, null, 8 /* PROPS */, ["imgs", "index", "open"])
                    ]))
                    : createCommentVNode("v-if", true)
            ], 64 /* STABLE_FRAGMENT */));
        };
    }
});

export { script as default };
