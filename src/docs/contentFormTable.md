# ContentFormPage 表格页面

提供数据查询、表格展示、分页的完整功能。

## 何时使用

- 涉及到表格数据的展示时可以使用

- 需要表单检索表格数据时可以使用

## 开发者注意事项

- 开发者只需要传递一个获取表格数据的方法(requestDataSource)即可使用。

- 开发者可以通过给组件传递 customResponse 方法来对后端接口返回的 response 进行修改，从而满足组件需要的数据格式（参考 [API](/docs/contentFormTable.html#API) 部分）。

- 默认情况下组件会在页面初始化时进行数据查询，如果要关闭此功能，可以给组件传递 `immediate: false`。

## 代码演示

[查看案例](/preview/contentFormTable/demo1){target="blank"}
::: info 案例一
<<< @/demo/ContentFormTable/demo1.vue{22,26-33}
:::

[查看案例](/preview/contentFormTable/demo2){target="blank"}
::: info 案例二（支持排序）
<<< @/demo/ContentFormTable/demo2.vue{30,34-42}
:::

[查看案例](/preview/contentFormTable/demo3){target="blank"}
::: info 案例三（支持导出表格数据，支持表单数据验证和初始值设置，关闭自动查询数据功能）
<<< @/demo/ContentFormTable/demo3.vue{11,21,29-38,64-67,79-80}
:::

[查看案例](/preview/contentFormTable/demo4){target="blank"}
::: info 案例四（支持导出表格数据，支持表单数据验证，关闭自动查询数据功能）
<<< @/demo/ContentFormTable/demo4.vue{5-19}
:::

## ContentFormTable API

| propName          | description    | type           | default value  |
| ----------------- | :------------- | :------------- | :------------- |
| cols              | 查询表单要展示的列数 | number | - |
| rowKey            | 与 Table 组件的 rowKeys 一致 | string | - |
| columns           | 与 Table 组件的 columns 一致 | Columns | -|
| showExport        | 是否展示导出按钮 | boolean | false |
| exportFileName    | 定义导出的文件名 | string | _default_file |
| defaultExpand     | 是否默认展开所有查询你表单项 | boolean | true |
| submitButtonText  | 查询表单项按钮的文本  | string | 提交  |
| hideResetButton   | 是否隐藏重置表单项按钮 | string | false |
| bordered          | 与 Table 组件的 bordered 一致  | boolean | false |
| immediate         | 是否允许在组件初始化时就可以请求表格数据 | boolean | true |
| scroll            | 与 Table 组件的 scroll 一致  | object | - |
| style             | 传递给组件根节点的样式 | CSSProperties，string | - |
| class             | 传递给组件根节点的类名 | string，string[]，object | - |
| paginationSize    | 与 Pagination 组件的 size 一致 | "default"，"small" | "default" |
| tableSize         | 与 Table 组件的 size 一致 | "small"，"middle"，"large" | "default" |
| rowSelection      | 与 Table 组件的 rowSelection 一致 | TableProps["rowSelection"] | - |
| beforeQueryAction | 在正式请求表格数据之前，会触发 beforeQueryAction 行为，返回 false 将中断请求 | function(query) {} | - |
| queryTableList    | 获取表格数据 | function(query) {} | - |
| customResponse    | 当接口返回的 res 无法直接满足组件需要时，使用该方法可以对 res 进行进一步处理以满足组件需要 | function(data) {} | function (data: any) { return { tableList: data.list, total: data.total } } |
| showTotal         | 与 Pagination 组件的 showTotal 一致 | function(total) {} | function(total: number) { return `共${total}条数据` } |
| exportTableList   | 导出表格数据 | function(query) {} | - |

## ContentFormTable 事件

| eventName        | description | callback                        |
| ---------------- | :---------- | :------------------------------ |
| paginationChange | 分页器事件  | function (pageNum, pageSize) {} |

## Columns

| propName     | description   | type             |
| ------------ | :------------ | :--------------- |
| title        | 查询表单项的 lebel | string |
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
| visibleInTable | 在 Table 表格中是否展示该项 | boolean |
