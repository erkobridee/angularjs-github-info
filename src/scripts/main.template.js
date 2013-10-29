require(
{

  // define external js dependencies with fallback
  paths: {

<% if (config.environment === 'prod') { %>    
    
    jquery:           '../vendor/js/jquery.min',
    bootstrap:        '../vendor/bootstrap/js/bootstrap.min',
    angular:          '../vendor/js/angular.min',
    angular_resource: '../vendor/js/angular-resource.min'
    
    // http://requirejs.org/docs/optimization.html
    
    /*
    jquery:           'empty:',
    bootstrap:        'empty:',
    angular:          'empty:',
    angular_resource: 'empty:'
    */

<% } else { %>
    jquery: [
      '//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min',
      '//cdnjs.cloudflare.com/ajax/libs/jquery/1.10.1/jquery.min',
      '../vendor/js/jquery.min'
    ],
    bootstrap: [
      '//netdna.bootstrapcdn.com/twitter-bootstrap/3.0.0/js/bootstrap.min',
      '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.0/js/bootstrap.min',
      '../vendor/bootstrap/js/bootstrap.min'
    ],
    angular: [ 
      'http://code.angularjs.org/1.1.5/angular.min',
      '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.1.5/angular.min',
      '../vendor/js/angular.min'
    ],
    angular_resource: [ 
      'http://code.angularjs.org/1.1.5/angular-resource.min',
      '../vendor/js/angular-resource.min'
    ]  
<% } %>

  }, 

  // define js scripts dependencies
  shim: {
    'angular_resource': {
      deps: ['angular']
    },
    'app': { 
      deps: ['angular', 'angular_resource'] 
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