<script setup lang="ts">
import { ref, watch, computed, watchEffect } from "vue";
import getTransformProperties from "@/utils/getTransformProperties";
import Image from "@/lib/Image";
import Icon from "@/lib/Icon";
import './Slider.less';

type PreviewImageProps = {
  open: boolean;
  imgs: string[];
  pageSize: number;
  indicator: number;
};

type PreviewImageEvents = (e: "update:indicator", indicator: number) => void;

const props = withDefaults(defineProps<PreviewImageProps>(), {});
const emit = defineEmits<PreviewImageEvents>();
const sliderRef = ref<HTMLDivElement>();
const isFirstPage = ref(false);
const isLastPage = ref(false);

// 底部 bar 的宽度
const foodBarWidth = computed(() => {
  if (props.imgs.length < props.pageSize) {
    return props.imgs.length * 120 + 68 + "px";
  } else {
    return props.pageSize * 120 + 68 + "px";
  }
});

watch(
  [
    () => props.open,
    () => props.imgs,
    () => props.pageSize,
    () => props.indicator,
  ],
  sliderAnimation,
);

// 计算 isFirstPage、isLastPage
watchEffect(() => {
  const { imgs, pageSize, indicator } = props;
  if (imgs.length <= pageSize) {
    isFirstPage.value = true;
    isLastPage.value = true;
    return;
  }

  if (indicator <= pageSize / 2) {
    isFirstPage.value = true;
    isLastPage.value = false;
  } else if (indicator > imgs.length - pageSize / 2) {
    isFirstPage.value = false;
    isLastPage.value = true;
  } else {
    isFirstPage.value = false;
    isLastPage.value = false;
  }
});

function sliderAnimation() {
  if (!sliderRef.value || !props.open) return;

  const { imgs, pageSize, indicator } = props;
  const idx = indicator + 1;
  const length = imgs.length;

  // 如果 imgs 的长度小于 pageSize 则不需要滑动动效（偏移量始终都是 0）。
  if (length <= pageSize) {
    sliderRef.value!.style.cssText = `
        transform: translate3d(0px, 0px, 0px);
        transition: transform 0s ease;
      `;
    return;
  }

  let cssText = "";
  const half = pageSize / 2;

  if (idx <= half) {
    cssText = `transform: translate3d(0px, 0px, 0px); transition: transform 0.3s ease;`;
  } else if (idx > length - half) {
    cssText = `transform: translate3d(${
      (pageSize - length) * 120
    }px, 0px, 0px); transition: transform 0.3s ease;`;
  } else {
    const distance = -(idx - half - 0.5) * 120;
    cssText = `transform: translate3d(${distance}px, 0px, 0px); transition: transform 0.3s ease;`;
  }

  sliderRef.value!.style.cssText = cssText;
}

function handleChangeIndicator(index: number) {
  emit("update:indicator", index);
}

// 上一页
function handlePrevPage() {
  // 第一页
  if (isFirstPage.value) return;
  isLastPage.value = false;

  const { translateX } = getTransformProperties(sliderRef.value!);
  let distance = translateX + props.pageSize * 120;
  if (distance >= 0) {
    distance = 0;
    isFirstPage.value = true;
  } else {
    isFirstPage.value = false;
  }
  sliderRef.value!.style.cssText = `transform: translate3d(${distance}px, 0px, 0px); transition: transform 0.3s ease;`;
}

// 下一页
function handleNextPage() {
  // 最后一页
  if (isLastPage.value) return;
  isFirstPage.value = false;

  const { translateX } = getTransformProperties(sliderRef.value!);
  const max = (props.imgs.length - props.pageSize) * 120;

  let distance = translateX - props.pageSize * 120;
  if (distance <= -max) {
    distance = -max;
    isLastPage.value = true;
  } else {
    isLastPage.value = false;
  }
  sliderRef.value!.style.cssText = `transform: translate3d(${distance}px, 0px, 0px); transition: transform 0.3s ease;`;
}
</script>

<template>
  <div class="qm-vnit-preview-image-bar" :style="{ width: foodBarWidth }">
    <div
      :class="['qm-vnit-preview-image-prevpage', { disabled: isFirstPage }]"
      @click="handlePrevPage"
    >
      <Icon name="arrow-left-bold" style="font-size: 30px" />
    </div>
    <div
      :class="['qm-vnit-preview-image-nextpage', { disabled: isLastPage }]"
      @click="handleNextPage"
    >
      <Icon name="arrow-right-bold" style="font-size: 30px" />
    </div>
    <div class="qm-vnit-preview-image-bar-slider-x">
      <ul ref="sliderRef" class="qm-vnit-preview-image-bar-slider">
        <template v-for="(item, index) in imgs" :key="item + index">
          <li
            :class="[
              'qm-vnit-preview-image-bar-slider-item',
              { active: index === indicator },
            ]"
            @click="handleChangeIndicator(index)"
          >
            <Image :src="item" alt="" />
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
