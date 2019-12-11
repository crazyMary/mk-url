const commonjs = process.env.BABEL_ENV === 'commonjs'

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        loose: true,
        useBuiltIns: 'usage',
        corejs: '3',
        targets: {
          browsers: '> 0.25%, not dead'
        }
      }
    ]
  ],
  plugins: [
    commonjs && ['@babel/transform-modules-commonjs', { loose: true }],
    '@babel/proposal-export-default-from'
  ].filter(Boolean)
}
