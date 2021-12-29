module.exports = {
    devServer: {
        port: 8081,
        proxy: {
          '^/myasset':{
            target: 'http://namsuhwang.synology.me:8090',
            changeOrigin: true
          },
        }
      }
  };