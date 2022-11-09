const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        //httpL//localhost:8080/api -> 3000 
        changeOrigin: true,    //设置它，表示后端接口不用有所改变
        //http://localhost:8080/api  ->  http://localhost:3000/api 
        //http://localhost:8080/api -> http://localhost:3000/
        pathRewrite: {'^/api' : ''}
      }
    }
  }
})
