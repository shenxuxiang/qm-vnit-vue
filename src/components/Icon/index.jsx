import { defineComponent, h } from "vue";
import "./font/iconfont.css";
export default defineComponent((props, { attrs }) => {
    return () => h("i", {
        ...attrs,
        style: props.style,
        className: `qm-vnit-iconfont qm-vnit-icon-${props.name}${props.class ? " " + props.class : ""}`,
    });
}, {
    inheritAttrs: false,
    props: ["name", "class", "style"],
});
