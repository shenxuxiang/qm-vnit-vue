<script setup lang="ts">
import { ImagePreviewGroup } from '../../library';
import img1 from '../../assets/images/1.jpg';
import img2 from '../../assets/images/2.png';
import img3 from '../../assets/images/3.webp';
</script>

<template>
  <ImagePreviewGroup bordered :options="[img1, img2, img3]" />
</template>
