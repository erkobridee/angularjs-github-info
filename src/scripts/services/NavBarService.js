angular.module('GithubApp').service(

  // service name
  'NavBarService',  

  // dependency injection
  [ '$rootScope',

// service definition
function(rootScope) {

  //---------

  var nav = {
      showForkBelt: 'yes',
      searchUrlPath: '/',
      searchNotActive: '',
      aboutNotActive: 'x'
  };

  var _searchPageSelected = function() {

    nav.searchNotActive = '';
    nav.aboutNotActive = 'x';

  };

  var _aboutPageSelected = function() {

    nav.showForkBelt = 'yes';

    nav.searchNotActive = 'x';
    nav.aboutNotActive = '';

  };

  var _updateSearchUrl = function(urlPath) {

    if('/' === urlPath) {
      nav.showForkBelt = 'yes';
    } else {
      nav.showForkBelt = undefined;
    }

    nav.searchUrlPath = urlPath;
    _searchPageSelected();
  };

  //---------

  return {
    
    getNav: function() {
      return nav;
    },

    searchPageSelected: function() {
      _searchPageSelected();
    },

    aboutPageSelected: function() {
      _aboutPageSelected();
    },

    updateSearchUrl: function(urlPath) {
      _updateSearchUrl(urlPath);
    }

  };

}]);