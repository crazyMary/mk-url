/*
 * @Author: zeqi
 * @Date: 2019-12-31 15:23:19
 */
const commonjs = process.env.BABEL_ENV === 'commonjs'

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        loose: true,
        useBuiltIns: 'usage',
        targets: {
          browsers: '> 0.25%, not dead'
        },
        corejs: 3
      }
    ],
    '@babel/typescript'
  ],
  plugins: [
    commonjs && ['@babel/transform-modules-commonjs', { loose: true }]
  ].filter(Boolean)
}
