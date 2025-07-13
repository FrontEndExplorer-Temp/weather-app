const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: isProd ? "production" : "development",
  ...(isProd ? {} : { devServer: { static: "./dist", hot: true, open: true } }),
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: { chunks: 'all' },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: "index.html",
      minify: isProd ? { collapseWhitespace: true, removeComments: true } : false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets", to: "assets" },
      ],
    }),
    ...(isProd ? [new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false })] : []),
  ],
};
