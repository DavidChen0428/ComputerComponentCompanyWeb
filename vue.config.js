// 使用proxy解決跨域問題
module.exports = {
  devServer: {
    proxy: {
      '/loginEmployee': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/employees': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/products': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/orders': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/report': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
}
