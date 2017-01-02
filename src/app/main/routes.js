define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureRoutes);

  //--- https://docs.angularjs.org/api/ngRoute

  configureRoutes.$inject = [
    '$routeProvider',
    '$locationProvider',
    '$sceDelegateProvider'
  ];

  function configureRoutes(
    $routeProvider,
    $locationProvider,
    $sceDelegateProvider
  ) {

    // remove the ! added by angular v1.6.1
    $locationProvider.hashPrefix('');

    // https://docs.angularjs.org/api/ng/service/$sce
    // https://docs.angularjs.org/api/ng/provider/$sceDelegateProvider#resourceUrlWhitelist
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',

      // Allow github api domain
      'https://api.github.com/**'
    ]);

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
