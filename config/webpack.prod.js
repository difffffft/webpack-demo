const path = require("path");
const WebpackCommon = require("./webpack.common.js");

module.exports = {
  //输出
  output: {
    //输出目录的路径
    path: path.resolve(__dirname, "../dist"),
    //入口打包的文件名
    filename: "static/js/index.js",
    //在打包前清空输出目录
    clean: true,
    //本地能打开
    publicPath: "./",
  },

  ...WebpackCommon,

  //生产模式
  mode: "production",

  // map配置
  devtool: "source-map",
};
