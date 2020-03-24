/*
 * @Author: zeqi
 * @Date: 2020-03-02 15:26:16
 */
import parse from './parse'

type stringObj = { [propName: string]: string }
interface HashModuleInterface {
  add: (url: string, params?: stringObj) => string
  remove: (url: string, params?: string[]) => string
}
interface HashInterface {
  pathname: string
  search: { [propName: string]: string }
}

const hash: HashModuleInterface = function(url: string): HashInterface {
  return parse.hash(url)
}

hash.add = function(url: string, params: stringObj = {}): string {
  const existParams: stringObj = parse.hash(url).search
  params = { ...existParams, ...params }
  return genUrl(url, params, existParams)
}

hash.remove = function(url: string, params: string[] = []): string {
  const existParams = parse.hash(url).search
  const paramsSet = new Set(params)
  const paramsObj = Object.keys(existParams)
    .filter(target => !paramsSet.has(target))
    .map(target => ({ [target]: existParams[target] }))
    .reduce((target, current) => ({ ...target, ...current }), {})
  return genUrl(url, paramsObj, existParams)
}

function genUrl(
  url: string,
  params: stringObj = {},
  existParams: stringObj = {}
): string {
  const paramsKeys = Object.keys(params)
  const query = paramsKeys.length
    ? '?' +
      paramsKeys
        .map((key: string) => `${key}=${encodeURIComponent(params[key])}`)
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

export default hash
