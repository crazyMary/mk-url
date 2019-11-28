import "core-js/modules/es.array.reduce";
import "core-js/modules/es.object.entries";
import "core-js/modules/es.reflect.define-property";
export function defineExport(module) {
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