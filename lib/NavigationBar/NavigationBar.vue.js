"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");
var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");
var _filterInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/filter");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");
var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");
var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.error.to-string.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.number.constructor.js");
var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _findIndex = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find-index"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _menu = _interopRequireDefault(require("ant-design-vue/lib/menu"));
var _dropdown = _interopRequireDefault(require("ant-design-vue/lib/dropdown"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _vue = require("vue");
require("./index.css");
var _index2 = require("../utils/index.js");
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons-vue/CloseOutlined"));
var _EllipsisOutlined = _interopRequireDefault(require("@ant-design/icons-vue/EllipsisOutlined"));
var _AppstoreOutlined = _interopRequireDefault(require("@ant-design/icons-vue/AppstoreOutlined"));
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty2(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context8, _context9; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context8 = ownKeys(Object(t), !0)).call(_context8, function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context9 = ownKeys(Object(t))).call(_context9, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var _hoisted_1 = {
  "class": "qm-navbar"
};
var _hoisted_2 = ["data-indicator", "data-key"];
var _hoisted_3 = {
  className: "qm-navbar-toolbar-others-dropdown-item"
};
var _hoisted_4 = ["data-key"];
var script = exports["default"] = /*#__PURE__*/(0, _vue.defineComponent)(_objectSpread(_objectSpread({}, {
  name: 'NavigationBar'
}), {}, {
  __name: 'NavigationBar',
  props: {
    activeKey: {
      type: String,
      required: true
    },
    navBarList: {
      type: Array,
      required: true
    }
  },
  emits: ["change", "delete"],
  setup: function setup(__props, _ref) {
    var emits = _ref.emit;
    var props = __props;
    /**
     * @param renderKey          当 window resize 事件触发时，修改 renderKey，触发组件的重新渲染
     * @param nonSliding         是否不可滑动，当容器长度大于导航栏长度时，不可滑动
     * @param navBarRef          导航栏
     * @param toolBarRef         工具栏
     * @param indicatorNodeRef   指示器节点
     * @param hiddenNavBarList   被隐藏起来的导航项列表
     * @param navBarContainerRef 导航栏容器
     */
    var renderKey = (0, _vue.ref)('');
    var nonSliding = (0, _vue.ref)(true);
    var navBarRef = (0, _vue.shallowRef)();
    var toolbarRef = (0, _vue.shallowRef)();
    var indicatorNodeRef = (0, _vue.shallowRef)();
    var hiddenNavBarList = (0, _vue.shallowRef)([]);
    var navBarContainerRef = (0, _vue.shallowRef)();
    /**
     * 这几项数据不需要设置为响应式的，把它们当作全局变量即可。
     * @param translateX            导航栏的偏移量
     * @param maximumOffsetDistance 导航栏的最大偏移量
     * @param navBarItemsClientRect 记录每个导航项的初始位置 [{ offsetLeft, offsetWidth }]
     */
    var translateX = 0;
    var maximumOffsetDistance = 0;
    var navBarItemsClientRect = [];
    var onWindowResize = (0, _index2.debounce)(function () {
      var _context;
      renderKey.value = (0, _slice["default"])(_context = Math.random().toString(32)).call(_context, 2);
    }, 200);
    (0, _vue.onMounted)(function () {
      window.addEventListener('resize', onWindowResize, false);
      (0, _vue.watch)([function () {
        return props.navBarList;
      }, renderKey], function () {
        var _navBarContainerRef$v, _navBarContainerRef$v2, _navBarContainerRef$v3;
        var children = document.querySelectorAll('.qm-navbar-content-list-item');
        navBarItemsClientRect = [];
        for (var i = 0; i < children.length; i++) {
          var _children$i = children[i],
            offsetWidth = _children$i.offsetWidth,
            offsetLeft = _children$i.offsetLeft;
          navBarItemsClientRect.push({
            offsetWidth: offsetWidth,
            offsetLeft: offsetLeft
          });
        }
        // navBar 长度
        var navBarWidth = (_navBarContainerRef$v = navBarContainerRef.value) === null || _navBarContainerRef$v === void 0 ? void 0 : _navBarContainerRef$v.scrollWidth;
        // 当 navBar 的长度小于容器长度时，navBar 不可滑动。
        nonSliding.value = navBarWidth <= ((_navBarContainerRef$v2 = navBarContainerRef.value) === null || _navBarContainerRef$v2 === void 0 ? void 0 : _navBarContainerRef$v2.offsetWidth);
        // 更新 toolbarRef 的长度。
        toolbarRef.value.style.cssText = nonSliding.value ? 'width: 80px' : 'width: 110px';
        // 注意，由于我们更新了 toolbarRef 长度，所以应该重新获取 navBarContainer 的长度；
        // 这样计算出的 maximumOffsetDistance 才是正确的。
        maximumOffsetDistance = navBarWidth - ((_navBarContainerRef$v3 = navBarContainerRef.value) === null || _navBarContainerRef$v3 === void 0 ? void 0 : _navBarContainerRef$v3.offsetWidth);
        updateIndicatorPosition();
        if (nonSliding.value) {
          var _navBarContainerRef$v4, _navBarContainerRef$v5;
          translateX = 0;
          navBarRef.value.style.cssText = "transform: translateX(0px)";
          (_navBarContainerRef$v4 = navBarContainerRef.value) === null || _navBarContainerRef$v4 === void 0 || _navBarContainerRef$v4.classList.remove('qm-navbar-content-left-shadow');
          (_navBarContainerRef$v5 = navBarContainerRef.value) === null || _navBarContainerRef$v5 === void 0 || _navBarContainerRef$v5.classList.remove('qm-navbar-content-right-shadow');
        } else {
          if (translateX >= maximumOffsetDistance) {
            var _navBarContainerRef$v6, _navBarContainerRef$v7;
            translateX = maximumOffsetDistance;
            navBarRef.value.style.cssText = "transform: translateX(".concat(-maximumOffsetDistance, "px)");
            (_navBarContainerRef$v6 = navBarContainerRef.value) === null || _navBarContainerRef$v6 === void 0 || _navBarContainerRef$v6.classList.add('qm-navbar-content-left-shadow');
            (_navBarContainerRef$v7 = navBarContainerRef.value) === null || _navBarContainerRef$v7 === void 0 || _navBarContainerRef$v7.classList.remove('qm-navbar-content-right-shadow');
          } else if (translateX > 0) {
            updateNavBarPosition();
          } else {
            var _navBarContainerRef$v8, _navBarContainerRef$v9;
            (_navBarContainerRef$v8 = navBarContainerRef.value) === null || _navBarContainerRef$v8 === void 0 || _navBarContainerRef$v8.classList.remove('qm-navbar-content-left-shadow');
            (_navBarContainerRef$v9 = navBarContainerRef.value) === null || _navBarContainerRef$v9 === void 0 || _navBarContainerRef$v9.classList.add('qm-navbar-content-right-shadow');
          }
        }
      }, {
        immediate: true,
        flush: 'post',
        deep: true
      });
      (0, _vue.watch)([function () {
        return props.activeKey;
      }, renderKey], function () {
        updateIndicatorPosition();
        if (nonSliding.value) return;
        updateNavBarPosition();
      }, {
        immediate: true,
        flush: 'post'
      });
    });
    (0, _vue.onBeforeUnmount)(function () {
      window.removeEventListener('resize', onWindowResize, false);
    });
    function handleClickNavBar(event) {
      var element = event.target;
      var isDeleteAction = false;
      while (element) {
        if ((0, _index2.elementMatches)(element, '.qm-navbar-content-list-item')) break;
        if ((0, _index2.elementMatches)(element, '.qm-navbar-item-close-icon')) isDeleteAction = true;
        element = element.parentNode;
      }
      var key = element.getAttribute('data-key');
      var index = Number(element.getAttribute('data-indicator'));
      if (isDeleteAction) {
        var navBarList = props.navBarList;
        emits('delete', (0, _filter["default"])(navBarList).call(navBarList, function (item) {
          return item.key !== key;
        }));
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
      var _navBarContainerRef$v10;
      var navBarContainerWidth = (_navBarContainerRef$v10 = navBarContainerRef.value) === null || _navBarContainerRef$v10 === void 0 ? void 0 : _navBarContainerRef$v10.offsetWidth;
      var list = [];
      if (translateX <= 0) {
        for (var i = 0; i < navBarItemsClientRect.length; i++) {
          var _navBarItemsClientRec = navBarItemsClientRect[i],
            offsetWidth = _navBarItemsClientRec.offsetWidth,
            offsetLeft = _navBarItemsClientRec.offsetLeft;
          if (offsetLeft + offsetWidth > navBarContainerWidth) list.push(props.navBarList[i]);
        }
      } else {
        for (var _i = 0; _i < navBarItemsClientRect.length; _i++) {
          var _navBarItemsClientRec2 = navBarItemsClientRect[_i],
            _offsetWidth = _navBarItemsClientRec2.offsetWidth,
            _offsetLeft = _navBarItemsClientRec2.offsetLeft;
          if (_offsetLeft < translateX) {
            list.push(props.navBarList[_i]);
          } else if (navBarContainerWidth + translateX < _offsetLeft + _offsetWidth) {
            list.push(props.navBarList[_i]);
          }
        }
      }
      hiddenNavBarList.value = list;
    }
    function handleMouseWheel(event) {
      if (nonSliding.value) return;
      event.preventDefault();
      var deltaY = event.deltaY;
      var distance = 0;
      if (deltaY > 0) {
        if (translateX >= maximumOffsetDistance) return;
        distance = translateX + 100;
        if (distance >= maximumOffsetDistance) {
          var _navBarContainerRef$v11, _navBarContainerRef$v12;
          translateX = maximumOffsetDistance;
          navBarRef.value.style.cssText = "transform: translateX(".concat(-translateX, "px)");
          (_navBarContainerRef$v11 = navBarContainerRef.value) === null || _navBarContainerRef$v11 === void 0 || _navBarContainerRef$v11.classList.add('qm-navbar-content-left-shadow');
          (_navBarContainerRef$v12 = navBarContainerRef.value) === null || _navBarContainerRef$v12 === void 0 || _navBarContainerRef$v12.classList.remove('qm-navbar-content-right-shadow');
        } else {
          var _navBarContainerRef$v13, _navBarContainerRef$v14;
          translateX = distance;
          navBarRef.value.style.cssText = "transform: translateX(".concat(-translateX, "px)");
          (_navBarContainerRef$v13 = navBarContainerRef.value) === null || _navBarContainerRef$v13 === void 0 || _navBarContainerRef$v13.classList.add('qm-navbar-content-left-shadow');
          (_navBarContainerRef$v14 = navBarContainerRef.value) === null || _navBarContainerRef$v14 === void 0 || _navBarContainerRef$v14.classList.add('qm-navbar-content-right-shadow');
        }
      } else if (deltaY < 0) {
        if (translateX <= 0) return;
        distance = translateX - 100;
        if (distance <= 0) {
          var _navBarContainerRef$v15, _navBarContainerRef$v16;
          translateX = 0;
          navBarRef.value.style.cssText = "transform: translateX(0px)";
          (_navBarContainerRef$v15 = navBarContainerRef.value) === null || _navBarContainerRef$v15 === void 0 || _navBarContainerRef$v15.classList.remove('qm-navbar-content-left-shadow');
          (_navBarContainerRef$v16 = navBarContainerRef.value) === null || _navBarContainerRef$v16 === void 0 || _navBarContainerRef$v16.classList.add('qm-navbar-content-right-shadow');
        } else {
          var _navBarContainerRef$v17, _navBarContainerRef$v18;
          translateX = distance;
          navBarRef.value.style.cssText = "transform: translateX(".concat(-distance, "px)");
          (_navBarContainerRef$v17 = navBarContainerRef.value) === null || _navBarContainerRef$v17 === void 0 || _navBarContainerRef$v17.classList.add('qm-navbar-content-left-shadow');
          (_navBarContainerRef$v18 = navBarContainerRef.value) === null || _navBarContainerRef$v18 === void 0 || _navBarContainerRef$v18.classList.add('qm-navbar-content-right-shadow');
        }
      }
    }
    // 关闭其他
    function handleCloseOthers() {
      var _context2;
      emits('delete', (0, _filter["default"])(_context2 = props.navBarList).call(_context2, function (item, index) {
        return index === 0 || item.key === props.activeKey;
      }));
    }
    // 关闭所有
    function handleCloseAll() {
      var _context3;
      emits('delete', (0, _slice["default"])(_context3 = props.navBarList).call(_context3, 0, 1));
      emits('change', props.navBarList[0].key);
    }
    // 点击下拉菜单选项
    function handleClickDropdownMenuItem(event) {
      var key = event.currentTarget.getAttribute('data-key');
      if (key) emits('change', key);
    }
    // 删除下拉菜单选项
    function handleDeleteDropdownMenuItem(event) {
      var _context4;
      var key = event.currentTarget.getAttribute('data-key');
      if (key) emits('delete', (0, _filter["default"])(_context4 = props.navBarList).call(_context4, function (item) {
        return item.key !== key;
      }));
    }
    // 更新指针的位置
    function updateIndicatorPosition() {
      var _context5, _context6;
      var index = (0, _findIndex["default"])(_context5 = props.navBarList).call(_context5, function (item) {
        return item.key === props.activeKey;
      });
      var _navBarItemsClientRec3 = navBarItemsClientRect[index],
        offsetLeft = _navBarItemsClientRec3.offsetLeft,
        offsetWidth = _navBarItemsClientRec3.offsetWidth;
      indicatorNodeRef.value.style.cssText = (0, _concat["default"])(_context6 = "width: ".concat(offsetWidth, "px; transform: translateX(")).call(_context6, offsetLeft, "px)");
    }
    // 更新导航栏的位置
    function updateNavBarPosition() {
      var _navBarContainerRef$v19, _context7;
      var navBarContainerWidth = (_navBarContainerRef$v19 = navBarContainerRef.value) === null || _navBarContainerRef$v19 === void 0 ? void 0 : _navBarContainerRef$v19.offsetWidth;
      // 边界下标
      var boundaryIndex = 0;
      for (var i = 0; i < navBarItemsClientRect.length; i++) {
        var _navBarItemsClientRec4 = navBarItemsClientRect[i],
          offsetWidth = _navBarItemsClientRec4.offsetWidth,
          offsetLeft = _navBarItemsClientRec4.offsetLeft;
        if (offsetWidth + offsetLeft > navBarContainerWidth) {
          boundaryIndex = i - 2;
          break;
        }
      }
      // 边界距离
      var boundaryDistance = navBarItemsClientRect[boundaryIndex].offsetLeft;
      var currentIndex = (0, _findIndex["default"])(_context7 = props.navBarList).call(_context7, function (item) {
        return item.key === props.activeKey;
      });
      if (currentIndex > boundaryIndex) {
        var x = navBarItemsClientRect[currentIndex].offsetLeft - boundaryDistance;
        if (x >= maximumOffsetDistance) {
          var _navBarContainerRef$v20, _navBarContainerRef$v21;
          x = maximumOffsetDistance;
          (_navBarContainerRef$v20 = navBarContainerRef.value) === null || _navBarContainerRef$v20 === void 0 || _navBarContainerRef$v20.classList.add('qm-navbar-content-left-shadow');
          (_navBarContainerRef$v21 = navBarContainerRef.value) === null || _navBarContainerRef$v21 === void 0 || _navBarContainerRef$v21.classList.remove('qm-navbar-content-right-shadow');
        } else {
          var _navBarContainerRef$v22, _navBarContainerRef$v23;
          (_navBarContainerRef$v22 = navBarContainerRef.value) === null || _navBarContainerRef$v22 === void 0 || _navBarContainerRef$v22.classList.add('qm-navbar-content-left-shadow');
          (_navBarContainerRef$v23 = navBarContainerRef.value) === null || _navBarContainerRef$v23 === void 0 || _navBarContainerRef$v23.classList.add('qm-navbar-content-right-shadow');
        }
        translateX = x;
        navBarRef.value.style.cssText = "transform: translateX(".concat(-x, "px)");
      } else {
        var _navBarContainerRef$v24, _navBarContainerRef$v25;
        translateX = 0;
        navBarRef.value.style.cssText = "transform: translateX(0px)";
        (_navBarContainerRef$v24 = navBarContainerRef.value) === null || _navBarContainerRef$v24 === void 0 || _navBarContainerRef$v24.classList.remove('qm-navbar-content-left-shadow');
        (_navBarContainerRef$v25 = navBarContainerRef.value) === null || _navBarContainerRef$v25 === void 0 || _navBarContainerRef$v25.classList.add('qm-navbar-content-right-shadow');
      }
    }
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("section", _hoisted_1, [(0, _vue.createElementVNode)("div", {
        "class": "qm-navbar-content",
        ref_key: "navBarContainerRef",
        ref: navBarContainerRef,
        onWheel: handleMouseWheel
      }, [(0, _vue.createElementVNode)("ul", {
        "class": "qm-navbar-content-list",
        onClick: handleClickNavBar,
        ref_key: "navBarRef",
        ref: navBarRef
      }, [((0, _vue.openBlock)(true), (0, _vue.createElementBlock)(_vue.Fragment, null, (0, _vue.renderList)(_ctx.navBarList, function (item, index) {
        return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("li", {
          "class": (0, _vue.normalizeClass)(["qm-navbar-content-list-item", {
            active: item.key === _ctx.activeKey
          }]),
          "data-indicator": index,
          "data-key": item.key,
          key: item.key
        }, [(0, _vue.createTextVNode)((0, _vue.toDisplayString)(item.label) + " ", 1 /* TEXT */), index > 0 ? ((0, _vue.openBlock)(), (0, _vue.createBlock)((0, _vue.unref)(_CloseOutlined["default"]), {
          key: 0,
          "class": "qm-navbar-item-close-icon"
        })) : (0, _vue.createCommentVNode)("v-if", true)], 10 /* CLASS, PROPS */, _hoisted_2);
      }), 128 /* KEYED_FRAGMENT */)), (0, _vue.createElementVNode)("li", {
        "class": "qm-navbar-indicator",
        ref_key: "indicatorNodeRef",
        ref: indicatorNodeRef
      }, null, 512 /* NEED_PATCH */)], 512 /* NEED_PATCH */)], 544 /* HYDRATE_EVENTS, NEED_PATCH */), (0, _vue.createElementVNode)("div", {
        "class": "qm-navbar-toolbar",
        ref_key: "toolbarRef",
        ref: toolbarRef
      }, [(0, _vue.createVNode)((0, _vue.unref)(_dropdown["default"]), {
        placement: "bottom"
      }, {
        overlay: (0, _vue.withCtx)(function () {
          return [(0, _vue.createVNode)((0, _vue.unref)(_menu["default"]), null, {
            "default": (0, _vue.withCtx)(function () {
              return [((0, _vue.openBlock)(true), (0, _vue.createElementBlock)(_vue.Fragment, null, (0, _vue.renderList)(hiddenNavBarList.value, function (item) {
                return (0, _vue.openBlock)(), (0, _vue.createBlock)((0, _vue.unref)(_menu["default"]).Item, {
                  key: item.key
                }, {
                  "default": (0, _vue.withCtx)(function () {
                    return [(0, _vue.createElementVNode)("div", _hoisted_3, [(0, _vue.createElementVNode)("div", {
                      "class": "qm-navbar-toolbar-others-dropdown-item-title",
                      "data-key": item.key,
                      onClick: handleClickDropdownMenuItem
                    }, (0, _vue.toDisplayString)(item.label), 9 /* TEXT, PROPS */, _hoisted_4), (0, _vue.createVNode)((0, _vue.unref)(_CloseOutlined["default"]), {
                      "class": "qm-navbar-toolbar-others-dropdown-item-close-icon",
                      style: (0, _vue.normalizeStyle)({
                        display: item.key === _ctx.navBarList[0].key ? 'none' : ''
                      }),
                      "data-key": item.key,
                      onClick: handleDeleteDropdownMenuItem
                    }, null, 8 /* PROPS */, ["style", "data-key"])])];
                  }),
                  _: 2 /* DYNAMIC */
                }, 1024 /* DYNAMIC_SLOTS */);
              }), 128 /* KEYED_FRAGMENT */))];
            }),

            _: 1 /* STABLE */
          })];
        }),

        "default": (0, _vue.withCtx)(function () {
          return [(0, _vue.createVNode)((0, _vue.unref)(_EllipsisOutlined["default"]), {
            onMouseenter: handleMouseEnterOthersIcon,
            "class": (0, _vue.normalizeClass)(['qm-navbar-toolbar-others', {
              hide: nonSliding.value
            }])
          }, null, 8 /* PROPS */, ["class"])];
        }),
        _: 1 /* STABLE */
      }), (0, _vue.createVNode)((0, _vue.unref)(_dropdown["default"]), {
        placement: "bottom"
      }, {
        overlay: (0, _vue.withCtx)(function () {
          return [(0, _vue.createVNode)((0, _vue.unref)(_menu["default"]), null, {
            "default": (0, _vue.withCtx)(function () {
              return [(0, _vue.createVNode)((0, _vue.unref)(_menu["default"]).Item, null, {
                "default": (0, _vue.withCtx)(function () {
                  return [(0, _vue.createElementVNode)("span", {
                    onClick: handleCloseOthers
                  }, "关闭其他")];
                }),
                _: 1 /* STABLE */
              }), (0, _vue.createVNode)((0, _vue.unref)(_menu["default"]).Item, null, {
                "default": (0, _vue.withCtx)(function () {
                  return [(0, _vue.createElementVNode)("span", {
                    onClick: handleCloseAll
                  }, "关闭所有")];
                }),
                _: 1 /* STABLE */
              })];
            }),

            _: 1 /* STABLE */
          })];
        }),

        "default": (0, _vue.withCtx)(function () {
          return [(0, _vue.createVNode)((0, _vue.unref)(_AppstoreOutlined["default"]), {
            "class": "qm-navbar-toolbar-appstore"
          })];
        }),
        _: 1 /* STABLE */
      })], 512 /* NEED_PATCH */)]);
    };
  }
}));