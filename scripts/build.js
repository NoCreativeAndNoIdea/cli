const webpack = require('webpack');
const config = require('../config/webpack.config.prod');

function start(){
  const compile = webpack(config);
  compile.run(err => {
    if(err){
      if(err.messages){
        console.log(err.messages);
      }
    }
  });
  console.log('build finish!');
}

start();