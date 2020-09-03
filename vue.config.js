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
    },
    proxy: {
      '/bdc': {
        target: 'https://m.urehab.cn',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/bdc': ''
        }
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/bdcm/' : '',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html', 
      title: 'ROM智能评测'
    }
  },
};