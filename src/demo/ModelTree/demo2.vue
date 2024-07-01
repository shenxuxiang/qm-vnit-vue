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
    // 不可选
    disabled: true,
    children: [
      {
        sid: '1-1-1',
        parentSid: '1-1',
        name: '1-1-1',
        // 不可选
        disabled: true,
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
    // 不可选
    disabled: true,
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
        // 不可选
        disabled: true,
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

function formatTreeData(sourceList: any[]): TreeData {
  return (
    sourceList?.map((item) => {
      const { sid, parentSid, name, children, ...props } = item;
      return {
        key: sid,
        title: name,
        parentKey: parentSid,
        children: children ? formatTreeData(children) : undefined,
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
    multiple
    :bordered="false"
    :checkable="false"
    :treeData="treeData"
    :formatTreeData="formatTreeData"
  />
</template>
