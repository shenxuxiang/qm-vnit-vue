<script setup lang="ts">
import img1 from '@/assets/images/1.jpg';
import img2 from '@/assets/images/2.png';
import img3 from '@/assets/images/3.webp';
import { Image, ImagePreviewGroup } from '@/library';
</script>

<template>
  <ImagePreviewGroup :bordered="false" style="margin: 0; width: 200px; height: 200px">
    <Image :src="img1" />
    <Image :src="img2" />
    <Image :src="img3" />
  </ImagePreviewGroup>
</template>
