require(
{

  // define external js dependencies with fallback
  paths: {

    jquery: [
      // '//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min',
      // '//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.2/jquery.min',
      '../vendor/jquery/jquery.min'
    ],
    bootstrap: [
      // '//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min',
      // '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.3/js/bootstrap.min',
      '../vendor/bootstrap/js/bootstrap.min'
    ],
    angular: [
      // 'http://code.angularjs.org/1.3.15/angular.min',
      // '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular.min',
      '../vendor/angular/angular.min'
    ],
    angular_resource: [
      // 'http://code.angularjs.org/1.3.15/angular-resource.min',
      '../vendor/angular-resource/angular-resource.min'
    ],
    angular_route: [
      // 'http://code.angularjs.org/1.3.15/angular-route.min',
      '../vendor/angular-route/angular-route.min'
    ]

  },

  // define js scripts dependencies
  shim: {
    'bootstrap': {
      deps: ['jquery']
    },

    'angular': {
      deps: ['bootstrap']
    },

    'angular_resource': {
      deps: ['angular']
    },

    'angular_route': {
      deps: ['angular']
    },

    'app': {
      deps: [
        'angular',
        'angular_resource',
        'angular_route'
      ]
    },

    'resources/GithubResource': {
      deps: ['app']
    },

    'services/NavBarService': {
      deps: ['app']
    },
    'services/PluralizeService': {
      deps: ['app']
    },

    'components/pane': {
      deps: ['app']
    },
    'components/tabs': {
      deps: ['app', 'components/pane']
    },
    'components/navbar': {
      deps: ['app', 'services/NavBarService']
    },

    'views': {
      deps: [
        'app',
        'components/tabs',
        'components/navbar'
      ]
    },

    'controllers/AboutCtrl': {
      deps: ['app', 'services/NavBarService']
    },
    'controllers/SearchCtrl': {
      deps: ['app', 'services/NavBarService']
    },
    'controllers/GithubRepoInfoContributorsCtrl': {
      deps: ['app', 'resources/GithubResource', 'services/NavBarService', 'services/PluralizeService']
    },
    'controllers/GithubUserReposGistsCtrl': {
      deps: ['app', 'resources/GithubResource', 'services/NavBarService', 'services/PluralizeService']
    },

    'routes': {
      deps: [
        'app',
        'controllers/AboutCtrl',
        'controllers/SearchCtrl',
        'controllers/GithubRepoInfoContributorsCtrl',
        'controllers/GithubUserReposGistsCtrl'
      ]
    },

    'start_app': {
      deps: [
        'jquery', 'bootstrap',
        'angular', 'angular_resource',
        'app',
        'routes',
        'views'
      ]
    } //, '': {},
  }
},

  ['require'],

function(require) {

  console.log('calling start_app.js');

  require(['start_app']);

});
