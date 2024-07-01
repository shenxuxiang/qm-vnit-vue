<script setup lang="ts">
import type { TreeProps } from 'ant-design-vue';
import { h, ref, watch, computed } from 'vue';
import { Tree, Input } from 'ant-design-vue';
import { isEmpty } from '@/utils';
import './ModelTree.less';

type TreeDataItem = NonNullable<TreeProps['treeData']>[0] & {
  parentKey: number | string;
  children?: TreeDataItem[];
};

type FieldNames = {
  key?: string;
  title?: string;
  children?: string;
  parentKey?: string;
};

export type TreeData = TreeDataItem[];

type ModelTreeProps = {
  treeData: any[];
  multiple?: boolean;
  bordered?: boolean;
  disabled?: boolean;
  checkable?: boolean;
  placeholder?: string;
  showFilter?: boolean;
  fieldNames?: FieldNames;
  checkedKeys?: string[] | number[];
  expandedKeys?: string[] | number[];
  selectedKeys?: string[] | number[];
  formatTreeData?: (treeData: any) => TreeData;
};

type ModelTreeEmits = {
  'update:checkedKeys': [value: string[] | number[]];
  'update:expandedKeys': [value: string[] | number[]];
  'update:selectedKeys': [value: string[] | number[]];
};

const props = withDefaults(defineProps<ModelTreeProps>(), {
  bordered: true,
  checkable: true,
  showFilter: true,
  placeholder: '请输入关键字进行查找',
});

const emit = defineEmits<ModelTreeEmits>();
defineOptions({ name: 'ModelTree', inheritAttrs: false });

const searchValue = ref('');
const localCheckedKeys = ref<string[] | number[]>([]);
const localExpandedKeys = ref<string[] | number[]>([]);
const localSelectedKeys = ref<string[] | number[]>([]);

const expandedKeys = computed({
  get: () => props.expandedKeys || localExpandedKeys.value,
  set: (value: string[] | number[]) => {
    localExpandedKeys.value = value;
    emit('update:expandedKeys', value);
  },
});

const checkedKeys = computed({
  get: () => props.checkedKeys || localCheckedKeys.value,
  set: (checkedKeys: any) => {
    localCheckedKeys.value = checkedKeys;
    emit('update:checkedKeys', checkedKeys);
  },
});

const selectedKeys = computed({
  get: () => props.selectedKeys || localSelectedKeys.value,
  set: (selectedKeys: any) => {
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
const treeData = computed<TreeData>(() => {
  if (typeof props.formatTreeData === 'function') {
    return props.formatTreeData(props.treeData);
  } else if (!isEmpty(props.fieldNames)) {
    return computedTreeData(props.treeData, props.fieldNames);
  } else {
    return props.treeData;
  }
});

// 扁平的 TreeDate
const flatTreeData = computed(() => computedFlatTreeData(treeData.value));

// 筛选后的 TreeData
const filteredTreeData = computed<TreeData>(() => {
  if (searchValue.value.trim()) {
    return filterTreeData(treeData.value, searchValue.value);
  } else {
    return treeData.value;
  }
});

// 输入关键字筛选 TreeData 展开树。
watch(searchValue, () => {
  if (!searchValue.value.trim()) return;

  const keys = [] as any[];
  // 这里我们根据扁平的 TreeData 来计算，提升性能
  flatTreeData.value.forEach(({ title }, k) => {
    if (title.includes(searchValue.value)) {
      keys.push(...getParentKeys(k));
    }
  });

  expandedKeys.value = [...new Set<string>(keys)];
});

// 计算扁平的 treeData
function computedFlatTreeData(treeData: TreeData) {
  const result: Map<string | number, { title: string; key: string | number; parentKey: string | number }> = new Map();

  const stack = [...treeData];
  while (stack.length) {
    const { parentKey, key, title, children } = stack.shift()!;
    result.set(key, { parentKey, title, key });

    if (isEmpty(children)) continue;

    let length = children.length;
    while (length--) {
      stack.unshift(children[length]);
    }
  }
  return result;
}

// 获取所有的 父级 key（包含自身的 key）
function getParentKeys(key: string | number) {
  const parentKeys: Array<string | number> = [];

  while (flatTreeData.value.has(key)) {
    parentKeys.push(key);
    const { parentKey } = flatTreeData.value.get(key)!;
    key = parentKey;
  }
  return parentKeys;
}

/**
 * 过滤、筛选出目标节点，匹配的内容将被标注为红色
 * @param treeData    Tree 组件的 treeData
 * @param searchValue 查询条件
 */
function filterTreeData(treeData: TreeData, searchValue: string): TreeData {
  return (
    treeData?.map?.((item) => {
      const { title, key, parentKey, children, ...props } = item;

      let newTitle: any = title;

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
      } else {
        return { title: newTitle, key, parentKey, ...props };
      }
    }) ?? []
  );
}

function computedTreeData(tree: any, fieldNames: FieldNames) {
  const root: TreeDataItem[] = [];
  const parentNodes: TreeDataItem[] = [];
  const stack = Array.isArray(tree) ? [...tree] : [tree];
  const {
    key: keyLabel = 'key',
    title: titleLabel = 'title',
    children: childrenLabel = 'children',
    parentKey: parentKeyLabel = 'parentKey',
  } = fieldNames;

  while (stack.length) {
    let currentParent: TreeDataItem | null = null;
    const item = stack.shift()!;

    while (parentNodes.length) {
      const last = parentNodes.slice(-1)[0];
      if (last.key === item[parentKeyLabel]) {
        currentParent = last;
        break;
      } else {
        parentNodes.pop();
      }
    }

    const node: TreeDataItem = {
      ...item,
      key: item[keyLabel],
      title: item[titleLabel],
      parentKey: item[parentKeyLabel],
    };

    delete node[childrenLabel];

    // 如果 currentParent 不存在，说明当前节点就是根节点，此时我们只要将节点添加到 root 集合中即可。
    if (currentParent) {
      if (!currentParent.children) currentParent.children = [];
      currentParent.children.push(node);
    } else {
      root.push(node);
    }

    const children = item[childrenLabel] || [];
    let length = children.length;

    if (length > 0) parentNodes.push(node);

    while (length--) {
      stack.unshift(children[length]);
    }
  }

  return root;
}

defineExpose({
  getParentKeys,
  getAllParentKeys: () => {
    const keys: Array<string | number> = [];
    if (props.checkable) {
      localCheckedKeys.value.forEach((key: number | string) => keys.push(...getParentKeys(key)));
    } else {
      localSelectedKeys.value.forEach((key: number | string) => keys.push(...getParentKeys(key)));
    }
    return [...new Set(keys)];
  },
});
</script>

<template>
  <div>
    <Input.Search
      v-if="showFilter"
      v-model:value="searchValue"
      style="margin-bottom: 8px"
      :disabled="disabled"
      :placeholder="placeholder"
    />
    <div :class="{ 'tree-border': bordered }">
      <Tree
        v-bind="$attrs"
        v-model:checkedKeys="checkedKeys"
        v-model:expandedKeys="expandedKeys"
        v-model:selectedKeys="selectedKeys"
        :treeData="filteredTreeData"
        :selectable="!checkable"
        :checkable="checkable"
        :disabled="disabled"
        :multiple="multiple"
      />
    </div>
  </div>
</template>
