define(function(require) {
  'use strict';

  var module = require('../module');

  module.controller('AboutCtrl', AboutCtrl);

  //---

  AboutCtrl.$inject = ['NavBarService'];

  function AboutCtrl(NavBarService) { // custom parameter scope name if you want
    var vm = this;

    vm.pageName = 'About this application';

    //---

    NavBarService.aboutPageSelected();

    //---

    // TODO: define internal processing code

  }

});
