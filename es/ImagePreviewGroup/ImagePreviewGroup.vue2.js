import { defineComponent, useSlots, ref, watch, h, computed, openBlock, createElementBlock, Fragment, createElementVNode, mergeProps, renderList, normalizeClass, createVNode, unref, createBlock, resolveDynamicComponent, createCommentVNode, Teleport } from 'vue';
import '../PreviewImage/index.js';
import './ImagePreviewGroup.css';
import '../Image/index.js';
import '../Image/Image.vue2.js';
import script$1 from '../Image/Image.vue.js';
import '../PreviewImage/PreviewImage.vue2.js';
import script$2 from '../PreviewImage/PreviewImage.vue.js';

const _hoisted_1 = ["onClick"];
const _hoisted_2 = ["onClick"];
var script = /*#__PURE__*/ defineComponent({
    ...{ name: 'ImagePreviewGroup', inheritAttrs: false },
    __name: 'ImagePreviewGroup',
    props: {
        imageClass: { type: String, required: false },
        bordered: { type: Boolean, required: false, default: true },
        options: { type: Array, required: false }
    },
    setup(__props) {
        const props = __props;
        const slots = useSlots();
        const indicator = ref(0);
        const showPreview = ref(false);
        const children = ref([]);
        watch(() => slots.default?.(), () => {
            const newChildren = [];
            slots.default?.().forEach((item) => {
                // 注意，slotsDefualt 返回的是一个数组，所以需要遍历，
                // 判断第一层的所有节点的 type 是否是文档碎片（fragment）,如果是，则说明使用的 template 模板嵌套，此时应该取它的 children。
                if (item.type === Symbol.for('v-fgt')) {
                    item.children?.forEach?.((child) => newChildren.push(h(child)));
                }
            });
            children.value = newChildren;
        }, { immediate: true });
        const imgs = computed(() => {
            if (slots.default?.()) {
                return children.value.map((item) => item.props.src);
            }
            else {
                return props.options;
            }
        });
        function handlePreview(index) {
            indicator.value = index;
            showPreview.value = true;
        }
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock(Fragment, null, [
                createElementVNode("ul", mergeProps({ class: "qm-vnit-image-group" }, _ctx.$attrs), [
                    (_ctx.options)
                        ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.options, (item, index) => {
                            return (openBlock(), createElementBlock("li", {
                                key: index,
                                class: normalizeClass(['qm-vnit-image-group-item', { bordered: _ctx.bordered }]),
                                onClick: ($event) => (handlePreview(index))
                            }, [
                                createVNode(unref(script$1), {
                                    src: item,
                                    class: normalizeClass(_ctx.imageClass)
                                }, null, 8 /* PROPS */, ["src", "class"])
                            ], 10 /* CLASS, PROPS */, _hoisted_1));
                        }), 128 /* KEYED_FRAGMENT */))
                        : (children.value)
                            ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(children.value, (item, index) => {
                                return (openBlock(), createElementBlock("li", {
                                    key: index,
                                    class: normalizeClass(['qm-vnit-image-group-item', { bordered: _ctx.bordered }]),
                                    onClick: ($event) => (handlePreview(index))
                                }, [
                                    (openBlock(), createBlock(resolveDynamicComponent(item), {
                                        class: normalizeClass(_ctx.imageClass)
                                    }, null, 8 /* PROPS */, ["class"]))
                                ], 10 /* CLASS, PROPS */, _hoisted_2));
                            }), 128 /* KEYED_FRAGMENT */))
                            : createCommentVNode("v-if", true)
                ], 16 /* FULL_PROPS */),
                (openBlock(), createBlock(Teleport, { to: "body" }, [
                    createVNode(unref(script$2), {
                        imgs: imgs.value,
                        index: indicator.value,
                        open: showPreview.value,
                        onClose: _cache[0] || (_cache[0] = ($event) => (showPreview.value = false))
                    }, null, 8 /* PROPS */, ["imgs", "index", "open"])
                ]))
            ], 64 /* STABLE_FRAGMENT */));
        };
    }
});

export { script as default };
