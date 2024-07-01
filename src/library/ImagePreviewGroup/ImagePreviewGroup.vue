<script setup lang="ts">
import { ref, computed, watch, h } from 'vue';
import PreviewImage from '../PreviewImage';
import './ImagePreviewGroup.less';
import type { VNode } from 'vue';
import Image from '../Image';

export type ImageGroupSlots = { default: () => Array<VNode> };
export type ImageGroupProps = {
  imageClass?: string;
  bordered?: boolean;
  options?: string[];
};

const props = withDefaults(defineProps<ImageGroupProps>(), { bordered: true });

defineOptions({ name: 'ImagePreviewGroup', inheritAttrs: false });

const slots = defineSlots<ImageGroupSlots>();
const indicator = ref(0);
const showPreview = ref(false);
const children = ref<VNode[]>([]);

watch(
  () => slots.default?.(),
  () => {
    const newChildren: VNode[] = [];
    slots.default?.().forEach((item: VNode) => {
      // 注意，slotsDefualt 返回的是一个数组，所以需要遍历，
      // 判断第一层的所有节点的 type 是否是文档碎片（fragment）,如果是，则说明使用的 template 模板嵌套，此时应该取它的 children。
      if (item.type === Symbol.for('v-fgt')) {
        (item.children as VNode[])?.forEach?.((child) => newChildren.push(h(child)));
      }
    });

    children.value = newChildren;
  },
  { immediate: true },
);

const imgs = computed(() => {
  if (slots.default?.()) {
    return children.value.map((item) => item.props!.src);
  } else {
    return props.options!;
  }
});

function handlePreview(index: number) {
  indicator.value = index;
  showPreview.value = true;
}
</script>

<template>
  <ul class="qm-vnit-image-group" :class="$attrs.class" :style="$attrs.style">
    <template v-if="options">
      <li
        v-for="(item, index) in options"
        :key="index"
        :class="['qm-vnit-image-group-item', { bordered }]"
        @click="handlePreview(index)"
      >
        <Image :src="item" :class="imageClass" />
      </li>
    </template>
    <template v-else-if="children">
      <li
        v-for="(item, index) in children"
        :key="index"
        :class="['qm-vnit-image-group-item', { bordered }]"
        @click="handlePreview(index)"
      >
        <component :is="item" :class="imageClass"></component>
      </li>
    </template>
  </ul>
  <Teleport to="body">
    <PreviewImage :imgs="imgs" :index="indicator" :open="showPreview" @close="showPreview = false" />
  </Teleport>
</template>
