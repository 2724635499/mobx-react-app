'use strict'

//配置env环境
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

//捕获执行中的错误，并抛出
process.on('unhandledRejection', err => {
  throw err
})

require('../config/env')

const fs = require('fs')
const chalk = require('chalk') //终端颜色插件
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const clearConsole = require('react-dev-utils/clearConsole') //终端清屏
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles') //检查文件存在
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils')
const openBrowser = require('react-dev-utils/openBrowser')
const paths = require('../config/paths')
const config = require('../config/webpack.config.dev')
const createDevServerConfig = require('../config/webpackDevServer.config')

const useYarn = fs.existsSync(paths.yarnLockFile)
const isInteractive = process.stdout.isTTY

// 检查/public/index.html,/src/index.js是否存在
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1)
}

// 定义host、port
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || '0.0.0.0'

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  )
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  )
  console.log(`Learn more here: ${chalk.yellow('http://bit.ly/2mwWSwH')}`)
  console.log()
}

//如果当前端口被占用，尝试换另一个
choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    if (port == null) {
      return
    }

    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
    const appName = require(paths.appPackageJson).name

    const urls = prepareUrls(protocol, HOST, port)

    // Create a webpack compiler that is configured with custom messages.
    const compiler = createCompiler(webpack, config, appName, urls, useYarn)

    // 配置proxy
    const proxySetting = require(paths.appPackageJson).proxy

    const proxyConfig = prepareProxy(proxySetting, paths.appPublic)

    // devServer配置
    const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig
    )

    const devServer = new WebpackDevServer(compiler, serverConfig)

    // Launch WebpackDevServer.
    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err)
      }
      if (isInteractive) {
        clearConsole()
      }
      console.log(chalk.cyan('开启服务中\n'))
      openBrowser(urls.localUrlForBrowser)
    })
    //终端执行中断，关闭服务，杀掉进程
    ;[('SIGINT', 'SIGTERM')].forEach(function(sig) {
      process.on(sig, function() {
        devServer.close()
        process.exit()
      })
    })
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })
