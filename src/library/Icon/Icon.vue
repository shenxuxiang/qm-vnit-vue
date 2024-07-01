<script setup lang="ts">
import './font/iconfont.css';

defineProps<{ name: string }>();
defineOptions({ name: 'Icon' });
</script>

<template>
  <i :class="`qm-vnit-iconfont qm-vnit-icon-${name}`" />
</template>
