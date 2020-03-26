"use strict";

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.search");

require("core-js/modules/es.string.split");

exports.__esModule = true;
exports.default = void 0;

/*
 * @Author: zeqi
 * @Date: 2020-03-10 09:37:17
 */

/**
 * @description: 参数字符转对象
 * @param {string} search url参数字符
 * @return {SearchInterface}  参数对象
 */
function parseSearch2Object(search) {
  search = search.substr(1);
  if (!search) return {};
  return search.split('&').map(function (item) {
    var _ref2;

    var _ref = item.match(/(.+?)=(.*)/),
        match = _ref[0],
        key = _ref[1],
        value = _ref[2];

    return _ref2 = {}, _ref2[key] = decodeURIComponent(value), _ref2;
  }).reduce(function (target, current) {
    return Object.assign({}, target, {}, current);
  }, {});
}

var parse = function parse(url) {
  return {
    href: url.match(/^https?:\/{2}[^\/]+\//)[0],
    protocol: url.match(/^https?/)[0],
    host: url.match(/^https?:\/{2}([^\/]+)/)[1],
    hostname: url.match(/^https?:\/{2}([^:\/]+)/)[1],
    port: url.match(/:(\d+)\//) ? url.match(/:(\d+)\//)[1] : '',
    pathname: url.match(/https?:\/{2}[^\/]+(\/[^#\?]+)/)[1],
    search: parse.search(url),
    hash: parse.hash(url)
  };
};

parse.hash = function (url) {
  var hash = {
    pathname: '',
    search: {}
  };

  if (url.match(/#.*/)) {
    var hashStr = url.match(/#.*/)[0];
    hash.pathname = hashStr.match(/#([^\?]+)/)[1];
    hash.search = hashStr.match(/\?/) ? parseSearch2Object(hashStr.match(/\?.+/)[0]) : {};
  }

  return hash;
};

parse.search = function (url) {
  return url.replace((url.match(/#.*/) || [''])[0], '').match(/\?/) ? parseSearch2Object(url.match(/\?[^#]*/)[0]) : {};
};

var _default = parse;
exports.default = _default;