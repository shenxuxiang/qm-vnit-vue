<script setup lang="ts">
import getTransformProperties from '@/utils/getTransformProperties';
import Icon from '../Icon';
import './ToolBar.less';

type PreviewImageProps = {
  imageElement: HTMLImageElement;
};

type PreviewImageEvents = (e: 'close', event: any) => void;

const props = withDefaults(defineProps<PreviewImageProps>(), {});
defineEmits<PreviewImageEvents>();
// Y轴镜像
function handleMirrorY() {
  const { scaleX, scaleY, rotate } = getTransformProperties(props.imageElement!);
  props.imageElement!.style.cssText = `transform: scale(${scaleX}, ${scaleY * -1}) rotate(${rotate}deg);`;
}
// X轴镜像
function handleMirrorX() {
  const { scaleX, scaleY, rotate } = getTransformProperties(props.imageElement!);
  props.imageElement!.style.cssText = `transform: scale(${scaleX * -1}, ${scaleY}) rotate(${rotate}deg);`;
}
// 缩小
function handleShrink() {
  const { scaleX, scaleY, rotate } = getTransformProperties(props.imageElement!);

  let x = scaleX * 0.8;
  let y = scaleY * 0.8;
  if (Math.abs(x) < 1) x = Math.sign(x);
  if (Math.abs(y) < 1) y = Math.sign(y);

  props.imageElement!.style.cssText = `transform: scale(${x}, ${y}) rotate(${rotate}deg);`;
}
// 放大
function handleEnlarge() {
  const { scaleX, scaleY, rotate } = getTransformProperties(props.imageElement!);
  props.imageElement!.style.cssText = `transform: scale(${scaleX * 1.25}, ${scaleY * 1.25}) rotate(${rotate}deg);`;
}
// 顺时针旋转
function handleRotateLeft() {
  const { scaleX, scaleY, rotate } = getTransformProperties(props.imageElement!);
  props.imageElement!.style.cssText = `transform: scale(${scaleX}, ${scaleY}) rotate(${rotate + 90}deg);`;
}
// 逆时针旋转
function handleRotateRight() {
  const { scaleX, scaleY, rotate } = getTransformProperties(props.imageElement!);
  props.imageElement!.style.cssText = `transform: scale(${scaleX}, ${scaleY}) rotate(${rotate - 90}deg);`;
}
</script>

<template>
  <div class="qm-vnit-preview-image-header">
    <Icon
      name="swap-outline"
      style="transform: rotate(90deg)"
      class="qm-vnit-preview-image-icon"
      @click="handleMirrorY"
    />
    <Icon name="swap-outline" class="qm-vnit-preview-image-icon" @click="handleMirrorX" />
    <Icon name="rotate-left" class="qm-vnit-preview-image-icon" @click="handleRotateRight" />
    <Icon name="rotate-right" class="qm-vnit-preview-image-icon" @click="handleRotateLeft" />
    <Icon name="minus-circle" class="qm-vnit-preview-image-icon" @click="handleShrink" />
    <Icon name="plus-circle" class="qm-vnit-preview-image-icon" @click="handleEnlarge" />
    <Icon name="close" class="qm-vnit-preview-image-icon" @click="$emit('close', $event)" />
  </div>
</template>
