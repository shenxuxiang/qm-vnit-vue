<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue';
import PreviewImage from '../PreviewImage';
import { ref, nextTick, watch } from 'vue';
import RenderItem from './RenderItem.vue';
import { message } from 'ant-design-vue';
import './UploadImage.less';

export type FileList = {
  uid: string;
  name: string;
  url?: string;
  response?: any;
  percent?: number;
  rawResource?: File;
  status?: 'loading' | 'done' | 'error' | 'remove';
}[];

type UploadImageProps = {
  action: string;
  accept?: string;
  method?: string;
  maxSize?: number;
  maxCount?: number;
  multiple?: boolean;
  disabled?: boolean;
  fileList?: FileList;
  previewFile?: (url: string) => void;
  headers?: () => { [key: string]: any };
};

type UploadImageEmits = {
  (e: 'error', error: any): void;
  (e: 'update:fileList', fileList: FileList): void;
};

const props = withDefaults(defineProps<UploadImageProps>(), {
  accept: 'image/*',
});
const emit = defineEmits<UploadImageEmits>();
defineOptions({ name: 'UploadImage' });
const _fileList = ref<FileList>([]);
const inputRef = ref<HTMLInputElement>();
const uploadButtonRef = ref<HTMLLIElement>();

const previewIdx = ref<number>(0);
const previewImgs = ref<string[]>([]);
const showPreviewImage = ref(false);

watch(
  () => props.fileList,
  () => {
    if (props.fileList === _fileList.value) return;

    _fileList.value = props.fileList!;
  },
  { immediate: true },
);

function handleFileChange(event: any) {
  let newFiles: File[] = Array.from(event.target.files);
  // 需要每次都将 input.value 给清空，这样用户再次上传时就可以选择相同的文件了。
  inputRef.value!.value = '';

  if (props.maxCount && _fileList.value.length >= props.maxCount) return;

  if (props.maxSize) {
    let length = newFiles.length;
    while (length--) {
      const file = newFiles[length];
      if (file.size > props.maxSize!) {
        newFiles.splice(length, 1);
        message.warning(file.name + '文件过大无法上传！');
      }
    }

    if (newFiles.length <= 0) return;
  }

  if (props.maxCount) {
    const rest = props.maxCount - _fileList.value.length;
    rest < newFiles.length && message.warning(`最多只能上传${props.maxCount}个文件！`);
    newFiles = newFiles.slice(0, rest);
  }

  const newFileList = newFiles.map((file) => ({
    percent: 0,
    name: file.name,
    rawResource: file,
    status: 'loading' as FileList[number]['status'],
    uid: Math.random().toString(32).slice(2) + Date.now(),
  }));

  _fileList.value.push(...newFileList);
  triggerUpdateFileList();
  // 需要每次都将 input.value 给清空，这样用户再次上传时就可以选择相同的文件了。
  inputRef.value!.value = '';

  if (!props.maxCount || _fileList.value.length < props.maxCount) {
    // 每次上传时，给上传按钮一个向右移动的动效。
    uploadButtonRef.value!.classList.add('enter-from');
    requestAnimationFrame(() => uploadButtonRef.value!.classList.remove('enter-from'));
  }
}

function handleClick() {
  inputRef.value?.click();
}

// 图片上传成功
function handleUploadSuccess(uid: string, res: any) {
  const target = _fileList.value.find((file) => file.uid === uid);
  if (target) {
    target.status = 'done';
    target.percent = 100;
    target.response = res;
    triggerUpdateFileList();
  }
}

// 图片上传失败
function handleUploadError(uid: string, error: any) {
  emit('error', error);
  const target = _fileList.value.find((file) => file.uid === uid);
  if (target) {
    target.status = 'error';
    triggerUpdateFileList();
  }
}

// 移除
function handleRemoveItem(uid: string) {
  _fileList.value = _fileList.value.filter((file) => file.uid !== uid);
  triggerUpdateFileList();
}

function handlePreviewImage(url: string) {
  if (props.previewFile) {
    props.previewFile(url);
  } else {
    previewImgs.value = [url];
    showPreviewImage.value = true;
  }
}

// 触发 'update:fileList' 事件
function triggerUpdateFileList() {
  nextTick(() => emit('update:fileList', _fileList.value));
}
</script>

<template>
  <div class="qm-vnit-upload-image">
    <ul :class="['qm-vnit-upload-image-list']">
      <template v-for="file in _fileList" :key="file.uid">
        <RenderItem
          v-bind="file"
          :metod="method"
          :action="action"
          :headers="headers"
          :disabled="disabled"
          @error="handleUploadError"
          @remove="handleRemoveItem"
          @preview="handlePreviewImage"
          @success="handleUploadSuccess"
        >
          <template #itemRender="{ src }">
            <slot name="itemRender" :src="src" />
          </template>
        </RenderItem>
      </template>
      <li
        v-show="!maxCount || _fileList.length < maxCount"
        ref="uploadButtonRef"
        :class="['qm-vnit-upload-image-label', { disabled }]"
        @click="handleClick"
      >
        <slot name="default">
          <div class="qm-vnit-upload-image-slot">
            <PlusOutlined style="font-size: 16px; margin-bottom: 10px; color: rgba(0, 0, 0, 0.8)" />
            <div>上传图片</div>
          </div>
        </slot>
        <input
          ref="inputRef"
          type="file"
          style="display: none"
          :accept="accept"
          :disabled="disabled"
          :multiple="multiple"
          @change="handleFileChange"
        />
      </li>
    </ul>
  </div>
  <template v-if="!previewFile">
    <Teleport to="body">
      <PreviewImage
        :pageSize="1"
        :imgs="previewImgs"
        :index="previewIdx"
        :open="showPreviewImage"
        @close="showPreviewImage = !showPreviewImage"
      />
    </Teleport>
  </template>
</template>
