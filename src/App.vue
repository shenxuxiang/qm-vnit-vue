<script setup lang="ts">
import 'dayjs/locale/zh-cn';
import { reactive } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

import ModelTree2 from '@/demo/ModelTree/demo2.vue';

const theme = reactive({
  token: { colorPrimary: '#6C69FF', colorLink: '#6C69FF' },
});
</script>

<template>
  <ConfigProvider :locale="zhCN" :theme="theme">
    <ModelTree2 />
  </ConfigProvider>
</template>
