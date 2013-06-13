angular.module('GithubApp').controller(
    
    // controller name
    'ctrl.App', 
    
    // dependency injection
    ['$scope', 

// controller function
function(scope) {

  scope.showForkBelt = 'yes';

  scope.searchUrlPath = '/';
  scope.searchNotActive = '';
  scope.aboutNotActive = 'x';

  scope.searchPageSelected = function() {
    scope.searchNotActive = '';
    scope.aboutNotActive = 'x';    
  };

  scope.aboutPageSelected = function() {
    scope.showForkBelt = 'yes';

    scope.searchNotActive = 'x';
    scope.aboutNotActive = '';
  };

  scope.updateSearchUrl = function(urlPath) {
    if('/' === urlPath) {
      scope.showForkBelt = 'yes';
    } else {
      scope.showForkBelt = undefined;
    }

    scope.searchUrlPath = urlPath;
    scope.searchPageSelected();
  };

  //---

  scope.watchForms = {
    '1': 'Watcher',
    'other': 'Watchers'
  };
  scope.forkForms = {
    '1': 'Fork',
    'other': 'Forks'
  };


}]);