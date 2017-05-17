const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, 'public');
const SRC_DIR = path.resolve(__dirname, 'src');

const config = {
  entry: [
    SRC_DIR+'/app/index.jsx',
    SRC_DIR+'/styles/main.less'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ["css-loader", "less-loader"]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css") //Extract to styles.css file
  ]
};

module.exports = config;
