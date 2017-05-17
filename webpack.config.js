const webpack = require('webpack');
const path = require('path');
const ETP = require("extract-text-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, 'public');
const SRC_DIR = path.resolve(__dirname, 'src');

const config = {
  entry: [
    SRC_DIR+'/app/index.jsx',
    SRC_DIR+'/styles/main.less'
  ],
  output: {
    path: BUILD_DIR,
    publicPath: '/public',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module : {
    loaders : [
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      }
    ]
  }
};

module.exports = config;