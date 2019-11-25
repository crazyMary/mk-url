# mk_url

> 浏览器端和 Node 原生模块都提供了处理 url 地址的 API,Node 的 url 处理器非常强大,但是无法在浏览器端使用,而浏览器端 location 对象只提供了对当前 url 的解析,而 mk_url 旨在对任意给定的 url 解析和改造.
> ​ mk_url 接口提供 babel 处理过的 cjs 和 es6 模块输出

## url 对象解析

```javascript
const mk = require('mk_url')
const url = 'https://www.baidu.com:1000/s?ie=UTF-8&wd=hashchange%E5%AF%BC%E8%87%B4jssdk%E5%A4%B1%E6%95%88#aaa/bbb?name=jack'

// 解析url:
mk.parse.url(url)
=>{
  href: 'https://www.baidu.com:1000/',
  origin: 'https://www.baidu.com:1000',
  protocol: 'https',
  host: 'www.baidu.com:1000',
  hostname: 'www.baidu.com',
  port: '1000',
  pathname: '/s',
  search: { ie: 'UTF-8', wd: 'hashchange导致jssdk失效' },
  hash: { pathname: 'aaa/bbb', search: { name: 'jack' } }
}

// 解析saerch:
mk.parse.search(url)
=>{ ie: 'UTF-8', wd: 'hashchange导致jssdk失效' }

// 解析hash:
mk.parse.hash(url)
=>{ pathname: 'aaa/bbb', search: { name: 'jack' } }
```

## url 的 search 增删改

> 表单查询时,经常会有刷新页面会记录上次查询条件的需求,这时候就可以应用 search 的增删改功能,生成带当前查询参数的 url,pushState 到 history 中,不会刷新页面,当用户在此刷新页面时候,从 search 中取之前的查询条件

```javascript
const mk = require('mk_url')
const url = 'https://www.baidu.com:1000/s?ie=UTF-8&wd=hashchange%E5%AF%BC%E8%87%B4jssdk%E5%A4%B1%E6%95%88'

// 增加参数,相同则修改
mk.search.add(url, { name: 'jim' })
=>'https://www.baidu.com:1000/s?ie=UTF-8&wd=hashchange%E5%AF%BC%E8%87%B4jssdk%E5%A4%B1%E6%95%88&name=jim'

// 删除参数
mk.search.remove(url, ['wd'])
=>'https://www.baidu.com:1000:1000/s?ie=UTF-8'

// 清除参数
mk.search.clear(url)
=>'https://www.baidu.com:1000:1000/s'
```
