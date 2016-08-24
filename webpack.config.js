'use strict';
const path = require('path');
const webpack = require('webpack');


const alias = {};

alias.inquirer = path.resolve(__dirname, './src/platform/browser/inquirer.js');
alias.fs = path.resolve(__dirname, './src/platform/browser/fs.js');
alias.clear = path.resolve(__dirname, './src/platform/browser/clear.js');
alias.chalk = path.resolve(__dirname, './src/platform/browser/chalk.js');
// alias.wordwrap = path.resolve(__dirname, './src/platform/browser/wordwrap.js');


module.exports = {
  entry: {
    textAdventure: './index.js',
    browserBootstrap: './src/platform/browser/bootstrap.js'
  },
  output: {
    path: 'dist',
    filename: '[name].js'
  },
  resolve: { alias: alias },
  module: {
    preLoaders: [
      // {
      //   test: /\.js$/,
      //   loader: 'eslint-loader',
      //   exclude: /(lib|node_modules|bower_components)/
      // }
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.md$/,
        loader: 'text-loader'
      },
      {
        test: /\.js$/,
        exclude: /(lib|node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: []
};
