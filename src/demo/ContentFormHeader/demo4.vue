<script setup lang="ts">
import { ref } from 'vue';
import { Button } from 'ant-design-vue';
import { ContentFormHeader } from '@/library';

const queryList = ref([
  {
    name: 'name',
    title: '查询名称',
    formType: 'input',
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
  <ContentFormHeader :queryList="queryList" hideResetButton @submit="handleSubmit" @reset="handleReset">
    <template #insertNode>
      <Button style="margin-left: 8px">自定义按钮</Button>
    </template>
  </ContentFormHeader>
</template>
