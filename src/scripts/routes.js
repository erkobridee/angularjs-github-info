angular.module('GithubApp')
  .config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when(
      '/', {
        controller: 'ctrl.Search',
        templateUrl:'views/search.html'
      }
    )
    .when(
      '/github/:user', {
        controller: 'ctrl.GithubUserReposGists',
        templateUrl: 'views/github/user.html'
      }
    )
    .when(
      '/github/:user/:repo/', {
        controller: 'ctrl.GithubRepoInfoContributors',
        templateUrl: 'views/github/repo.html'
      }
    )
    .when(
      '/about', {
        controller: 'ctrl.About',
        templateUrl:'views/about.html'
      }
    )
    .otherwise({redirectTo:'/'});

}]);
