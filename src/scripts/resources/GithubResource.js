angular.module('GithubApp').factory(

  // factory name
  'GithubResource',

  // dependency injection
  [ '$resource',

function($resource) {

      var github = $resource(
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

      return github;
}]);
