"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.split");

function parseSearch2Object(search) {
  search = search.substr(1);
  if (!search) return {};
  return search.split('&').map(function (item) {
    var _ref;

    var _item$match = item.match(/(.+?)=(.+)/),
        match = _item$match[0],
        key = _item$match[1],
        value = _item$match[2];

    return _ref = {}, _ref[key] = decodeURIComponent(value), _ref;
  }).reduce(function (target, current) {
    return Object.assign({}, target, {}, current);
  }, {});
}

function parseUrl(url) {
  return {
    href: url.match(/^https?:\/{2}[^\/]+\//)[0],
    protocol: url.match(/^https?/)[0],
    host: url.match(/^https?:\/{2}([^\/]+)/)[1],
    hostname: url.match(/^https?:\/{2}([^:\/]+)/)[1],
    port: url.match(/:(\d+)\//) ? url.match(/:(\d+)\//)[1] : '',
    pathname: url.match(/https?:\/{2}[^\/]+(\/[^#\?]+)/)[1],
    search: parseSearch(url),
    hash: parseHash(url)
  };
}

function parseHash(url) {
  var hash = {};

  if (url.match(/#.*/)) {
    var hashStr = url.match(/#.*/)[0];
    hash.pathname = hashStr.match(/#([^\?]+)/)[1];
    hash.search = hashStr.match(/\?/) ? parseSearch2Object(hashStr.match(/\?.+/)[0]) : {};
  }

  return hash;
}

function parseSearch(url) {
  return url.replace((url.match(/#.*/) || [''])[0], '').match(/\?/) ? parseSearch2Object(url.match(/\?[^#]*/)[0]) : {};
}

var parse = {
  url: parseUrl,
  search: parseSearch,
  hash: parseHash
};
Object.freeze(parse);
var _default = parse;
exports.default = _default;