const webpack = require("webpack")

const { resolve } = require('path')

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: resolve(__dirname, './dist/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader' ],
        exclude: /node_modules/
      },
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader?modules' ],
     },
    ]
  }
}
