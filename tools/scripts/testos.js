var testModuleThenExecute = require('../lib/testModuleThenExecute');

testModuleThenExecute('shelljs', function executeLater() {

  // http://documentup.com/arturadib/shelljs
  require('shelljs/global');

  echo('Testing OS environment');

  var os = require('../lib/oscheck');

  /*
    What platform you're running on: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
    win32 (for 32 or 64 bit)
  */
  echo('OS detected is: '+os.name);
  echo ('isWin = '+os.isWin);
  echo ('isLinux = '+os.isLinux);
  echo ('isMac = '+os.isMac);

});
