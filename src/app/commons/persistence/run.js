define(function(require) {
  'use strict';

  var module = require('./module');

  module.run(onModuleRun);

  //---

  /*
    This is just here to make sure that the storage component is loaded when the
    app is bootstrapped. This will cause the localStorage I/O overhead to be front-
    loaded in the app rather than caused by a particular user interaction (which
    the user is more likely to notice).
  */
  onModuleRun.$inject = ['PersistenceService'];

  function onModuleRun(persistenceService) {}

});
