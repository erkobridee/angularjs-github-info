define(function(require) {
  'use strict';

  var module = require('./module');
  require('./directives/navbar');
  require('./directives/pane');
  require('./directives/tabs');

  return module;

});
