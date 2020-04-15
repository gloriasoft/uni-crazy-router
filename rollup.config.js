/* eslint-disable prefer-object-spread/prefer-object-spread */

import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import {uglify} from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
// import builtins from 'rollup-plugin-node-builtins'

const shared = {
  input: 'src/index.js',
  plugins: [
    // builtins(),
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    babel({
      exclude: 'node-modules/**',
    }),
    commonjs(),
    uglify({
      compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true
      }
    })
  ],
  external: ['url'],
}

export default [
  Object.assign({}, shared, {
    output: {
      file: 'dist/uni_crazy_router.umd.js',
      format: 'umd',
      name: 'uni-crazy-router',
      globals: {
        url: 'url'
      },
    },
  }),
]
