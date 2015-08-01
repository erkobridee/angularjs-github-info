define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('GithubDataService', GithubDataService);

  //---

  GithubDataService.$inject = [
    'GithubUserInfoService',
    'GithubUserRepositoriesService',
    'GithubUserGistsService',
    'GithubRepositoryInfoService',
    'GithubRepositoryContributorsService'
  ];

  function GithubDataService(
    userInfo, userRepositories, userGists,
    repositoryInfo, repositoryContributors
  ) {

    //--- api
    return {
      user: {
        info: userInfo,
        repositories: userRepositories,
        gists: userGists
      },
      repository: {
        info: repositoryInfo,
        contributors: repositoryContributors
      }
    };
  }

});
