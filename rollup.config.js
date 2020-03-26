/*
 * @Author: zeqi
 * @Date: 2020-03-23 13:50:15
 */
import { DEFAULT_EXTENSIONS } from '@babel/core'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts',
  output: {
    format: 'umd',
    name: 'mkUrl'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx']
    }),
    commonjs({
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx']
    }),
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  ]
}
