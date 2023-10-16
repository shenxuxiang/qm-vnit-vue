<script setup lang="ts">
import 'dayjs/locale/zh-cn';
import { reactive } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

import ModelTreeDemo from '@/demo/ModelTree/demo1.vue';

const theme = reactive({
  token: { colorPrimary: '#6C69FF', colorLink: '#6C69FF' },
});
</script>

<template>
  <ConfigProvider :locale="zhCN" :theme="theme">
    <ModelTreeDemo />
  </ConfigProvider>
</template>
