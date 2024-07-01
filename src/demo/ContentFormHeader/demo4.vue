<script setup lang="ts">
import { ref } from 'vue';
import { delay } from '@/utils';
import { Button } from 'ant-design-vue';
import { ContentFormHeader } from '@/library';

const headerRef = ref<InstanceType<typeof ContentFormHeader>>();
const queryList = ref([
  {
    name: 'name',
    title: '查询名称',
    formType: 'input',
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

function handleClick() {
  console.log(headerRef.value!.getCurrentFormData());
}
</script>

<template>
  <ContentFormHeader ref="headerRef" :queryList="queryList" hideResetButton :submit="handleSubmit" :reset="handleReset">
    <template #insertNode>
      <Button style="margin-left: 8px" @click="handleClick">自定义按钮</Button>
    </template>
  </ContentFormHeader>
</template>
