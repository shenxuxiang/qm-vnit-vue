<script setup lang="ts">
import './UploadVideo.less';
import Icon from '../Icon';
import { ref, computed } from 'vue';
import UploadImage from '../UploadImage';
import type { FileList } from '../UploadImage';
export type { FileList } from '../UploadImage';

type UploadVideoProps = {
  action: string;
  accept?: string;
  method?: string;
  maxSize?: number;
  maxCount?: number;
  multiple?: boolean;
  disabled?: boolean;
  fileList?: FileList;
  headers?: () => { [key: string]: any };
};

type UploadVideoEmits = {
  (e: 'error', error: any): void;
  (e: 'update:fileList', fileList: FileList): void;
};

const props = withDefaults(defineProps<UploadVideoProps>(), {
  accept: 'video/*',
});
const emit = defineEmits<UploadVideoEmits>();
defineOptions({ name: 'UploadVideo' });
const videoURL = ref('');
const videoRef = ref<HTMLVideoElement>();
const localVideos = ref<FileList>([]);
const showPreview = ref(false);
const videoPreviewRef = ref<HTMLVideoElement>();

const videoList = computed({
  get: () => props.fileList || localVideos.value,
  set: (value: FileList) => emit('update:fileList', value),
});

function handlePreviewFile(url: string) {
  videoURL.value = url;
  showPreview.value = true;
}

function handleCanPlay(event: any) {
  const video = event.target;
  const { videoWidth, videoHeight } = video;
  const ratio = videoWidth / videoHeight;
  const maxWidth = document.documentElement.clientWidth * 0.7;
  const maxHeight = document.documentElement.clientWidth * 0.8;

  let width;
  let height;

  if (ratio > maxWidth / maxHeight) {
    if (videoWidth > maxWidth) {
      width = maxWidth;
      height = width / ratio;
    } else {
      width = videoWidth;
      height = videoHeight;
    }
  } else {
    if (videoHeight > maxHeight) {
      height = maxHeight;
      width = height / ratio;
    } else {
      width = videoWidth;
      height = videoHeight;
    }
  }

  video.width = width;
  video.height = height;
}

function handleClosePreview(event: any) {
  if (event.target === event.currentTarget) {
    videoPreviewRef.value!.pause();
    showPreview.value = false;
    videoURL.value = '';
  }
}
</script>

<template>
  <UploadImage
    v-model:fileList="videoList"
    :action="action"
    :method="method"
    :accept="accept"
    :headers="headers"
    :maxSize="maxSize"
    :multiple="multiple"
    :maxCount="maxCount"
    :disabled="disabled"
    :previewFile="handlePreviewFile"
    @error="$emit('error', $event)"
  >
    <template #itemRender="{ src }">
      <video v-if="src" ref="videoRef" class="qm-vnit-upload-video" muted preload="auto">
        <source :src="src" />
      </video>
    </template>
  </UploadImage>
  <Teleport to="body">
    <transition name="uploadVidePreview">
      <div v-if="showPreview" class="qm-vnit-upload-video-previewe" @click="handleClosePreview">
        <video ref="videoPreviewRef" controls class="qm-vnit-upload-video-preview-content" @canplay="handleCanPlay">
          <source :src="videoURL" />
        </video>
        <Icon name="close" class="qm-vnit-upload-video-preview-close-icon" @click="handleClosePreview" />
      </div>
    </transition>
  </Teleport>
</template>
