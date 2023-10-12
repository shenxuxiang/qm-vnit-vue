<script setup lang="ts">
import { ref } from "vue";
import { Button } from "ant-design-vue";
import { PreviewImage } from "@/library";
import img1 from "@/assets/images/1.jpg";
import img2 from "@/assets/images/2.png";
import img3 from "@/assets/images/3.webp";
import img4 from "@/assets/images/4.jpg";
import img5 from "@/assets/images/5.jpg";
import img6 from "@/assets/images/6.jpg";
import img7 from "@/assets/images/7.webp";
import img8 from "@/assets/images/8.jpeg";
import img9 from "@/assets/images/9.webp";
import img10 from "@/assets/images/10.webp";

const imgs = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
const index = ref(0);
const showModal = ref(false);
</script>
<template>
  <Button @click="showModal = true">预览</Button>

  <PreviewImage
    :imgs="imgs"
    :index="index"
    :open="showModal"
    @close="showModal = false"
  />
</template>
