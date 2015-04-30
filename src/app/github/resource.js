define(function(require) {
  'use strict';

  var module = require('./module');

  module.factory('GithubResource', GithubResource);

  //--- https://docs.angularjs.org/api/ngResource/service/

  GithubResource.$inject = ['$resource'];

  function GithubResource($resource) {

    return $resource(
      'https://api.github.com/:query/:user/:repo/:spec',
      {
        'query': 'users',
        'user': 'erkobridee',
        'repo': 'repos',
        'spec': '',
        'callback': 'JSON_CALLBACK',
        'per_page': 100
      }, {
        'get': {
            'method': 'JSONP'
        }
      }
    );

  }

});
