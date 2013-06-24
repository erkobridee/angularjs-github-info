angular.module('GithubApp').controller(

  // controller name
  'ctrl.GithubUserReposGists', 

  // dependency injection
  ['$scope', '$routeParams', 'GithubResource', 'NavBarService', 'PluralizeService',
    
// controller function
function($scope, $routeParams, GithubResource, NavBarService, PluralizeService) {

  var userParam = $routeParams.user,
      urlPath = ['', 'github', userParam, ''].join('/');

  // update search menu option url
  NavBarService.updateSearchUrl(urlPath);

  // blocking code
  //$scope.user = GithubResource.get({user: userParam, repo: ''});
  // non-blocking code
  GithubResource.get(
    {user: userParam, repo: ''}, 
    function(res) {
      $scope.user = res;
    }
  );

  // blocking code
  //$scope.repos = GithubResource.get({user: userParam});
  // non-blocking code
  GithubResource.get(
    {user: userParam},
    function(res) {
      $scope.repos = res;
    }
  );

  // blocking code
  /*
  $scope.gists = GithubResource.get({
    'user': userParam,
    'repo': 'gists'
  }); 
  */
  // non-blocking code
  GithubResource.get({
    'user': userParam,
    'repo': 'gists'
  }, function(res) {
    $scope.gists = res;
  });


  $scope.publicRepoForms = PluralizeService.publicRepoForms;
  $scope.followerForms = PluralizeService.followerForms;

  $scope.watchForms = PluralizeService.watchForms;
  $scope.forkForms = PluralizeService.forkForms;

  //---

  $scope.getFile = function(files) {    
    for(var key in files) {
      return files[key]; 
    }
  };

  $scope.checkLength = function(value) {
    if(typeof value !== 'undefined' && value.hasOwnProperty('length')) {
      return '(' + value.length + ')';
    } else {
      return '(0)';
    }
  };

}]);