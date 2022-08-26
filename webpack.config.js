const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  target: "web",
  devtool: "source-map",
  // 配置多个页面入口
  entry: {
    page1: "./src/pages/page1/app.js",
    page2: "./src/pages/page2/app.js",
    page3: "./src/pages/page3/app.js",
    page4: "./src/pages/page4/app.js",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name]/[name]-bundle.js",
  },
  module: {
    rules: [
      {
        test: /.\css$/,
        use: [miniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /.\less$/,
        use: [miniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /.\js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  devServer: {
    static: "./public",
    hot: true,
    open: true,
    proxy: {
      "/api": {
        target: "http://2022.sipcoj.com:38081",
        pathRewrite: {
          "^/api": "",
        },
        headers: {
          host: "http://2022.sipcoj.com:38081",
          origin: "http://2022.sipcoj.com:38081",
        },
        secure: false,
        changeOrigin: true,
      },
      "/api1": {
        target: "http://2022.sipcoj.com:38080",
        pathRewrite: {
          "^/api1": "",
        },
        headers: {
          host: "http://2022.sipcoj.com:38080",
          origin: "http://2022.sipcoj.com:38080",
        },
        secure: false,
        changeOrigin: true,
      },
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 打包业务中的公共代码
        common: {
          name: "common",
          chunks: "initial",
          minSize: 1,
          priority: 0,
          minChunks: 2,
        },
        // 打包第三方库的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          priority: 10,
          minChunks: 2,
        },
      },
    },
    runtimeChunk: { name: "manifest" }, // 运行时代码
  },

  plugins: [
    new miniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/page1/index.html",
      filename: "index.html",
      chunks: ["page1"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/page2/index.html",
      filename: "code.html",
      chunks: ["page2"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/page3/index.html",
      filename: "download.html",
      chunks: ["page3"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/page4/index.html",
      filename: "final.html",
      chunks: ["page4"],
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: "development",
};
