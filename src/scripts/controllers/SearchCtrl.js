angular.module('GithubApp').controller(
  
  // controller name
  'ctrl.Search', 

  //dependency injection
  ['$scope' , '$location', 'NavBarService',
  
// controller function
function($scope, $location, NavBarService) {

  console.log('ctrl.Search');
  console.log(NavBarService);

  // access parent scope function
  //$scope.updateSearchUrl('/');
  NavBarService.updateSearchUrl('/');

  $scope.searchAction = function() {
    var user = $scope.searchField || 'erkobridee';
    
    console.log('search user: ' + user);

    $location.path(['', 'github', user, ''].join('/'));
  };

}]);