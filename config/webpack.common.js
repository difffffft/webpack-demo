const path = require("path");
const EslintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  //入口
  entry: "./src/index.js",

  //加载器
  module: {
    rules: [
      {
        //优化性能
        oneOf: [
          //将所有的.js文件处理
          {
            test: /\.js$/i,
            include: path.resolve(__dirname, "../src"),
            loader: "babel-loader",
            options: {
              // 开启缓存
              cacheDirectory: true,
              // 关闭缓存文件压缩
              cacheCompression: false,
            },
          },

          //将所有的.css文件处理
          {
            test: /\.css$/i,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: ["postcss-preset-env"],
                  },
                },
              },
            ],
          },

          //将所有的.scss或者.sass文件处理
          {
            test: /\.s[ac]ss$/i,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: ["postcss-preset-env"],
                  },
                },
              },
            ],
          },

          //图片资源优化
          {
            test: /\.(png|jpe?g|webp|svg)$/i,

            //小于10kb的图片会转为base64，减少网络请求
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024,
              },
            },

            //图片资源打包路径
            generator: {
              /**
               * [hash:10]  代表hash值只取10位
               */
              filename: "static/images/[hash][ext][query]",
            },
          },

          //字体资源优化
          {
            test: /\.(ttf|woff2?)$/i,
            //资源copy
            type: "asset/resource",
            //字体资源打包路径
            generator: {
              /**
               * [hash:10]  代表hash值只取10位
               */
              filename: "static/fonts/[hash][ext][query]",
            },
          },
        ],
      },
    ],
  },

  //插件
  plugins: [
    new EslintPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(__dirname, ""),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/index.css",
    }),
    new CssMinimizerPlugin(),
  ],
};
