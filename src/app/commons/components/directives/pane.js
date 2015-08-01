define(function(require) {
  'use strict';

  var module = require('../module');

  module.directive('pane', pane);

  //---

  // https://docs.angularjs.org/guide/directive

  function pane() {

    var scope = {
      title: '@'
    };

    var directive = {
      require: '^tabs',
      restrict: 'E',
      scope: scope,

      link: linkingFn,

      transclude: true,
      templateUrl: templateUrlFn
    };

    //---

    function linkingFn(scope, element, attrs, controller) {

      controller.addPane(scope);

    }

    //---

    function templateUrlFn(tElement, tAttrs) {
      return 'app/commons/components/templates/pane.html';
    }

    //---

    return directive;

  }

});
