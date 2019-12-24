"use strict";

exports.__esModule = true;
exports.defineExport = defineExport;

require("core-js/modules/es6.reflect.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.entries");

function defineExport(module) {
  return Object.entries(module).reduce(function (target, next) {
    var key = next[0],
        value = next[1];
    var descriptor = {
      value: value,
      configurable: false,
      enumerable: true,
      writable: false
    };
    Reflect.defineProperty(target, key, descriptor);
    return target;
  }, {});
}