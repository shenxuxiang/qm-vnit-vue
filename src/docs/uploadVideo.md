<script setup lang="ts">
  import defaultImg from '@/assets/defaultImage.svg';
  import Demo1 from '@/demo/UploadVideo/demo1.vue';
  import Demo2 from '@/demo/UploadVideo/demo2.vue';
</script>

# UploadVideo 视频上传控件

视频上传控件，支持同时上传多个视频，支持预览

## 何时使用

- 可单独使用，也可以嵌套在 FormItem 表单控件中使用（无需再次封装）

## 开发者注意事项

- 对于一般无需用户登录凭证的可以直接使用，如需登陆凭证可以通过 headers 传递给组件

## 代码演示

::: info 案例一
<Demo1/>

<<< @/demo/UploadVideo/demo1.vue
:::

::: info 案例二
<Demo2/>

<<< @/demo/UploadVideo/demo2.vue{18}
:::

## UploadVideo API

| propName          | description                          | type                          | default value |
| ----------------- | :----------------------------------- | :---------------------------- | :------------ |
| action            | 上传的路径                           | string                        | -             |
| accept            | 上传的文件类型                       | string                        | video/\*      |
| method            | request method                       | string                        | \*            |
| maxSize           | 限制图片的大小，0 表示不限制         | number                        | -             |
| maxCount          | 最多可以上传多少个图片，0 表示不限制 | number                        | -             |
| multiple          | 是否支持多张图片上传                 | boolean                       | true          |
| disabled          | 是否禁用                             | boolean                       | -             |
| headers           | 上传时携带的请求头                   | object                        | -             |
| fileList(v-model) | 文件列表                             | UploadChangeParam["fileList"] | -             |

## UploadVideo 事件

| eventName | description  | callback            |
| --------- | :----------- | :------------------ |
| error     | 图片上传异常 | function (error) {} |
