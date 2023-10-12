<script setup lang="ts">
import intersectionObserveImage from "@/utils/intersectionObserveImage";
import defaultImgURL from "@/assets/defaultImage.svg";
import { ref, onMounted } from "vue";

export type ImageProps = { src: string };

defineOptions({ name: "Image" });
const props = defineProps<ImageProps>();

const imgSrc = ref(defaultImgURL);
const imgRef = ref<Element>();

onMounted(() => {
  intersectionObserveImage.addElement(imgRef.value!, props.src);
});
</script>

<template>
  <img :src="imgSrc" ref="imgRef" />
</template>
