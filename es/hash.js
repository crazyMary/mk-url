import "core-js/modules/es6.object.freeze";
import "core-js/modules/es6.string.iterator";
import "core-js/modules/es6.set";
import "core-js/modules/es6.object.assign";
import "core-js/modules/es6.regexp.search";
import "core-js/modules/es7.array.includes";
import "core-js/modules/es6.string.includes";
import "core-js/modules/es6.regexp.replace";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.to-string";
import "core-js/modules/es6.object.keys";
import parse from './parse';

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

function hashAdd(url, params) {
  if (params === void 0) {
    params = {};
  }

  var existParams = parse.hash(url).search;
  params = Object.assign({}, existParams, {}, params);
  return genUrl(url, params, existParams);
}

function hashRemove(url, params) {
  if (params === void 0) {
    params = [];
  }

  var existParams = parse.hash(url).search;
  var paramsSet = new Set(params);
  params = Object.keys(existParams).filter(function (target) {
    return !paramsSet.has(target);
  }).map(function (target) {
    var _ref;

    return _ref = {}, _ref[target] = existParams[target], _ref;
  }).reduce(function (target, current) {
    return Object.assign({}, target, {}, current);
  }, {});
  return genUrl(url, params, existParams);
}

var hash = {
  add: hashAdd,
  remove: hashRemove
};
Object.freeze(hash);
export default hash;