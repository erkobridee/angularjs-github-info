Ctrl = (function() {
  "use strict";

  var watchForms = {
      '1': 'Watcher',
      'other': 'Watchers'
    },
    forkForms = {
      '1': 'Fork',
      'other': 'Forks'
    };

  //-----------------------------------------------------------------

  function Ctrl() {}

  //-----------------------------------------------------------------

  // see controllers/AppCtrl.js

  Ctrl.prototype.App = function($scope) {
    $scope.showForkBelt = 'yes';

    $scope.searchUrlPath = '/';
    $scope.searchNotActive = '';
    $scope.aboutNotActive = 'x';

    $scope.searchPageSelected = function() {
      $scope.searchNotActive = '';
      $scope.aboutNotActive = 'x';    
    };

    $scope.aboutPageSelected = function() {
      $scope.showForkBelt = 'yes';

      $scope.searchNotActive = 'x';
      $scope.aboutNotActive = '';
    };

    $scope.updateSearchUrl = function(urlPath) {
      if('/' === urlPath) {
        $scope.showForkBelt = 'yes';
      } else {
        $scope.showForkBelt = undefined;
      }

      $scope.searchUrlPath = urlPath;
      $scope.searchPageSelected();
    };

  };

  //-----------------------------------------------------------------

  // see controllers/SearchCtrl.js

  Ctrl.prototype.Search = function($scope, $location) {
    // access parent scope function
    $scope.updateSearchUrl('/');

    $scope.searchAction = function() {
      var user = $scope.searchField || 'erkobridee';
      
      console.log('search user: ' + user);

      $location.path(['', 'github', user, ''].join('/'));
    };

  };
  
  //-----------------------------------------------------------------

  // see controllers/AboutCtrl.js

  // custom parameter scope name
  Ctrl.prototype.About = function(customScopeName) {
    // access parent scope function
    customScopeName.aboutPageSelected();

    customScopeName.pageName = 'About this application';
  };

  //-----------------------------------------------------------------
  
  // see controllers/GithubUserReposGistsCtrl.js

  Ctrl.prototype.GithubUserReposGists = function($scope, $routeParams, GithubResource) {

    var userParam = $routeParams.user,
        urlPath = ['', 'github', userParam, ''].join('/');

    // access parent scope function
    $scope.updateSearchUrl(urlPath);
   
    console.log( urlPath );

    console.log('GithubUserReposGists : request user info');
    // blocking code
    //$scope.user = GithubResource.get({user: userParam, repo: ''});
    // non-blocking code
    GithubResource.get(
      {user: userParam, repo: ''}, 
      function(res) {
        $scope.user = res;
        console.log('GithubUserReposGists : user info returned');
      }
    );

    console.log('GithubUserReposGists : request user repos');
    // blocking code
    //$scope.repos = GithubResource.get({user: userParam});
    // non-blocking code
    GithubResource.get(
      {user: userParam},
      function(res) {
        $scope.repos = res;
        console.log('GithubUserReposGists : user repos returned');
      }
    );
    
    console.log('GithubUserReposGists : request user gists');
    // blocking code

    //$scope.gists = GithubResource.get({
    //  'user': userParam,
    //  'repo': 'gists'
    //});

    // non-blocking code
    GithubResource.get({
      'user': userParam,
      'repo': 'gists'
    }, function(res) {
      $scope.gists = res;
      console.log('GithubUserReposGists : user gists returned');
    });
    
    $scope.publicRepoForms = {
      '1': 'Public Repo',
      'other': 'Public Repos'
    };
    $scope.followerForms = { 
      '1': 'Follower', 
      'other': 'Followers'
    };

    $scope.watchForms = watchForms;
    $scope.forkForms = forkForms;

    //---

    $scope.getFile = function(files) {    
      for(var key in files) {
        return files[key]; 
      }
    };

    $scope.checkLength = function(value) {
      if(typeof value !== 'undefined' && value.hasOwnProperty('length')) {
        return '(' + value.length + ')';
      } else {
        return '(0)';
      }
    };
    
  };
  
  //-----------------------------------------------------------------
  
  // see controllers/GithubRepoInfoContributorsCtrl.js

  Ctrl.prototype.GithubRepoInfoContributors = function($scope, $routeParams, GithubResource) {

    var userParam = $routeParams.user,
        repoParam = $routeParams.repo,
        urlPath = ['', 'github', userParam, repoParam, ''].join('/');

    // access parent scope function
    $scope.updateSearchUrl(urlPath);
    
    console.log( urlPath );

    // blocking code
    //$scope.repoInfo = GithubResource.get({
    //  'query': 'repos',
    //  'user': userParam,
    //  'repo': repoParam
    //});

    // non-blocking code
    GithubResource.get({
      'query': 'repos',
      'user': userParam,
      'repo': repoParam
    }, function(res) {
      $scope.repoInfo = res;
    });

    $scope.watchForms = watchForms;
    $scope.forkForms = forkForms;

    // blocking code
    //$scope.contributors = GithubResource.get({
    //  'query': 'repos',
    //  'user': userParam,
    //  'repo': repoParam,
    //  'spec': 'contributors'
    //});

    // non-blocking code
    GithubResource.get({
      'query': 'repos',
      'user': userParam,
      'repo': repoParam,
      'spec': 'contributors'
    }, function(res) {
      $scope.contributors = res;
    });  

    //---

    $scope.contributionsTitle = function(contributor) {
      var contributionStr = 'Contribution',
          titleMsg;

      if(contributor.contributions > 1) {
        contributionStr = contributionStr + 's';
      }

      titleMsg = contributor.login + ' has ' + contributor.contributions + ' ' + contributionStr;

      return titleMsg;
    };

  };
  
  //-----------------------------------------------------------------
  return Ctrl;
}());


var ctrl = new Ctrl();

/* 
  if you want some custom parameter name, use this injection method
  for more informations about, see:
  http://code.angularjs.org/1.0.1/docs-1.0.1/api/AUTO.$injector
*/
ctrl.About.$inject = ['$scope'];
