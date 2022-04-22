const webpack = require('webpack');
const config = require('../config/webpack.config.dev');

function start (){
  webpack(config,(err,stats) => {
    if (err) {
      if(err.messages) { console.error(err.messages); }
      return;
    }

    console.log(stats.toString({
      'chunks': false, // Makes the build much quieter
      'colors': true, // Shows colors in the console
    }));
  });
}

start();