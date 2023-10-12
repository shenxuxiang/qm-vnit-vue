<script setup lang="ts">
import { ModelTree } from "@/library";
import type { TreeData } from "@/library/ModelTree";
import { ref, watch } from "vue";
const checkedKeys = ref(["1-1-1-1"]);
const expandedKeys = ref(["1-1", "1-1-1"]);
const modelTreeRef = ref<InstanceType<typeof ModelTree>>();
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
          ]
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
      ]
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
          ]
        },
      ]
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

watch(
  checkedKeys, 
  function() {
    // 打印选中的 checkedKeys 的所有祖先节点的 id （包含选中的节点本身）
    console.log(modelTreeRef.value?.getAllParentKeys());
  }
)
</script>

<template>
  <ModelTree
    :treeData="treeData"
    :computedTreeData="computedTreeData"
    v-model:checkedKeys="checkedKeys"
    v-model:expandedKeys="expandedKeys"
    :bordered="false"
    ref="modelTreeRef"
  />
</template>
