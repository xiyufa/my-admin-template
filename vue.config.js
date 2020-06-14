const path = require('path')

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    // 配置@别名
    config.resolve.alias.set('@', path.join(__dirname, 'src'))
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {}
}
