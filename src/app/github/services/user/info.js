define(function(require) {
  'use strict';

  // var moment = require('moment');

  var module = require('../../module');

  module.factory('GithubUserInfoService', UserInfoService);

  //---

  UserInfoService.$inject = [
    'GithubResource', 'CacheService'
  ];

  function UserInfoService(resource, cacheService) {
    //--- private
    var persistenceKey = 'UserInfo';

    var cache = cacheService(persistenceKey, function loadRemoteData(options) {
      return resource.get({
        'user': options.user,
        'repo': ''
      }).$promise;
    });

    //--- api
    return {
      get: cache.get
    };
  }

});
