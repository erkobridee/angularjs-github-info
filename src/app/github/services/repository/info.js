define(function(require) {
  'use strict';

  var module = require('../../module');

  module.factory('GithubRepositoryInfoService', RepositoryInfoService);

  //---

  RepositoryInfoService.$inject = [
    'GithubResource', 'CacheService'
  ];

  function RepositoryInfoService(resource, cacheService) {
    //--- private
    var persistenceKey = 'RepositoryInfo';

    var cache = cacheService(persistenceKey, function loadRemoteData(options) {
      return resource.get({
        'query': 'repos',
        'user': options.user,
        'repo': options.repo
      }).$promise;
    });

    //--- api
    return {
      get: cache.get
    };
  }

});
