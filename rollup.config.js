/* eslint-disable prefer-object-spread/prefer-object-spread */

import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
// import {uglify} from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'
import {terser} from 'rollup-plugin-terser'
const fs = require('fs-extra')
const path = require('path')

const env = process.env.BUILD_ENV || 'index'

function getGlobals () {
    // if (env === 'small') {
    //     return {
    //         url: 'url'
    //     }
    // }
    return {}
}

function getExternal () {
    // if (env === 'small') {
    //     return ['url']
    // }
    return []
}

function getInputFile () {
    // if (env === 'small') return 'index.js'
    return 'index.js'
}

const shared = {
  input: 'src/' + getInputFile(),
  plugins: [
      {
          buildStart () {
              fs.copySync(path.resolve(__dirname,'index.d.ts'), path.resolve(__dirname,`dist/${env === 'small' ? 'small' : 'index'}.d.ts`))
              fs.copySync(path.resolve(__dirname,'global.d.ts'), path.resolve(__dirname,`dist/global.d.ts`))
          }
      },
    builtins(),
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    babel({
      exclude: 'node-modules/**',
    }),
    commonjs(),
      terser({
      compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true
      }
    })
  ],
  external: getExternal(),
}

export default [
  Object.assign({}, shared, {
    output: {
      file: 'dist/' + env + '.js',
      format: 'esm',
      name: 'uni-crazy-router',
      globals: getGlobals()
    },
  }),
]
