angular.module('GithubApp').directive(

  // component name
  'pane', 

// component definition
function() {
    
  return {
    
    require: '^tabs',
    restrict: 'E',
    transclude: true,
    scope: { title: '@' },
    
    link: function(scope, element, attrs, tabsCtrl) {
      tabsCtrl.addPane(scope);
    },
    
    templateUrl: 'views/components/pane.html',  
    replace: true
    
  };

});