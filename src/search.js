import parse from './parse'

function genUrl(url, params = {}) {
  const paramsKeys = Object.keys(params)
  const query = paramsKeys.length
    ? '?' +
      paramsKeys
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&')
    : ''
  return url.replace(/\?[^#]+/, query)
}

const search = {}

search.add = function(url, params = {}) {
  params = { ...parse.search(url), ...params }
  return genUrl(url, params)
}

search.remove = function(url, params = []) {
  const search = parse.search(url)
  const paramsSet = new Set(params)
  params = Object.keys(search)
    .filter(target => !paramsSet.has(target))
    .map(target => ({ [target]: search[target] }))
    .reduce((target, current) => ({ ...target, ...current }), {})
  return genUrl(url, params)
}

search.clear = genUrl

export default search
