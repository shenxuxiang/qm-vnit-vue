"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");
var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");
var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _forEachInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");
var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");
var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _tree = _interopRequireDefault(require("ant-design-vue/lib/tree"));
var _input = _interopRequireDefault(require("ant-design-vue/lib/input"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.array.unshift.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.split.js");
var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));
var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));
var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));
var _set = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/map"));
var _map2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));
var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));
var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _vue = require("vue");
var _index = require("../utils/index.js");
require("./ModelTree.css");
var _excluded = ["title", "key", "parentKey", "children"];
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context6, _context7; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty2(_context6 = ownKeys(Object(t), !0)).call(_context6, function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty2(_context7 = ownKeys(Object(t))).call(_context7, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var script = exports["default"] = /*#__PURE__*/(0, _vue.defineComponent)(_objectSpread(_objectSpread({}, {
  name: 'ModelTree',
  inheritAttrs: false
}), {}, {
  __name: 'ModelTree',
  props: {
    treeData: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      required: false
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
    fieldNames: {
      type: Object,
      required: false
    },
    checkedKeys: {
      type: Array,
      required: false
    },
    expandedKeys: {
      type: Array,
      required: false
    },
    selectedKeys: {
      type: Array,
      required: false
    },
    formatTreeData: {
      type: Function,
      required: false
    }
  },
  emits: ["update:checkedKeys", "update:expandedKeys", "update:selectedKeys"],
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose,
      emit = _ref.emit;
    var props = __props;
    var searchValue = (0, _vue.ref)('');
    var localCheckedKeys = (0, _vue.ref)([]);
    var localExpandedKeys = (0, _vue.ref)([]);
    var localSelectedKeys = (0, _vue.ref)([]);
    var expandedKeys = (0, _vue.computed)({
      get: function get() {
        return props.expandedKeys || localExpandedKeys.value;
      },
      set: function set(value) {
        localExpandedKeys.value = value;
        emit('update:expandedKeys', value);
      }
    });
    var checkedKeys = (0, _vue.computed)({
      get: function get() {
        return props.checkedKeys || localCheckedKeys.value;
      },
      set: function set(checkedKeys) {
        localCheckedKeys.value = checkedKeys;
        emit('update:checkedKeys', checkedKeys);
      }
    });
    var selectedKeys = (0, _vue.computed)({
      get: function get() {
        return props.selectedKeys || localSelectedKeys.value;
      },
      set: function set(selectedKeys) {
        localSelectedKeys.value = selectedKeys;
        emit('update:selectedKeys', selectedKeys);
      }
    });
    /**
     * 根据原始的 props.treeData 计算，将格式转换成 TreeData 类型。
     * 如果提供了 props.formatTreeData 属性，则根据该方法计算得到；
     * 如果提供了 props.fieldNames 属性，则根据该配置，重新计算得到；
     * 最后，直接返回 props.TreeData.
     */
    var treeData = (0, _vue.computed)(function () {
      if (typeof props.formatTreeData === 'function') {
        return props.formatTreeData(props.treeData);
      } else if (!(0, _index.isEmpty)(props.fieldNames)) {
        return computedTreeData(props.treeData, props.fieldNames);
      } else {
        return props.treeData;
      }
    });
    // 扁平的 TreeDate
    var flatTreeData = (0, _vue.computed)(function () {
      return computedFlatTreeData(treeData.value);
    });
    // 筛选后的 TreeData
    var filteredTreeData = (0, _vue.computed)(function () {
      var _context;
      if ((0, _trim["default"])(_context = searchValue.value).call(_context)) {
        return filterTreeData(treeData.value, searchValue.value);
      } else {
        return treeData.value;
      }
    });
    // 输入关键字筛选 TreeData 展开树。
    (0, _vue.watch)(searchValue, function () {
      var _context2, _context3;
      if (!(0, _trim["default"])(_context2 = searchValue.value).call(_context2)) return;
      var keys = [];
      // 这里我们根据扁平的 TreeData 来计算，提升性能
      (0, _forEach["default"])(_context3 = flatTreeData.value).call(_context3, function (_ref2, k) {
        var title = _ref2.title;
        if ((0, _includes["default"])(title).call(title, searchValue.value)) {
          keys.push.apply(keys, (0, _toConsumableArray2["default"])(getParentKeys(k)));
        }
      });
      expandedKeys.value = (0, _toConsumableArray2["default"])(new _set["default"](keys));
    });
    // 计算扁平的 treeData
    function computedFlatTreeData(treeData) {
      var result = new _map["default"]();
      var stack = (0, _toConsumableArray2["default"])(treeData);
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
        if ((0, _index.isEmpty)(children)) continue;
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
      return (_treeData$map = treeData === null || treeData === void 0 || (_treeData$map2 = (0, _map2["default"])(treeData)) === null || _treeData$map2 === void 0 ? void 0 : _treeData$map2.call(treeData, function (item) {
        var title = item.title,
          key = item.key,
          parentKey = item.parentKey,
          children = item.children,
          props = (0, _objectWithoutProperties2["default"])(item, _excluded);
        var newTitle = title;
        if ((0, _indexOf["default"])(title).call(title, searchValue) >= 0) {
          newTitle = [];
          var ary = title.split(searchValue);
          var length = ary.length;
          for (var i = 0; i < length; i++) {
            ary[i] && newTitle.push(ary[i]);
            if (i < length - 1) {
              // 相邻的两个元素之间才会添加
              newTitle.push((0, _vue.h)('span', {
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
    function computedTreeData(tree, fieldNames) {
      var root = [];
      var parentNodes = [];
      var stack = (0, _isArray["default"])(tree) ? (0, _toConsumableArray2["default"])(tree) : [tree];
      var _fieldNames$key = fieldNames.key,
        keyLabel = _fieldNames$key === void 0 ? 'key' : _fieldNames$key,
        _fieldNames$title = fieldNames.title,
        titleLabel = _fieldNames$title === void 0 ? 'title' : _fieldNames$title,
        _fieldNames$children = fieldNames.children,
        childrenLabel = _fieldNames$children === void 0 ? 'children' : _fieldNames$children,
        _fieldNames$parentKey = fieldNames.parentKey,
        parentKeyLabel = _fieldNames$parentKey === void 0 ? 'parentKey' : _fieldNames$parentKey;
      while (stack.length) {
        var currentParent = null;
        var item = stack.shift();
        while (parentNodes.length) {
          var last = (0, _slice["default"])(parentNodes).call(parentNodes, -1)[0];
          if (last.key === item[parentKeyLabel]) {
            currentParent = last;
            break;
          } else {
            parentNodes.pop();
          }
        }
        var node = _objectSpread(_objectSpread({}, item), {}, {
          key: item[keyLabel],
          title: item[titleLabel],
          parentKey: item[parentKeyLabel]
        });
        delete node[childrenLabel];
        // 如果 currentParent 不存在，说明当前节点就是根节点，此时我们只要将节点添加到 root 集合中即可。
        if (currentParent) {
          if (!currentParent.children) currentParent.children = [];
          currentParent.children.push(node);
        } else {
          root.push(node);
        }
        var children = item[childrenLabel] || [];
        var length = children.length;
        if (length > 0) parentNodes.push(node);
        while (length--) {
          stack.unshift(children[length]);
        }
      }
      return root;
    }
    __expose({
      getParentKeys: getParentKeys,
      getAllParentKeys: function getAllParentKeys() {
        var keys = [];
        if (props.checkable) {
          var _context4;
          (0, _forEach["default"])(_context4 = localCheckedKeys.value).call(_context4, function (key) {
            return keys.push.apply(keys, (0, _toConsumableArray2["default"])(getParentKeys(key)));
          });
        } else {
          var _context5;
          (0, _forEach["default"])(_context5 = localSelectedKeys.value).call(_context5, function (key) {
            return keys.push.apply(keys, (0, _toConsumableArray2["default"])(getParentKeys(key)));
          });
        }
        return (0, _toConsumableArray2["default"])(new _set["default"](keys));
      }
    });
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", null, [_ctx.showFilter ? ((0, _vue.openBlock)(), (0, _vue.createBlock)((0, _vue.unref)(_input["default"]).Search, {
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
      }, null, 8 /* PROPS */, ["value", "disabled", "placeholder"])) : (0, _vue.createCommentVNode)("v-if", true), (0, _vue.createElementVNode)("div", {
        "class": (0, _vue.normalizeClass)({
          'tree-border': _ctx.bordered
        })
      }, [(0, _vue.createVNode)((0, _vue.unref)(_tree["default"]), (0, _vue.mergeProps)(_ctx.$attrs, {
        checkedKeys: checkedKeys.value,
        "onUpdate:checkedKeys": _cache[1] || (_cache[1] = function ($event) {
          return checkedKeys.value = $event;
        }),
        expandedKeys: expandedKeys.value,
        "onUpdate:expandedKeys": _cache[2] || (_cache[2] = function ($event) {
          return expandedKeys.value = $event;
        }),
        selectedKeys: selectedKeys.value,
        "onUpdate:selectedKeys": _cache[3] || (_cache[3] = function ($event) {
          return selectedKeys.value = $event;
        }),
        treeData: filteredTreeData.value,
        selectable: !_ctx.checkable,
        checkable: _ctx.checkable,
        disabled: _ctx.disabled,
        multiple: _ctx.multiple
      }), null, 16 /* FULL_PROPS */, ["checkedKeys", "expandedKeys", "selectedKeys", "treeData", "selectable", "checkable", "disabled", "multiple"])], 2 /* CLASS */)]);
    };
  }
}));