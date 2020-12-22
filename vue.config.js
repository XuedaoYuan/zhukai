// 基础路径 注意发布之前要先修改这里
let publicPath = '/';
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack');
module.exports = {
  publicPath: publicPath, // 根据你的实际情况更改这里
  lintOnSave: true,
  devServer: {
    historyApiFallback: {
      index: '/index.html'
    },
    publicPath: publicPath, // 和 baseUrl 保持一致
    proxy: {
      // 测试环境
      '/api': {
        ws: false,
        target: 'http://172.18.20.105:8080', // 测试
        changeOrigin: true
      }
    }
  },
  productionSourceMap: false, // 生产打包时不输出map文件，增加打包速度
  /* css: {
    loaderOptions: {
      stylus: {
        data: `@import "@/styles/variables.stylus";`
      }
    }
  }, */
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '海南医保';
      return args;
    });
    /* config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
      {
        analyzerMode: 'static'
      }
    ]); */
    // config.plugin('hash-module').use(new webpack.HashedModuleIdsPlugin());
    // config.plugin('ignore').use(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-au/));
  },
  configureWebpack: {
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        // maxAsyncRequests: Infinity,
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`;
            }
          }
        }
      }
    }
  }
};
