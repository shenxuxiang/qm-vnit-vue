<script setup lang="ts">
import 'dayjs/locale/zh-cn';
import { reactive } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

// import ModelTree2 from '@/demo/ModelTree/demo2.vue';
import NotFound from '../es/assets/404.svg';

const theme = reactive({
  token: { colorPrimary: '#6C69FF', colorLink: '#6C69FF' },
});
</script>

<template>
  <ConfigProvider :locale="zhCN" :theme="theme">
    <NotFound width="500px" height="500px" />
  </ConfigProvider>
</template>
