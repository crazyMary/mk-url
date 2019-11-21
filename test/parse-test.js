const parse = require('../lib/parse').default
const expect = require('chai').expect

const result = {
  origin: 'https://www.baidu.com:1000',
  protocol: 'https',
  hostname: 'www.baidu.com',
  port: '1000',
  pathname: '/s',
  search: { ie: 'UTF-8', wd: 'hashchange导致jssdk失效' },
  hash: { pathname: 'aaa/bbb', search: { name: 'jack' } }
}
const url =
  'https://www.baidu.com:1000/s?ie=UTF-8&wd=hashchange%E5%AF%BC%E8%87%B4jssdk%E5%A4%B1%E6%95%88#aaa/bbb?name=jack'
const urlResult = parse.url(url)
const searchResult = parse.search(url)
const hashResult = parse.hash(url)

describe('#parse', function() {
  describe('##url', function() {
    it('expect deep equal with result', function() {
      expect(urlResult).to.deep.equal(result)
    })
  })

  describe('##search', function() {
    it('expect deep equal with result search', function() {
      expect(searchResult).to.deep.equal(result.search)
    })
  })

  describe('##hash', function() {
    it('expect deep equal with hash result', function() {
      expect(hashResult).to.deep.equal(result.hash)
    })
  })
})
