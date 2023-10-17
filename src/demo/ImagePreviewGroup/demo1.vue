<script setup lang="ts">
import { ref } from 'vue';
import img1 from '@/assets/images/1.jpg';
import img2 from '@/assets/images/2.png';
import img3 from '@/assets/images/3.webp';
import img4 from '@/assets/images/4.jpg';
import { Image, ImagePreviewGroup } from '@/library';

const imgs = ref([img1, img2, img3]);
setTimeout(() => imgs.value.push(img4), 5000);
</script>

<template>
  <ImagePreviewGroup :bordered="false" style="margin: 0; width: 200px; height: 200px">
    <Image v-for="img in imgs" :key="img" :src="img" />
  </ImagePreviewGroup>
</template>
