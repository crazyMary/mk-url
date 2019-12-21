import { defineExport } from './shared'

function parseSearch2Object(search) {
  search = search.substr(1)
  if (!search) return {}
  return search
    .split('&')
    .map(item => {
      const [match, key, value] = item.match(/(.+?)=(.+)/)
      return { [key]: decodeURIComponent(value) }
    })
    .reduce((target, current) => ({ ...target, ...current }), {})
}

function parseUrl(url) {
  return {
    href: url.match(/^https?:\/{2}[^\/]+\//)[0],
    protocol: url.match(/^https?/)[0],
    host: url.match(/^https?:\/{2}([^\/]+)/)[1],
    hostname: url.match(/^https?:\/{2}([^:\/]+)/)[1],
    port: url.match(/:(\d+)\//) ? url.match(/:(\d+)\//)[1] : '',
    pathname: url.match(/https?:\/{2}[^\/]+(\/[^#\?]+)/)[1],
    search: parseSearch(url),
    hash: parseHash(url)
  }
}

function parseHash(url) {
  const hash = {}
  if (url.match(/#.*/)) {
    const hashStr = url.match(/#.*/)[0]
    hash.pathname = hashStr.match(/#([^\?]+)/)[1]
    hash.search = hashStr.match(/\?/)
      ? parseSearch2Object(hashStr.match(/\?.+/)[0])
      : {}
  }
  return hash
}

function parseSearch(url) {
  return url.replace((url.match(/#.*/) || [''])[0], '').match(/\?/)
    ? parseSearch2Object(url.match(/\?[^#]*/)[0])
    : {}
}

const parse = defineExport({
  url: parseUrl,
  search: parseSearch,
  hash: parseHash
})

export default parse
