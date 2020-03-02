"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _parse = _interopRequireDefault(require("./parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  var existParams = _parse.default.hash(url).search;

  params = Object.assign({}, existParams, {}, params);
  return genUrl(url, params, existParams);
}

function hashRemove(url, params) {
  if (params === void 0) {
    params = [];
  }

  var existParams = _parse.default.hash(url).search;

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
var _default = hash;
exports.default = _default;