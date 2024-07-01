"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");
var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");
var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _forEachInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");
var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");
var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");
var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty2(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.error.to-string.js");
var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));
var _assign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));
var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));
var _pagination = _interopRequireDefault(require("ant-design-vue/lib/pagination"));
var _table = _interopRequireDefault(require("ant-design-vue/lib/table"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _vue = require("vue");
require("../ContentFormHeader/index.js");
var _index2 = require("../utils/index.js");
require("./ContentFormTable.css");
require("../ContentFormHeader/ContentFormHeader.vue2.js");
var _ContentFormHeaderVue2 = _interopRequireDefault(require("../ContentFormHeader/ContentFormHeader.vue.js"));
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context8, _context9; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty2(_context8 = ownKeys(Object(t), !0)).call(_context8, function (r) { (0, _defineProperty3["default"])(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty2(_context9 = ownKeys(Object(t))).call(_context9, function (r) { _Object$defineProperty2(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var _hoisted_1 = {
  "class": "qm-content-form-table"
};
var _hoisted_2 = {
  "class": "qm-content-form-table-body"
};
var _hoisted_3 = {
  "class": "qm-content-form-table-body-head"
};
var _hoisted_4 = /*#__PURE__*/(0, _vue.createElementVNode)("p", {
  style: {
    "margin-left": "16px"
  }
}, "查询表格", -1 /* HOISTED */);
var script = exports["default"] = /*#__PURE__*/(0, _vue.defineComponent)(_objectSpread(_objectSpread({}, {
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
    submitButtonText: {
      type: String,
      required: false
    },
    scroll: {
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
    validateFields: {
      type: Function,
      required: false
    },
    rowSelection: {
      type: null,
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
    },
    customTableSorter: {
      type: Function,
      required: false
    }
  },
  emits: ["paginationChange"],
  setup: function setup(__props, _ref2) {
    var _contentHeaderRef$val;
    var __expose = _ref2.expose,
      emits = _ref2.emit;
    var props = __props;
    /**
     * @param loading            数据加载状态
     * @param sorter             表格排序字段
     * @param combinationColumns 根据 props.columns 分别计算出 ContentFormHeader、ContentFormTable 组件的 queryList 和 columns
     * @param searchCondition    表格查询条件
     * @param contentHeaderRef   ContentFormHeader 组件实例
     * @param tableResource      表格数据
     */
    var loading = (0, _vue.ref)(false);
    var sorter = (0, _vue.shallowRef)([]);
    var combinationColumns = (0, _vue.computed)(computedColumns);
    var searchCondition = (0, _vue.ref)(initialSearchCondition());
    var contentHeaderRef = (0, _vue.ref)();
    var tableResource = (0, _vue.reactive)({
      total: 0,
      pageNum: 1,
      pageSize: 10,
      tableList: []
    });
    // 请求表格数据，immediate 表示是否立即请求，false 表示只有当用户触发查询操作时再请求。
    (0, _vue.onBeforeMount)(function () {
      return props.immediate && getTableList();
    });
    // 计算 queryList、tableColumns
    function computedColumns() {
      var _context;
      var newQueryList = [];
      var newTableColumns = [];
      (0, _forEach["default"])(_context = props.columns).call(_context, function (item) {
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
        if (visibleInTable === true) newTableColumns.push(item);
      });
      return {
        queryList: newQueryList,
        tableColumns: newTableColumns
      };
    }
    /**
     * 初始化表格查询条件（ searchCondition ）
     * 注意，computedColumns 函数一定要在本函数之前执行。
     * 否则，就会出现一个暂时性死区，导致系统异常。
     */
    function initialSearchCondition() {
      var _context2;
      var result = {};
      (0, _forEach["default"])(_context2 = combinationColumns.value.queryList).call(_context2, function (item) {
        var dataIndex = item.dataIndex,
          _item$name = item.name,
          name = _item$name === void 0 ? dataIndex : _item$name,
          dataFormat = item.dataFormat,
          initialValue = item.initialValue;
        if (initialValue) {
          if (typeof dataFormat === 'function') {
            (0, _assign["default"])(result, dataFormat(initialValue));
          } else {
            result[name] = initialValue;
          }
        }
      });
      return result;
    }
    /**
     * 发送请求，获取表格相关资源
     * 只要 props.validateFields() 函数不返回 false，就认定表单验证成功，否则就是失败。
     * 失败不发送请求。
     */
    function getTableList() {
      return _getTableList.apply(this, arguments);
    } // 提交
    function _getTableList() {
      _getTableList = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _props$validateFields;
        var params, resp;
        return _regenerator["default"].wrap(function _callee2$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              params = _objectSpread(_objectSpread({}, searchCondition.value), {}, {
                pageNum: tableResource.pageNum,
                pageSize: tableResource.pageSize,
                order: (0, _index2.isEmpty)(sorter.value) ? null : sorter.value
              });
              if (!(((_props$validateFields = props.validateFields) === null || _props$validateFields === void 0 ? void 0 : _props$validateFields.call(props, params)) !== false)) {
                _context4.next = 13;
                break;
              }
              loading.value = true;
              _context4.prev = 3;
              _context4.next = 6;
              return props.queryTableList(params);
            case 6:
              resp = _context4.sent;
              (0, _assign["default"])(tableResource, props.customResponse(resp));
            case 8:
              _context4.prev = 8;
              loading.value = false;
              return _context4.finish(8);
            case 11:
              _context4.next = 14;
              break;
            case 13:
              throw Error('查询条件验证未通过！');
            case 14:
            case "end":
              return _context4.stop();
          }
        }, _callee2, null, [[3,, 8, 11]]);
      }));
      return _getTableList.apply(this, arguments);
    }
    function handleSubmit(_x) {
      return _handleSubmit.apply(this, arguments);
    } // 重置
    function _handleSubmit() {
      _handleSubmit = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(values) {
        return _regenerator["default"].wrap(function _callee3$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              searchCondition.value = values;
              (0, _assign["default"])(tableResource, {
                pageSize: 10,
                pageNum: 1
              });
              return _context5.abrupt("return", getTableList());
            case 3:
            case "end":
              return _context5.stop();
          }
        }, _callee3);
      }));
      return _handleSubmit.apply(this, arguments);
    }
    function handleReset(_x2) {
      return _handleReset.apply(this, arguments);
    } // 导出
    function _handleReset() {
      _handleReset = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(values) {
        return _regenerator["default"].wrap(function _callee4$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              searchCondition.value = values;
              (0, _assign["default"])(tableResource, {
                pageSize: 10,
                pageNum: 1
              });
              return _context6.abrupt("return", getTableList());
            case 3:
            case "end":
              return _context6.stop();
          }
        }, _callee4);
      }));
      return _handleReset.apply(this, arguments);
    }
    function handleExport(_x3) {
      return _handleExport.apply(this, arguments);
    } // 分页
    function _handleExport() {
      _handleExport = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(values) {
        var _props$validateFields2;
        var _props$exportTableLis;
        return _regenerator["default"].wrap(function _callee5$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              if (!(((_props$validateFields2 = props.validateFields) === null || _props$validateFields2 === void 0 ? void 0 : _props$validateFields2.call(props, values)) !== false)) {
                _context7.next = 4;
                break;
              }
              return _context7.abrupt("return", props === null || props === void 0 || (_props$exportTableLis = props.exportTableList) === null || _props$exportTableLis === void 0 ? void 0 : _props$exportTableLis.call(props, values));
            case 4:
              return _context7.abrupt("return", _promise["default"].reject('查询条件验证未通过！'));
            case 5:
            case "end":
              return _context7.stop();
          }
        }, _callee5);
      }));
      return _handleExport.apply(this, arguments);
    }
    function handlePaginationChange(pageNum, pageSize) {
      (0, _assign["default"])(tableResource, {
        pageSize: pageSize,
        pageNum: pageNum
      });
      emits('paginationChange', pageNum, pageSize);
      getTableList();
    }
    // 表格排序
    function handleTableChange() {
      var _props$customTableSor, _props$customTableSor2;
      var sort = arguments[2];
      var result = [];
      if ((0, _index2.isArray)(sort)) {
        (0, _forEach["default"])(sort).call(sort, function (item) {
          var field = item.field,
            order = item.order;
          order && result.push({
            field: field,
            order: order
          });
        });
      } else {
        sort.order && result.push({
          field: sort.field,
          order: sort.order
        });
      }
      sorter.value = (_props$customTableSor = (_props$customTableSor2 = props.customTableSorter) === null || _props$customTableSor2 === void 0 ? void 0 : _props$customTableSor2.call(props, result)) !== null && _props$customTableSor !== void 0 ? _props$customTableSor : result;
      getTableList();
    }
    // 导出内容
    var expose = {
      form: (_contentHeaderRef$val = contentHeaderRef.value) === null || _contentHeaderRef$val === void 0 ? void 0 : _contentHeaderRef$val.form,
      forceUpdate: function () {
        var _forceUpdate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
          return _regenerator["default"].wrap(function _callee$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", getTableList());
              case 1:
              case "end":
                return _context3.stop();
            }
          }, _callee);
        }));
        function forceUpdate() {
          return _forceUpdate.apply(this, arguments);
        }
        return forceUpdate;
      }(),
      getQueryData: function getQueryData() {
        var _contentHeaderRef$val2, _contentHeaderRef$val3;
        return (_contentHeaderRef$val2 = contentHeaderRef.value) === null || _contentHeaderRef$val2 === void 0 || (_contentHeaderRef$val3 = _contentHeaderRef$val2.getCurrentFormData) === null || _contentHeaderRef$val3 === void 0 ? void 0 : _contentHeaderRef$val3.call(_contentHeaderRef$val2);
      }
    };
    (0, _defineProperty2["default"])(expose, 'form', {
      get: function get() {
        return contentHeaderRef.value.form;
      }
    });
    __expose(expose);
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("section", _hoisted_1, [combinationColumns.value.queryList.length ? ((0, _vue.openBlock)(), (0, _vue.createBlock)((0, _vue.unref)(_ContentFormHeaderVue2["default"]), {
        key: 0,
        ref_key: "contentHeaderRef",
        ref: contentHeaderRef,
        cols: _ctx.cols,
        reset: handleReset,
        "export": handleExport,
        submit: handleSubmit,
        showExport: _ctx.showExport,
        submitButtonText: _ctx.submitButtonText,
        queryList: combinationColumns.value.queryList
      }, {
        insertNode: (0, _vue.withCtx)(function () {
          return [(0, _vue.renderSlot)(_ctx.$slots, "insertHeadNode")];
        }),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["cols", "showExport", "submitButtonText", "queryList"])) : (0, _vue.createCommentVNode)("v-if", true), (0, _vue.createElementVNode)("div", _hoisted_2, [(0, _vue.createElementVNode)("div", _hoisted_3, [_hoisted_4, (0, _vue.renderSlot)(_ctx.$slots, "extra")]), (0, _vue.createVNode)((0, _vue.unref)(_table["default"]), (0, _vue.mergeProps)({
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
        bodyCell: (0, _vue.withCtx)(function (bodyCellProps) {
          return [(0, _vue.renderSlot)(_ctx.$slots, "bodyCell", (0, _vue.normalizeProps)((0, _vue.guardReactiveProps)(bodyCellProps)))];
        }),
        _: 3 /* FORWARDED */
      }, 16 /* FULL_PROPS */, ["rowKey", "scroll", "size", "loading", "rowSelection", "dataSource", "columns"]), (0, _vue.createVNode)((0, _vue.unref)(_pagination["default"]), {
        size: _ctx.paginationSize,
        showTotal: _ctx.showTotal,
        total: tableResource.total,
        current: tableResource.pageNum,
        pageSize: tableResource.pageSize,
        onChange: handlePaginationChange,
        "class": "qm-content-form-table-pagination"
      }, null, 8 /* PROPS */, ["size", "showTotal", "total", "current", "pageSize"])])]);
    };
  }
}));