const webpack = require('webpack');
const config = require('../config/webpack.config.prod');
const shellJs = require('shelljs');
const { existsSync } = require('fs');


async function build(){
  const hasDist = existsSync(config.output.path);
  console.log(hasDist);
  if(hasDist){
    await shellJs.rm('-R',config.output.path);
  }
  const compile = await webpack(config);
  await compile.run(err => {
    if(err){
      if(err.messages){
        console.log(err.messages);
      }
    }
  });
  console.log('build finish!');
}

build();