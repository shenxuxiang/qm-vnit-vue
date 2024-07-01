import { defineComponent, ref, shallowRef, onMounted, watch, onBeforeUnmount, openBlock, createElementBlock, createElementVNode, Fragment, renderList, normalizeClass, createTextVNode, toDisplayString, createBlock, unref, createCommentVNode, createVNode, withCtx, normalizeStyle } from 'vue';
import './index.css';
import { Dropdown, Menu } from 'ant-design-vue';
import { debounce, elementMatches } from '../utils/index.js';
import CloseOutlined from '@ant-design/icons-vue/CloseOutlined';
import EllipsisOutlined from '@ant-design/icons-vue/EllipsisOutlined';
import AppstoreOutlined from '@ant-design/icons-vue/AppstoreOutlined';

const _hoisted_1 = { class: "qm-navbar" };
const _hoisted_2 = ["data-indicator", "data-key"];
const _hoisted_3 = { className: "qm-navbar-toolbar-others-dropdown-item" };
const _hoisted_4 = ["data-key"];
var script = /*#__PURE__*/ defineComponent({
    ...{ name: 'NavigationBar' },
    __name: 'NavigationBar',
    props: {
        activeKey: { type: String, required: true },
        navBarList: { type: Array, required: true }
    },
    emits: ["change", "delete"],
    setup(__props, { emit: emits }) {
        const props = __props;
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
        const navBarRef = shallowRef();
        const toolbarRef = shallowRef();
        const indicatorNodeRef = shallowRef();
        const hiddenNavBarList = shallowRef([]);
        const navBarContainerRef = shallowRef();
        /**
         * 这几项数据不需要设置为响应式的，把它们当作全局变量即可。
         * @param translateX            导航栏的偏移量
         * @param maximumOffsetDistance 导航栏的最大偏移量
         * @param navBarItemsClientRect 记录每个导航项的初始位置 [{ offsetLeft, offsetWidth }]
         */
        let translateX = 0;
        let maximumOffsetDistance = 0;
        let navBarItemsClientRect = [];
        const onWindowResize = debounce(() => {
            renderKey.value = Math.random().toString(32).slice(2);
        }, 200);
        onMounted(function () {
            window.addEventListener('resize', onWindowResize, false);
            watch([() => props.navBarList, renderKey], function () {
                const children = document.querySelectorAll('.qm-navbar-content-list-item');
                navBarItemsClientRect = [];
                for (let i = 0; i < children.length; i++) {
                    const { offsetWidth, offsetLeft } = children[i];
                    navBarItemsClientRect.push({ offsetWidth, offsetLeft });
                }
                // navBar 长度
                const navBarWidth = navBarContainerRef.value?.scrollWidth;
                // 当 navBar 的长度小于容器长度时，navBar 不可滑动。
                nonSliding.value = navBarWidth <= navBarContainerRef.value?.offsetWidth;
                // 更新 toolbarRef 的长度。
                toolbarRef.value.style.cssText = nonSliding.value ? 'width: 80px' : 'width: 110px';
                // 注意，由于我们更新了 toolbarRef 长度，所以应该重新获取 navBarContainer 的长度；
                // 这样计算出的 maximumOffsetDistance 才是正确的。
                maximumOffsetDistance = navBarWidth - navBarContainerRef.value?.offsetWidth;
                updateIndicatorPosition();
                if (nonSliding.value) {
                    translateX = 0;
                    navBarRef.value.style.cssText = `transform: translateX(0px)`;
                    navBarContainerRef.value?.classList.remove('qm-navbar-content-left-shadow');
                    navBarContainerRef.value?.classList.remove('qm-navbar-content-right-shadow');
                }
                else {
                    if (translateX >= maximumOffsetDistance) {
                        translateX = maximumOffsetDistance;
                        navBarRef.value.style.cssText = `transform: translateX(${-maximumOffsetDistance}px)`;
                        navBarContainerRef.value?.classList.add('qm-navbar-content-left-shadow');
                        navBarContainerRef.value?.classList.remove('qm-navbar-content-right-shadow');
                    }
                    else if (translateX > 0) {
                        updateNavBarPosition();
                    }
                    else {
                        navBarContainerRef.value?.classList.remove('qm-navbar-content-left-shadow');
                        navBarContainerRef.value?.classList.add('qm-navbar-content-right-shadow');
                    }
                }
            }, { immediate: true, flush: 'post', deep: true });
            watch([() => props.activeKey, renderKey], function () {
                updateIndicatorPosition();
                if (nonSliding.value)
                    return;
                updateNavBarPosition();
            }, { immediate: true, flush: 'post' });
        });
        onBeforeUnmount(function () {
            window.removeEventListener('resize', onWindowResize, false);
        });
        function handleClickNavBar(event) {
            let element = event.target;
            let isDeleteAction = false;
            while (element) {
                if (elementMatches(element, '.qm-navbar-content-list-item'))
                    break;
                if (elementMatches(element, '.qm-navbar-item-close-icon'))
                    isDeleteAction = true;
                element = element.parentNode;
            }
            const key = element.getAttribute('data-key');
            const index = Number(element.getAttribute('data-indicator'));
            if (isDeleteAction) {
                const navBarList = props.navBarList;
                emits('delete', navBarList.filter(item => item.key !== key));
                // 如果删除的是当前选中的，则需要更新 activeKey。否则不需要更新。
                if (props.activeKey === key) {
                    emits('change', index === navBarList.length - 1 ? navBarList[index - 1].key : navBarList[index + 1].key);
                }
            }
            else {
                emits('change', key);
            }
        }
        // 当鼠标移入 <EllipsisOutlined /> 组件时触发
        function handleMouseEnterOthersIcon() {
            const navBarContainerWidth = navBarContainerRef.value?.offsetWidth;
            const list = [];
            if (translateX <= 0) {
                for (let i = 0; i < navBarItemsClientRect.length; i++) {
                    const { offsetWidth, offsetLeft } = navBarItemsClientRect[i];
                    if (offsetLeft + offsetWidth > navBarContainerWidth)
                        list.push(props.navBarList[i]);
                }
            }
            else {
                for (let i = 0; i < navBarItemsClientRect.length; i++) {
                    const { offsetWidth, offsetLeft } = navBarItemsClientRect[i];
                    if (offsetLeft < translateX) {
                        list.push(props.navBarList[i]);
                    }
                    else if (navBarContainerWidth + translateX < offsetLeft + offsetWidth) {
                        list.push(props.navBarList[i]);
                    }
                }
            }
            hiddenNavBarList.value = list;
        }
        function handleMouseWheel(event) {
            if (nonSliding.value)
                return;
            event.preventDefault();
            const { deltaY } = event;
            let distance = 0;
            if (deltaY > 0) {
                if (translateX >= maximumOffsetDistance)
                    return;
                distance = translateX + 100;
                if (distance >= maximumOffsetDistance) {
                    translateX = maximumOffsetDistance;
                    navBarRef.value.style.cssText = `transform: translateX(${-translateX}px)`;
                    navBarContainerRef.value?.classList.add('qm-navbar-content-left-shadow');
                    navBarContainerRef.value?.classList.remove('qm-navbar-content-right-shadow');
                }
                else {
                    translateX = distance;
                    navBarRef.value.style.cssText = `transform: translateX(${-translateX}px)`;
                    navBarContainerRef.value?.classList.add('qm-navbar-content-left-shadow');
                    navBarContainerRef.value?.classList.add('qm-navbar-content-right-shadow');
                }
            }
            else if (deltaY < 0) {
                if (translateX <= 0)
                    return;
                distance = translateX - 100;
                if (distance <= 0) {
                    translateX = 0;
                    navBarRef.value.style.cssText = `transform: translateX(0px)`;
                    navBarContainerRef.value?.classList.remove('qm-navbar-content-left-shadow');
                    navBarContainerRef.value?.classList.add('qm-navbar-content-right-shadow');
                }
                else {
                    translateX = distance;
                    navBarRef.value.style.cssText = `transform: translateX(${-distance}px)`;
                    navBarContainerRef.value?.classList.add('qm-navbar-content-left-shadow');
                    navBarContainerRef.value?.classList.add('qm-navbar-content-right-shadow');
                }
            }
        }
        // 关闭其他
        function handleCloseOthers() {
            emits('delete', props.navBarList.filter((item, index) => index === 0 || item.key === props.activeKey));
        }
        // 关闭所有
        function handleCloseAll() {
            emits('delete', props.navBarList.slice(0, 1));
            emits('change', props.navBarList[0].key);
        }
        // 点击下拉菜单选项
        function handleClickDropdownMenuItem(event) {
            const key = event.currentTarget.getAttribute('data-key');
            if (key)
                emits('change', key);
        }
        // 删除下拉菜单选项
        function handleDeleteDropdownMenuItem(event) {
            const key = event.currentTarget.getAttribute('data-key');
            if (key)
                emits('delete', props.navBarList.filter(item => item.key !== key));
        }
        // 更新指针的位置
        function updateIndicatorPosition() {
            const index = props.navBarList.findIndex(item => item.key === props.activeKey);
            const { offsetLeft, offsetWidth } = navBarItemsClientRect[index];
            indicatorNodeRef.value.style.cssText = `width: ${offsetWidth}px; transform: translateX(${offsetLeft}px)`;
        }
        // 更新导航栏的位置
        function updateNavBarPosition() {
            const navBarContainerWidth = navBarContainerRef.value?.offsetWidth;
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
            const currentIndex = props.navBarList.findIndex(item => item.key === props.activeKey);
            if (currentIndex > boundaryIndex) {
                let x = navBarItemsClientRect[currentIndex].offsetLeft - boundaryDistance;
                if (x >= maximumOffsetDistance) {
                    x = maximumOffsetDistance;
                    navBarContainerRef.value?.classList.add('qm-navbar-content-left-shadow');
                    navBarContainerRef.value?.classList.remove('qm-navbar-content-right-shadow');
                }
                else {
                    navBarContainerRef.value?.classList.add('qm-navbar-content-left-shadow');
                    navBarContainerRef.value?.classList.add('qm-navbar-content-right-shadow');
                }
                translateX = x;
                navBarRef.value.style.cssText = `transform: translateX(${-x}px)`;
            }
            else {
                translateX = 0;
                navBarRef.value.style.cssText = `transform: translateX(0px)`;
                navBarContainerRef.value?.classList.remove('qm-navbar-content-left-shadow');
                navBarContainerRef.value?.classList.add('qm-navbar-content-right-shadow');
            }
        }
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("section", _hoisted_1, [
                createElementVNode("div", {
                    class: "qm-navbar-content",
                    ref_key: "navBarContainerRef",
                    ref: navBarContainerRef,
                    onWheel: handleMouseWheel
                }, [
                    createElementVNode("ul", {
                        class: "qm-navbar-content-list",
                        onClick: handleClickNavBar,
                        ref_key: "navBarRef",
                        ref: navBarRef
                    }, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.navBarList, (item, index) => {
                            return (openBlock(), createElementBlock("li", {
                                class: normalizeClass(["qm-navbar-content-list-item", { active: item.key === _ctx.activeKey }]),
                                "data-indicator": index,
                                "data-key": item.key,
                                key: item.key
                            }, [
                                createTextVNode(toDisplayString(item.label) + " ", 1 /* TEXT */),
                                (index > 0)
                                    ? (openBlock(), createBlock(unref(CloseOutlined), {
                                        key: 0,
                                        class: "qm-navbar-item-close-icon"
                                    }))
                                    : createCommentVNode("v-if", true)
                            ], 10 /* CLASS, PROPS */, _hoisted_2));
                        }), 128 /* KEYED_FRAGMENT */)),
                        createElementVNode("li", {
                            class: "qm-navbar-indicator",
                            ref_key: "indicatorNodeRef",
                            ref: indicatorNodeRef
                        }, null, 512 /* NEED_PATCH */)
                    ], 512 /* NEED_PATCH */)
                ], 544 /* HYDRATE_EVENTS, NEED_PATCH */),
                createElementVNode("div", {
                    class: "qm-navbar-toolbar",
                    ref_key: "toolbarRef",
                    ref: toolbarRef
                }, [
                    createVNode(unref(Dropdown), { placement: "bottom" }, {
                        overlay: withCtx(() => [
                            createVNode(unref(Menu), null, {
                                default: withCtx(() => [
                                    (openBlock(true), createElementBlock(Fragment, null, renderList(hiddenNavBarList.value, (item) => {
                                        return (openBlock(), createBlock(unref(Menu).Item, {
                                            key: item.key
                                        }, {
                                            default: withCtx(() => [
                                                createElementVNode("div", _hoisted_3, [
                                                    createElementVNode("div", {
                                                        class: "qm-navbar-toolbar-others-dropdown-item-title",
                                                        "data-key": item.key,
                                                        onClick: handleClickDropdownMenuItem
                                                    }, toDisplayString(item.label), 9 /* TEXT, PROPS */, _hoisted_4),
                                                    createVNode(unref(CloseOutlined), {
                                                        class: "qm-navbar-toolbar-others-dropdown-item-close-icon",
                                                        style: normalizeStyle({ display: item.key === _ctx.navBarList[0].key ? 'none' : '' }),
                                                        "data-key": item.key,
                                                        onClick: handleDeleteDropdownMenuItem
                                                    }, null, 8 /* PROPS */, ["style", "data-key"])
                                                ])
                                            ]),
                                            _: 2 /* DYNAMIC */
                                        }, 1024 /* DYNAMIC_SLOTS */));
                                    }), 128 /* KEYED_FRAGMENT */))
                                ]),
                                _: 1 /* STABLE */
                            })
                        ]),
                        default: withCtx(() => [
                            createVNode(unref(EllipsisOutlined), {
                                onMouseenter: handleMouseEnterOthersIcon,
                                class: normalizeClass(['qm-navbar-toolbar-others', { hide: nonSliding.value }])
                            }, null, 8 /* PROPS */, ["class"])
                        ]),
                        _: 1 /* STABLE */
                    }),
                    createVNode(unref(Dropdown), { placement: "bottom" }, {
                        overlay: withCtx(() => [
                            createVNode(unref(Menu), null, {
                                default: withCtx(() => [
                                    createVNode(unref(Menu).Item, null, {
                                        default: withCtx(() => [
                                            createElementVNode("span", { onClick: handleCloseOthers }, "关闭其他")
                                        ]),
                                        _: 1 /* STABLE */
                                    }),
                                    createVNode(unref(Menu).Item, null, {
                                        default: withCtx(() => [
                                            createElementVNode("span", { onClick: handleCloseAll }, "关闭所有")
                                        ]),
                                        _: 1 /* STABLE */
                                    })
                                ]),
                                _: 1 /* STABLE */
                            })
                        ]),
                        default: withCtx(() => [
                            createVNode(unref(AppstoreOutlined), { class: "qm-navbar-toolbar-appstore" })
                        ]),
                        _: 1 /* STABLE */
                    })
                ], 512 /* NEED_PATCH */)
            ]));
        };
    }
});

export { script as default };
