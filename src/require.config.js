require({

  // libraries dependencies (fallback support)
  paths: {

    jquery: [
      'vendor/jquery/jquery.min'
    ],
    bootstrap: [
      'vendor/bootstrap/js/bootstrap.min'
    ],
    angular: [
      'vendor/angular/angular.min'
    ],
    angularResource: [
      'vendor/angular-resource/angular-resource.min'
    ],
    angularRoute: [
      'vendor/angular-route/angular-route.min'
    ],
    moment: [
      'vendor/moment/moment.min'
    ],
    hashids: [
      'vendor/hashids/hashids.min'
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

    'hashids': {
      exports: 'hashids'
    }

  },

  priority: [
    'angular'
  ],

  deps: ['./ng.app']

});
