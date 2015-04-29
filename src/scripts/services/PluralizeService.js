angular.module('GithubApp').service(

  // service name
  'PluralizeService',

  // dependency injection
  [ //'$scope',

// service definition
function() {

  return {

    publicRepoForms: {
      '1': 'Public Repo',
      'other': 'Public Repos'
    },

    followerForms: {
      '1': 'Follower',
      'other': 'Followers'
    },

    watchForms: {
      '1': 'Watcher',
      'other': 'Watchers'
    },

    forkForms: {
      '1': 'Fork',
      'other': 'Forks'
    }

  };

}]);
