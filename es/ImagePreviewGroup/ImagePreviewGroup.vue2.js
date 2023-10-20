import { defineComponent, useSlots, ref, toRef, watch, computed, openBlock, createElementBlock, Fragment, createElementVNode, renderList, normalizeStyle, normalizeClass, createVNode, unref, createBlock, resolveDynamicComponent, normalizeProps, guardReactiveProps, createCommentVNode, Teleport } from 'vue';
import '../Image/index.js';
import './ImagePreviewGroup.css';
import '../PreviewImage/index.js';
import '../Image/Image.vue2.js';
import script$1 from '../Image/Image.vue.js';
import '../PreviewImage/PreviewImage.vue2.js';
import script$2 from '../PreviewImage/PreviewImage.vue.js';

const _hoisted_1 = { class: "qm-vnit-image-group" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = ["onClick"];
var script = /*#__PURE__*/ defineComponent({
    ...{ name: 'ImagePreviewGroup', inheritAttrs: false },
    __name: 'ImagePreviewGroup',
    props: {
        class: { type: String, required: false },
        bordered: { type: Boolean, required: false, default: true },
        options: { type: Array, required: false },
        style: { type: null, required: false }
    },
    setup(__props) {
        const props = __props;
        const slots = useSlots();
        const indicator = ref(0);
        const className = toRef(props, 'class');
        const showPreview = ref(false);
        const children = ref([]);
        watch(() => slots.default?.(), () => {
            const newChildren = [];
            slots.default?.().forEach((item) => {
                // 注意，slotsDefualt 返回的是一个数组，所以需要遍历，
                // 判断第一层的所有节点的 type 是否是文档碎片（fragment）,如果是，则说明使用的 template 模板嵌套，此时应该取它的 children。
                if (item.type === Symbol.for('v-fgt')) {
                    newChildren.push(...item.children);
                }
                else {
                    newChildren.push(item);
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
                createElementVNode("ul", _hoisted_1, [
                    (_ctx.options)
                        ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.options, (item, index) => {
                            return (openBlock(), createElementBlock("li", {
                                key: index,
                                style: normalizeStyle(_ctx.style),
                                class: normalizeClass(['qm-vnit-image-group-item', className.value, { bordered: _ctx.bordered }]),
                                onClick: ($event) => (handlePreview(index))
                            }, [
                                createVNode(unref(script$1), { src: item }, null, 8 /* PROPS */, ["src"])
                            ], 14 /* CLASS, STYLE, PROPS */, _hoisted_2));
                        }), 128 /* KEYED_FRAGMENT */))
                        : (children.value)
                            ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(children.value, (item, index) => {
                                return (openBlock(), createElementBlock("li", {
                                    key: index,
                                    style: normalizeStyle(_ctx.style),
                                    class: normalizeClass(['qm-vnit-image-group-item', className.value, { bordered: _ctx.bordered }]),
                                    onClick: ($event) => (handlePreview(index))
                                }, [
                                    (openBlock(), createBlock(resolveDynamicComponent(item), normalizeProps(guardReactiveProps(item.props)), null, 16 /* FULL_PROPS */))
                                ], 14 /* CLASS, STYLE, PROPS */, _hoisted_3));
                            }), 128 /* KEYED_FRAGMENT */))
                            : createCommentVNode("v-if", true)
                ]),
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
