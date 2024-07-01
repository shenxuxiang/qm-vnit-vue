<script setup lang="ts">
import { h, ref, toRaw } from 'vue';
import { delay } from '@/utils';
import { Checkbox } from 'ant-design-vue';
import { ContentFormHeader } from '@/library';

const queryList = ref([
  {
    name: 'name',
    title: '查询名称',
    formType: 'input',
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
    name: 'timeRange',
    title: '时间范围',
    formType: 'rangePicker',
    properties: {
      style: { width: '100%' },
    },
  },
  {
    name: 'type',
    title: '类型查询',
    // component: () => h(Checkbox.Group, { options: [{ label :'A', value: 1 }, { label: 'B', value: 2 }] })
    component() {
      return h(Checkbox.Group, null, () => [
        h(Checkbox, { value: '1' }, () => 'A'),
        h(Checkbox, { value: '2' }, () => 'B'),
      ]);
    },
    dataFormat(value: any) {
      return { type: toRaw(value) };
    },
  },
]);

async function handleSubmit(values: any) {
  console.log(values);
  return delay(1000, null);
}

async function handleReset(values: any) {
  console.log(values);
  return delay(1000, null);
}
</script>

<template>
  <ContentFormHeader :queryList="queryList" :submit="handleSubmit" :reset="handleReset" />
</template>
