<script setup lang="ts">
import { ref, watch } from "vue";
import { UploadFile } from "@/library";
import img1 from "@/assets/images/1.jpg";
import img2 from "@/assets/images/2.png";
import { UploadOutlined } from "@ant-design/icons-vue";

const fileList = ref([
  { uid: "1", name: "default_1", url: img1 },
  { uid: "2", name: "default_2", url: img2 },
]);

const headers = ref({
  Authorization: "Bearer 2d66abed-0ccd-426e-9512-54fa32f20b8d",
});

watch(fileList, function () {
  console.log(fileList);
});
</script>

<template>
  <UploadFile
    multiple
    v-model:fileList="fileList"
    listType="picture-card"
    action="/v1.0/file/upload"
    :maxCount="10"
    :headers="headers"
  >
    <UploadOutlined />上传附件
  </UploadFile>
</template>
