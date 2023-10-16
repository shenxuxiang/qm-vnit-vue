import { defineComponent, ref, onMounted, openBlock, createElementBlock } from 'vue';
import intersectionObserveImage from '../utils/intersectionObserveImage.js';
import defaultImage from '../assets/defaultImage.svg.js';

const _hoisted_1 = ["src"];
var script = /*#__PURE__*/ defineComponent({
    ...{ name: 'Image' },
    __name: 'Image',
    props: {
        src: { type: String, required: true }
    },
    setup(__props) {
        const props = __props;
        // eslint-disable-next-line
        const imgSrc = ref(defaultImage);
        const imgRef = ref();
        onMounted(() => {
            intersectionObserveImage.addElement(imgRef.value, props.src);
        });
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("img", {
                ref_key: "imgRef",
                ref: imgRef,
                src: imgSrc.value
            }, null, 8 /* PROPS */, _hoisted_1));
        };
    }
});

export { script as default };
