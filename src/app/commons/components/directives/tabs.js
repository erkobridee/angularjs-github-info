define(function(require) {
  'use strict';

  var module = require('../module');

  module.directive('tabs', tabs);

  //---

  // https://docs.angularjs.org/guide/directive
  // https://docs.angularjs.org/api/ng/service/$compile

  function tabs() {

    var scope = {
    };

    var directive = {
      restrict: 'E',
      scope: scope,
      transclude: true,

      controller: ControllerFn,
      controllerAs: 'tabs',
      // So our isolated scope will be stored
      // on the `this` context of our controller
      // instead of
      bindToController: true,

      templateUrl: templateUrlFn
    };

    //---

    ControllerFn.$inject = ['NavBarService'];

    function ControllerFn(NavBarService) {
      var vm = this;

      vm.panes = [];

      vm.select = select;
      vm.addPane = addPane;

      //---

      function select(pane) {
        angular.forEach(vm.panes, function(pane) {
          pane.selected = false;
        });
        pane.selected = true;
      }

      function addPane(pane) {
        if (vm.panes.length === 0) vm.select(pane);
        vm.panes.push(pane);
      }

    }

    //---

    function templateUrlFn(tElement, tAttrs) {
      return 'app/commons/components/templates/tabs.html';
    }

    //---

    return directive;

  }

});
