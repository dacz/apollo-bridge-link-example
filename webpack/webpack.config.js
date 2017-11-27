const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');
const devServerConfig = require('./devServerConfig');
const jsWebpackConfig = require('./webpack.js.config');
// const cssWebpackConfig = require('./webpack.css.config');
// const htmlWebpackConfig = require('./webpack.html.config');

module.exports = merge.smart(jsWebpackConfig, {
  devtool: 'cheap-source-map',

  target: 'web',

  entry: path.resolve(config.SRC),

  output: {
    path: path.resolve(config.DIST, config.DIST_JS),
    filename: '[name].js',
    publicPath: '/',
    // chunkFilename: '[id].chunk.js',
  },

  resolve: {
    extensions: ['.js', '.json', '.css'],
    modules: [path.resolve(config.SRC), 'node_modules'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(config.SRC, 'index.html'),
    }),
  ],

  devServer: devServerConfig,
});
