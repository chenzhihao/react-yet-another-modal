var path = require('path');
var webpack = require('webpack');
var config = {
  entry: {
    index: [
      'babel-polyfill',
      path.resolve(__dirname, '../example/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js?[chunkhash]'
  },
  externals: [],
  eslint: {
    configFile: '.eslintrc'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|dist)/,
        loaders: ['react-hot','babel']
      }
    ]
  },
  plugins: [new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })],
  postcss: function () {
    return [require('autoprefixer'), require('precss'),  require('postcss-nested')];
  }
};

module.exports = config;
