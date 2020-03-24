interface ParseInterface {
  href: string
  protocol: string
  host: string
  hostname: string
  pathname: string
  port: string
  search: SearchInterface
  hash: HashInterface
}

interface SearchInterface {
  [propName: string]: string
}

interface HashInterface {
  pathname: string
  search: { [propName: string]: string }
}

/**
 * @description: 参数字符转对象
 * @param {string} search url参数字符
 * @return {SearchInterface}  参数对象
 */
function parseSearch2Object(search: string): SearchInterface {
  search = search.substr(1)
  if (!search) return {}
  return search
    .split('&')
    .map(item => {
      const [, key, value] = item.match(/(.+?)=(.*)/)
      return { [key]: decodeURIComponent(value) }
    })
    .reduce((target, current) => ({ ...target, ...current }), {})
}

/**
 * @description: 解析url
 * @param {string} url url
 * @return {ParseInterface} ParseInterface
 */
function parse(url: string): ParseInterface {
  return {
    href: (<string[]>url.match(/^https?:\/{2}[^\/]+\//))[0],
    protocol: (<string[]>url.match(/^https?/))[0],
    host: (<string[]>url.match(/^https?:\/{2}([^\/]+)/))[1],
    hostname: (<string[]>url.match(/^https?:\/{2}([^:\/]+)/))[1],
    port: url.match(/:(\d+)\//) ? (<string[]>url.match(/:(\d+)\//))[1] : '',
    pathname: (<string[]>url.match(/https?:\/{2}[^\/]+(\/[^#\?]+)/))[1],
    search: parse.search(url),
    hash: parse.hash(url)
  }
}
/**
 * @description: 解析hash对象
 * @param {string} url url
 * @return {HashInterface} HashInterface
 */
parse.hash = function(url: string): HashInterface {
  const hash: HashInterface = { pathname: '', search: {} }
  if (url.match(/#.*/)) {
    const hashStr = (<string[]>url.match(/#.*/))[0]
    hash.pathname = (<string[]>hashStr.match(/#([^\?]+)/))[1]
    hash.search = hashStr.match(/\?/)
      ? parseSearch2Object((<string[]>hashStr.match(/\?.+/))[0])
      : {}
  }
  return hash
}
/**
 * @description: 解析search对象
 * @param {string} url url
 * @return {SearchInterface} SearchInterface
 */
parse.search = function(url: string): SearchInterface {
  return url.replace((url.match(/#.*/) || [''])[0], '').match(/\?/)
    ? parseSearch2Object((<string[]>url.match(/\?[^#]*/))[0])
    : {}
}

export default parse
