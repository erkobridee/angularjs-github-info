define(function(require) {
  'use strict';

  var module = require('../module');

  module.controller('GitHubRepositoryCtrl', GitHubRepositoryCtrl);

  //---

  GitHubRepositoryCtrl.$inject = ['$routeParams', 'GithubResource', 'NavBarService', 'PluralizeService'];

  function GitHubRepositoryCtrl($routeParams, GithubResource, NavBarService, PluralizeService) {

    var userParam = $routeParams.user,
        repoParam = $routeParams.repo,
        urlPath = ['', 'github', userParam, repoParam, ''].join('/');

    //---

    var vm = this;

    vm.repoInfo = null;
    vm.contributors = null;

    vm.watchForms = PluralizeService.watchForms;
    vm.forkForms = PluralizeService.forkForms;

    vm.contributionsTitle = contributionsTitle;

    //---

    // update search menu option url
    NavBarService.updateSearchUrl(urlPath);

    loadData();

    //---

    function contributionsTitle(contributor) {
      var contributionStr = 'Contribution',
          titleMsg;

      if(contributor.contributions > 1) {
        contributionStr = contributionStr + 's';
      }

      titleMsg = contributor.login +
        ' has ' +
        contributor.contributions +
        ' ' +
        contributionStr;

      return titleMsg;
    }

    function loadData() {

      GithubResource.get({
        'query': 'repos',
        'user': userParam,
        'repo': repoParam
      }, function(res) {
        vm.repoInfo = res;
      });

      GithubResource.get({
        'query': 'repos',
        'user': userParam,
        'repo': repoParam,
        'spec': 'contributors'
      }, function(res) {
        vm.contributors = res;
      });

    }

  }

});
