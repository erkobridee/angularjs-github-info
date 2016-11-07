require({

  // libraries dependencies (fallback support)
  paths: {

    jquery: [
      'libs/jquery/jquery.min'
    ],
    bootstrap: [
      'libs/bootstrap/js/bootstrap.min'
    ],
    angular: [
      'libs/angular/angular.min'
    ],
    angularResource: [
      'libs/angular-resource/angular-resource.min'
    ],
    angularRoute: [
      'libs/angular-route/angular-route.min'
    ],
    moment: [
      'libs/moment/moment.min'
    ],
    hashids: [
      'libs/hashids/hashids.min'
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
