function testModuleThenExecute(testModule, installModule, executeLaterFn) {
  if(testModule && installModule && !executeLaterFn){
    executeLaterFn = installModule;
    installModule = testModule;
  }
  try {
    require.resolve(testModule);
    executeLaterFn();
  } catch(e) {
    var async_exec = require('child_process').exec;

    console.error('Module ' + testModule + ' not found. Installing... \n');

    async_exec('npm install ' + installModule, function(err, stdout, stderr) {
      executeLaterFn();
    });
  }
}

module.exports = testModuleThenExecute;
