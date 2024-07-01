<script setup lang="ts">
import { ref } from 'vue';
import { Button } from 'ant-design-vue';
import { NavigationBar } from '@/library';
import type { NavBarList } from '@/library/NavigationBar';

const navBarList = ref<NavBarList>([
  { key: '111', label: '农业一张图' },
  { key: '222', label: '理赔数据导入' },
  { key: '333', label: '承保数据导入' },
  { key: '444', label: '数据接受日志' },
  { key: '555', label: '合规保单查询' },
  { key: '666', label: '存疑保单查询' },
  { key: '777', label: '数据统计' },
  { key: '888', label: '承保区域分析' },
  { key: '999', label: '用户管理' },
  { key: 'xxx', label: '角色管理' },
  { key: 'yyy', label: '字典管理' },
  { key: 'zzz', label: '系统日志管理' },
]);
const activeKey = ref('111');

function onChange(key: string) {
  activeKey.value = key;
}
function onDelete(newNavBarList: NavBarList) {
  navBarList.value = newNavBarList;
}
function onAdd() {
  navBarList.value.push({ key: Math.random().toString(32).slice(2), label: Math.random().toString(32).slice(2) });
}
</script>

<template>
  <Button @click="onAdd">添加</Button>
  <div class="box">
    <NavigationBar :navBarList="navBarList" :activeKey="activeKey" @change="onChange" @delete="onDelete" />
  </div>
</template>

<style lang="less">
.box {
  width: 100%;
  background: #fff;
  margin-top: 20px;
}
.qm-navbar-content-list.qm-navbar-content-list {
  list-style: none;
  margin: 5px 0 0;
  padding: 0;
}
.qm-navbar-content-list-item + .qm-navbar-content-list-item,
.qm-navbar-content-list-item + .qm-navbar-indicator {
  margin-top: 0;
}
</style>
