const search = require('../lib/search').default
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
  'https://www.baidu.com:1000/s?ie=UTF-8&wd=hashchange%E5%AF%BC%E8%87%B4jssdk%E5%A4%B1%E6%95%88'
const addResult = search.add(url, { name: 'jack' })
const expectAddResult = url + '&name=jack'
const removeResult = search.remove(url, ['ie'])
const expectRemoveResult =
  'https://www.baidu.com:1000/s?wd=hashchange%E5%AF%BC%E8%87%B4jssdk%E5%A4%B1%E6%95%88'
const clearResult = search.clear(url)
const expectClearResult = 'https://www.baidu.com:1000/s'

describe('#search', function() {
  describe('##add', function() {
    it('expect addResult equal with expectAddResult', function() {
      expect(addResult).to.equal(expectAddResult)
    })
  })

  describe('##remove', function() {
    it('expect removeResult equal with expectRemoveResult', function() {
      expect(removeResult).to.equal(expectRemoveResult)
    })
  })

  describe('##clear', function() {
    it('expect clearResult equal with expectClearResult', function() {
      expect(clearResult).to.equal(expectClearResult)
    })
  })
})
