<script setup lang="ts">
import { ref } from 'vue';
import { delay } from '@/utils';
import { Button } from 'ant-design-vue';
import { ContentFormHeader } from '@/library';
import type { Cols } from '@/library/ContentFormHeader';

const headerRef = ref<InstanceType<typeof ContentFormHeader>>();
const cols = ref<Cols>(2);
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
    dataFormat(value: any) {
      return {
        time: value.startOf('day').format('YYYY-MM-DD'),
      };
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
    dataFormat(values: any) {
      return {
        startTime: values[0].startOf('day').format('YYYY-MM-DD'),
        endTime: values[1].endOf('day').format('YYYY-MM-DD'),
      };
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

async function handleExport(values: any) {
  console.log(values);
  return delay(1000, null);
}

function getCurrentFormData() {
  console.log(headerRef.value!.getCurrentFormData());
}
</script>

<template>
  <Button.Group>
    <Button :type="cols === 2 ? 'primary' : 'default'" @click="cols = 2">2</Button>
    <Button :type="cols === 3 ? 'primary' : 'default'" @click="cols = 3">3</Button>
  </Button.Group>
  <Button @click="getCurrentFormData">获取表单信息</Button>

  <div :style="{ overflow: 'auto', marginTop: '20px' }">
    <div :style="{ width: '1300px' }">
      <ContentFormHeader
        ref="headerRef"
        showExport
        :cols="cols"
        :queryList="queryList"
        :reset="handleReset"
        :export="handleExport"
        :submit="handleSubmit"
      />
    </div>
  </div>
</template>
