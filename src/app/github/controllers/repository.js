define(function(require) {
  'use strict';

  var module = require('../module');

  module.controller('GitHubRepositoryCtrl', GitHubRepositoryCtrl);

  //---

  GitHubRepositoryCtrl.$inject = [
    '$routeParams', 'NavBarService', 'PluralizeService',
    'GithubDataService'
  ];

  function GitHubRepositoryCtrl(
    $routeParams, NavBarService, PluralizeService,
    dataService
  ) {

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
      var options = {
        user: userParam,
        repo: repoParam
      };

      // RepositoryInfo
      dataService
        .repository
        .info
        .get(options)
        .then(function(data) {
          vm.repoInfo = data;
        });

      // RepositoryContributors
      dataService
        .repository
        .contributors
        .get(options)
        .then(function(data) {
          vm.contributors = data;
        });

    }

  }

});
