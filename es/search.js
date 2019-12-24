import "core-js/modules/es6.string.iterator";
import "core-js/modules/es6.set";
import "core-js/modules/es6.regexp.search";
import "core-js/modules/es6.object.assign";
import "core-js/modules/es6.regexp.replace";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.to-string";
import "core-js/modules/es6.object.keys";
import parse from './parse';
import { defineExport } from './shared';

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

  params = Object.assign({}, parse.search(url), {}, params);
  return genUrl(url, params);
}

function searchRemove(url, params) {
  if (params === void 0) {
    params = [];
  }

  var search = parse.search(url);
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

var search = defineExport({
  add: searchAdd,
  remove: searchRemove,
  clear: searchClear
});
export default search;