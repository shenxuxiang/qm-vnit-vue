import '@babel/runtime-corejs3/helpers/typeof';
import 'core-js/modules/es.error.to-string.js';
import 'core-js/modules/es.date.to-string.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.regexp.to-string.js';
import 'core-js/modules/es.number.to-fixed.js';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.regexp.test.js';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import '@babel/runtime-corejs3/core-js-stable/url';
import _setTimeout from '@babel/runtime-corejs3/core-js-stable/set-timeout';
import '@babel/runtime-corejs3/core-js-stable/promise';

function getType(data) {
  var _context;
  return _sliceInstanceProperty(_context = Object.prototype.toString.call(data)).call(_context, 8, -1);
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
      return _concatInstanceProperty(_context2 = _Object$keys(data)).call(_context2, _Object$getOwnPropertySymbols(data)).length <= 0;
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
      interval = _setTimeout(function () {
        return interval = null;
      }, delay);
    } else {
      clearTimeout(interval);
      interval = _setTimeout(function () {
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
      interval = _setTimeout(function () {
        return interval = null;
      }, delay);
    } else {
      if (interval) return;
      interval = _setTimeout(function () {
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

export { debounce, elementMatches, getType, getViewportSize, isArray, isEmpty, throttle };
