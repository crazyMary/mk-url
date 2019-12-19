import "core-js/modules/es.array.map";
import "core-js/modules/es.array.reduce";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.match";
import "core-js/modules/es.string.replace";
import "core-js/modules/es.string.split";
import { defineExport } from './shared';

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
  return url.replace((url.match(/#.*/) || [''])[0], '').match(/\?/) ? parseSearch2Object(url.match(/\?[^#]+/)[0]) : {};
}

var parse = defineExport({
  url: parseUrl,
  search: parseSearch,
  hash: parseHash
});
export default parse;