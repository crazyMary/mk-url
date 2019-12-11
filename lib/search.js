"use strict";

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.from-entries");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.search");

require("core-js/modules/web.dom-collections.iterator");

exports.__esModule = true;
exports.default = void 0;

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
  return url.replace(/\?[^#]+/, query);
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
  params = Object.fromEntries(Object.keys(search).filter(function (target) {
    return !paramsSet.has(target);
  }).map(function (target) {
    return [target, search[target]];
  }));
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