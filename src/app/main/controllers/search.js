define(function(require) {
  'use strict';

  var module = require('../module');

  module.controller('SearchCtrl', SearchCtrl);

  //---

  SearchCtrl.$inject = ['$location', 'NavBarService'];

  function SearchCtrl($location, NavBarService) {
    var vm = this;

    vm.searchField = '';
    vm.searchAction = searchAction;

    //---

    // update search menu option url
    NavBarService.updateSearchUrl('/');

    //---

    function searchAction() {
      var user = vm.searchField || 'erkobridee';

      $location.path(['', 'github', user, ''].join('/'));
    }

  }

});
