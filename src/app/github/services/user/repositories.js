define(function(require) {
  'use strict';

  var module = require('../../module');

  module.factory('GithubUserRepositoriesService', UserRepositoriesService);

  //---

  UserRepositoriesService.$inject = [
    'GithubResource', 'CacheService'
  ];

  function UserRepositoriesService(resource, cacheService) {
    //--- private
    var persistenceKey = 'UserRepositories';

    var cache = cacheService(persistenceKey, function loadRemoteData(options) {
      return resource.get({
        'user': options.user
      }).$promise;
    });

    //--- api
    return {
      get: cache.get
    };
  }

});
