"use strict";

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.reflect.define-property");

exports.__esModule = true;
exports.defineExport = defineExport;

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