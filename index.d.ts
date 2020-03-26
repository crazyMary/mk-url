/*
 * @Author: zeqi
 * @Date: 2020-03-26 09:24:57
 */
export type objParamType = { [propName: string]: string }

export interface SearchInterface {
  [propName: string]: string
}

export interface HashInterface {
  pathname: string
  search: { [propName: string]: string }
}

export interface ParseInterface {
  href: string
  protocol: string
  host: string
  hostname: string
  pathname: string
  port: string
  search: SearchInterface
  hash: HashInterface
}

export interface HashModuleInterface {
  /**
   * @description: 解析hash对象
   * @param {string} url url
   * @return {HashInterface} HashInterface
   */
  (url: string): HashInterface
  /**
   * @description: 添加hash参数
   * @param {string} url url
   * @param {objParamType} params hash参数对象
   * @return: 生成的url
   */
  add: (url: string, params?: objParamType) => string
  /**
   * @description: 移除hash参数
   * @param {string} url url
   * @param {string[]} params 移除的hash数组
   * @return: 生成的url
   */
  remove: (url: string, params?: string[]) => string
}

export interface SearchModuleInterface {
  /**
   * @description: 解析search对象
   * @param {string} url url
   * @return {SearchInterface} SearchInterface
   */
  (url: string): SearchInterface
  /**
   * @description: 添加参数方法
   * @param {string} url url
   * @param {objParamType} params 参数对象
   * @return: 生成的url
   */
  add: (url: string, params?: objParamType) => string
  /**
   * @description: 移除参数
   * @param {string} url url
   * @param {string[]} params 移除的参数
   * @return: 生成的url
   */
  remove: (url: string, params?: string[]) => string
  /**
   * @description: 清除url参数
   * @param {string} url url
   * @return: 清除参数的url
   */
  clear: (url: string) => string
}

export interface ParseModuleInterface {
  /**
   * @description: 解析url
   * @param {string} url url
   * @return {ParseModuleInterface} ParseModuleInterface
   */
  (url: string): ParseInterface
  /**
   * @description: 解析search对象
   * @param {string} url url
   * @return {SearchInterface} SearchInterface
   */
  search: (url: string) => SearchInterface
  /**
   * @description: 解析hash对象
   * @param {string} url url
   * @return {HashInterface} HashInterface
   */
  hash: (url: string) => HashInterface
}

declare const parse: ParseModuleInterface
declare const search: SearchModuleInterface
declare const hash: HashModuleInterface

export { parse, search, hash }
