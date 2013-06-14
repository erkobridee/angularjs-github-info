angular.module('GithubApp').controller(
  
  // controller name
  'ctrl.About',

  //dependency injection
  ['$scope', 

// controller function
function(customScopeName) { // custom parameter scope name if you want 

  // access parent scope function 
  customScopeName.aboutPageSelected();

  customScopeName.pageName = 'About this application';

}]);