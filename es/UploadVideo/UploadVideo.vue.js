import { defineComponent, ref, computed, openBlock, createElementBlock, Fragment, createVNode, unref, withCtx, createElementVNode, createCommentVNode, createBlock, Teleport, Transition } from 'vue';
import './UploadVideo.css';
import '../Icon/index.js';
import '../UploadImage/index.js';
import '../UploadImage/UploadImage.vue2.js';
import script$1 from '../UploadImage/UploadImage.vue.js';
import '../Icon/Icon.vue2.js';
import script$2 from '../Icon/Icon.vue.js';

const _hoisted_1 = ["src"];
const _hoisted_2 = ["src"];
var script = /*#__PURE__*/ defineComponent({
    ...{ name: 'UploadVideo' },
    __name: 'UploadVideo',
    props: {
        action: { type: String, required: true },
        accept: { type: String, required: false, default: 'video/*' },
        method: { type: String, required: false },
        maxSize: { type: Number, required: false },
        maxCount: { type: Number, required: false },
        multiple: { type: Boolean, required: false },
        disabled: { type: Boolean, required: false },
        fileList: { type: null, required: false },
        headers: { type: Function, required: false }
    },
    emits: ["error", "update:fileList"],
    setup(__props, { emit }) {
        const props = __props;
        const videoURL = ref('');
        const videoRef = ref();
        const localVideos = ref([]);
        const showPreview = ref(false);
        const videoPreviewRef = ref();
        const videoList = computed({
            get: () => props.fileList || localVideos.value,
            set: (value) => emit('update:fileList', value),
        });
        function handlePreviewFile(url) {
            videoURL.value = url;
            showPreview.value = true;
        }
        function handleCanPlay(event) {
            const video = event.target;
            const { videoWidth, videoHeight } = video;
            const ratio = videoWidth / videoHeight;
            const maxWidth = document.documentElement.clientWidth * 0.7;
            const maxHeight = document.documentElement.clientWidth * 0.8;
            let width;
            let height;
            if (ratio > maxWidth / maxHeight) {
                if (videoWidth > maxWidth) {
                    width = maxWidth;
                    height = width / ratio;
                }
                else {
                    width = videoWidth;
                    height = videoHeight;
                }
            }
            else {
                if (videoHeight > maxHeight) {
                    height = maxHeight;
                    width = height / ratio;
                }
                else {
                    width = videoWidth;
                    height = videoHeight;
                }
            }
            video.width = width;
            video.height = height;
        }
        function handleClosePreview(event) {
            if (event.target === event.currentTarget) {
                videoPreviewRef.value.pause();
                showPreview.value = false;
                videoURL.value = '';
            }
        }
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock(Fragment, null, [
                createVNode(unref(script$1), {
                    fileList: videoList.value,
                    "onUpdate:fileList": _cache[0] || (_cache[0] = ($event) => ((videoList).value = $event)),
                    action: _ctx.action,
                    method: _ctx.method,
                    accept: _ctx.accept,
                    headers: _ctx.headers,
                    maxSize: _ctx.maxSize,
                    multiple: _ctx.multiple,
                    maxCount: _ctx.maxCount,
                    disabled: _ctx.disabled,
                    previewFile: handlePreviewFile,
                    onError: _cache[1] || (_cache[1] = ($event) => (_ctx.$emit('error', $event)))
                }, {
                    itemRender: withCtx(({ src }) => [
                        src
                            ? (openBlock(), createElementBlock("video", {
                                key: 0,
                                ref_key: "videoRef",
                                ref: videoRef,
                                class: "qm-vnit-upload-video",
                                muted: "",
                                preload: "auto"
                            }, [
                                createElementVNode("source", { src: src }, null, 8 /* PROPS */, _hoisted_1)
                            ], 512 /* NEED_PATCH */))
                            : createCommentVNode("v-if", true)
                    ]),
                    _: 1 /* STABLE */
                }, 8 /* PROPS */, ["fileList", "action", "method", "accept", "headers", "maxSize", "multiple", "maxCount", "disabled"]),
                (openBlock(), createBlock(Teleport, { to: "body" }, [
                    createVNode(Transition, { name: "uploadVidePreview" }, {
                        default: withCtx(() => [
                            (showPreview.value)
                                ? (openBlock(), createElementBlock("div", {
                                    key: 0,
                                    class: "qm-vnit-upload-video-previewe",
                                    onClick: handleClosePreview
                                }, [
                                    createElementVNode("video", {
                                        ref_key: "videoPreviewRef",
                                        ref: videoPreviewRef,
                                        controls: "",
                                        class: "qm-vnit-upload-video-preview-content",
                                        onCanplay: handleCanPlay
                                    }, [
                                        createElementVNode("source", { src: videoURL.value }, null, 8 /* PROPS */, _hoisted_2)
                                    ], 544 /* HYDRATE_EVENTS, NEED_PATCH */),
                                    createVNode(unref(script$2), {
                                        name: "close",
                                        class: "qm-vnit-upload-video-preview-close-icon",
                                        onClick: handleClosePreview
                                    })
                                ]))
                                : createCommentVNode("v-if", true)
                        ]),
                        _: 1 /* STABLE */
                    })
                ]))
            ], 64 /* STABLE_FRAGMENT */));
        };
    }
});

export { script as default };
