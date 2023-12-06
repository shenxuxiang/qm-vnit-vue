# qm-vnit-vue
qm-vnit-vue 是一款基于 ant-design-vue 研发的 Vue 业务组件库 [document](http://aitweb.top/qm-vnit-vue/)

## ✨ 特性
- 🌈 提炼自企业级中后台产品的交互语言和视觉风格。
>
- 📦 开箱即用的高质量 Vue 组件。
>
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
>
- 🌍 支持 ant-design-vue 所有的国际化语言支持。
>
- 🎨 支持 ant-design-vue 主题定制能力。
>

## 安装
使用 npm 或 yarn 或 pnpm 安装
>
我们推荐使用 npm 或 yarn 或 pnpm 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。
```bash
  yarn add qm-vnit-vue

  npm install --save qm-vnit-vue
```


## 依赖
- qm-vnit-vue 开发依赖于 ant-design-vue @ant-design/icons-vue、vue 这些库。
>
- 生产构建时需要 @babel/runtime-corejs3、以及 core-js 这些标准的 js 库来完成代码的转换。
>



## 主题设置
qm-vnit-vue 安全支持 ant-design-vue 的主题设置功能。

```vue
<script setup lang="ts">
  // 入口文件
  import zhCN from 'antd/es/locale/zh_CN';
  import { ConfigProvider } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';

  dayjs.locale('zh-cn');

  const theme = { token: { colorPrimary: '#00b96b' } };
</script>
<template>
  <ConfigProvider :theme="theme">
    <!-- 嵌入的内容 -->
  </ConfigProvider>
</template>
```


## 语言设置
qm-vnit-vue 安全支持 ant-design-vue 的所有国际化语言设置。

```vue
<script setup lang="ts">
  // 入口文件
  import zhCN from 'antd/es/locale/zh_CN';
  import { ConfigProvider } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';

  dayjs.locale('zh-cn');

  const theme = { token: { colorPrimary: '#00b96b' } };
</script>
<template>
  <ConfigProvider :locale="zhCN">
    <!-- 嵌入的内容 -->
  </ConfigProvider>
</template>
```

## 按需加载
qm-vnit-vue 默认支持基于 ES modules 的 tree shaking。

## TypeScript
qm-vnit-vue 使用 TypeScript 进行书写并提供了完整的定义文件。（不要引用 @types/qm-vnit-vue）
