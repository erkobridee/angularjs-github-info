angular.module('GithubApp').directive(

  // component name
  'navbar', 

// component definition
function() {
    
  return {
    
    restrict: 'E',
    transclude: true,
    
    scope: { 
      title: '@'
    },
    
    controller: [
      '$scope', '$element', 'NavBarService',
      function($scope, $element, NavBarService) {

        $scope.nav = NavBarService.getNav();
        
      }
    ],
    
    templateUrl: 'views/components/navbar.html',
    replace: true
  };

}); 