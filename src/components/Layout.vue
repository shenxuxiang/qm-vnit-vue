<script setup>
import { watch } from "vue";
import "dayjs/locale/zh-cn";
import { reactive } from "vue";
import { useRoute } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/lib/locale/zh_CN";

const theme = reactive({
  token: { colorPrimary: "#1890ff", colorLink: "#1890ff" },
});

const { Layout } = DefaultTheme;
const route = useRoute();

watch(
  () => route.path,
  function () {
    console.log(route.path);
  }
);
</script>

<template>
  <ConfigProvider :locale="zhCN" :theme="theme">
    <Layout>
      <Content />
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
.qm-vnit-preview-image-bar-slider-item
  + .qm-vnit-preview-image-bar-slider-item {
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
