module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: '', 
  indexPath: 'index.html',
  lintOnSave: false,
  productionSourceMap: true,
  devServer: {
    port: 8091,
    hot: true,
    open: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: false
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html', 
      title: '体态测试'
    }
  },
};