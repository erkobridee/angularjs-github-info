// http://txt.fliglio.com/2014/01/concurrent-protractor-testing/
module.exports = (function() {

  var os = require('os');

  function getIpAddress() {
    var ipAddress = null;
    var ifaces = os.networkInterfaces();

    function processDetails(details) {
      if (details.family === 'IPv4' && details.address !== '127.0.0.1' && !ipAddress) {
        ipAddress = details.address;
      }
    }

    for (var dev in ifaces) {
      ifaces[dev].forEach(processDetails);
    }
    return ipAddress;
  }

  return getIpAddress();

})();
