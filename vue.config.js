module.exports = {
    devServer: {
        overlay: false,
        port: 8081,
        proxy: {
          '^/myasset':{
            target: 'http://myasset.ddns.net:8090',
            // target: 'http://192.168.1.4:8090',
            changeOrigin: true,
            logLevel: 'debug', // 터미널에 proxy 로그가 찍힌다. 
          },
        },
        disableHostCheck: true
      }
  };