<script setup lang="ts">
  import Demo1 from '@/demo/ContentFormHeader/demo1.vue';
  import Demo2 from '@/demo/ContentFormHeader/demo2.vue';
  import Demo3 from '@/demo/ContentFormHeader/demo3.vue';
  import Demo4 from '@/demo/ContentFormHeader/demo4.vue';
</script>

# ContentFormHead 表头查询功能

提供表单等提供查询功能

## 何时使用

- 表头查询既可以作为页头，作为页面的表格数据的查询功能，也可以作为某个表格数据的查询功能

## 开发者注意事项

- 在不传入 cols 参数的情况下，ContentFormHead 会根据屏幕的宽度自动调节（一行可以放置几列）

## 更新内容

- onReset 回调函数将返回一个 Promise 实例；
- onSubmit 回调函数将返回一个 Promise 实例；
- onExport回调函数将返回一个 Promise 实例；
- 新增提交按钮、导出按钮、重置按钮用户反馈交互，防止用户持续提交动作；
- 将原本内置的导出文件功能删除，新版本中开发者通过 exportTableList(query) 方法自定义导出文件；
- 组件内部逻辑优化，组件性能有所提升；
- 组件样式微调；
- 添加了 ref 可获取组件的实例对象，该实例对象上绑定了如下属性：
  * form 是表单实例；
  * getCurrentFormData 用于获取格式化后的表单数据；


## 代码演示

::: info 案例一(指定表单查询默认值)
<Demo1/>
<<< @/demo/ContentFormHeader/demo1.vue{10-13,22-24,43-48}
:::

::: info 案例二(指定列数)
<Demo2/>
<<< @/demo/ContentFormHeader/demo2.vue{65}
:::

::: info 案例三(自定义表单项内容)
<Demo3/>
<<< @/demo/ContentFormHeader/demo3.vue{32-35}
:::

::: info 案例四(使用插槽)
<Demo4/>
<<< @/demo/ContentFormHeader/demo4.vue{32-35}
:::

## ContentFormHeader API

| propName         | description                  | type      | default value |
| ---------------- | :--------------------------- | :-------- | :------------ |
| cols             | 要展示的列数 | number | - |
| queryList        | 查询表单项集合 | QueryList | - |
| showExport       | 是否展示导出按钮 | boolean | - |
| defaultExpand    | 是否默认展开所有查询你表单项 | boolean | true |
| submitButtonText | 查询表单项按钮的文本 | string | 提交 |
| hideResetButton  | 是否隐藏重置表单项按钮 | string | false |
| submit           | 表单提交事件 | `(values：any) => Promise<any>` | - |
| reset            | 表单重置事件 | `(values：any) => Promise<any>` | - |
| export           | 表单导出事件 | `(values：any) => Promise<any>` | - |


## QueryList

| propName     | description   | type             |
| ------------ | :------------ | :--------------- |
| title        | 查询表单项的 lebel | string |
| name         | 查询表单项的 name  | string |
| properties   | 传递给渲染组件的属性对象集合 | object |
| watch        | 监听方法，每当对应的表单项值改变时，就会触发 | function (value, formModels) {} |
| dataFormat   | 数据格式化方法，将原始的表单项数据转换成接口需要的格式 | function(value) {} |
| component    | 自定义表单项内容  | function() {} |
| formType     | 表单项内容组件的类型 | input，select，rangePicker，datePicker，cascader |
| initialValue | 表单项的初始值 | any |
| dataIndex    | 表单项的 name 字段（当 name 属性存在时，以 name 属性为准）| string |
| name         | 表单项的 name 字段 | string |
| options      | 传递给表单项内容组件，当 formType 为 'select' 或 'cascader' 时可以使用 | any[] |
| placeholder  | 表单项的 placeholder | string  |
