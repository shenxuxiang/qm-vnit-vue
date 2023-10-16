<script setup lang="ts">
import { ref } from 'vue';
import { ContentFormHeader } from '@/library';

const queryList = ref([
  {
    name: 'name',
    title: '查询名称',
    formType: 'input',
    watch: (name: string, formModels: any) => {
      // 每当查询名称表单字段的值发生变化时，重置 时间查询 表单项
      formModels.time = null;
    },
  },
  {
    name: 'time',
    title: '时间查询',
    formType: 'datePicker',
    properties: {
      style: { width: '100%' },
    },
  },
  {
    name: 'type',
    title: '类型查询',
    formType: 'select',
    options: [
      { value: '1', label: 'AAA' },
      { value: '2', label: 'BBB' },
      { value: '3', label: 'CCC' },
    ],
  },
  {
    name: 'timeRange',
    title: '时间范围',
    formType: 'rangePicker',
    properties: {
      style: { width: '100%' },
    },
  },
]);

function handleSubmit(values: any) {
  console.log(values);
}

function handleReset(values: any) {
  console.log(values);
}
</script>

<template>
  <ContentFormHeader :queryList="queryList" :defaultExpand="false" @submit="handleSubmit" @reset="handleReset" />
</template>
