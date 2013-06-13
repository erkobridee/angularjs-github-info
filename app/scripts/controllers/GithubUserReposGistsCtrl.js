angular.module('GithubApp').controller(

  // controller name
  'ctrl.GithubUserReposGists', 

  //dependency injection
  ['$scope', '$routeParams', 'GithubResource', 
    
// controller function
function($scope, $routeParams, GithubResource) {

  var userParam = $routeParams.user,
      urlPath = ['', 'github', userParam, ''].join('/');

  // access parent scope function
  $scope.updateSearchUrl(urlPath);

  console.log( urlPath );

  console.log('GithubUserReposGists : request user info');
  // blocking code
  //$scope.user = GithubResource.get({user: userParam, repo: ''});
  // non-blocking code
  GithubResource.get(
    {user: userParam, repo: ''}, 
    function(res) {
      $scope.user = res;
      console.log('GithubUserReposGists : user info returned');
    }
  );

  console.log('GithubUserReposGists : request user repos');
  // blocking code
  //$scope.repos = GithubResource.get({user: userParam});
  // non-blocking code
  GithubResource.get(
    {user: userParam},
    function(res) {
      $scope.repos = res;
      console.log('GithubUserReposGists : user repos returned');
    }
  );

  console.log('GithubUserReposGists : request user gists');
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
    console.log('GithubUserReposGists : user gists returned');
  });

  $scope.publicRepoForms = {
    '1': 'Public Repo',
    'other': 'Public Repos'
  };
  $scope.followerForms = { 
    '1': 'Follower', 
    'other': 'Followers'
  };

  /*
  $scope.watchForms = {
    '1': 'Watcher',
    'other': 'Watchers'
  };
  $scope.forkForms = {
    '1': 'Fork',
    'other': 'Forks'
  };
  */

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