const webpack = require('webpack');
const config = require('../config/webpack.config.prod');

function start(){
  const compile = webpack(config);
  compile.run();
  console.log('build finish!');
}

start();