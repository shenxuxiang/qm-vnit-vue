import { defineComponent, h, onMounted, shallowRef } from "vue";
import { Spin } from "ant-design-vue";
export default function LazyLoader(loader) {
    return defineComponent(() => {
        const comp = shallowRef(null);
        onMounted(() => {
            loader()
                .then((response) => {
                comp.value = response.default;
            })
                .catch((error) => {
                console.log(error.stack);
            });
        });
        return () => {
            if (comp.value) {
                return h(comp.value);
            }
            else {
                return h(Spin, {
                    size: "large",
                    spining: true,
                    style: {
                        position: "absolute",
                        top: "200px",
                        left: 0,
                        right: 0,
                        margin: "0 auto",
                    },
                });
            }
        };
    });
}
