export function defineExport(module) {
  return Object.entries(module).reduce(function(target, next) {
    const [key, value] = next
    const descriptor = {
      value,
      configurable: false,
      enumerable: true,
      writable: false
    }
    Reflect.defineProperty(target, key, descriptor)
    return target
  }, {})
}
