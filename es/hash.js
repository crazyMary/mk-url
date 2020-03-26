import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.includes";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.reduce";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.set";
import "core-js/modules/es.string.includes";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.replace";
import "core-js/modules/es.string.search";
import "core-js/modules/web.dom-collections.iterator";

/*
 * @Author: zeqi
 * @Date: 2020-03-02 15:26:16
 */
import parse from './parse';

/**
 * @description: 获取hash参数
 * @param {string} url url1
 * @return: hash对象
 */
var hash = function hash(url) {
  return parse.hash(url);
};

hash.add = function (url, params) {
  if (params === void 0) {
    params = {};
  }

  var existParams = parse.hash(url).search;
  params = Object.assign({}, existParams, {}, params);
  return genUrl(url, params, existParams);
};

hash.remove = function (url, params) {
  if (params === void 0) {
    params = [];
  }

  var existParams = parse.hash(url).search;
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

export default hash;