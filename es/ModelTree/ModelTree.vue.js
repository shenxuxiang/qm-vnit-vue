import { defineComponent, ref, computed, watch, h, openBlock, createElementBlock, createBlock, unref, createCommentVNode, createElementVNode, normalizeClass, createVNode, mergeProps } from 'vue';
import { Input, Tree } from 'ant-design-vue';
import { isEmpty } from '../utils/index.js';
import './ModelTree.css';

var script = /*#__PURE__*/ defineComponent({
    ...{ name: 'ModelTree', inheritAttrs: false },
    __name: 'ModelTree',
    props: {
        treeData: { type: Array, required: true },
        multiple: { type: Boolean, required: false },
        bordered: { type: Boolean, required: false, default: true },
        disabled: { type: Boolean, required: false },
        checkable: { type: Boolean, required: false, default: true },
        placeholder: { type: String, required: false, default: '请输入关键字进行查找' },
        showFilter: { type: Boolean, required: false, default: true },
        fieldNames: { type: Object, required: false },
        checkedKeys: { type: Array, required: false },
        expandedKeys: { type: Array, required: false },
        selectedKeys: { type: Array, required: false },
        formatTreeData: { type: Function, required: false }
    },
    emits: ["update:checkedKeys", "update:expandedKeys", "update:selectedKeys"],
    setup(__props, { expose: __expose, emit }) {
        const props = __props;
        const searchValue = ref('');
        const localCheckedKeys = ref([]);
        const localExpandedKeys = ref([]);
        const localSelectedKeys = ref([]);
        const expandedKeys = computed({
            get: () => props.expandedKeys || localExpandedKeys.value,
            set: (value) => {
                localExpandedKeys.value = value;
                emit('update:expandedKeys', value);
            },
        });
        const checkedKeys = computed({
            get: () => props.checkedKeys || localCheckedKeys.value,
            set: (checkedKeys) => {
                localCheckedKeys.value = checkedKeys;
                emit('update:checkedKeys', checkedKeys);
            },
        });
        const selectedKeys = computed({
            get: () => props.selectedKeys || localSelectedKeys.value,
            set: (selectedKeys) => {
                localSelectedKeys.value = selectedKeys;
                emit('update:selectedKeys', selectedKeys);
            },
        });
        /**
         * 根据原始的 props.treeData 计算，将格式转换成 TreeData 类型。
         * 如果提供了 props.formatTreeData 属性，则根据该方法计算得到；
         * 如果提供了 props.fieldNames 属性，则根据该配置，重新计算得到；
         * 最后，直接返回 props.TreeData.
         */
        const treeData = computed(() => {
            if (typeof props.formatTreeData === 'function') {
                return props.formatTreeData(props.treeData);
            }
            else if (!isEmpty(props.fieldNames)) {
                return computedTreeData(props.treeData, props.fieldNames);
            }
            else {
                return props.treeData;
            }
        });
        // 扁平的 TreeDate
        const flatTreeData = computed(() => computedFlatTreeData(treeData.value));
        // 筛选后的 TreeData
        const filteredTreeData = computed(() => {
            if (searchValue.value.trim()) {
                return filterTreeData(treeData.value, searchValue.value);
            }
            else {
                return treeData.value;
            }
        });
        // 输入关键字筛选 TreeData 展开树。
        watch(searchValue, () => {
            if (!searchValue.value.trim())
                return;
            const keys = [];
            // 这里我们根据扁平的 TreeData 来计算，提升性能
            flatTreeData.value.forEach(({ title }, k) => {
                if (title.includes(searchValue.value)) {
                    keys.push(...getParentKeys(k));
                }
            });
            expandedKeys.value = [...new Set(keys)];
        });
        // 计算扁平的 treeData
        function computedFlatTreeData(treeData) {
            const result = new Map();
            const stack = [...treeData];
            while (stack.length) {
                const { parentKey, key, title, children } = stack.shift();
                result.set(key, { parentKey, title, key });
                if (isEmpty(children))
                    continue;
                let length = children.length;
                while (length--) {
                    stack.unshift(children[length]);
                }
            }
            return result;
        }
        // 获取所有的 父级 key（包含自身的 key）
        function getParentKeys(key) {
            const parentKeys = [];
            while (flatTreeData.value.has(key)) {
                parentKeys.push(key);
                const { parentKey } = flatTreeData.value.get(key);
                key = parentKey;
            }
            return parentKeys;
        }
        /**
         * 过滤、筛选出目标节点，匹配的内容将被标注为红色
         * @param treeData    Tree 组件的 treeData
         * @param searchValue 查询条件
         */
        function filterTreeData(treeData, searchValue) {
            return (treeData?.map?.((item) => {
                const { title, key, parentKey, children, ...props } = item;
                let newTitle = title;
                if (title.indexOf(searchValue) >= 0) {
                    newTitle = [];
                    const ary = title.split(searchValue);
                    const length = ary.length;
                    for (let i = 0; i < length; i++) {
                        ary[i] && newTitle.push(ary[i]);
                        if (i < length - 1) {
                            // 相邻的两个元素之间才会添加
                            newTitle.push(h('span', { style: 'color: #f50;' }, searchValue));
                        }
                    }
                    newTitle = newTitle;
                }
                if (children?.length) {
                    return {
                        key,
                        parentKey,
                        title: newTitle,
                        children: filterTreeData(children, searchValue),
                        ...props,
                    };
                }
                else {
                    return { title: newTitle, key, parentKey, ...props };
                }
            }) ?? []);
        }
        function computedTreeData(tree, fieldNames) {
            const root = [];
            const parentNodes = [];
            const stack = Array.isArray(tree) ? [...tree] : [tree];
            const { key: keyLabel = 'key', title: titleLabel = 'title', children: childrenLabel = 'children', parentKey: parentKeyLabel = 'parentKey', } = fieldNames;
            while (stack.length) {
                let currentParent = null;
                const item = stack.shift();
                while (parentNodes.length) {
                    const last = parentNodes.slice(-1)[0];
                    if (last.key === item[parentKeyLabel]) {
                        currentParent = last;
                        break;
                    }
                    else {
                        parentNodes.pop();
                    }
                }
                const node = {
                    ...item,
                    key: item[keyLabel],
                    title: item[titleLabel],
                    parentKey: item[parentKeyLabel],
                };
                delete node[childrenLabel];
                // 如果 currentParent 不存在，说明当前节点就是根节点，此时我们只要将节点添加到 root 集合中即可。
                if (currentParent) {
                    if (!currentParent.children)
                        currentParent.children = [];
                    currentParent.children.push(node);
                }
                else {
                    root.push(node);
                }
                const children = item[childrenLabel] || [];
                let length = children.length;
                if (length > 0)
                    parentNodes.push(node);
                while (length--) {
                    stack.unshift(children[length]);
                }
            }
            return root;
        }
        __expose({
            getParentKeys,
            getAllParentKeys: () => {
                const keys = [];
                if (props.checkable) {
                    localCheckedKeys.value.forEach((key) => keys.push(...getParentKeys(key)));
                }
                else {
                    localSelectedKeys.value.forEach((key) => keys.push(...getParentKeys(key)));
                }
                return [...new Set(keys)];
            },
        });
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", null, [
                (_ctx.showFilter)
                    ? (openBlock(), createBlock(unref(Input).Search, {
                        key: 0,
                        value: searchValue.value,
                        "onUpdate:value": _cache[0] || (_cache[0] = ($event) => ((searchValue).value = $event)),
                        style: { "margin-bottom": "8px" },
                        disabled: _ctx.disabled,
                        placeholder: _ctx.placeholder
                    }, null, 8 /* PROPS */, ["value", "disabled", "placeholder"]))
                    : createCommentVNode("v-if", true),
                createElementVNode("div", {
                    class: normalizeClass({ 'tree-border': _ctx.bordered })
                }, [
                    createVNode(unref(Tree), mergeProps(_ctx.$attrs, {
                        checkedKeys: checkedKeys.value,
                        "onUpdate:checkedKeys": _cache[1] || (_cache[1] = ($event) => ((checkedKeys).value = $event)),
                        expandedKeys: expandedKeys.value,
                        "onUpdate:expandedKeys": _cache[2] || (_cache[2] = ($event) => ((expandedKeys).value = $event)),
                        selectedKeys: selectedKeys.value,
                        "onUpdate:selectedKeys": _cache[3] || (_cache[3] = ($event) => ((selectedKeys).value = $event)),
                        treeData: filteredTreeData.value,
                        selectable: !_ctx.checkable,
                        checkable: _ctx.checkable,
                        disabled: _ctx.disabled,
                        multiple: _ctx.multiple
                    }), null, 16 /* FULL_PROPS */, ["checkedKeys", "expandedKeys", "selectedKeys", "treeData", "selectable", "checkable", "disabled", "multiple"])
                ], 2 /* CLASS */)
            ]));
        };
    }
});

export { script as default };
