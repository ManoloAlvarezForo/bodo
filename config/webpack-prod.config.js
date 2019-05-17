const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./webpack-base.config');

module.exports = () => (
  merge(baseConfig(), {
    mode: "production",
    plugins: [
      new CleanWebpackPlugin(["./../dist/"]),
      new HtmlWebpackPlugin({
        title: "Tessty",
        template: path.resolve(__dirname, "../public/index.html")
      })
    ]
  })
);
