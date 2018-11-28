const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let options = {}

module.exports = {
  // 你想要打包的模块的数组
  entry: {
    app: ['babel-polyfill', '../src/main.js']
    // vendor: ['babel-polyfill', '../src/main.js']
  },
  //'../src/main.js'
  devtool: 'source-map',
  // externals: {
  //   'vue': 'Vue',
  //   'vue-router': 'VueRouter',
  //   'vuex': 'Vuex',
  //   'axios': 'Axios'
  // },
  output: {
    path: path.join(__dirname, '../static/js'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    }),
    // 压缩打包的文件
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: config.build.productionSourceMap,
      parallel: true,
      uglify: true,
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true
      }
    })

    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     ecma: 8,
    //     warnings: false,
    //     parse: { ...options
    //     },
    //     compress: { ...options
    //     },
    //     mangle: {
    //       ...options,
    //       properties: {
    //         // mangle property options
    //       }
    //     },
    //     output: {
    //       comments: false,
    //       beautify: false,
    //       ...options
    //     },
    //     toplevel: false,
    //     nameCache: null,
    //     ie8: false,
    //     keep_classnames: undefined,
    //     keep_fnames: false,
    //     safari10: false,
    //   }
    // })
  ]

}
