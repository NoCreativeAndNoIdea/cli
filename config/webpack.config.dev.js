const baseConfig = require('./webpack.config.base');

module.exports = Object.assign(baseConfig,{
  'mode': 'development',
  'devtool': 'source-map',
  'watch': true,
  'watchOptions': {
    'aggregateTimeout': 300,
    'ignored': /node_modules/,
  },
});