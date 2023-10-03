<script setup lang="ts">
  import { toRef } from "vue";
  import "./font/iconfont.css";
  import type { CSSProperties } from "vue";

  type IconProps = {
    name: string;
    class?: string;
    style?: string | CSSProperties;
  };

  defineOptions({ inheritAttrs: false });
  const props = withDefaults(defineProps<IconProps>(), {});

  const className = toRef(props, 'class');
</script>

<template>
  <i 
    v-bind="$attrs"
    :style="style"
    :class="`qm-vnit-iconfont qm-vnit-icon-${name}${className ? ' ' + className : ''}`"
  />
</template>
