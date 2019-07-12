const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack-base.config');
const path = require('path');

module.exports = () =>
  merge(baseConfig(), {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, '../public/'),
      port: 3007,
      publicPath: 'http://localhost:3007/dist/',
      hotOnly: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  });
