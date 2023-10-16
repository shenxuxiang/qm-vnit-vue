<script setup lang="ts">
import { ref } from 'vue';
import { UploadFile } from '@/library';
import img1 from '@/assets/images/1.jpg';

const fileList = ref([{ uid: '1', name: 'default_1', url: img1 }]);

const headers = ref({
  Authorization: 'Bearer 2d66abed-0ccd-426e-9512-54fa32f20b8d',
});
</script>

<template>
  <UploadFile
    v-model:fileList="fileList"
    multiple
    listType="picture"
    action="/v1.0/file/upload"
    :maxCount="10"
    :headers="headers"
  />
</template>
