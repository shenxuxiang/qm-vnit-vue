import { defineComponent, ref, onMounted, openBlock, createElementBlock } from 'vue';
import intersectionObserveImage from '../utils/intersectionObserveImage.js';
import img from './default.svg.js';

var _hoisted_1 = ["src"];
var script = /*#__PURE__*/defineComponent({
  __name: 'Image',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  setup: function setup(__props) {
    var props = __props;
    var imgSrc = ref(img);
    var imgRef = ref();
    onMounted(function () {
      intersectionObserveImage.addElement(imgRef.value, props.src);
    });
    return function (_ctx, _cache) {
      return openBlock(), createElementBlock("img", {
        src: imgSrc.value,
        ref_key: "imgRef",
        ref: imgRef
      }, null, 8 /* PROPS */, _hoisted_1);
    };
  }
});

export { script as default };
