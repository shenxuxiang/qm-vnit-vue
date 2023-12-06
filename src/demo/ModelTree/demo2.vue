<script setup lang="ts">
import { ModelTree } from '@/library';
import type { TreeData } from '@/library/ModelTree';
import { ref, watch, onMounted } from 'vue';
const selectedKeys = ref<string[]>([]);
const expandedKeys = ref<string[]>([]);
const modelTreeRef = ref<InstanceType<typeof ModelTree>>();

onMounted(() => {
  selectedKeys.value = ['1-1-1-1'];
  expandedKeys.value = ['1-1', '1-1-1'];
});

const treeData = ref([
  {
    sid: '1-1',
    title: '1-1',
    // 当前节点上不展示 checkbox，所以无法展示选中状态
    checkable: false,
    children: [
      {
        sid: '1-1-1',
        parentSid: '1-1',
        name: '1-1-1',
        checkable: false,
        children: [
          {
            sid: '1-1-1-1',
            parentSid: '1-1-1',
            name: '1-1-1-1',
          },
          {
            sid: '1-1-1-2',
            parentSid: '1-1-1',
            name: '1-1-1-2',
          },
        ],
      },
      {
        sid: '1-1-2',
        parentSid: '1-1',
        name: '1-1-2',
      },
      {
        sid: '1-1-3',
        parentSid: '1-1',
        name: '1-1-3',
      },
    ],
  },
  {
    sid: '1-2',
    name: '1-2',
    checkable: false,
    children: [
      {
        sid: '1-2-1',
        parentSid: '1-2',
        name: '1-2-1',
      },
      {
        sid: '1-2-2',
        parentSid: '1-2',
        name: '1-2-2',
        checkable: false,
        children: [
          {
            sid: '1-2-2-1',
            parentSid: '1-2-2',
            name: '1-2-2-1',
          },
          {
            sid: '1-2-2-2',
            parentSid: '1-2-2',
            name: '1-2-2-2',
          },
        ],
      },
    ],
  },
]);

function computedTreeData(sourceList: any[]): TreeData {
  return (
    sourceList?.map((item) => {
      const { sid, parentSid, name, children, ...props } = item;
      return {
        key: sid,
        title: name,
        parentKey: parentSid,
        children: children ? computedTreeData(children) : undefined,
        ...props,
      };
    }) ?? []
  );
}

watch(selectedKeys, () => {
  // 打印选中的 checkedKeys 的所有祖先节点的 id （包含选中的节点本身）
  console.log(modelTreeRef.value?.getAllParentKeys());
});
</script>

<template>
  <ModelTree
    ref="modelTreeRef"
    v-model:selectedKeys="selectedKeys"
    v-model:expandedKeys="expandedKeys"
    showLine
    :computedTreeData="computedTreeData"
    :treeData="treeData"
    :checkable="false"
    :bordered="false"
  />
</template>
