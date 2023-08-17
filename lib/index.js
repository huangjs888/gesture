"use strict";

var _WeakMap = require("@babel/runtime-corejs3/core-js/weak-map");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js/object/get-own-property-descriptor");
var _Object$keys = require("@babel/runtime-corejs3/core-js/object/keys");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
exports.__esModule = true;
var _exportNames = {
  EventTarget: true
};
exports.default = void 0;
var _event = _interopRequireDefault(require("./event"));
exports.EventTarget = _event.default;
var _gesture = _interopRequireWildcard(require("./gesture"));
_Object$keys(_gesture).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _gesture[key]) return;
  exports[key] = _gesture[key];
});
function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
 * @Author: Huangjs
 * @Date: 2023-07-26 16:28:53
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-07-27 10:50:40
 * @Description: ******
 */
var _default = _gesture.default;
exports.default = _default;