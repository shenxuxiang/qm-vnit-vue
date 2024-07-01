import { defineComponent, ref, shallowRef, computed, reactive, onBeforeMount, openBlock, createElementBlock, createBlock, unref, withCtx, renderSlot, createCommentVNode, createElementVNode, createVNode, mergeProps, normalizeProps, guardReactiveProps } from 'vue';
import '../ContentFormHeader/index.js';
import { Table, Pagination } from 'ant-design-vue';
import { isEmpty, isArray } from '../utils/index.js';
import './ContentFormTable.css';
import '../ContentFormHeader/ContentFormHeader.vue2.js';
import script$1 from '../ContentFormHeader/ContentFormHeader.vue.js';

const _hoisted_1 = { class: "qm-content-form-table" };
const _hoisted_2 = { class: "qm-content-form-table-body" };
const _hoisted_3 = { class: "qm-content-form-table-body-head" };
const _hoisted_4 = /*#__PURE__*/ createElementVNode("p", { style: { "margin-left": "16px" } }, "查询表格", -1 /* HOISTED */);
var script = /*#__PURE__*/ defineComponent({
    ...{ name: 'ContentFormTable' },
    __name: 'ContentFormTable',
    props: {
        cols: { type: null, required: false },
        rowKey: { type: String, required: true },
        columns: { type: Array, required: true },
        bordered: { type: Boolean, required: false, default: true },
        immediate: { type: Boolean, required: false, default: true },
        showExport: { type: Boolean, required: false },
        submitButtonText: { type: String, required: false },
        scroll: { type: null, required: false },
        paginationSize: { type: String, required: false },
        tableSize: { type: String, required: false },
        validateFields: { type: Function, required: false },
        rowSelection: { type: null, required: false },
        queryTableList: { type: Function, required: true },
        showTotal: { type: Function, required: false, default: (total) => `共${total}条数据` },
        exportTableList: { type: Function, required: false },
        customResponse: { type: Function, required: false, default: ({ data }) => ({ tableList: data.list, total: data.total }) },
        customTableSorter: { type: Function, required: false }
    },
    emits: ["paginationChange"],
    setup(__props, { expose: __expose, emit: emits }) {
        const props = __props;
        /**
         * @param loading            数据加载状态
         * @param sorter             表格排序字段
         * @param combinationColumns 根据 props.columns 分别计算出 ContentFormHeader、ContentFormTable 组件的 queryList 和 columns
         * @param searchCondition    表格查询条件
         * @param contentHeaderRef   ContentFormHeader 组件实例
         * @param tableResource      表格数据
         */
        const loading = ref(false);
        const sorter = shallowRef([]);
        const combinationColumns = computed(computedColumns);
        const searchCondition = ref(initialSearchCondition());
        const contentHeaderRef = ref();
        const tableResource = reactive({
            total: 0,
            pageNum: 1,
            pageSize: 10,
            tableList: [],
        });
        // 请求表格数据，immediate 表示是否立即请求，false 表示只有当用户触发查询操作时再请求。
        onBeforeMount(() => props.immediate && getTableList());
        // 计算 queryList、tableColumns
        function computedColumns() {
            const newQueryList = [];
            const newTableColumns = [];
            props.columns.forEach((item) => {
                const { visibleInTable = true, component, formType } = item;
                if (formType || component) {
                    newQueryList.push({
                        // @ts-ignore
                        name: item.name || item.dataIndex,
                        title: item.title,
                        watch: item.watch,
                        options: item.options,
                        formType: item.formType,
                        component: item.component,
                        dataFormat: item.dataFormat,
                        properties: item.properties,
                        placeholder: item.placeholder,
                        initialValue: item.initialValue,
                    });
                }
                if (visibleInTable === true)
                    newTableColumns.push(item);
            });
            return { queryList: newQueryList, tableColumns: newTableColumns };
        }
        /**
         * 初始化表格查询条件（ searchCondition ）
         * 注意，computedColumns 函数一定要在本函数之前执行。
         * 否则，就会出现一个暂时性死区，导致系统异常。
         */
        function initialSearchCondition() {
            const result = {};
            combinationColumns.value.queryList.forEach((item) => {
                const { dataIndex, name = dataIndex, dataFormat, initialValue } = item;
                if (initialValue) {
                    if (typeof dataFormat === 'function') {
                        Object.assign(result, dataFormat(initialValue));
                    }
                    else {
                        result[name] = initialValue;
                    }
                }
            });
            return result;
        }
        /**
         * 发送请求，获取表格相关资源
         * 只要 props.validateFields() 函数不返回 false，就认定表单验证成功，否则就是失败。
         * 失败不发送请求。
         */
        async function getTableList() {
            const params = {
                ...searchCondition.value,
                pageNum: tableResource.pageNum,
                pageSize: tableResource.pageSize,
                order: isEmpty(sorter.value) ? null : sorter.value,
            };
            if (props.validateFields?.(params) !== false) {
                loading.value = true;
                try {
                    const resp = await props.queryTableList(params);
                    Object.assign(tableResource, props.customResponse(resp));
                }
                finally {
                    loading.value = false;
                }
            }
            else {
                throw Error('查询条件验证未通过！');
            }
        }
        // 提交
        async function handleSubmit(values) {
            searchCondition.value = values;
            Object.assign(tableResource, { pageSize: 10, pageNum: 1 });
            return getTableList();
        }
        // 重置
        async function handleReset(values) {
            searchCondition.value = values;
            Object.assign(tableResource, { pageSize: 10, pageNum: 1 });
            return getTableList();
        }
        // 导出
        async function handleExport(values) {
            if (props.validateFields?.(values) !== false) {
                return props?.exportTableList?.(values);
            }
            else {
                return Promise.reject('查询条件验证未通过！');
            }
        }
        // 分页
        function handlePaginationChange(pageNum, pageSize) {
            Object.assign(tableResource, { pageSize, pageNum });
            emits('paginationChange', pageNum, pageSize);
            getTableList();
        }
        // 表格排序
        function handleTableChange() {
            const sort = arguments[2];
            const result = [];
            if (isArray(sort)) {
                sort.forEach((item) => {
                    const { field, order } = item;
                    order && result.push({ field, order });
                });
            }
            else {
                sort.order && result.push({ field: sort.field, order: sort.order });
            }
            sorter.value = props.customTableSorter?.(result) ?? result;
            getTableList();
        }
        // 导出内容
        const expose = {
            form: contentHeaderRef.value?.form,
            forceUpdate: async () => getTableList(),
            getQueryData: () => contentHeaderRef.value?.getCurrentFormData?.(),
        };
        Object.defineProperty(expose, 'form', { get: () => contentHeaderRef.value.form });
        __expose(expose);
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("section", _hoisted_1, [
                (combinationColumns.value.queryList.length)
                    ? (openBlock(), createBlock(unref(script$1), {
                        key: 0,
                        ref_key: "contentHeaderRef",
                        ref: contentHeaderRef,
                        cols: _ctx.cols,
                        reset: handleReset,
                        export: handleExport,
                        submit: handleSubmit,
                        showExport: _ctx.showExport,
                        submitButtonText: _ctx.submitButtonText,
                        queryList: combinationColumns.value.queryList
                    }, {
                        insertNode: withCtx(() => [
                            renderSlot(_ctx.$slots, "insertHeadNode")
                        ]),
                        _: 3 /* FORWARDED */
                    }, 8 /* PROPS */, ["cols", "showExport", "submitButtonText", "queryList"]))
                    : createCommentVNode("v-if", true),
                createElementVNode("div", _hoisted_2, [
                    createElementVNode("div", _hoisted_3, [
                        _hoisted_4,
                        renderSlot(_ctx.$slots, "extra")
                    ]),
                    createVNode(unref(Table), mergeProps({ bordered: "" }, _ctx.$attrs, {
                        rowKey: _ctx.rowKey,
                        scroll: _ctx.scroll,
                        size: _ctx.tableSize,
                        loading: loading.value,
                        pagination: false,
                        rowSelection: _ctx.rowSelection,
                        dataSource: tableResource.tableList,
                        columns: combinationColumns.value.tableColumns,
                        onChange: handleTableChange
                    }), {
                        bodyCell: withCtx((bodyCellProps) => [
                            renderSlot(_ctx.$slots, "bodyCell", normalizeProps(guardReactiveProps(bodyCellProps)))
                        ]),
                        _: 3 /* FORWARDED */
                    }, 16 /* FULL_PROPS */, ["rowKey", "scroll", "size", "loading", "rowSelection", "dataSource", "columns"]),
                    createVNode(unref(Pagination), {
                        size: _ctx.paginationSize,
                        showTotal: _ctx.showTotal,
                        total: tableResource.total,
                        current: tableResource.pageNum,
                        pageSize: tableResource.pageSize,
                        onChange: handlePaginationChange,
                        class: "qm-content-form-table-pagination"
                    }, null, 8 /* PROPS */, ["size", "showTotal", "total", "current", "pageSize"])
                ])
            ]));
        };
    }
});

export { script as default };
