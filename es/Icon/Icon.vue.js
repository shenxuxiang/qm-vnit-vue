import { defineComponent, openBlock, createElementBlock, normalizeClass } from 'vue';
import './font/iconfont.css';

var script = /*#__PURE__*/ defineComponent({
    ...{ name: 'Icon' },
    __name: 'Icon',
    props: {
        name: { type: String, required: true }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("i", {
                class: normalizeClass(`qm-vnit-iconfont qm-vnit-icon-${_ctx.name}`)
            }, null, 2 /* CLASS */));
        };
    }
});

export { script as default };
