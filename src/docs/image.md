<script setup lang="ts">
  import defaultImg from '@/assets/defaultImage.svg';
  import ImageDemo from '@/demo/Image/demo.vue';
  import img1 from '@/assets/images/1.jpg';
  import { Image } from '@/library';
</script>

# Image 图片

可预览的图片。

## 何时使用

- 需要展示图片时使用。
- 需要惰性加载时使用，当图片不再可视区范围之内不会加载图片

## 代码演示

::: info 案例一
<ImageDemo/>

<<< @/demo/Image/demo.vue
:::

::: info 案例二（图片加载完成之前展示的样式）
<Image :src="defaultImg" style="max-width: 200px; max-height: 200px;"/>
:::

## Image API

| propName | description                                   | type   | default value |
| -------- | :-------------------------------------------- | :----- | :------------ |
| src      | 要展示的图片 url                              | string | -             |
| ...      | 其他任何属性将直接传递给 img 节点（包括事件） | string | -             |
