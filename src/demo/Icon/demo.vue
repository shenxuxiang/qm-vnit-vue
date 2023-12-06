<script setup lang="ts">
import { Icon } from '@/library';
</script>

<template>
  <div class="icon-group">
    <div class="icon-item">
      <Icon name="image" style="font-size: 60px; line-height: 1" />
    </div>
    <div class="icon-item">
      <Icon name="backtop" style="font-size: 60px; line-height: 1" />
    </div>
    <div class="icon-item">
      <Icon name="minus-circle" style="font-size: 60px; line-height: 1" />
    </div>
    <div class="icon-item">
      <Icon name="plus-circle" style="font-size: 60px; line-height: 1" />
    </div>
    <div class="icon-item">
      <Icon name="close" style="font-size: 60px; line-height: 1" />
    </div>
    <div class="icon-item">
      <Icon name="rotate-left" style="font-size: 60px; line-height: 1" />
    </div>
    <div class="icon-item">
      <Icon name="rotate-right" style="font-size: 60px; line-height: 1" />
    </div>
    <div class="icon-item">
      <Icon name="swap-outline" style="font-size: 60px; line-height: 1" />
    </div>
    <div class="icon-item">
      <Icon name="arrow-left-bold" style="font-size: 60px; line-height: 1" />
    </div>
    <div class="icon-item">
      <Icon name="arrow-right-bold" style="font-size: 60px; line-height: 1" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.icon-group {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
}
.icon-item {
  margin: 0 20px 20px 0;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: #fff;
}
</style>
