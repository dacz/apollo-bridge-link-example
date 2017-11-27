const path = require('path');
const webpack = require('webpack');
const config = require('./config');

const env = process.env.NODE_ENV;
const isProd = env === 'production';

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(config.SRC)],
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin({}),

    new webpack.NamedModulesPlugin(),

    new webpack.LoaderOptionsPlugin({
      minimize: isProd,
      debug: !isProd,
    }),

    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    }),

    // new webpack.optimize.CommonsChunkPlugin({
    //   names: [ 'vendors' ],
    //   minChunks: Infinity,
    // }),

    // new BundleAnalyzerPlugin({ analyzerMode: 'static' }),

    ...(isProd
      ? [new webpack.optimize.UglifyJsPlugin({ sourceMap: true })]
      : []),
  ],
};
