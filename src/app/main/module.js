define(function(require) {
  'use strict';

  var angular = require('angular');
  require('angularResource');
  require('angularRoute');

  // angular module definition
  return angular.module(
    // module name
    'main',

    // module dependencies
    [
      'ngResource',
      'ngRoute',

      require('app/github/package').name,
      require('app/components/package').name
    ]
  );

});
