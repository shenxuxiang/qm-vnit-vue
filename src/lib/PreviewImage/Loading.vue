<script setup lang="ts">
import { computed } from "vue";
import './Loading.less';

type LoadingProps = {
  open: boolean;
  theme?: "light" | "dark" | string;
  size?: "default" | "large" | "small";
};

const props = withDefaults(defineProps<LoadingProps>(), {
  theme: "light",
  size: "default",
});

const dotColor = computed(() => {
  switch (props.theme) {
    case "light":
      return "#f2f2f2";
    case "dark":
      return "#b3b3b3";
    default:
      return props.theme;
  }
});
</script>

<template>
  <transition name="qm-vnit-loading">
    <div v-show="open" :class="['qm-vnit-loading', size]">
      <template v-for="n in 6" :key="n">
        <div class="qm-vnit-loading-dot" :style="{ background: dotColor }" />
      </template>
    </div>
  </transition>
</template>
