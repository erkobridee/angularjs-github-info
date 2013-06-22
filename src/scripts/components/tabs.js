angular.module('GithubApp').directive(

  // component name
  'tabs', 

// component definition
function() {

  return {
    
    restrict: 'E',
    transclude: true,
    scope: {},

    controller: [ '$scope', '$element', function($scope, $element) {
      var panes = $scope.panes = [];

      $scope.select = function(pane) {
        angular.forEach(panes, function(pane) {
          pane.selected = false;
        });
        pane.selected = true;
      };

      this.addPane = function(pane) {
        if (panes.length === 0) $scope.select(pane);
        panes.push(pane);
      };
    }],
    
    templateUrl: 'views/components/tabs.html',
    replace: true

  };

});