import parse from './parse'

function genUrl(url, params = {}, existParams = {}) {
  const paramsKeys = Object.keys(params)
  const query = paramsKeys.length
    ? '?' +
      paramsKeys
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&')
    : ''
  if (Object.keys(existParams).length) {
    return url.replace(/(#[\s\S]*)\?[\s\S]*/, ($1, $2) => $2 + query)
  } else {
    return url.replace(/$/, () => {
      if (url.includes('#')) return query
      else return '#/' + query
    })
  }
}

function hashAdd(url, params = {}) {
  const existParams = parse.hash(url).search
  params = { ...existParams, ...params }
  return genUrl(url, params, existParams)
}

function hashRemove(url, params = []) {
  const existParams = parse.hash(url).search
  const paramsSet = new Set(params)
  params = Object.keys(existParams)
    .filter(target => !paramsSet.has(target))
    .map(target => ({ [target]: existParams[target] }))
    .reduce((target, current) => ({ ...target, ...current }), {})
  return genUrl(url, params, existParams)
}

const hash = {
  add: hashAdd,
  remove: hashRemove
}

Object.freeze(hash)

export default hash
