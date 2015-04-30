define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureRoutes);

  //--- https://docs.angularjs.org/api/ngRoute

  configureRoutes.$inject = ['$routeProvider'];

  function configureRoutes($routeProvider) {

    $routeProvider
      .when(
        '/',
        {
          templateUrl   : 'app/main/templates/search.html',
          controller    : 'SearchCtrl',
          controllerAs  : 'vm'
        }
      )
      .when(
        '/about',
        {
          templateUrl   : 'app/main/templates/about.html',
          controller    : 'AboutCtrl',
          controllerAs  : 'vm'
        }
      )
      .otherwise({redirectTo:'/'});

  }

});
