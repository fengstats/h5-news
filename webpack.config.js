const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  // 模式
  mode: 'development',
  // mode: 'production',

  // 入口
  entry: {
    index: path.resolve(__dirname, './src/js/index.js'),
  },

  // 出口
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'js/[name].js'
  },

  // 配置可忽略扩展
  resolve: {
    extensions: ['.js', '.css']
  },

  // 模块
  module: {
    rules: [
      // js文件
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        query: {
          'presets': ['latest']
        }
      },

      // 模板文件 .tpl
      {
        test: /\.tpl$/,
        loader: 'ejs-loader'
      },

      // 单独提取样式文件
      {
        test: /\.(css|scss)$/,
        // 多个loader写法, 从下往上
        use: [
          // 4.直接放入到html中
          // 'style-loader',
          // 4.提取出来为一个单独的文件
          {
            loader: miniCssExtractPlugin.loader,    
            options: {
              hmr: process.env.NODE_ENV == 'development'
            }
          },
          // 3.处理css
          'css-loader',
          // 2.加上兼容性前缀
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')]
              }
            }
          },
          // 1.sass转换为css
          'sass-loader'
        ],
        
        
      },

      // 图片文件处理
      {
        test: /\.(png|jpg|jpeg|gif|ico|woff|eot|svg|ttf)$/i,
        use: [
          {
            loader: 'url-loader?limit=1024&name=img/[name]-[hash:8].[ext]'
          },
          'image-webpack-loader'
        ]
      }
    ]
  },

  // 插件: 压缩js、html、去除注释、空格、换行、打包后的名称
  plugins: [
    new uglify(),
    new htmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html'),
      title: '新闻头条',
      chunksSortMode: 'manual',
      // manual: 按照下面数组内的排序顺序
      chunks: ['index'],
      excludeChunks: ['node_modules'],
      hash: true
    }),
    // 单独css配置
    new miniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],

  // 开发服务器: 热加载
  devServer: {
    watchOptions: {
      // 忽略文件
      ignored: /node_module/
    },
    open: true,
    host: 'localhost',
    port: 3000
  }
};

module.exports = config;