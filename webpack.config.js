/* global __dirname, require, module*/

const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const ESLintPlugin = require('eslint-webpack-plugin');
const pkg = require('./package.json');

let libraryName = "deepdetect";

let outputFile, mode;

if (env === 'build') {
  mode = 'production';
  outputFile = libraryName + '.min.js';
} else {
  mode = 'development';
  outputFile = libraryName + '.js';
}

const config = {
  mode: mode,
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  plugins: [
    new ESLintPlugin()
  ],
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  externals: {
    'isomorphic-fetch': 'isomorphic-fetch'
  }
};

module.exports = config;
