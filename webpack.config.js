const webpack = require("webpack")

const { resolve } = require('path')

module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    publicPath: '/js/',
    path: resolve(__dirname, './dist/js'),
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader' ],
        exclude: /node_modules/
      }
    ]
  }
}
