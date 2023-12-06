<script setup>
import { watch } from 'vue';
import 'dayjs/locale/zh-cn';
import { reactive } from 'vue';
import { useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { scrollToPosition } from '@/utils';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/lib/locale/zh_CN';
import { Icon } from '@/library';

const theme = reactive({
  token: { colorPrimary: '#1890ff', colorLink: '#1890ff' },
});

const { Layout } = DefaultTheme;
const route = useRoute();

watch(
  () => route.path,
  () => {
    console.log(route.path);
  },
);

function handleBackTop() {
  scrollToPosition(0);
}
</script>

<template>
  <ConfigProvider :locale="zhCN" :theme="theme">
    <Layout>
      <Content />

      <template #aside-ads-after>
        <div class="qm-vnit-backtop">
          <Icon name="backtop" @click="handleBackTop" />
        </div>
      </template>
    </Layout>
  </ConfigProvider>
</template>

<style lang="less">
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #ccc;
}
::-webkit-scrollbar-thumb {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #1890ff;
}
.qm-vnit-preview-image-bar-slider {
  margin: 0 !important;
  padding: 10px 0 !important;
}
.qm-vnit-preview-image-bar-slider-item + .qm-vnit-preview-image-bar-slider-item {
  margin-top: 0;
}
.qm-vnit-image-group-item + .qm-vnit-image-group-item {
  margin-top: 0;
}
.qm-vnit-upload-image-list {
  list-style: none !important;
  li + li {
    margin-top: 0 !important;
  }
}
.qm-vnit-backtop {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translate3d(2px, -2px, 0);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    background: rgba(0, 0, 0, 0.5);
  }
  & i {
    color: rgba(255, 255, 255, 0.7);
    font-size: 30px;
  }
  &:hover i {
    color: rgba(255, 255, 255, 1);
  }
}
// .vp-doc table {
//   display: table;
//   border-collapse: separate;
//   margin: 0;
//   overflow-x: visible;
// }
// .vp-doc th, .vp-doc td {
//   border: none;
//   padding: 16px;
// }
// .vp-doc a {
//   text-decoration: none;
// }
// .qm-content-form-table {
//   padding: 0px !important;
// }
</style>
