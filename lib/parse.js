"use strict";

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

exports.__esModule = true;
exports["default"] = void 0;

function parseSearch2Object(search) {
  return search.substr(1).split('&').map(function (item) {
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

var parse = {};

parse.url = function (url) {
  return {
    href: url.match(/^https?:\/{2}[^\/]+\//)[0],
    origin: url.replace(/(?<!\/)\/[^\/].+/, ''),
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
  var hash = {};

  if (url.match(/#.*/)) {
    var hashStr = url.match(/#.*/)[0];
    hash.pathname = hashStr.match(/#([^\?]+)/)[1];
    hash.search = hashStr.match(/\?/) ? parseSearch2Object(hashStr.match(/\?.+/)[0]) : {};
  }

  return hash;
};

parse.search = function (url) {
  return url.replace((url.match(/#.*/) || [''])[0], '').match(/\?/) ? parseSearch2Object(url.match(/\?[^#]+/)[0]) : {};
};

var _default = parse;
exports["default"] = _default;