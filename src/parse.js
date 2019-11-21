function parseSearch2Object(search) {
  return search
    .substr(1)
    .split('&')
    .map(item => {
      const [match, key, value] = item.match(/(.+?)=(.+)/)
      return { [key]: decodeURIComponent(value) }
    })
    .reduce((target, current) => ({ ...target, ...current }), {})
}

const parse = {}

parse.url = function(url) {
  return {
    origin: url.replace(/(?<!\/)\/[^\/].+/, ''),
    protocol: url.match(/^https?/)[0],
    hostname: url.match(/^https?:\/{2}([^:\/]+)/)[1],
    port: url.match(/:(\d+)\//) ? url.match(/:(\d+)\//)[1] : '',
    pathname: url.match(/https?:\/{2}[^\/]+(\/[^#\?]+)/)[1],
    search: parse.search(url),
    hash: parse.hash(url)
  }
}

parse.hash = function(url) {
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

parse.search = function(url) {
  return url.replace((url.match(/#.*/) || [''])[0], '').match(/\?/)
    ? parseSearch2Object(url.match(/\?[^#]+/)[0])
    : {}
}

export default parse
