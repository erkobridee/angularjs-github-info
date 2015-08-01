define(function(require) {
  'use strict';

  var module = require('../../module');

  module.factory('GithubUserGistsService', UserGistsService);

  //---

  UserGistsService.$inject = [
    'GithubResource', 'CacheService'
  ];

  function UserGistsService(resource, cacheService) {
    //--- private
    var persistenceKey = 'UserGists';

    var cache = cacheService(persistenceKey, function loadRemoteData(options) {
      return resource
      .get({
        'user': options.user,
        'repo': 'gists'
      })
      .$promise;
    });

    //--- api
    return {
      get: cache.get
    };
  }

});
