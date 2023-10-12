<script setup lang="ts">
import { Image } from "@/library";
import img1 from "@/assets/images/1.jpg";
</script>

<template>
  <Image
    :src="img1"
    alt="图片预览"
    style="max-width: 200px; max-height: 200px"
  />
</template>
