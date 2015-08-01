define(function(require) {
  'use strict';

  var module = require('../module');

  module.directive('navbar', navbar);

  //---

  // https://docs.angularjs.org/guide/directive
  // https://docs.angularjs.org/api/ng/service/$compile

  function navbar() {

    var scope = {
      title: '@'
    };

    var directive = {
      restrict: 'E',
      scope: scope,

      controller: ControllerFn,
      controllerAs: 'vm',
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

      vm.nav = NavBarService.getNav();
    }

    //---

    function templateUrlFn(tElement, tAttrs) {
      return 'app/commons/components/templates/navbar.html';
    }

    //---

    return directive;

  }

});
