define(function(require) {
  'use strict';

  /*
    http://momentjs.com/docs/#/parsing/unix-timestamp/

    https://developer.github.com/v3/#rate-limiting

    https://developer.github.com/v3/#json-p-callbacks
  */

  var moment = require('moment');

  //---

  var module = require('./module');

  module.factory('CacheService', CacheService);

  //---

  CacheService.$inject = [
    '$q', 'PersistenceService', 'ShortHashService'
  ];

  function CacheService($q, persistence, shorthash) {

    return function(persistenceKey, loadRemoteData) {
      if(!loadRemoteData) {
        loadRemoteData = function(options) {
          return $q.when({
            data: {},
            meta: {
              'X-RateLimit-Reset':0
            }
          });
        };
      }

      var CacheManager = (function() {

        function getCacheKey(value) {
          return shorthash.make(value);
        }

        function checkCache(cache, cacheKey) {
          var cacheObj = cache[cacheKey];

          if(angular.isObject(cacheObj)) {
            if(
              moment()
                .isAfter(
                  moment.unix( cacheObj.ttl )
                )
            ) {
              removeCacheObject(cache, cacheKey);
              cacheObj = null;
            }
          } else {
            cacheObj = null;
          }

          return cacheObj;
        }

        function removeCacheObject(cache, cacheKey) {
          delete( cache[cacheKey] );
        }

        function makeCacheObject(value, ttl) {
          return {
            data: angular.copy( value ),
            ttl: ttl
          };
        }

        function addCacheObject(cache, cacheKey, cacheObject) {
          cache[cacheKey] = cacheObject;
        }

        //--- public

        function CacheManager(persistenceKey, loadRemoteData, cache) {
          var self = this;
          self.persistenceKey = persistenceKey;
          self.loadRemoteData = loadRemoteData;
          self.cache = cache;

          persistence.onBeforePersist(function() {
            persistence.setItem( self.persistenceKey, self.cache );
          });

          self.get = function(options) {
            var cacheKey = getCacheKey(options),
                cacheObj = checkCache(self.cache, cacheKey);

            if(cacheObj) {
              return $q.when( angular.copy( cacheObj.data ) );
            } else {
              return self.loadRemoteData(options)
                .then(function(result) {
                  addCacheObject(self.cache, cacheKey, makeCacheObject(
                      result.data,
                      result.meta['X-RateLimit-Reset']
                  ));
                  return result.data;
                });
            }
          };
        }

        return CacheManager;
      })();

      return new CacheManager(
        persistenceKey,
        loadRemoteData,
        ( persistence.extractItem( persistenceKey ) || {} )
      );

    };
  }

});
