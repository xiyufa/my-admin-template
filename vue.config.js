const path = require('path')
const defaultSettings = require('./src/setting')

const name = defaultSettings.title || 'Vue Template Admin'
const isPro = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isPro ? '/test' : '/',
  productionSourceMap: false,
  chainWebpack: config => {
    // 配置@别名
    config.resolve.alias.set('@', path.join(__dirname, 'src'))
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {}
}
