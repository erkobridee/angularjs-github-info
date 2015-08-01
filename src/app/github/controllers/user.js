define(function(require) {
  'use strict';

  var module = require('../module');

  module.controller('GitHubUserCtrl', GitHubUserCtrl);

  //---

  GitHubUserCtrl.$inject = [
    '$routeParams', 'NavBarService', 'PluralizeService',
    'GithubDataService'
  ];

  function GitHubUserCtrl(
    $routeParams, NavBarService, PluralizeService,
    dataService
  ) {

    var userParam = $routeParams.user,
      urlPath = ['', 'github', userParam, ''].join('/');

    //---

    var vm = this;

    vm.user = null;
    vm.repos = null;
    vm.gists = null;

    vm.publicRepoForms = PluralizeService.publicRepoForms;
    vm.followerForms = PluralizeService.followerForms;

    vm.watchForms = PluralizeService.watchForms;
    vm.forkForms = PluralizeService.forkForms;

    vm.getFile = getFile;
    vm.checkLength = checkLength;

    //---

    // update search menu option url
    NavBarService.updateSearchUrl(urlPath);

    loadData();

    //---

    function getFile(files) {
      for(var key in files) {
        return files[key];
      }
    }

    function checkLength(value) {
      if(
        value &&
        typeof value !== 'undefined' &&
        value.hasOwnProperty('length')
      ) {
        return '(' + value.length + ')';
      } else {
        return '(0)';
      }
    }

    function loadData() {
      var options = {
        user: userParam
      };

      // UserInfo
      dataService
        .user
        .info
        .get(options)
        .then(function(data) {
          vm.user = data;
        });

      // UserRepositories
      dataService
        .user
        .repositories
        .get(options)
        .then(function(data) {
          vm.repos = data;
        });

      // UserGists
      dataService
        .user
        .gists
        .get(options)
        .then(function(data) {
          vm.gists = data;
        });

    }

  }

});
