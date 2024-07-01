<script setup lang="ts">
  import Demo from '@/demo/NavigationBar/demo.vue';
</script>

# NavigationBar 导航栏

## 何时使用

- 如果你希望你的页面有一个导航栏时

## 开发者注意事项

- 默认数据第一项不能删除，该配置不支持修改。

## 代码演示

::: info 案例一
<Demo />

<<< @/demo/NavigationBar/demo.vue
:::

## NavigationBar API

| propName | description                      | type                     | default value |
| -------- | :------------------------------- | :----------------------- | :------------ |
| activeKey  | 当前选中的导航项                | string                              | -             |
| navBarList | 列表                           | NavBarList | -                      |
| change     | 当用户点击导航栏时触发           | (activeKey: string) => void         | -             |
| delete     | 当用户删除导航栏时触发           | (newNavBarList: NavBarList) => void | -             |
