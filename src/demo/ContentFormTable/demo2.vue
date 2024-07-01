<script setup lang="ts">
import { ref } from 'vue';
import { ContentFormTable } from '@/library';

const columns = ref([
  {
    dataIndex: 'userName',
    title: '查询名称',
    formType: 'input',
  },
  {
    dataIndex: 'sex',
    title: '性别',
    sorter: {
      compare: (a: any, b: any) => a.sex - b.sex,
      multiple: 1,
    },
  },
  {
    dataIndex: 'age',
    title: '年龄',
    sorter: {
      compare: (a: any, b: any) => a.age - b.age,
      multiple: 2,
    },
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

function handleSubmit(values: any) {
  console.log(values);
}

function handleReset(values: any) {
  console.log(values);
}

function customTableSorter(sorterList: any[]) {
  return sorterList.map((item) => ({ field: item.field, direction: item.order === 'ascend' ? true : false }));
}
</script>

<template>
  <ContentFormTable
    rowKey="id"
    :columns="columns"
    :queryTableList="handleQueryTableList"
    :customTableSorter="customTableSorter"
    @submit="handleSubmit"
    @reset="handleReset"
  />
</template>
