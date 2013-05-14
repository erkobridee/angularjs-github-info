angular.module('GithubApp', ['GithubService', 'GithubComponents'])
  .config(function($routeProvider) {
    $routeProvider
      .when(
        '/', {
          controller: ctrl.Search, 
          templateUrl:'tpl/search.html'
        }
      )
      .when(
        '/github/:user', {
          controller: ctrl.GithubUserReposGists,
          templateUrl: 'tpl/github/user.html'
        }
      )
      .when(
        '/github/:user/:repo/', {
          controller: ctrl.GithubRepoInfoContributors,
          templateUrl: 'tpl/github/repo.html'
        }
      )
      .when(
        '/about', {
          controller: ctrl.About, 
          templateUrl:'tpl/about.html'
        }
      )
      .otherwise({redirectTo:'/'})
  });