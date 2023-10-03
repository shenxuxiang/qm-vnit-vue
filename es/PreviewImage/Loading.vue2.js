import { defineComponent, computed, openBlock, createBlock, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, createElementBlock, Fragment, renderList, normalizeStyle, vShow } from 'vue';
import './Loading.css';

var script = /*#__PURE__*/defineComponent({
  __name: 'Loading',
  props: {
    open: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: false,
      "default": "light"
    },
    size: {
      type: String,
      required: false,
      "default": "default"
    }
  },
  setup: function setup(__props) {
    var props = __props;
    var dotColor = computed(function () {
      switch (props.theme) {
        case "light":
          return "#f2f2f2";
        case "dark":
          return "#b3b3b3";
        default:
          return props.theme;
      }
    });
    return function (_ctx, _cache) {
      return openBlock(), createBlock(Transition, {
        name: "qm-vnit-loading",
        persisted: ""
      }, {
        "default": withCtx(function () {
          return [withDirectives(createElementVNode("div", {
            "class": normalizeClass(['qm-vnit-loading', _ctx.size])
          }, [(openBlock(), createElementBlock(Fragment, null, renderList(6, function (n) {
            return createElementVNode("div", {
              key: n,
              "class": "qm-vnit-loading-dot",
              style: normalizeStyle({
                background: dotColor.value
              })
            }, null, 4 /* STYLE */);
          }), 64 /* STABLE_FRAGMENT */))], 2 /* CLASS */), [[vShow, _ctx.open]])];
        }),
        _: 1 /* STABLE */
      });
    };
  }
});

export { script as default };
