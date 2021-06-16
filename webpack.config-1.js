const { resolve } = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  // 模式: 开发/生产
  mode: "development",
  // source-map
  devtool: "source-map",
  // 优化: 禁止压缩
  optimization: {
    minimize: false
  },
  // 入口文件: 配置多入口
  entry: {
    index: resolve(__dirname, "./src/js/index.js"),
    detail: resolve(__dirname, "./src/js/detail.js"),
    collections: resolve(__dirname, "./src/js/collections.js"),
  },
  // 出口文件: 输出/打包设置
  output: {
    // 路径
    path: resolve(__dirname, "./dist"),
    // 打包后的文件名
    filename: "js/[name].js"
  },
  // 模块配置: loader
  module: {
    // 模块的匹配规则
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        // 忽略
        exclude: resolve(__dirname, "node_modules"),
        query: {
          "presets": ["latest"]
        }
      },
      {
        test: /\.tpl$/,
        loader: "ejs-loader",
      },
      {
        test: /\.css$/,
        // 多个loader写法: 从下往上运行
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugin: function () {
                return [autoprefixer("last 5 versions")]
              }
            }
          },
          "sass-loader"
        ]
      },
      {
        // 图片处理: i为忽略大小写
        test: /\.(png|jpg|jpeg|gif|ico|woff|eot|svg|ttf)$/i,
        // 小于1024处理为base64, 否则使用源数据
        loaders: "url-loader?limit=1024&name=img/[name]-[hash:16].[ext]",
      }
    ]
  },
  // 插件配置
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolve(__dirname, "./src/index.html"),
      title: "老子是首页哦",
      chunks: ["index"],
      // 如有多个按照上面数组顺序排列
      chunksSortMode: "manual",
      // 排除文件
      excludeChunks: ["node_modules"],
      hash: true,
      minify: {
        // 去除注释
        removeComments: true,
        // 去除换行
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: "detail.html",
      template: resolve(__dirname, "./src/index.html"),
      title: "老子是详情哦",
      chunks: ["detail"],
      // 如有多个按照上面数组顺序排列
      chunksSortMode: "manual",
      // 排除文件
      excludeChunks: ["node_modules"],
      hash: true,
      minify: {
        // 去除注释
        removeComments: true,
        // 去除换行
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: "collections.html",
      template: resolve(__dirname, "./src/index.html"),
      title: "我的新闻",
      chunks: ["collections"],
      // 如有多个按照上面数组顺序排列
      chunksSortMode: "manual",
      // 排除文件
      excludeChunks: ["node_modules"],
      hash: true,
      minify: {
        // 去除注释
        removeComments: true,
        // 去除换行
        collapseWhitespace: true
      }
    })
  ],
  // 开发服务器配置
  devServer: {
    watchOptions: {
      ignored: /node_modules/
    },
    open: true,
    host: "localhost",
    port: 3000
  }
}