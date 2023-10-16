import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Pagination from "ant-design-vue/lib/pagination";
import _Table from "ant-design-vue/lib/table";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import "core-js/modules/es.array.push.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.promise.finally.js";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context3, _context4; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context3 = ownKeys(Object(t), !0)).call(_context3, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context4 = ownKeys(Object(t))).call(_context4, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import { defineComponent, toRef, computed, ref, reactive, watch, openBlock, createElementBlock, normalizeClass, normalizeStyle, createBlock, unref, withCtx, renderSlot, createCommentVNode, createElementVNode, createVNode, mergeProps, normalizeProps, guardReactiveProps } from 'vue';
import '../ContentFormHeader/index.js';
import { downloadFile, isArray } from '../utils/index.js';
import './ContentFormTable.css';
import '../ContentFormHeader/ContentFormHeader.vue2.js';
import script$1 from '../ContentFormHeader/ContentFormHeader.vue.js';
var _hoisted_1 = {
  "class": "qm-content-form-table-body"
};
var _hoisted_2 = {
  "class": "qm-content-form-table-body-head"
};
var _hoisted_3 = /*#__PURE__*/createElementVNode("p", {
  style: {
    "margin-left": "16px"
  }
}, "查询表格", -1 /* HOISTED */);
var script = /*#__PURE__*/defineComponent(_objectSpread(_objectSpread({}, {
  inheritAttrs: false,
  name: 'ContentFormTable'
}), {}, {
  __name: 'ContentFormTable',
  props: {
    cols: {
      type: null,
      required: false
    },
    rowKey: {
      type: String,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    bordered: {
      type: Boolean,
      required: false,
      "default": true
    },
    immediate: {
      type: Boolean,
      required: false,
      "default": true
    },
    showExport: {
      type: Boolean,
      required: false
    },
    exportFileName: {
      type: String,
      required: false
    },
    submitButtonText: {
      type: String,
      required: false
    },
    scroll: {
      type: null,
      required: false
    },
    style: {
      type: null,
      required: false
    },
    paginationSize: {
      type: String,
      required: false
    },
    tableSize: {
      type: String,
      required: false
    },
    rowSelection: {
      type: null,
      required: false
    },
    beforeQueryAction: {
      type: Function,
      required: false
    },
    queryTableList: {
      type: Function,
      required: true
    },
    showTotal: {
      type: Function,
      required: false,
      "default": function _default(total) {
        return "\u5171".concat(total, "\u6761\u6570\u636E");
      }
    },
    exportTableList: {
      type: Function,
      required: false
    },
    "class": {
      type: [String, Array, Object],
      required: false
    },
    customResponse: {
      type: Function,
      required: false,
      "default": function _default(_ref) {
        var data = _ref.data;
        return {
          tableList: data.list,
          total: data.total
        };
      }
    }
  },
  emits: ["paginationChange"],
  setup: function setup(__props, _ref2) {
    var __expose = _ref2.expose,
      emit = _ref2.emit;
    var props = __props;
    var className = toRef(props, 'class');
    // 合成 columns: { queryList, tableColumns }
    var combinationColumns = computed(computedColumns);
    // 查询条件
    var searchCondition = ref(computedInitialSearchCondition());
    var tableResource = reactive({
      total: 0,
      pageNum: 1,
      pageSize: 10,
      tableList: []
    });
    var loading = ref(false);
    // 排序
    var sorter = ref([]);
    // eslint-disable-next-line
    watch([function () {
      return tableResource.pageNum;
    }, function () {
      return tableResource.pageSize;
    }, sorter, searchCondition], getTableList, {
      immediate: props.immediate
    });
    // 计算 queryList、tableColumns
    function computedColumns() {
      var _context;
      var newQueryList = [];
      var newTableColumns = [];
      _forEachInstanceProperty(_context = props.columns).call(_context, function (item) {
        var _item$visibleInTable = item.visibleInTable,
          visibleInTable = _item$visibleInTable === void 0 ? true : _item$visibleInTable,
          component = item.component,
          formType = item.formType;
        if (formType || component) {
          newQueryList.push({
            // @ts-ignore
            name: item.name || item.dataIndex,
            title: item.title,
            watch: item.watch,
            options: item.options,
            formType: item.formType,
            component: item.component,
            dataFormat: item.dataFormat,
            properties: item.properties,
            placeholder: item.placeholder,
            initialValue: item.initialValue
          });
        }
        if (visibleInTable === true) {
          newTableColumns.push(item);
        }
      });
      return {
        queryList: newQueryList,
        tableColumns: newTableColumns
      };
    }
    // 初始化 searchCondition
    function computedInitialSearchCondition() {
      var _context2;
      var result = {};
      _forEachInstanceProperty(_context2 = combinationColumns.value.queryList).call(_context2, function (item) {
        var dataIndex = item.dataIndex,
          _item$name = item.name,
          name = _item$name === void 0 ? dataIndex : _item$name,
          dataFormat = item.dataFormat,
          initialValue = item.initialValue;
        if (initialValue) {
          if (typeof dataFormat === 'function') {
            delete result[name];
            _Object$assign(result, dataFormat(initialValue));
          } else {
            result[name] = initialValue;
          }
        }
      });
      return result;
    }
    // 获取表格相关资源
    function getTableList() {
      var _props$beforeQueryAct, _props$beforeQueryAct2;
      var params = _objectSpread(_objectSpread({}, searchCondition.value), {}, {
        pageSize: tableResource.pageSize,
        pageNum: tableResource.pageNum,
        order: sorter.value
      });
      if ((_props$beforeQueryAct = (_props$beforeQueryAct2 = props.beforeQueryAction) === null || _props$beforeQueryAct2 === void 0 ? void 0 : _props$beforeQueryAct2.call(props, params)) !== null && _props$beforeQueryAct !== void 0 ? _props$beforeQueryAct : true) {
        loading.value = true;
        props.queryTableList(params).then(function (res) {
          return _Object$assign(tableResource, props.customResponse(res));
        })["finally"](function () {
          return loading.value = false;
        });
      }
    }
    // 提交
    function handleSubmit(values) {
      searchCondition.value = values;
      _Object$assign(tableResource, {
        pageSize: 10,
        pageNum: 1
      });
    }
    // 重置
    function handleReset(values) {
      searchCondition.value = values;
      _Object$assign(tableResource, {
        pageSize: 10,
        pageNum: 1
      });
    }
    // 导出
    function handleExport(values) {
      var _props$exportTableLis;
      props === null || props === void 0 || (_props$exportTableLis = props.exportTableList) === null || _props$exportTableLis === void 0 || (_props$exportTableLis = _props$exportTableLis.call(props, values)) === null || _props$exportTableLis === void 0 || _props$exportTableLis.then(function (res) {
        var _props$exportFileName;
        var data = res.data;
        downloadFile((_props$exportFileName = props === null || props === void 0 ? void 0 : props.exportFileName) !== null && _props$exportFileName !== void 0 ? _props$exportFileName : '_default_file', data);
      });
    }
    // 分页
    function handlePaginationChange(pageNum, pageSize) {
      _Object$assign(tableResource, {
        pageSize: pageSize,
        pageNum: pageNum
      });
      emit('paginationChange', pageNum, pageSize);
    }
    // 表格排序
    function handleTableChange() {
      var sort = arguments[2];
      var result = [];
      if (isArray(sort)) {
        _forEachInstanceProperty(sort).call(sort, function (item) {
          var field = item.field,
            order = item.order;
          order && result.push({
            field: field,
            direction: order === 'ascend'
          });
        });
      } else {
        sort.order && result.push({
          field: sort.field,
          direction: sort.order === 'ascend'
        });
      }
      sorter.value = result;
    }
    // 强制更新数据
    function forceUpdate() {
      getTableList();
    }
    __expose({
      forceUpdate: forceUpdate
    });
    return function (_ctx, _cache) {
      return openBlock(), createElementBlock("section", {
        "class": normalizeClass(['qm-content-form-table', className.value]),
        style: normalizeStyle(_ctx.style)
      }, [combinationColumns.value.queryList.length ? (openBlock(), createBlock(unref(script$1), {
        key: 0,
        cols: _ctx.cols,
        showExport: _ctx.showExport,
        submitButtonText: _ctx.submitButtonText,
        queryList: combinationColumns.value.queryList,
        onReset: handleReset,
        onExport: handleExport,
        onSubmit: handleSubmit
      }, {
        insertNode: withCtx(function () {
          return [renderSlot(_ctx.$slots, "insertHeadNode")];
        }),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["cols", "showExport", "submitButtonText", "queryList"])) : createCommentVNode("v-if", true), createElementVNode("div", _hoisted_1, [createElementVNode("div", _hoisted_2, [_hoisted_3, renderSlot(_ctx.$slots, "extra")]), createVNode(unref(_Table), mergeProps({
        bordered: ""
      }, _ctx.$attrs, {
        rowKey: _ctx.rowKey,
        scroll: _ctx.scroll,
        size: _ctx.tableSize,
        loading: loading.value,
        pagination: false,
        rowSelection: _ctx.rowSelection,
        dataSource: tableResource.tableList,
        columns: combinationColumns.value.tableColumns,
        onChange: handleTableChange
      }), {
        bodyCell: withCtx(function (bodyCellProps) {
          return [renderSlot(_ctx.$slots, "bodyCell", normalizeProps(guardReactiveProps(bodyCellProps)))];
        }),
        _: 3 /* FORWARDED */
      }, 16 /* FULL_PROPS */, ["rowKey", "scroll", "size", "loading", "rowSelection", "dataSource", "columns"]), createVNode(unref(_Pagination), {
        pageSize: tableResource.pageSize,
        current: tableResource.pageNum,
        total: tableResource.total,
        showTotal: _ctx.showTotal,
        size: _ctx.paginationSize,
        "class": "qm-content-form-table-pagination",
        onChange: handlePaginationChange
      }, null, 8 /* PROPS */, ["pageSize", "current", "total", "showTotal", "size"])])], 6 /* CLASS, STYLE */);
    };
  }
}));

export { script as default };