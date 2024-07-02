import { defineComponent, shallowRef, reactive, ref, onMounted, watchEffect, computed, toRaw, openBlock, createElementBlock, createVNode, unref, withCtx, normalizeStyle, Fragment, renderList, withDirectives, createBlock, vShow, createElementVNode, createTextVNode, toDisplayString, createCommentVNode, renderSlot } from 'vue';
import UpOutlined from '@ant-design/icons-vue/UpOutlined';
import DownOutlined from '@ant-design/icons-vue/DownOutlined';
import { Form, Row, Col, Button } from 'ant-design-vue';
import './RenderItem.vue.js';
import { isEmpty } from '../utils/index.js';
import './ContentFormHeader.css';
import script$1 from './RenderItem.vue2.js';

const _hoisted_1 = { style: { "display": "flex", "justify-content": "flex-end", "align-items": "flex-start" } };
var ColSpanEnum;
(function (ColSpanEnum) {
    ColSpanEnum[ColSpanEnum["xxl"] = 6] = "xxl";
    ColSpanEnum[ColSpanEnum["xl"] = 8] = "xl";
    ColSpanEnum[ColSpanEnum["lg"] = 8] = "lg";
    ColSpanEnum[ColSpanEnum["md"] = 12] = "md";
    ColSpanEnum[ColSpanEnum["sm"] = 12] = "sm";
    ColSpanEnum[ColSpanEnum["xs"] = 12] = "xs";
})(ColSpanEnum || (ColSpanEnum = {}));
var script = /*#__PURE__*/ defineComponent({
    ...{ name: 'ContentFormHeader' },
    __name: 'ContentFormHeader',
    props: {
        cols: { type: Number, required: false },
        queryList: { type: Array, required: true },
        showExport: { type: Boolean, required: false, default: false },
        defaultExpand: { type: Boolean, required: false, default: true },
        submitButtonText: { type: String, required: false, default: '提交' },
        hideResetButton: { type: Boolean, required: false, default: false },
        submit: { type: Function, required: false },
        export: { type: Function, required: false },
        reset: { type: Function, required: false }
    },
    setup(__props, { expose: __expose }) {
        const props = __props;
        // 定义每个 Col 元素的宽度
        const { useForm, Item: FormItem } = Form;
        /**
         * @param containerRef 容器节点对象
         * @param formModel    表单数据
         * @param colsNumber   一行可以展示几列
         * @param colSpan      每列占多少个 span，一行共 24 个 span
         * @param expand       表单是否展开
         * @param form         表单对象
         */
        const containerRef = shallowRef();
        const formModel = reactive(initialFormModal()); // eslint-disable-line
        const colsNumber = ref(props?.cols ?? 4); // eslint-disable-line
        const colSpan = ref(24 / colsNumber.value); // eslint-disable-line
        const expand = ref(props.defaultExpand); // eslint-disable-line
        const form = useForm(formModel);
        const submitLoading = ref(false);
        const exportLoading = ref(false);
        const resetLoading = ref(false);
        onMounted(() => {
            if (typeof props.cols === 'undefined')
                computedColSpan();
        });
        watchEffect(() => {
            if (props.cols) {
                colsNumber.value = props.cols;
                colSpan.value = 24 / props.cols;
            }
        });
        // 计算共多少行
        const rowsNumber = computed(() => Math.ceil((props.queryList.length + 1) / colsNumber.value));
        // 最后一列（提交、收起按钮所在的列）的 offset
        const buttonGroupOffset = computed(() => {
            const total = props.queryList.length;
            const cols = colsNumber.value;
            const reset = total % cols;
            if (total < cols)
                return cols - total - 1;
            if (!expand.value)
                return 0;
            if (total === cols)
                return cols - 1;
            return cols - reset - 1;
        });
        function initialFormModal() {
            return props.queryList.reduce((memo, item) => {
                const { dataIndex, name = dataIndex, initialValue } = item;
                memo[name] = toRaw(initialValue) || null;
                return memo;
            }, {});
        }
        function computedColSpan() {
            const width = containerRef.value.offsetWidth;
            let span;
            if (width >= 1600) {
                span = ColSpanEnum.xxl;
            }
            else if (width >= 1200) {
                span = ColSpanEnum.xl;
            }
            else if (width >= 992) {
                span = ColSpanEnum.lg;
            }
            else if (width >= 768) {
                span = ColSpanEnum.md;
            }
            else {
                span = ColSpanEnum.sm;
            }
            colSpan.value = span;
            colsNumber.value = (24 / span);
        }
        // 表单数据格式化，
        function formModelsFormat() {
            const result = { ...formModel };
            props.queryList.forEach((item) => {
                const { dataIndex, name = dataIndex, dataFormat } = item;
                const fieldValue = result[name];
                // 如果值为 null、undefined 则删除该数据
                // eslint-disable-next-line
                if (fieldValue == null) {
                    delete result[name];
                }
                else if (typeof dataFormat === 'function') {
                    delete result[name];
                    // 先判断表单项是否有值，如果有值则进行数据格式话操作。
                    !isEmpty(fieldValue) && Object.assign(result, dataFormat(formModel[name]));
                }
            });
            return result;
        }
        function handleSubmit() {
            submitLoading.value = true;
            props?.submit?.(formModelsFormat()).finally(() => (submitLoading.value = false));
        }
        function handleReset() {
            form.resetFields();
            resetLoading.value = true;
            props?.reset?.(formModelsFormat()).finally(() => (resetLoading.value = false));
        }
        function handleExport() {
            exportLoading.value = true;
            props?.export?.(formModelsFormat()).finally(() => (exportLoading.value = false));
        }
        __expose({
            form,
            getCurrentFormData: formModelsFormat,
        });
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", {
                ref_key: "containerRef",
                ref: containerRef,
                class: "content-form-head"
            }, [
                createVNode(unref(Form), { model: formModel }, {
                    default: withCtx(() => [
                        createVNode(unref(Row), {
                            class: "content-form-head-row",
                            style: normalizeStyle({ height: expand.value ? `${56 * rowsNumber.value}px` : '56px' })
                        }, {
                            default: withCtx(() => [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.queryList, (item, index) => {
                                    return withDirectives((openBlock(), createBlock(unref(Col), {
                                        key: item.name || item.dataIndex,
                                        span: colSpan.value
                                    }, {
                                        default: withCtx(() => [
                                            createVNode(unref(FormItem), {
                                                name: item.name || item.dataIndex,
                                                label: item.title
                                            }, {
                                                default: withCtx(() => [
                                                    createVNode(script$1, {
                                                        value: formModel[item.name || item.dataIndex],
                                                        "onUpdate:value": ($event) => ((formModel[item.name || item.dataIndex]) = $event),
                                                        form: unref(form),
                                                        title: item.title,
                                                        watch: item.watch,
                                                        options: item.options,
                                                        formType: item.formType,
                                                        component: item.component,
                                                        properties: item.properties,
                                                        placeholder: item.placeholder
                                                    }, null, 8 /* PROPS */, ["value", "onUpdate:value", "form", "title", "watch", "options", "formType", "component", "properties", "placeholder"])
                                                ]),
                                                _: 2 /* DYNAMIC */
                                            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["name", "label"])
                                        ]),
                                        _: 2 /* DYNAMIC */
                                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["span"])), [
                                        [vShow, expand.value || (!expand.value && index + 1 < colsNumber.value)]
                                    ]);
                                }), 128 /* KEYED_FRAGMENT */)),
                                createVNode(unref(Col), {
                                    offset: buttonGroupOffset.value * colSpan.value,
                                    span: colSpan.value
                                }, {
                                    default: withCtx(() => [
                                        createVNode(unref(FormItem), null, {
                                            default: withCtx(() => [
                                                createElementVNode("div", _hoisted_1, [
                                                    createVNode(unref(Button), {
                                                        type: "primary",
                                                        loading: submitLoading.value,
                                                        onClick: handleSubmit
                                                    }, {
                                                        default: withCtx(() => [
                                                            createTextVNode(toDisplayString(_ctx.submitButtonText), 1 /* TEXT */)
                                                        ]),
                                                        _: 1 /* STABLE */
                                                    }, 8 /* PROPS */, ["loading"]),
                                                    (!_ctx.hideResetButton)
                                                        ? (openBlock(), createBlock(unref(Button), {
                                                            key: 0,
                                                            loading: resetLoading.value,
                                                            style: { "margin-left": "8px" },
                                                            onClick: handleReset
                                                        }, {
                                                            default: withCtx(() => [
                                                                createTextVNode(" 重置 ")
                                                            ]),
                                                            _: 1 /* STABLE */
                                                        }, 8 /* PROPS */, ["loading"]))
                                                        : createCommentVNode("v-if", true),
                                                    (_ctx.showExport)
                                                        ? (openBlock(), createBlock(unref(Button), {
                                                            key: 1,
                                                            loading: exportLoading.value,
                                                            style: { "margin-left": "8px" },
                                                            onClick: handleExport
                                                        }, {
                                                            default: withCtx(() => [
                                                                createTextVNode(" 导出 ")
                                                            ]),
                                                            _: 1 /* STABLE */
                                                        }, 8 /* PROPS */, ["loading"]))
                                                        : createCommentVNode("v-if", true),
                                                    renderSlot(_ctx.$slots, "insertNode"),
                                                    (_ctx.queryList.length >= colsNumber.value)
                                                        ? (openBlock(), createBlock(unref(Button), {
                                                            key: 2,
                                                            type: "link",
                                                            onClick: _cache[0] || (_cache[0] = ($event) => (expand.value = !expand.value))
                                                        }, {
                                                            default: withCtx(() => [
                                                                createTextVNode(toDisplayString(expand.value ? '收起' : '展开') + " ", 1 /* TEXT */),
                                                                (expand.value)
                                                                    ? (openBlock(), createBlock(unref(UpOutlined), { key: 0 }))
                                                                    : (openBlock(), createBlock(unref(DownOutlined), { key: 1 }))
                                                            ]),
                                                            _: 1 /* STABLE */
                                                        }))
                                                        : createCommentVNode("v-if", true)
                                                ])
                                            ]),
                                            _: 3 /* FORWARDED */
                                        })
                                    ]),
                                    _: 3 /* FORWARDED */
                                }, 8 /* PROPS */, ["offset", "span"])
                            ]),
                            _: 3 /* FORWARDED */
                        }, 8 /* PROPS */, ["style"])
                    ]),
                    _: 3 /* FORWARDED */
                }, 8 /* PROPS */, ["model"])
            ], 512 /* NEED_PATCH */));
        };
    }
});

export { script as default };
