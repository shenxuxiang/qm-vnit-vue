<script setup lang="ts">
import { ref } from "vue";
import { ContentFormTable } from "@/library";

// 当 Columns 中既没有指定 formType、也没有指定 component 时，则只展示表格数据
const columns = ref([
  {
    dataIndex: "userName",
    title: "查询名称",
  },
  {
    dataIndex: "sex",
    title: "性别",
  },
  {
    dataIndex: "age",
    title: "年龄",
  },
]);

function handleQueryTableList(query: any) {
  console.log(query);
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        data: {
          list: [
            { userName: "小沈", sex: "man", age: 32, id: "1" },
            { userName: "小梁", sex: "man", age: 33, id: "2" },
            { userName: "小饶", sex: "woman", age: 30, id: "3" },
          ],
          total: 3,
        },
      });
    }, 1000);
  });
}
</script>

<template>
  <ContentFormTable
    rowKey="id"
    :columns="columns"
    :queryTableList="handleQueryTableList"
  />
</template>
