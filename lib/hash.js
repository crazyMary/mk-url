"use strict";

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.set");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.search");

require("core-js/modules/web.dom-collections.iterator");

exports.__esModule = true;
exports.default = void 0;

var _parse = _interopRequireDefault(require("./parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: zeqi
 * @Date: 2020-03-02 15:26:16
 */

/**
 * @description: 获取hash参数
 * @param {string} url url1
 * @return: hash对象
 */
var hash = function hash(url) {
  return _parse.default.hash(url);
};

hash.add = function (url, params) {
  if (params === void 0) {
    params = {};
  }

  var existParams = _parse.default.hash(url).search;

  params = Object.assign({}, existParams, {}, params);
  return genUrl(url, params, existParams);
};

hash.remove = function (url, params) {
  if (params === void 0) {
    params = [];
  }

  var existParams = _parse.default.hash(url).search;

  var paramsSet = new Set(params);
  var paramsObj = Object.keys(existParams).filter(function (target) {
    return !paramsSet.has(target);
  }).map(function (target) {
    var _ref;

    return _ref = {}, _ref[target] = existParams[target], _ref;
  }).reduce(function (target, current) {
    return Object.assign({}, target, {}, current);
  }, {});
  return genUrl(url, paramsObj, existParams);
};

function genUrl(url, params, existParams) {
  if (params === void 0) {
    params = {};
  }

  if (existParams === void 0) {
    existParams = {};
  }

  var paramsKeys = Object.keys(params);
  var query = paramsKeys.length ? '?' + paramsKeys.map(function (key) {
    return key + "=" + encodeURIComponent(params[key]);
  }).join('&') : '';

  if (Object.keys(existParams).length) {
    return url.replace(/(#[\s\S]*)\?[\s\S]*/, function ($1, $2) {
      return $2 + query;
    });
  } else {
    return url.replace(/$/, function () {
      if (url.includes('#')) return query;else return '#/' + query;
    });
  }
}

var _default = hash;
exports.default = _default;