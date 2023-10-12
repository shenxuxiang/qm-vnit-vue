<script setup lang="ts">
  import Demo1 from '@/demo/PreviewImage/demo1.vue';
  import Demo2 from '@/demo/PreviewImage/demo2.vue';
</script>

# PreviewImage 图片

可预览图片。

## 何时使用

- 需要预览图片时使用。

## 代码演示

::: info 案例一
<Demo1 />

<<< @/demo/PreviewImage/demo1.vue{23-28}
:::

::: info 案例二（可预览超大图）
<p>为模拟展示超大图片的缓慢加载，建议先将 network 设置成 Fast 3G，再进行预览</p>
<Demo2 />

<<< @/demo/PreviewImage/demo2.vue{18-24,32-38}
:::

## PreviewImage API

| propName       | description                              | type     | default value |
| -------------- | :--------------------------------------- | :------- | :------------ |
| open           | 是否展示组件                             | boolean  | false         |
| imgs           | 预览的图片集合                           | string[] | -             |
| index(v-model) | 默认展示第几个图片                       | number   | 0             |
| pageSize       | 指定缩略图展示列表一页可以展示多少张图片 | number   | 9             |

## SuperPreviewImage API

| propName       |               description                | type                                | default value |
| -------------- | :--------------------------------------: | :---------------------------------- | :------------ |
| open           |               是否展示组件               | boolean                             | false         |
| imgs           |              预览的图片集合              | Array<{ url:string; hdUrl:string }> | -             |
| index(v-model) |            默认展示第几个图片            | number                              | 0             |
| pageSize       | 指定缩略图展示列表一页可以展示多少张图片 | number                              | 9             |

## PreviewImage(SuperPreviewImage) 事件

| eventName | description        | callback       |
| --------- | :----------------- | :------------- |
| close     | 关闭预览弹框的事件 | function () {} |
