const path = require("path");
const WebpackCommon = require("./webpack.common.js");

module.exports = {
  //入口
  entry: "./src/index.js",
  //输出
  output: {
    //输出目录的路径
    path: undefined,
    //入口打包的文件名
    filename: "static/js/index.js",
  },

  //开发环境热更新服务器
  devServer: {
    host: "localhost",
    port: "8080",

    //自动打开浏览器
    open: true,

    //CSS按需编译
    hot: true,
  },

  ...WebpackCommon,

  //开发模式
  mode: "development",

  // map配置
  devtool: "cheap-module-source-map",
};
