angular.module('GithubApp').controller(
  
  // controller name
  'ctrl.About',

  //dependency injection
  ['$scope', 'NavBarService',

// controller function
function(customScopeName, NavBarService) { // custom parameter scope name if you want 

  console.log('ctrl.About');
  console.log(NavBarService);

  // access parent scope function 
  //customScopeName.aboutPageSelected();
  NavBarService.aboutPageSelected();

  customScopeName.pageName = 'About this application';

}]);