#!/usr/bin/env node

const reMap = require ('./remap.js')
const chalk = require('chalk');
const pkg = require('./package.json');
var program = require('commander');
const optRet = program
  .version(pkg.version, '-v, --version')
  .option('-s, --source-flie-path <value>', 'The generated source file')
  .option('-f, --log-file <value>', 'The file contain crash info(require)')
  .option('-u, --source-flie-url <value>', 'The sourcemap url location')
  .parse(process.argv);
  // console.log('optRet',optRet);

  let optionsLen = program.args.length
  
  const crashFilePath = optRet.logFile
  const filePath = optRet.sourceFliePath
  const fileUrl = optRet.sourceFlieUrl
  if(filePath==null&&fileUrl==null){
    console.error("must define source-flie-path or source-flie-url");
    return;
  }
  var isNet = (fileUrl!=null);

reMap(isNet?fileUrl:filePath, crashFilePath,isNet)
.then((rawCrashLines) => {
	for(let i=0;i<rawCrashLines.length;i++){
		console.log(rawCrashLines[i]);
	}
})
.catch((err) => {
  console.log(chalk.red(err))
  program.help()
})