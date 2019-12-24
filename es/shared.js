import "core-js/modules/es6.reflect.define-property";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.to-string";
import "core-js/modules/es7.object.entries";
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