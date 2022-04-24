const baseConfig = require('./webpack.config.base');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = Object.assign(baseConfig,{
  'mode': 'production',
  'optimization': {
    'minimize': true,
    'minimizer': [
      new TerserPlugin({
        'terserOptions': {
          'compress': true,
          'output': {
            'preamble': '#!/usr/bin/env node',
          },
        },
        'extractComments': 'all',
      }),
    ],
  },
});