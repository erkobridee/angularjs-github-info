define(function(require) {
  'use strict';

  var module = require('../../module');

  module.factory('GithubRepositoryContributorsService', RepositoryContributorsService);

  //---

  RepositoryContributorsService.$inject = [
    'GithubResource', 'CacheService'
  ];

  function RepositoryContributorsService(resource, cacheService) {
    //--- private
    var persistenceKey = 'RepositoryContributors';

    var cache = cacheService(persistenceKey, function loadRemoteData(options) {
      return resource.get({
        'query': 'repos',
        'user': options.user,
        'repo': options.repo,
        'spec': 'contributors'
      }).$promise;
    });

    //--- api
    return {
      get: cache.get
    };
  }

});
