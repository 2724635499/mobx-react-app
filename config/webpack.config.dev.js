'use strict'

const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const eslintFormatter = require('react-dev-utils/eslintFormatter')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const getClientEnvironment = require('./env')
const paths = require('./paths')

// const publicPath = '/'

const publicUrl = ''

const env = getClientEnvironment(publicUrl)

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: [
    require.resolve('./polyfills'),

    require.resolve('react-dev-utils/webpackHotDevClient'),

    paths.appIndexJs
  ],
  output: {
    // 代码带上注释
    pathinfo: true,

    chunkFilename: 'static/js/[name].chunk.js',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  resolve: {
    // 模块路径
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // 默认后缀
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    // 路径别名
    alias: {},
    plugins: [new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])]
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint')
            },
            loader: require.resolve('eslint-loader')
          }
        ],
        include: paths.appSrc
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              plugins: ['transform-decorators-legacy']
            }
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9' // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009'
                    })
                  ]
                }
              }
            ]
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      }
      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "file" loader.
    ]
  },
  plugins: [
    // 升级webpack4时，解决有些插件没法使用问题
    new webpack.LoaderOptionsPlugin({ options: {} }),
    // 生成index.html
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    // 定义全局变量
    new webpack.DefinePlugin(env.stringified),
    // 启动热更新
    new webpack.HotModuleReplacementPlugin(),
    // 方便打印错误
    new CaseSensitivePathsPlugin(),
    // 打包忽略moment里的locale
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  // 方便包含node模块的第三方库导入
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  //关闭因引入资源过大而警告
  performance: {
    hints: false
  },
  //配置环境为开发环境
  mode: 'development'
}
