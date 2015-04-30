define(function(require) {
  'use strict';

  var angular = require('angular');
  require('angularResource');
  require('angularRoute');

  // angular module definition
  return angular.module(
    // module name
    'github',

    // module dependencies
    [
      'ngResource',
      'ngRoute'
    ]
  );

});
