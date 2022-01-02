module.exports = {
    devServer: {
        port: 8081,
        proxy: {
          '^/myasset':{
            target: 'http://myasset.ddns.net:8090',
            changeOrigin: true
          },
        },
        disableHostCheck: true
      }
  };