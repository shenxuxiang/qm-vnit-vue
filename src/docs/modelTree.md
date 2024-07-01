---
description: VitePress
---

<script setup>
  import Demo1 from '@/demo/ModelTree/demo1.vue';
  import Demo2 from '@/demo/ModelTree/demo2.vue';
</script>

# ModelTree 模型树

该组件是 antd Tree 组件的集成，并支持查询功能


## 何时使用

- 该组件是 Tree 组件的集成，在任何需要使用 Tree 组件的地方都可以使用 ModelTree


## 开发者注意事项

- 开箱即用，只用提供 treeData 即可，我们默认 treeData 的数据结构是 TreeData 类型；

- 如果 treeData 的数据结构不是TreeData 类型，组件提供了 "formatTreeData" 属性来定义具体的数据格式转换方法；

- 可以通过 "fieldNames" 字段，告诉组件 treeData 的数据结构，组件会根据传入的 "fieldNames" 自动对 props.treeData 格式化；

- 设置了 "checkable" 就不要设置 "selectable" 字段了，组件中 "selectable" 将自动取 "checkable" 的反值；


## 代码演示
::: info 案例一（checkable 类型，可以通过 disableCheckbox 控制节点能否可选）
  <Demo1 />
  <<< @/demo/ModelTree/demo1.vue{55}
:::

::: info 案例二（selectable 类型，通过 disabled 控制节点能否可选）
  <Demo2 />
  <<< @/demo/ModelTree/demo2.vue{19,26,56,68,94-95}
:::


## ModelTree API

| propName              | description                          | type                                        | default value |
| --------------------- | :----------------------------------- | :------------------------------------------ | :------------ |
| treeData              | 数据源，数据在组件内部通过 props.computedTreeData 进行格式化转换成 Tree 需要的数据格式 | any[] | - |
| bordered              | 是否需要边框 | boolean | true |
| multiple              | 是否可以多选 | boolean | false |
| checkable             | 节点前添加 Checkbox 复选框 | boolean| true |
| placeholder           | 搜索输入框的 placeholder | string | 请输入关键字进行查找 |
| showFilter            | 是否展示搜索输入框 | boolean | false |
| disabled              | 是否禁用                             | boolean                                     | -             |
| checkedKeys(v-model)  | 选中的key | string[]，number[] | - |
| expandedKeys(v-model) | 展开的key | string[]，number[] | - |
| fieldNames            | 字段名称设置 | FieldNames | - |
| formatTreeData        | 将 treeData 转换成组件需要的数据格式，如果 treeData 本身就满足 TreeData 数据类型则不需要传递此属性 | function(treeData) | - |
