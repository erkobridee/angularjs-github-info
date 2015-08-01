define(function(require) {
  'use strict';

  var angular = require('angular');

  // angular module definition
  return angular.module(
    // module name
    'cache.management',

    // module dependencies
    [
      require('app/commons/persistence/package').name,
      require('app/commons/shorthash/package').name
    ]
  );

});
