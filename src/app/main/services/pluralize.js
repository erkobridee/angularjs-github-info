define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('PluralizeService', PluralizeService);

  //---

  // PluralizeService.$inject = [ ];

  function PluralizeService() {

    var service = {

      publicRepoForms: {
        '1': 'Public Repo',
        'other': 'Public Repos'
      },

      followerForms: {
        '1': 'Follower',
        'other': 'Followers'
      },

      watchForms: {
        '1': 'Watcher',
        'other': 'Watchers'
      },

      forkForms: {
        '1': 'Fork',
        'other': 'Forks'
      }

    };

    return service;

  }

});
