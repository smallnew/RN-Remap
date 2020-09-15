const fs = require('fs');
const chalk = require('chalk');
var download = require('./download.js')
// Get file content
const sourceMap = require('source-map');
const readFile = function (filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, {encoding:'utf-8'}, function(error, data) {
      if (error) {
        console.log(error)
        return reject(error);
      }
      resolve(JSON.parse(data));
    });
  });
};

const readNetFile = function (url) {
  return new Promise(function (resolve, reject) {
    console.log('start Download '+url);
    download(url, './tmp/bundle.map', function (err, filepath) {
      if (err){
        console.log('Download error');
        console.log(err)
        return reject(err);
      }
      console.log('Download finished:', filepath) 
      fs.readFile(filepath, {encoding:'utf-8'}, function(error, data) {
        if (error) {
          console.log(error)
          return reject(error);
        }
       resolve(JSON.parse(data));
      });

    })
  });
};

const readRawFile = function (filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, {encoding:'utf-8'}, function(error, data) {
      if (error) {
        console.log(error)
        return reject(error);
      }
      resolve(data);
    });
  });
};

// Find the source location
function searchSource(consumer, line, column) {
  //const rawSourceMap = await readFile(filePath)
  
  const res = consumer.originalPositionFor({
    'line' : line,
    'column' : column
   });
   consumer.destroy()
  return res
}

async function reMap(filePath, crashFilePath,isNet){
  const rawSourceMap = /*isNet?*/await readNetFile(filePath)/*:await readFile(filePath);*/
  const rawCrashTxt = await readRawFile(crashFilePath);
  const consumer = await new sourceMap.SourceMapConsumer(rawSourceMap);
  const rawCrashLines = rawCrashTxt.split('\n');
  for(let i=0;i<rawCrashLines.length;i++){
    const crashLine = rawCrashLines[i];
    if(crashLine.indexOf('@')>0){
      const crashLine1 = crashLine.split('@');
      const crashLine2 = crashLine1[crashLine1.length-1];
      if(crashLine2.indexOf(':')>0){
        const crashLineAndColunm = crashLine2.split(':');
        const ret = searchSource(consumer,Number(crashLineAndColunm[0]),Number(crashLineAndColunm[1]));
        const {source, line, column, name} = ret;
        rawCrashLines[i] = chalk.blue(name)+'@'+chalk.green(line)+':'+chalk.green(column)+'('+source+')';
      }
    }
  }
  return rawCrashLines;
}


module.exports = reMap