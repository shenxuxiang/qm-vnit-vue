<script setup lang="ts">
import { ref } from 'vue';
import { ContentFormTable } from '@/library';
import { Button } from 'ant-design-vue';

const tableRef = ref<InstanceType<typeof ContentFormTable>>();

const columns = ref([
  {
    dataIndex: 'userName',
    title: '查询名称',
    formType: 'input',
  },
  {
    dataIndex: 'sex',
    title: '性别',
  },
  {
    dataIndex: 'age',
    title: '年龄',
  },
]);

function handleQueryTableList(query: any) {
  console.log(query);
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        data: {
          list: [
            { userName: '小沈', sex: 'man', age: 32, id: '1' },
            { userName: '小梁', sex: 'man', age: 33, id: '2' },
            { userName: '小饶', sex: 'woman', age: 30, id: '3' },
          ],
          total: 3,
        },
      });
    }, 1000);
  });
}

function handleClick() {
  console.log(tableRef.value!.form);
  console.log(tableRef.value!.getQueryData());
  console.log(tableRef.value!.forceUpdate());
}
</script>

<template>
  <ContentFormTable ref="tableRef" rowKey="id" :columns="columns" :queryTableList="handleQueryTableList">
    <template #extra>
      <Button @click="handleClick">获取查询表单数据</Button>
    </template>
  </ContentFormTable>
</template>
