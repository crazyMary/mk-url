const parse = require('../lib/parse').default
const expect = require('chai').expect
const result = {
  href: 'https://www.baidu.com:3333/',
  protocol: 'https',
  host: 'www.baidu.com:3333',
  hostname: 'www.baidu.com',
  port: '3333',
  pathname: '/s',
  search: { ie: 'UTF-8', wd: 'hashchange导致jssdk失效' },
  hash: { pathname: 'aaa/bbb', search: { name: 'jack' } }
}
const url =
  'https://www.baidu.com:3333/s?ie=UTF-8&wd=hashchange%E5%AF%BC%E8%87%B4jssdk%E5%A4%B1%E6%95%88#aaa/bbb?name=jack'

describe('url unit', function() {
  it('expect deep equal with result', function() {
    expect(parse(url)).to.deep.equal(result)
  })
})

describe('search unit', function() {
  it('expect deep equal with result search', function() {
    expect(parse.search(url)).to.deep.equal(result.search)
  })
})

describe('hash unit', function() {
  it('expect deep equal with hash result', function() {
    expect(parse.hash(url)).to.deep.equal(result.hash)
  })
})
