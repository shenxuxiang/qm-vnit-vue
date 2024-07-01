<script setup lang="ts">
import { ref } from 'vue';
import { delay } from '@/utils';
import { ContentFormHeader } from '@/library';
import dayjs from 'dayjs';

const queryList = ref([
  {
    name: 'name',
    title: '查询名称',
    formType: 'input',
    watch: (name: string, formModels: any) => {
      // 每当查询名称表单字段的值发生变化时，重置 时间查询 表单项
      formModels.time = null;
    },
    initialValue: 'hello world',
  },
  {
    name: 'time',
    title: '时间查询',
    formType: 'datePicker',
    properties: {
      style: { width: '100%' },
    },
    dataFormat: (value: any) => {
      return { time: value.startOf().format('YYYY-MM-DD') };
    },
    initialValue: dayjs('2024-07-01'),
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
    initialValue: '1',
  },
  {
    name: 'timeRange',
    title: '时间范围',
    formType: 'rangePicker',
    properties: {
      style: { width: '100%' },
    },
    dataFormat: (value: any) => {
      return {
        startTime: value[0].startOf().format('YYYY-MM-DD'),
        endTime: value[1].endOf().format('YYYY-MM-DD'),
      };
    },
    initialValue: [dayjs().startOf('week'), dayjs().endOf('week')],
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

async function handleExport(values: any) {
  console.log(values);
  return delay(1000, null);
}
</script>

<template>
  <ContentFormHeader
    :queryList="queryList"
    :defaultExpand="false"
    :submit="handleSubmit"
    :reset="handleReset"
    :export="handleExport"
  />
</template>
