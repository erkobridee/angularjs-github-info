require({

  // libraries dependencies (fallback support)
  paths: {

    jquery: [
      // '//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min',
      // '//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.2/jquery.min',
      'vendor/jquery/jquery.min'
    ],
    bootstrap: [
      // '//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min',
      // '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.3/js/bootstrap.min',
      'vendor/bootstrap/js/bootstrap.min'
    ],
    angular: [
      // 'http://code.angularjs.org/1.3.15/angular.min',
      // '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular.min',
      'vendor/angular/angular.min'
    ],
    angularResource: [
      // 'http://code.angularjs.org/1.3.15/angular-resource.min',
      'vendor/angular-resource/angular-resource.min'
    ],
    angularRoute: [
      // 'http://code.angularjs.org/1.3.15/angular-route.min',
      'vendor/angular-route/angular-route.min'
    ]

  },

  // define js scripts dependencies
  shim: {

    'bootstrap': {
      deps: ['jquery']
    },

    'angular': {
      deps: ['bootstrap'],
      exports: 'angular'
    },

    'angularResource': {
      deps: ['angular']
    },

    'angularRoute': {
      deps: ['angular']
    },

  },

  priority: [
    'angular'
  ],

  deps: ['./ng.app']

});
