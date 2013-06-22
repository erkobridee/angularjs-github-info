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
    console.log('NavBarService_searchPageSelected');

    nav.searchNotActive = '';
    nav.aboutNotActive = 'x';

    //broadcastChanges(); 
  };

  var _aboutPageSelected = function() {
    console.log('NavBarService_aboutPageSelected');

    nav.showForkBelt = 'yes';

    nav.searchNotActive = 'x';
    nav.aboutNotActive = '';

    //broadcastChanges();
  };

  var _updateSearchUrl = function(urlPath) {
    console.log('NavBarService_updateSearchUrl');

    if('/' === urlPath) {
      nav.showForkBelt = 'yes';
    } else {
      nav.showForkBelt = undefined;
    }

    nav.searchUrlPath = urlPath;
    _searchPageSelected();
  };

  //---------

  /*
  var broadcastChanges = function() {
    rootScope.$broadcast('navBarChanged', nav);
  };
  */

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

    /*
    updateSearchUrl: function(urlPath) {
      if('/' === urlPath) {
        nav.showForkBelt = 'yes';
      } else {
        nav.showForkBelt = undefined;
      }

      nav.searchUrlPath = urlPath;
      _searchPageSelected();
    }
    */
    updateSearchUrl: function(urlPath) {
      _updateSearchUrl(urlPath);
    }

  };

}]);