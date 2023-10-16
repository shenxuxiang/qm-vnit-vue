<script setup lang="ts">
import { toRef } from 'vue';
import './font/iconfont.css';
import type { CSSProperties } from 'vue';

type IconProps = {
  name: string;
  class?: string;
  style?: string | CSSProperties;
};

const props = withDefaults(defineProps<IconProps>(), {});
defineOptions({ name: 'Icon', inheritAttrs: false });
const className = toRef(props, 'class');
</script>

<template>
  <i
    v-bind="$attrs"
    :style="style"
    :class="`qm-vnit-iconfont qm-vnit-icon-${name}${className ? ' ' + className : ''}`"
  />
</template>
