define(function(require) {
  'use strict';

  var module = require('./module');
  require('./resource');
  require('./controllers/repository');
  require('./controllers/user');
  require('./routes');

  return module;

});
