<script setup lang="ts">
import { ref } from 'vue';
import { UploadImage } from '@/library';
import img1 from '@/assets/images/1.jpg';

const fileList = ref([{ uid: '1', name: 'default_1', url: img1 }]);

function headers() {
  return { Authorization: 'Bearer 2d66abed-0ccd-426e-9512-54fa32f20b8d' };
}
</script>

<template>
  <UploadImage
    v-model:fileList="fileList"
    multiple
    method="post"
    action="/v1.0/file/upload"
    :maxCount="10"
    :headers="headers"
  />
</template>
