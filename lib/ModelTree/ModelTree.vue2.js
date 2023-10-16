import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Tree from "ant-design-vue/lib/tree";
import _Input from "ant-design-vue/lib/input";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/objectWithoutProperties";
import _toConsumableArray from "@babel/runtime-corejs3/helpers/toConsumableArray";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
var _excluded = ["title", "key", "parentKey", "children"];
import "core-js/modules/es.array.push.js";
import "core-js/modules/es.array.unshift.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.split.js";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _Set from "@babel/runtime-corejs3/core-js-stable/set";
import _Map from "@babel/runtime-corejs3/core-js-stable/map";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context3, _context4; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context3 = ownKeys(Object(t), !0)).call(_context3, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context4 = ownKeys(Object(t))).call(_context4, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import { defineComponent, ref, computed, watch, h, openBlock, createElementBlock, createBlock, unref, createCommentVNode, createElementVNode, normalizeClass, createVNode, mergeProps } from 'vue';
import { isEmpty } from '../utils/index.js';
import './ModelTree.css';
var script = /*#__PURE__*/defineComponent(_objectSpread(_objectSpread({}, {
  name: 'ModelTree',
  inheritAttrs: false
}), {}, {
  __name: 'ModelTree',
  props: {
    treeData: {
      type: Array,
      required: true
    },
    bordered: {
      type: Boolean,
      required: false,
      "default": true
    },
    disabled: {
      type: Boolean,
      required: false
    },
    checkable: {
      type: Boolean,
      required: false,
      "default": true
    },
    placeholder: {
      type: String,
      required: false,
      "default": '请输入关键字进行查找'
    },
    showFilter: {
      type: Boolean,
      required: false,
      "default": true
    },
    checkedKeys: {
      type: Array,
      required: false
    },
    expandedKeys: {
      type: Array,
      required: false
    },
    computedTreeData: {
      type: Function,
      required: false
    }
  },
  emits: ["update:expandedKeys", "update:checkedKeys"],
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose,
      emit = _ref.emit;
    var props = __props;
    var searchValue = ref('');
    var localExpandedKeys = ref([]);
    var localCheckedKeys = ref([]);
    var expandedKeys = computed({
      get: function get() {
        return props.expandedKeys || localExpandedKeys.value;
      },
      set: function set(value) {
        localExpandedKeys.value = value;
        emit('update:expandedKeys', value);
      }
    });
    var checkedKeys = computed({
      get: function get() {
        return props.checkedKeys || localCheckedKeys.value;
      },
      set: function set(checkedKeys) {
        localCheckedKeys.value = checkedKeys;
        emit('update:checkedKeys', checkedKeys);
      }
    });
    // 根据原始的 props.treeData 计算，将格式转换成 TreeData 类型。
    // 在没有提供 props.computedTreeData 函数的情况下，直接使用 props.treeData。
    var treeData = computed(function () {
      return typeof props.computedTreeData === 'function' ? props.computedTreeData(props.treeData) : props.treeData;
    });
    // 扁平的 TreeDate
    var flatTreeData = computed(function () {
      return computedFlatTreeData(treeData.value);
    });
    // 筛选后的 TreeData
    var filteredTreeData = computed(function () {
      return searchValue.value ? filterTreeData(treeData.value, searchValue.value) : treeData.value;
    });
    // 输入关键字筛选 TreeData 展开树。
    watch(searchValue, function () {
      var _context;
      if (!searchValue.value) return;
      var keys = [];
      // 这里我们根据扁平的 TreeData 来计算，提升性能
      _forEachInstanceProperty(_context = flatTreeData.value).call(_context, function (_ref2, k) {
        var title = _ref2.title;
        if (_includesInstanceProperty(title).call(title, searchValue.value)) {
          keys.push.apply(keys, _toConsumableArray(getParentKeys(k)));
        }
      });
      expandedKeys.value = _toConsumableArray(new _Set(keys));
    });
    // 计算扁平的 treeData
    function computedFlatTreeData(treeData) {
      var result = new _Map();
      var stack = _toConsumableArray(treeData);
      while (stack.length) {
        var _stack$shift = stack.shift(),
          parentKey = _stack$shift.parentKey,
          key = _stack$shift.key,
          title = _stack$shift.title,
          children = _stack$shift.children;
        result.set(key, {
          parentKey: parentKey,
          title: title,
          key: key
        });
        if (isEmpty(children)) continue;
        var length = children.length;
        while (length--) {
          stack.unshift(children[length]);
        }
      }
      return result;
    }
    // 获取所有的 父级 key（包含自身的 key）
    function getParentKeys(key) {
      var parentKeys = [];
      while (flatTreeData.value.has(key)) {
        parentKeys.push(key);
        var _flatTreeData$value$g = flatTreeData.value.get(key),
          parentKey = _flatTreeData$value$g.parentKey;
        key = parentKey;
      }
      return parentKeys;
    }
    /**
     * 过滤、筛选出目标节点，匹配的内容将被标注为红色
     * @param treeData    Tree 组件的 treeData
     * @param searchValue 查询条件
     */
    function filterTreeData(treeData, searchValue) {
      var _treeData$map, _treeData$map2;
      return (_treeData$map = treeData === null || treeData === void 0 || (_treeData$map2 = _mapInstanceProperty(treeData)) === null || _treeData$map2 === void 0 ? void 0 : _treeData$map2.call(treeData, function (item) {
        var title = item.title,
          key = item.key,
          parentKey = item.parentKey,
          children = item.children,
          props = _objectWithoutProperties(item, _excluded);
        var newTitle = title;
        if (_indexOfInstanceProperty(title).call(title, searchValue) >= 0) {
          newTitle = [];
          var ary = title.split(searchValue);
          var length = ary.length;
          for (var i = 0; i < length; i++) {
            ary[i] && newTitle.push(ary[i]);
            if (i < length - 1) {
              // 相邻的两个元素之间才会添加
              newTitle.push(h('span', {
                style: 'color: #f50;'
              }, searchValue));
            }
          }
          newTitle = newTitle;
        }
        if (children !== null && children !== void 0 && children.length) {
          return _objectSpread({
            key: key,
            parentKey: parentKey,
            title: newTitle,
            children: filterTreeData(children, searchValue)
          }, props);
        } else {
          return _objectSpread({
            title: newTitle,
            key: key,
            parentKey: parentKey
          }, props);
        }
      })) !== null && _treeData$map !== void 0 ? _treeData$map : [];
    }
    __expose({
      getParentKeys: getParentKeys,
      getAllParentKeys: function getAllParentKeys() {
        var _context2;
        var keys = [];
        _forEachInstanceProperty(_context2 = localCheckedKeys.value).call(_context2, function (key) {
          return keys.push.apply(keys, _toConsumableArray(getParentKeys(key)));
        });
        return _toConsumableArray(new _Set(keys));
      }
    });
    return function (_ctx, _cache) {
      return openBlock(), createElementBlock("div", null, [_ctx.showFilter ? (openBlock(), createBlock(unref(_Input).Search, {
        key: 0,
        value: searchValue.value,
        "onUpdate:value": _cache[0] || (_cache[0] = function ($event) {
          return searchValue.value = $event;
        }),
        style: {
          "margin-bottom": "8px"
        },
        disabled: _ctx.disabled,
        placeholder: _ctx.placeholder
      }, null, 8 /* PROPS */, ["value", "disabled", "placeholder"])) : createCommentVNode("v-if", true), createElementVNode("div", {
        "class": normalizeClass({
          'tree-border': _ctx.bordered
        })
      }, [createVNode(unref(_Tree), mergeProps(_ctx.$attrs, {
        checkedKeys: checkedKeys.value,
        "onUpdate:checkedKeys": _cache[1] || (_cache[1] = function ($event) {
          return checkedKeys.value = $event;
        }),
        expandedKeys: expandedKeys.value,
        "onUpdate:expandedKeys": _cache[2] || (_cache[2] = function ($event) {
          return expandedKeys.value = $event;
        }),
        treeData: filteredTreeData.value,
        checkable: _ctx.checkable,
        disabled: _ctx.disabled
      }), null, 16 /* FULL_PROPS */, ["checkedKeys", "expandedKeys", "treeData", "checkable", "disabled"])], 2 /* CLASS */)]);
    };
  }
}));

export { script as default };