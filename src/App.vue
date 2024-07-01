<script setup lang="ts">
import 'dayjs/locale/zh-cn';
import { reactive } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

import Demo1 from '@/demo/ImagePreviewGroup/demo1.vue';
import Demo2 from '@/demo/ImagePreviewGroup/demo2.vue';

const theme = reactive({
  token: { colorPrimary: '#6C69FF', colorLink: '#6C69FF' },
});
</script>

<template>
  <ConfigProvider :locale="zhCN" :theme="theme">
    <Demo1 />
    <Demo2 />
  </ConfigProvider>
</template>
