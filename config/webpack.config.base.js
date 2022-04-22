const path = require('path');
const resolve = dir => path.resolve(__dirname,'../',dir);

module.exports = {
  'entry': './src/app.ts',
  'mode': 'development',
  'target': 'node',
  'output': {
    'filename': 'main.js',
    'path': resolve('dist'),
  },
  'resolve': {
    'extensions': [
      '.ts',
    ],
    'alias': {
      '@':resolve('src'),
    },
  },
  'module': {
    'rules': [
      {
        'test': /\.ts?$/,
        'use': [
          {
            'loader': 'babel-loader',
          },
        ],
        'exclude': /node_modules/,
      },
    ],
  },
};