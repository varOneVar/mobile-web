const path = require('path')
const pxtorem = require('postcss-pxtorem')

function resolve(str) {
  return path.resolve(__dirname, str)
}

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  runtimeCompiler: true,
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件
    extract: true,

    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {}

  },
  devServer: {
    open: true,
    port: 7876,
    https: false,
    hotOnly: true,
    proxy: 'http://localhost:3000'
  },
  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV === 'development') {
  // 		config.devtool = 'cheap-source-map'
  // 	} else if (process.env.NODE_ENV === 'production') {
  // 		// 为生产环境修改配置...
  // 		config.externals = {
  // 			vue: 'Vue',
  // 			vuex: 'Vuex',
  // 			'vue-router': 'VueRouter',
  // 			'element-ui': 'ELEMENT',
  // 			jsbarcode: 'JsBarcode',
  // 			html2canvas: 'html2canvas'
  // 		}
  // 		// config.devtool = 'eval-source-map'
  // 	}
  // },
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 6144 }))
    config.module.rule('eslint')
    config.module
      .rule('md-postcss') // 新增规则，规则名自定义
      .test(/mand-mobile.*\.css$/) // 用正则表达式匹配mand-mobile的组件目录下的所有css文件
      .use('css-loader') // css加载器
      .loader('postcss-loader') // css处理器
      .options({ // 这里的内容跟方法一中css.loaderOptions一样
        plugins: [
          pxtorem({
            rootValue: 100,
            minPixelValue: 2,
            propList: ['*'],
            selectorBlackList: []
          })
        ]
      })
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', (config) => config.devtool('cheap-source-map'))
    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          mandMobile: {
            name: 'chunk-mandMobile', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?mand-mobile(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
