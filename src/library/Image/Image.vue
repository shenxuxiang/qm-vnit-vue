<script setup lang="ts">
import intersectionObserveImage from '@/utils/intersectionObserveImage';
import defaultImgURL from '@/assets/defaultImage.svg';
import { ref, onMounted, onBeforeUnmount } from 'vue';

export type ImageProps = { src: string };

const props = defineProps<ImageProps>();
// eslint-disable-next-line
defineOptions({ name: 'Image' });
const imgSrc = ref(defaultImgURL);
const imgRef = ref<Element>();

onMounted(() => intersectionObserveImage.addElement(imgRef.value!, props.src));
onBeforeUnmount(() => intersectionObserveImage.removeElement(imgRef.value!));
</script>

<template>
  <img ref="imgRef" :src="imgSrc" />
</template>
