const path = require('path');

module.exports = () => ({
  entry: ['@babel/polyfill', '././src/index.js'],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: /node_modules/,
        use: ['react-hot-loader/webpack'],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env', '@babel/preset-react'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file-loader?name=[name].[ext]', // <-- retain original file name
      },
    ],
  },
  resolve: {
    extensions: ['*', '.mjs', '.js', '.jsx'],
  }, // <-- extension for .mjs to graphql shodl be before the other extension.

  output: {
    path: path.resolve(__dirname, './../dist/'),
    publicPath: './../dist/',
    filename: 'bundle.js',
  },
});
