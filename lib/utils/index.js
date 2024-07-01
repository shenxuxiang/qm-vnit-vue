"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
exports.elementMatches = elementMatches;
exports.getType = getType;
exports.getViewportSize = getViewportSize;
exports.isArray = isArray;
exports.isEmpty = isEmpty;
exports.throttle = throttle;
require("core-js/modules/es.error.to-string.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("@babel/runtime-corejs3/helpers/typeof");
require("core-js/modules/es.number.to-fixed.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.test.js");
var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
require("@babel/runtime-corejs3/core-js-stable/url");
var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));
require("@babel/runtime-corejs3/core-js-stable/promise");
function getType(data) {
  var _context;
  return (0, _slice["default"])(_context = Object.prototype.toString.call(data)).call(_context, 8, -1);
}
function isArray(data) {
  return getType(data) === 'Array';
}
function isEmpty(data) {
  var _context2;
  if (!data) return true;
  var type = getType(data);
  switch (type) {
    case 'Map':
    case 'Set':
      return data.size <= 0;
    case 'Array':
      return data.length <= 0;
    case 'Object':
      return (0, _concat["default"])(_context2 = (0, _keys["default"])(data)).call(_context2, (0, _getOwnPropertySymbols["default"])(data)).length <= 0;
    default:
      return false;
  }
}
/**
 * 防抖
 * @param func        防抖的方法
 * @param delay       防抖的时间间隔
 * @param immediately 是否立即执行 func
 * @returns
 */
function debounce(func, delay) {
  var immediately = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var interval = null;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (immediately) {
      if (!interval) func.apply(void 0, args);
      interval && clearTimeout(interval);
      interval = (0, _setTimeout2["default"])(function () {
        return interval = null;
      }, delay);
    } else {
      clearTimeout(interval);
      interval = (0, _setTimeout2["default"])(function () {
        return func.apply(void 0, args);
      }, delay);
    }
  };
}
/**
 * 节流
 * @param func        节流的方法
 * @param delay       节流的时间间隔
 * @param immediately 是否立即执行 func
 * @returns
 */
function throttle(func, delay) {
  var immediately = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var interval = null;
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    if (immediately) {
      if (interval) return;
      func.apply(void 0, args);
      interval = (0, _setTimeout2["default"])(function () {
        return interval = null;
      }, delay);
    } else {
      if (interval) return;
      interval = (0, _setTimeout2["default"])(function () {
        func.apply(void 0, args);
        interval = null;
      }, delay);
    }
  };
}
// 获取视口尺寸
function getViewportSize() {
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return {
    width: width,
    height: height
  };
}
/**
 * 检测当前 element 是否是目标元素
 * @param element   要查询的目标元素
 * @param selector  CSS 选择器
 * @returns
 */
function elementMatches(element, selector) {
  if (typeof element.matches === 'function') {
    return element.matches(selector);
  } else if (typeof element.mozMatchesSelector === 'function') {
    var _element$mozMatchesSe;
    return (_element$mozMatchesSe = element.mozMatchesSelector) === null || _element$mozMatchesSe === void 0 ? void 0 : _element$mozMatchesSe.call(element, selector);
  } else if (typeof element.webkitMatchesSelector === 'function') {
    return element.webkitMatchesSelector(selector);
  } else {
    var matches = document.querySelectorAll(selector);
    var length = matches.length;
    while (length--) {
      if (matches[length] === element) return true;
    }
    return false;
  }
}