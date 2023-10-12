<script setup lang="ts">
  import Demo from '@/demo/Icon/demo.vue';
</script>

# Icon 图标

## 何时使用

- 你可以在任何希望插入图标的地方插入

## 开发者注意事项

- 开发者可以给组件传递除 name、className、style、onClick 之外的其他任意属性，任意属性应该以 "data-" 作为前缀。

## 代码演示

::: info 案例一
<Demo />

<<< @/demo/Icon/demo.vue
:::

## Icon API

| propName | description                      | type                     | default value |
| -------- | :------------------------------- | :----------------------- | :------------ |
| name     | 图标的名称                       | string                   | -             |
| class    | 类名                             | string，string[]，object | -             |
| style    | 样式                             | string，CSSProperties    | -             |
| ...      | 其他属性都将直接传递给组件根节点 | any                      | -             |
