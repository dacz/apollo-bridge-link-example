const config = require('./config');

module.exports = {
  contentBase: config.SRC,
  historyApiFallback: true,
  hot: true,
  quiet: false,
  compress: true,
  noInfo: true,
  stats: {
    assets: true,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  inline: true,
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /db\.json/,
  },
};
