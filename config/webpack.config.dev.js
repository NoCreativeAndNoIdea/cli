const baseConfig = require('./webpack.config.base');

module.exports = Object.assign(baseConfig,{
  'mode': 'development',
  'watch': true,
  'watchOptions': {
    'aggregateTimeout': 300,
    'ignored': /node_modules/,
  },
});