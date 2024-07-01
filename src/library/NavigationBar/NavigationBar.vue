<script setup lang="ts">
import './index.less';
import { Dropdown, Menu } from 'ant-design-vue';
import { debounce, elementMatches } from '@/utils';
import { ref, watch, onMounted, shallowRef, onBeforeUnmount } from 'vue';
import { CloseOutlined, EllipsisOutlined, AppstoreOutlined } from '@ant-design/icons-vue';

export type NavBarList = Array<{
  key: string;
  label: string;
  [propName: string]: any;
}>;
type NavBarProps = {
  activeKey: string;
  navBarList: NavBarList;
};
type NavBarEmits = {
  change: [activeKey: string];
  delete: [navBarList: NavBarList];
};

const props = withDefaults(defineProps<NavBarProps>(), {});
const emits = defineEmits<NavBarEmits>();
defineOptions({ name: 'NavigationBar' });
/**
 * @param renderKey          当 window resize 事件触发时，修改 renderKey，触发组件的重新渲染
 * @param nonSliding         是否不可滑动，当容器长度大于导航栏长度时，不可滑动
 * @param navBarRef          导航栏
 * @param toolBarRef         工具栏
 * @param indicatorNodeRef   指示器节点
 * @param hiddenNavBarList   被隐藏起来的导航项列表
 * @param navBarContainerRef 导航栏容器
 */
const renderKey = ref('');
const nonSliding = ref(true);
const navBarRef = shallowRef<HTMLLabelElement>();
const toolbarRef = shallowRef<HTMLLabelElement>();
const indicatorNodeRef = shallowRef<HTMLElement>();
const hiddenNavBarList = shallowRef<NavBarList>([]);
const navBarContainerRef = shallowRef<HTMLElement>();
/**
 * 这几项数据不需要设置为响应式的，把它们当作全局变量即可。
 * @param translateX            导航栏的偏移量
 * @param maximumOffsetDistance 导航栏的最大偏移量
 * @param navBarItemsClientRect 记录每个导航项的初始位置 [{ offsetLeft, offsetWidth }]
 */
let translateX = 0;
let maximumOffsetDistance = 0;
let navBarItemsClientRect: { offsetWidth: number; offsetLeft: number }[] = [];
const onWindowResize = debounce(() => {
  renderKey.value = Math.random().toString(32).slice(2);
}, 200);

onMounted(() => {
  window.addEventListener('resize', onWindowResize, false);

  watch(
    [() => props.navBarList, renderKey],
    () => {
      const children = document.querySelectorAll('.qm-navbar-content-list-item');
      navBarItemsClientRect = [];
      for (let i = 0; i < children.length; i++) {
        const { offsetWidth, offsetLeft } = children[i] as HTMLElement;
        navBarItemsClientRect.push({ offsetWidth, offsetLeft });
      }

      // navBar 长度
      const navBarWidth = navBarContainerRef.value!.scrollWidth;
      // 当 navBar 的长度小于容器长度时，navBar 不可滑动。
      nonSliding.value = navBarWidth <= navBarContainerRef.value!.offsetWidth;
      // 更新 toolbarRef 的长度。
      toolbarRef.value!.style.cssText = nonSliding.value ? 'width: 80px' : 'width: 110px';
      // 注意，由于我们更新了 toolbarRef 长度，所以应该重新获取 navBarContainer 的长度；
      // 这样计算出的 maximumOffsetDistance 才是正确的。
      maximumOffsetDistance = navBarWidth - navBarContainerRef.value!.offsetWidth;
      updateIndicatorPosition();
      if (nonSliding.value) {
        translateX = 0;
        navBarRef.value!.style.cssText = `transform: translateX(0px)`;
        navBarContainerRef.value?.classList.remove('qm-navbar-content-left-shadow');
        navBarContainerRef.value?.classList.remove('qm-navbar-content-right-shadow');
      } else {
        if (translateX >= maximumOffsetDistance) {
          translateX = maximumOffsetDistance;
          navBarRef.value!.style.cssText = `transform: translateX(${-maximumOffsetDistance}px)`;
          navBarContainerRef.value?.classList.add('qm-navbar-content-left-shadow');
          navBarContainerRef.value?.classList.remove('qm-navbar-content-right-shadow');
        } else if (translateX > 0) {
          updateNavBarPosition();
        } else {
          navBarContainerRef.value?.classList.remove('qm-navbar-content-left-shadow');
          navBarContainerRef.value?.classList.add('qm-navbar-content-right-shadow');
        }
      }
    },
    { immediate: true, flush: 'post', deep: true },
  );

  watch(
    [() => props.activeKey, renderKey],
    () => {
      updateIndicatorPosition();
      if (nonSliding.value) return;
      updateNavBarPosition();
    },
    { immediate: true, flush: 'post' },
  );
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize, false);
});

function handleClickNavBar(event: MouseEvent) {
  let element = event.target as HTMLElement;
  let isDeleteAction = false;
  while (element) {
    if (elementMatches(element, '.qm-navbar-content-list-item')) break;
    if (elementMatches(element, '.qm-navbar-item-close-icon')) isDeleteAction = true;
    element = element.parentNode as HTMLElement;
  }
  const key = element.getAttribute('data-key')!;
  const index = Number(element.getAttribute('data-indicator')!);

  if (isDeleteAction) {
    const navBarList = props.navBarList;
    emits(
      'delete',
      navBarList.filter((item) => item.key !== key),
    );
    // 如果删除的是当前选中的，则需要更新 activeKey。否则不需要更新。
    if (props.activeKey === key) {
      emits('change', index === navBarList.length - 1 ? navBarList[index - 1].key : navBarList[index + 1].key);
    }
  } else {
    emits('change', key);
  }
}

// 当鼠标移入 <EllipsisOutlined /> 组件时触发
function handleMouseEnterOthersIcon() {
  const navBarContainerWidth = navBarContainerRef.value!.offsetWidth;

  const list: NavBarList = [];
  if (translateX <= 0) {
    for (let i = 0; i < navBarItemsClientRect.length; i++) {
      const { offsetWidth, offsetLeft } = navBarItemsClientRect[i];
      if (offsetLeft + offsetWidth > navBarContainerWidth) list.push(props.navBarList[i]);
    }
  } else {
    for (let i = 0; i < navBarItemsClientRect.length; i++) {
      const { offsetWidth, offsetLeft } = navBarItemsClientRect[i];
      if (offsetLeft < translateX) {
        list.push(props.navBarList[i]);
      } else if (navBarContainerWidth + translateX < offsetLeft + offsetWidth) {
        list.push(props.navBarList[i]);
      }
    }
  }

  hiddenNavBarList.value = list;
}

function handleMouseWheel(event: WheelEvent) {
  if (nonSliding.value) return;

  event.preventDefault();
  const { deltaY } = event;
  let distance = 0;

  if (deltaY > 0) {
    if (translateX >= maximumOffsetDistance) return;
    distance = translateX + 100;

    if (distance >= maximumOffsetDistance) {
      translateX = maximumOffsetDistance;
      navBarRef.value!.style.cssText = `transform: translateX(${-translateX}px)`;
      navBarContainerRef.value?.classList.add('qm-navbar-content-left-shadow');
      navBarContainerRef.value?.classList.remove('qm-navbar-content-right-shadow');
    } else {
      translateX = distance;
      navBarRef.value!.style.cssText = `transform: translateX(${-translateX}px)`;
      navBarContainerRef.value?.classList.add('qm-navbar-content-left-shadow');
      navBarContainerRef.value?.classList.add('qm-navbar-content-right-shadow');
    }
  } else if (deltaY < 0) {
    if (translateX <= 0) return;

    distance = translateX - 100;

    if (distance <= 0) {
      translateX = 0;
      navBarRef.value!.style.cssText = `transform: translateX(0px)`;
      navBarContainerRef.value?.classList.remove('qm-navbar-content-left-shadow');
      navBarContainerRef.value?.classList.add('qm-navbar-content-right-shadow');
    } else {
      translateX = distance;
      navBarRef.value!.style.cssText = `transform: translateX(${-distance}px)`;
      navBarContainerRef.value?.classList.add('qm-navbar-content-left-shadow');
      navBarContainerRef.value?.classList.add('qm-navbar-content-right-shadow');
    }
  }
}

// 关闭其他
function handleCloseOthers() {
  emits(
    'delete',
    props.navBarList.filter((item, index) => index === 0 || item.key === props.activeKey),
  );
}

// 关闭所有
function handleCloseAll() {
  emits('delete', props.navBarList.slice(0, 1));
  emits('change', props.navBarList[0].key);
}

// 点击下拉菜单选项
function handleClickDropdownMenuItem(event: MouseEvent) {
  const key = (event.currentTarget as HTMLElement).getAttribute('data-key');
  if (key) emits('change', key);
}

// 删除下拉菜单选项
function handleDeleteDropdownMenuItem(event: MouseEvent) {
  const key = (event.currentTarget as HTMLElement).getAttribute('data-key');
  if (key)
    emits(
      'delete',
      props.navBarList.filter((item) => item.key !== key),
    );
}

// 更新指针的位置
function updateIndicatorPosition() {
  const index = props.navBarList.findIndex((item) => item.key === props.activeKey);
  const { offsetLeft, offsetWidth } = navBarItemsClientRect[index];
  indicatorNodeRef.value!.style.cssText = `width: ${offsetWidth}px; transform: translateX(${offsetLeft}px)`;
}

// 更新导航栏的位置
function updateNavBarPosition() {
  const navBarContainerWidth = navBarContainerRef.value!.offsetWidth;

  // 边界下标
  let boundaryIndex = 0;
  for (let i = 0; i < navBarItemsClientRect.length; i++) {
    const { offsetWidth, offsetLeft } = navBarItemsClientRect[i];
    if (offsetWidth + offsetLeft > navBarContainerWidth) {
      boundaryIndex = i - 2;
      break;
    }
  }
  // 边界距离
  const boundaryDistance = navBarItemsClientRect[boundaryIndex].offsetLeft;
  const currentIndex = props.navBarList.findIndex((item) => item.key === props.activeKey);

  if (currentIndex > boundaryIndex) {
    let x = navBarItemsClientRect[currentIndex].offsetLeft - boundaryDistance;

    if (x >= maximumOffsetDistance) {
      x = maximumOffsetDistance;
      navBarContainerRef.value?.classList.add('qm-navbar-content-left-shadow');
      navBarContainerRef.value?.classList.remove('qm-navbar-content-right-shadow');
    } else {
      navBarContainerRef.value?.classList.add('qm-navbar-content-left-shadow');
      navBarContainerRef.value?.classList.add('qm-navbar-content-right-shadow');
    }
    translateX = x;
    navBarRef.value!.style.cssText = `transform: translateX(${-x}px)`;
  } else {
    translateX = 0;
    navBarRef.value!.style.cssText = `transform: translateX(0px)`;
    navBarContainerRef.value?.classList.remove('qm-navbar-content-left-shadow');
    navBarContainerRef.value?.classList.add('qm-navbar-content-right-shadow');
  }
}
</script>

<template>
  <section class="qm-navbar">
    <div ref="navBarContainerRef" class="qm-navbar-content" @wheel="handleMouseWheel">
      <ul ref="navBarRef" class="qm-navbar-content-list" @click="handleClickNavBar">
        <li
          v-for="(item, index) in navBarList"
          :key="item.key"
          class="qm-navbar-content-list-item"
          :class="{ active: item.key === activeKey }"
          :data-indicator="index"
          :data-key="item.key"
        >
          {{ item.label }}
          <CloseOutlined v-if="index > 0" class="qm-navbar-item-close-icon" />
        </li>
        <li ref="indicatorNodeRef" class="qm-navbar-indicator" />
      </ul>
    </div>
    <div ref="toolbarRef" class="qm-navbar-toolbar">
      <Dropdown placement="bottom">
        <EllipsisOutlined
          :class="['qm-navbar-toolbar-others', { hide: nonSliding }]"
          @mouseenter="handleMouseEnterOthersIcon"
        />
        <template #overlay>
          <Menu>
            <Menu.Item v-for="item in hiddenNavBarList" :key="item.key">
              <div className="qm-navbar-toolbar-others-dropdown-item">
                <div
                  class="qm-navbar-toolbar-others-dropdown-item-title"
                  :data-key="item.key"
                  @click="handleClickDropdownMenuItem"
                >
                  {{ item.label }}
                </div>
                <CloseOutlined
                  class="qm-navbar-toolbar-others-dropdown-item-close-icon"
                  :style="{ display: item.key === navBarList[0].key ? 'none' : '' }"
                  :data-key="item.key"
                  @click="handleDeleteDropdownMenuItem"
                />
              </div>
            </Menu.Item>
          </Menu>
        </template>
      </Dropdown>

      <Dropdown placement="bottom">
        <AppstoreOutlined class="qm-navbar-toolbar-appstore" />
        <template #overlay>
          <Menu>
            <Menu.Item>
              <span @click="handleCloseOthers">关闭其他</span>
            </Menu.Item>
            <Menu.Item>
              <span @click="handleCloseAll">关闭所有</span>
            </Menu.Item>
          </Menu>
        </template>
      </Dropdown>
    </div>
  </section>
</template>
