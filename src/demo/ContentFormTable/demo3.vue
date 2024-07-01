<script setup lang="ts">
import { ref } from 'vue';
import { ContentFormTable } from '@/library';
import { message } from 'ant-design-vue';

const columns = ref([
  {
    dataIndex: 'userName',
    title: '查询名称',
    formType: 'input',
    initialValue: '小沈',
  },
  {
    dataIndex: 'sex',
    title: '性别',
    formType: 'select',
    options: [
      { value: 'man', label: '男' },
      { value: 'woman', label: '女' },
    ],
    initialValue: 'man',
  },
  {
    dataIndex: 'age',
    title: '年龄',
  },
]);

// 提供验证表单的机会，返回 true 表示表示验证通过
function validateFields(query: any) {
  console.log(query);
  if (!query.userName) {
    message.warning('查询名称不能为空');
    return false;
  }

  return true;
}

// 模拟后端接口
function handleQueryTableList(query: any) {
  // 打印请求的参数，
  console.log(query);
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        code: 0,
        message: 'ok',
        data: {
          list: [
            { userName: '小沈', sex: 'man', age: 32, id: '1' },
            { userName: '小梁', sex: 'man', age: 33, id: '2' },
            { userName: '小饶', sex: 'woman', age: 30, id: '3' },
          ],
          pageSize: 10,
          pageNum: 1,
          total: 3,
        },
      });
    }, 1000);
  });
}

// 对后端接口返回的内容进行格式化，满足组件需要的格式
function handleCustomResponse(response: any) {
  return { tableList: response?.data?.list ?? [], total: response?.data?.total ?? 0 };
}

function handleExportTableList(query: any) {
  console.log(query);
  return Promise.resolve();
}
</script>

<template>
  <ContentFormTable
    showExport
    rowKey="id"
    submitButtonText="点击查询"
    :immediate="false"
    :columns="columns"
    :validateFields="validateFields"
    :queryTableList="handleQueryTableList"
    :customResponse="handleCustomResponse"
    :exportTableList="handleExportTableList"
  />
</template>
