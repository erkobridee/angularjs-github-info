angular.module('GithubApp').controller(
  
  // controller name
  'ctrl.GithubRepoInfoContributors', 

  // dependency injection
  ['$scope', '$routeParams', 'GithubResource', 'NavBarService', 'PluralizeService',
  
// controller function
function($scope, $routeParams, GithubResource, NavBarService, PluralizeService) {

  var userParam = $routeParams.user,
      repoParam = $routeParams.repo,
      urlPath = ['', 'github', userParam, repoParam, ''].join('/');

  // update search menu option url
  NavBarService.updateSearchUrl(urlPath);
  
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

  $scope.watchForms = PluralizeService.watchForms;
  $scope.forkForms = PluralizeService.forkForms;


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