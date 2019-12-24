import parse from './parse'
import { defineExport } from './shared'

function genUrl(url, params = {}) {
  const paramsKeys = Object.keys(params)
  const query = paramsKeys.length
    ? '?' +
      paramsKeys
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&')
    : ''
  return url.replace(/(\?[^#]*)|(?=#|$)/, query)
}

function searchAdd(url, params = {}) {
  params = { ...parse.search(url), ...params }
  return genUrl(url, params)
}

function searchRemove(url, params = []) {
  const search = parse.search(url)
  const paramsSet = new Set(params)
  params = Object.keys(search)
    .filter(target => !paramsSet.has(target))
    .map(target => ({ [target]: search[target] }))
    .reduce((target, current) => ({ ...target, ...current }), {})
  return genUrl(url, params)
}

function searchClear(url, ...args) {
  return genUrl(url)
}

const search = defineExport({
  add: searchAdd,
  remove: searchRemove,
  clear: searchClear
})

export default search
