angular.module('GithubApp').controller(
  
  // controller name
  'ctrl.Search', 

  // dependency injection
  ['$scope' , '$location', 'NavBarService',
  
// controller function
function($scope, $location, NavBarService) {

  // update search menu option url
  NavBarService.updateSearchUrl('/');

  $scope.searchAction = function() {
    var user = $scope.searchField || 'erkobridee';
    
    $location.path(['', 'github', user, ''].join('/'));
  };

}]);