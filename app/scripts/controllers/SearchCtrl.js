angular.module('GithubApp').controller(
  
  // controller name
  'ctrl.Search', 

  //dependency injection
  ['$scope' , '$location', 
  
// controller function
function($scope, $location) {

  // access parent scope function
  $scope.updateSearchUrl('/');

  $scope.searchAction = function() {
    var user = $scope.searchField || 'erkobridee';
    
    console.log('search user: ' + user);

    $location.path(['', 'github', user, ''].join('/'));
  };

}]);