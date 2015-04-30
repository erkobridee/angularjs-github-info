define(function(require) {
  'use strict';

  var module = require('./module');
  require('./services/navbar');
  require('./services/pluralize');
  require('./controllers/about');
  require('./controllers/search');
  require('./routes');

  return module;

});
