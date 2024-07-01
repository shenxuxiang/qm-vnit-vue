<script setup lang="ts">
  import Demo1 from '@/demo/ImagePreviewGroup/demo1.vue';
  import Demo2 from '@/demo/ImagePreviewGroup/demo2.vue';
</script>

# ImagePreviewGroup 图片展示

可预览的图片集合。

## 何时使用

- 需要展示图片时使用。
- 需要预览图片时使用。

## 代码演示

::: info 案例一
<Demo1 />

<<< @/demo/ImagePreviewGroup/demo1.vue{10,15}
:::

::: info 案例二
<Demo2 />

<<< @/demo/ImagePreviewGroup/demo2.vue{9}
:::

## ImagePreviewGroup API

| propName | description                          | type                  | default value |
| -------- | :----------------------------------- | :-------------------- | :------------ |
| bordered | 图片是否含有边框 | boolean | - |
| options | 图片的集合 | string[] | - |
| 其他 | 其他属性将直接透传给ImagePreviewGroup组件的根节点 | - | - |
