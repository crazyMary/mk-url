/*
 * @Author: zeqi
 * @Date: 2020-02-25 12:19:24
 */
import parse from './parse'
import { objParamType, SearchModuleInterface, SearchInterface } from '../index'
/**
 * @param {string} url url
 * @return 参数对象
 */
const search: SearchModuleInterface = function(url: string): SearchInterface {
  return parse.search(url)
}

search.add = function(url: string, params: objParamType = {}): string {
  params = { ...parse.search(url), ...params }
  return genUrl(url, params)
}

search.remove = function(url: string, params: string[] = []) {
  const search = parse.search(url)
  const paramsSet = new Set(params)
  const paramsObj = Object.keys(search)
    .filter((target: string): boolean => !paramsSet.has(target))
    .map(target => ({ [target]: search[target] }))
    .reduce((target, current) => ({ ...target, ...current }), {})
  return genUrl(url, paramsObj)
}


search.clear = function(url: string) {
  return genUrl(url)
}

/**
 * @param {string} url 原始url
 * @param {object} params Search Object
 * @return {string} Gened url
 */
function genUrl(url: string, params: objParamType = {}): string {
  const paramsKeys = Object.keys(params)
  const query = paramsKeys.length
    ? '?' +
      paramsKeys
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&')
    : ''
  return url.replace(/(\?[^#]*)|(?=#|$)/, () => query)
}

export default search
