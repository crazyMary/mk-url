import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.from-entries";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.set";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.replace";
import "core-js/modules/es.string.search";
import "core-js/modules/web.dom-collections.iterator";
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

var search = defineExport({
  add: searchAdd,
  remove: searchRemove,
  clear: searchClear
});
export default search;