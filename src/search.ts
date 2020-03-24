/*
 * @Author: zeqi
 * @Date: 2020-02-25 12:19:24
 */
import parse from './parse'
type stringObj = { [propName: string]: string }

/**
 * @param {string} url url
 * @return 参数对象
 */
const search = function(url: string) {
  return parse.search(url)
}

/**
 * @description: 添加参数方法
 * @param {string} url url
 * @param {stringObj} params 参数对象
 * @return: 生成的url
 */
search.add = function(url: string, params: stringObj = {}) {
  params = { ...parse.search(url), ...params }
  return genUrl(url, params)
}

/**
 * @description: 移除参数
 * @param {string} url url
 * @param {string[]} params 移除的参数
 * @return: 生成的url
 */
search.remove = function(url: string, params: string[] = []) {
  const search = parse.search(url)
  const paramsSet = new Set(params)
  const paramsObj = Object.keys(search)
    .filter((target: string): boolean => !paramsSet.has(target))
    .map(target => ({ [target]: search[target] }))
    .reduce((target, current) => ({ ...target, ...current }), {})
  return genUrl(url, paramsObj)
}

/**
 * @description: 清除url参数
 * @param {string} url url
 * @return: 清除参数的url
 */
search.clear = function(url: string) {
  return genUrl(url)
}

/**
 * @param {string} url 原始url
 * @param {object} params Search Object
 * @return {string} Gened url
 */
function genUrl(url: string, params: stringObj = {}): string {
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
