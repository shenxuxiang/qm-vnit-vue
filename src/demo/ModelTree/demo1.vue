<script setup lang="ts">
import { ref } from 'vue';
import { ModelTree } from '@/library';

const checkedKeys = ref(['1-1-1-1']);
const expandedKeys = ref(['1-1', '1-1-1']);
const treeData = ref([
  {
    id: '1-1',
    name: '1-1',
    children: [
      {
        id: '1-1-1',
        parentId: '1-1',
        name: '1-1-1',
        children: [
          {
            id: '1-1-1-1',
            parentId: '1-1-1',
            name: '1-1-1-1',
          },
          {
            id: '1-1-1-2',
            parentId: '1-1-1',
            name: '1-1-1-2',
          },
        ],
      },
      {
        id: '1-1-2',
        parentId: '1-1',
        name: '1-1-2',
      },
      {
        id: '1-1-3',
        parentId: '1-1',
        name: '1-1-3',
      },
    ],
  },
  {
    id: '1-2',
    name: '1-2',
    children: [
      {
        id: '1-2-1',
        parentId: '1-2',
        name: '1-2-1',
      },
      {
        id: '1-2-2',
        parentId: '1-2',
        name: '1-2-2',
        disableCheckbox: true,
        children: [
          {
            id: '1-2-2-1',
            parentId: '1-2-2',
            name: '1-2-2-1',
          },
          {
            id: '1-2-2-2',
            parentId: '1-2-2',
            name: '1-2-2-2',
          },
        ],
      },
    ],
  },
  {
    id: '1-3',
    name: '1-3',
  },
  {
    id: '1-4',
    name: '1-4',
  },
]);

const fieldNames = {
  key: 'id',
  title: 'name',
  parentKey: 'parentId',
};
</script>

<template>
  <ModelTree
    v-model:checkedKeys="checkedKeys"
    v-model:expandedKeys="expandedKeys"
    multiple
    :bordered="false"
    :treeData="treeData"
    :fieldNames="fieldNames"
  />
</template>
