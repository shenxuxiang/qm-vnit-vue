<script setup lang="ts">
import Image from "../Image";
import "./ImagePreviewGroup.less";
import PreviewImage from "../PreviewImage";
import { ref, computed, CSSProperties, VNode } from "vue";

export type ImageGroupSlots = { default: () => Array<VNode> };
export type ImageGroupProps = {
  class?: string;
  bordered?: boolean;
  options?: string[];
  style?: string | CSSProperties;
};

const slots = defineSlots<ImageGroupSlots>();
defineOptions({ inheritAttrs: false, name: "ImagePreviewGroup" });
const props = withDefaults(defineProps<ImageGroupProps>(), { bordered: true });

const indicator = ref(0);
const className = props.class;
const showPreview = ref(false);
const children = computed(() => slots.default?.() ?? []);
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
  <ul class="qm-vnit-image-group">
    <template v-if="options">
      <li
        v-for="(item, index) in options"
        :key="index"
        :style="style"
        :class="['qm-vnit-image-group-item', className, { bordered }]"
        @click="handlePreview(index)"
      >
        <Image :src="item" />
      </li>
    </template>
    <template v-else-if="children">
      <li
        v-for="(item, index) in children"
        :key="index"
        :style="style"
        :class="['qm-vnit-image-group-item', className, { bordered }]"
        @click="handlePreview(index)"
      >
        <component :is="item" v-bind="item.props"></component>
      </li>
    </template>
  </ul>
  <Teleport to="body">
    <PreviewImage
      :imgs="imgs"
      :index="indicator"
      :open="showPreview"
      @close="showPreview = false"
    />
  </Teleport>
</template>
