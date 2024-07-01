import { defineComponent, openBlock, createElementBlock, mergeProps } from 'vue';
import './font/iconfont.css';

var script = /*#__PURE__*/ defineComponent({
    ...{ name: 'Icon' },
    __name: 'Icon',
    props: {
        name: { type: String, required: true }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("i", mergeProps(_ctx.$attrs, {
                class: `qm-vnit-iconfont qm-vnit-icon-${_ctx.name}`
            }), null, 16 /* FULL_PROPS */));
        };
    }
});

export { script as default };
