<script setup lang="ts">
import { ref } from "vue";
import { UploadVideo } from "@/library";
import videoSrc from "@/assets/huangshan.mp4";

const fileList = ref([{ uid: "1", name: "huangshan", url: videoSrc }]);

function headers() {
  return { Authorization: "Bearer 2d66abed-0ccd-426e-9512-54fa32f20b8d" };
}
</script>

<template>
  <UploadVideo
    multiple
    disabled
    method="post"
    action="/v1.0/file/upload"
    v-model:fileList="fileList"
    :maxCount="10"
    :headers="headers"
  />
</template>
