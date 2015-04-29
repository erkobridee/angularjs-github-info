
var os = require('os');

module.exports = {
  name    : os.platform(),
  isWin   : /^win32/.test(os.platform()),
  isLinux : /^linux/.test(os.platform()),
  isMac   : /^darwin/.test(os.platform()) || /^freebsd/.test(os.platform())
};
