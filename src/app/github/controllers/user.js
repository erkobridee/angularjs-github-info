define(function(require) {
  'use strict';

  var module = require('../module');

  module.controller('GitHubUserCtrl', GitHubUserCtrl);

  //---

  GitHubUserCtrl.$inject = ['$routeParams', 'GithubResource', 'NavBarService', 'PluralizeService'];

  function GitHubUserCtrl($routeParams, GithubResource, NavBarService, PluralizeService) {

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
      if(typeof value !== 'undefined' && value.hasOwnProperty('length')) {
        return '(' + value.length + ')';
      } else {
        return '(0)';
      }
    }

    function loadData() {

      GithubResource.get(
        {user: userParam, repo: ''},
        function(res) {
          vm.user = res;
        }
      );

      GithubResource.get(
        {user: userParam},
        function(res) {
          vm.repos = res;
        }
      );

      GithubResource.get({
        'user': userParam,
        'repo': 'gists'
      }, function(res) {
        vm.gists = res;
      });

    }

  }

});
