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

- 开箱即用，只用提供 treeData 即可，我们默认 treeData 的数据结构是 PropTreeData 类型

- 如果 treeData 的数据结构不是这种类型，组件提供了 formatData 属性来定义具体的数据格式转换方法。


## 代码演示
::: info 案例一（disableCheckbox不可选节点）
  <Demo1 />
  <<< @/demo/ModelTree/demo1.vue{54}
:::

::: info 案例二（可获取所有祖先节点、组合节点不展示 checkbox）
  <Demo2 />
  <<< @/demo/ModelTree/demo2.vue{13,19,48,59,95-96}
:::


## ModelTree API

| propName              | description                          | type                                        | default value |
| --------------------- | :----------------------------------- | :------------------------------------------ | :------------ |
| treeData              | 数据源，数据在组件内部通过 props.computedTreeData 进行格式化转换成 Tree 需要的数据格式 | any[] | - |
| bordered              | 是否需要边框 | boolean | true |
| checkable             | 节点前添加 Checkbox 复选框 | boolean| true |
| placeholder           | 搜索输入框的 placeholder | string | 请输入关键字进行查找 |
| showFilter            | 是否展示搜索输入框 | boolean | false |
| disabled              | 是否禁用                             | boolean                                     | -             |
| checkedKeys(v-model)  | 选中的key | string[]，number[] | - |
| expandedKeys(v-model) | 展开的key | string[]，number[] | - |
| computedTreeData      | 将 treeData 转换成组件需要的数据格式，如果 treeData 本身就满足 TreeData 数据类型则不需要传递此属性 | function(treeData) | - |
