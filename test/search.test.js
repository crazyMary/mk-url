const search = require('../lib/search').default
const expect = require('chai').expect
const url =
  'https://www.baidu.com/s?ie=UTF-8&wd=hashchange%E5%AF%BC%E8%87%B4jssdk%E5%A4%B1%E6%95%88'

describe('func unit', function() {
  it('expect addResult equal with expectAddResult', function() {
    expect(search.add(url, { $$name: 'jack' })).to.equal(url + '&$$name=jack')
  })
})

describe('remove unit', function() {
  it('expect removeResult equal with expectRemoveResult', function() {
    expect(search.remove(url, ['ie'])).to.equal(
      'https://www.baidu.com/s?wd=hashchange%E5%AF%BC%E8%87%B4jssdk%E5%A4%B1%E6%95%88'
    )
  })
})

describe('clear unit', function() {
  it('expect clearResult equal with expectClearResult', function() {
    expect(search.clear(url)).to.equal('https://www.baidu.com/s')
  })
})
