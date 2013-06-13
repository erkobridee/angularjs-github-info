angular.module('GithubApp').controller(
  
  // controller name
  'ctrl.GithubRepoInfoContributors', 

  //dependency injection
  ['$scope', '$routeParams', 'GithubResource', 
  
// controller function
function($scope, $routeParams, GithubResource) {

  var userParam = $routeParams.user,
      repoParam = $routeParams.repo,
      urlPath = ['', 'github', userParam, repoParam, ''].join('/');

  // access parent scope function
  $scope.updateSearchUrl(urlPath);
  
  console.log( urlPath );

  // blocking code

  //$scope.repoInfo = GithubResource.get({
  //  'query': 'repos',
  //  'user': userParam,
  //  'repo': repoParam
  //});

  // non-blocking code
  GithubResource.get({
    'query': 'repos',
    'user': userParam,
    'repo': repoParam
  }, function(res) {
    $scope.repoInfo = res;
  });

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

  // blocking code
  //$scope.contributors = GithubResource.get({
  //  'query': 'repos',
  //  'user': userParam,
  //  'repo': repoParam,
  //  'spec': 'contributors'
  //});
  
  // non-blocking code
  GithubResource.get({
    'query': 'repos',
    'user': userParam,
    'repo': repoParam,
    'spec': 'contributors'
  }, function(res) {
    $scope.contributors = res;
  });  

  //---

  $scope.contributionsTitle = function(contributor) {
    var contributionStr = 'Contribution',
        titleMsg;

    if(contributor.contributions > 1) {
      contributionStr = contributionStr + 's';
    }

    titleMsg = contributor.login + ' has ' + contributor.contributions + ' ' + contributionStr;

    return titleMsg;
  };

}]);