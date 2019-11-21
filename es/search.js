import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.reduce";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.set";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.replace";
import "core-js/modules/es.string.search";
import "core-js/modules/web.dom-collections.iterator";
import parse from './parse';

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

var search = {};

search.add = function (url, params) {
  if (params === void 0) {
    params = {};
  }

  params = Object.assign({}, parse.search(url), {}, params);
  return genUrl(url, params);
};

search.remove = function (url, params) {
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
};

search.clear = genUrl;
export default search;