define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureRoutes);

  //--- https://docs.angularjs.org/api/ngRoute

  configureRoutes.$inject = ['$routeProvider'];

  function configureRoutes($routeProvider) {

    $routeProvider
      .when(
        '/github/:user',
        {
          templateUrl   : 'app/github/templates/user.html',
          controller    : 'GitHubUserCtrl',
          controllerAs  : 'vm'
        }
      )
      .when(
        '/github/:user/:repo/',
        {
          templateUrl   : 'app/github/templates/repo.html',
          controller    : 'GitHubRepositoryCtrl',
          controllerAs  : 'vm'
        }
      );

  }

});
