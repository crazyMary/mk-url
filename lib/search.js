"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _parse = _interopRequireDefault(require("./parse"));

var _shared = require("./shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function genUrl(url, params) {
  if (params === void 0) {
    params = {};
  }

  var paramsKeys = Object.keys(params);
  var query = paramsKeys.length ? '?' + paramsKeys.map(function (key) {
    return key + "=" + encodeURIComponent(params[key]);
  }).join('&') : '';
  return url.replace(/(\?[^#]*)|(?=#|$)/, query);
}

function searchAdd(url, params) {
  if (params === void 0) {
    params = {};
  }

  params = Object.assign({}, _parse.default.search(url), {}, params);
  return genUrl(url, params);
}

function searchRemove(url, params) {
  if (params === void 0) {
    params = [];
  }

  var search = _parse.default.search(url);

  var paramsSet = new Set(params);
  params = Object.keys(search).filter(function (target) {
    return !paramsSet.has(target);
  }).map(function (target) {
    var _ref;

    return _ref = {}, _ref[target] = search[target], _ref;
  }).reduce(function (target, current) {
    return Object.assign({}, target, {}, current);
  }, {});
  return genUrl(url, params);
}

function searchClear(url) {
  return genUrl(url);
}

var search = (0, _shared.defineExport)({
  add: searchAdd,
  remove: searchRemove,
  clear: searchClear
});
var _default = search;
exports.default = _default;