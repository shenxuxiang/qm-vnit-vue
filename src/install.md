# 使用方法

## 安装

> 我们推荐使用 npm 或 yarn 或 pnpm 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```shell
$ npm install qm-vnit-vue@next --save
```

```shell
$ yarn add qm-vnit-vue@next
```

## 示例

```vue
<script>
import { Image } from 'qm-vnit-vue';
app.use(Image);
</script>
```

> 组合式 API 中直接引入即可，不需要注册

```vue
<script setup>
import { Image } from 'qm-vnit-vue';
</script>
```

## 依赖

- qm-vnit-vue 开发依赖于 ant-design-vue，vue

- 为能够正常使用，开发者还需要安装 @babel/runtime-corejs3、以及 core-js 这些标准的 js 库来完成代码的转换。

## 主题设置

> qm-vnit-vue 安全支持 ant-design-vue 的主题设置功能。

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

> qm-vnit-vue 安全支持 ant-design-vue 的所有国际化语言设置。

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

> qm-vnit-vue 默认支持基于 ES modules 的 tree shaking。

## TypeScript

> qm-vnit-vue 使用 TypeScript 进行书写并提供了完整的定义文件。（不要引用 @types/qm-vnit-vue）
