define(function(require) {
  'use strict';

  var module = require('./module');
  require('./resource');
  require('./services/user/info');
  require('./services/user/gists');
  require('./services/user/repositories');
  require('./services/repository/info');
  require('./services/repository/contributors');
  require('./services/data');
  require('./controllers/repository');
  require('./controllers/user');
  require('./routes');

  return module;

});
