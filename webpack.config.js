const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  target: "web",
  devtool: "source-map",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /.\css$/,
        use: [
          miniCssExtractPlugin.loader, "css-loader"
        ]
      },
      {
        test: /.\less$/,
        use: [
          miniCssExtractPlugin.loader, "css-loader", "less-loader"
        ]
      },
      {
        test: /.\js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devServer: {
    static: "./public",
    hot: true,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        pathRewrite: {
          "^/api": ""
        },
        secure: false,
        changeOrigin: true
      }
    }
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: "development"
}