<script setup lang="ts">
import { ref } from 'vue';
import { Button } from 'ant-design-vue';
import { PreviewImage } from '@/library';
import img1 from '@/assets/images/1.jpg';
import img2 from '@/assets/images/2.png';
import img3 from '@/assets/images/3.webp';
import img4 from '@/assets/images/4.jpg';
import img5 from '@/assets/images/5.jpg';
import img6 from '@/assets/images/6.jpg';
import img7 from '@/assets/images/7.webp';
import img8 from '@/assets/images/8.jpeg';
import img9 from '@/assets/images/9.webp';
import img10 from '@/assets/images/10.webp';

const { SuperPreviewImage } = PreviewImage;
// url 表示要展示的缩略图，hdUrl 表示要预览的高清图
const superImgs = [
  { url: img1, hdUrl: img6 },
  { url: img2, hdUrl: img7 },
  { url: img3, hdUrl: img8 },
  { url: img4, hdUrl: img9 },
  { url: img5, hdUrl: img10 },
];

const index = ref(0);
const showModal = ref(false);
</script>
<template>
  <Button @click="showModal = true">预览</Button>

  <SuperPreviewImage :pageSize="3" :index="index" :imgs="superImgs" :open="showModal" @close="showModal = false" />
</template>
