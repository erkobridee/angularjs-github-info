angular.module('GithubApp').controller(

  // controller name
  'ctrl.About',

  // dependency injection
  ['$scope', 'NavBarService',

// controller function
function(customScopeName, NavBarService) { // custom parameter scope name if you want

  NavBarService.aboutPageSelected();

  customScopeName.pageName = 'About this application';

}]);
