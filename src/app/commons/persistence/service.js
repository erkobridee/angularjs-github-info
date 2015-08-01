// PersistenceService
define(function(require) {
  'use strict';

  var module = require('./module');

  module.factory('PersistenceService', PersistenceService);

  //---

  PersistenceService.$inject = ['$exceptionHandler', '$window', 'PERSISTENCE_STORAGE_KEY'];

  /*
    Provide a storage API that uses an in-memory data cache that is persisted
    to the localStorage at the limits of the application life-cycle.
  */
  function PersistenceService($exceptionHandler, $window, storageKey) {

    /*
      Collection of callbacks that want to hook into the
      unload event of the in-memory cache. This will give the calling
      context a chance to update their relevant storage items before
      the data is persisted to localStorage.
    */
    var persistHooks = [];

    /*
      Determine if the cache should be persisted to localStorage when the
      application is unloaded.
    */
    var persistEnabled = true;

    //---

    /*
      Try to load the initial payload from localStorage.

        Attempt to load the cache from the localStorage interface.
        Once the data is loaded, it is deleted from localStorage.
    */
    var items = (function loadData() {
      /*
        There's a chance that the localStorage isn't available, even in
        modern browsers (looking at you, Safari, running in Private mode).
      */
      try {
        if( storageKey in $window.localStorage ) {
          var data = $window.localStorage.getItem( storageKey );
          $window.localStorage.removeItem( storageKey );
          /*
            NOTE: Using .extend() here as a safe-guard to ensure that
            the value we return is actually a hash, even if the data
            is corrupted.
          */
          return( angular.extend( {}, angular.fromJson( data ) ) );
        }
      } catch ( localStorageError ) {
        $exceptionHandler( localStorageError );
      }
      // If we made it this far, something went wrong.
      return( {} );
    })();

    //---
    // @begin: internal logic

    /*
      Normalize the given cache key so that we never collide with any
      native object keys when looking up items.
    */
    function normalizeKey( key ) {
      return( "sk_" + key );
    }

    // Attempt to persist the cache to the localStorage.
    function persistData() {
      /*
        Before we persist the data, invoke all of the before-persist hook
        operators so that consuming services have one last chance to
        synchronize their local data with the storage data.
      */
      for( var i = 0, length = persistHooks.length ; i < length ; i++ ) {
        try {
          persistHooks[ i ]();
        } catch ( persistHookError ) {
          $exceptionHandler( persistHookError );
        }
      }
      // If persistence is disabled, skip the localStorage access.
      if( ! persistEnabled ) {
        return;
      }
      /*
        There's a chance that localStorage isn't available, even in modern
        browsers. And, even if it does exist, we may be attempting to store
        more data that we can based on per-domain quotas.
      */
      try {
        $window.localStorage.setItem( storageKey, angular.toJson( items ) );
      } catch ( localStorageError ) {
        $exceptionHandler( localStorageError );
      }
    }

      //---

    // Clear the current item cache.
    function clear() {
      items = {};
    }

    // Disable the persisting of the cache to localStorage on unload.
    function disablePersist() {
      persistEnabled = false;
    }

    // Enable the persisting of the cache to localStorage on unload.
    function enablePersist() {
      persistEnabled = true;
    }

    /*
      Remove the given key from the cache and return the value that was
      cached at that key; returns null if the key didn't exist.
    */
    function extractItem( key ) {
        var value = getItem( key );
        removeItem( key );
        return ( value );
    }

    // Return the item at the given key; returns null if not available.
    function getItem( key ) {
      key = normalizeKey( key );
      /*
        NOTE: Using .copy() so that the internal cache can't be
        mutated through direct object references.
      */
      return ( ( key in items ) ? angular.copy( items[ key ] ) : null );
    }

    /*
      Add the given operator to persist hooks that will be invoked prior
      to unload-based persistence.
    */
    function onBeforePersist( operator ) {
      persistHooks.push( operator );
    }

    // Remove the given key from the cache.
    function removeItem( key ) {
        key = normalizeKey( key );
        delete( items[ key ] );
    }

    // I store the item at the given key.
    function setItem( key, value ) {
      key = normalizeKey( key );
      /*
        NOTE: Using .copy() so that the internal cache can't be
        mutated through direct object references.
      */
      items[ key ] = angular.copy( value );
    }

    // @end: internal logic
    //---

    /*
      During the application lifetime, we're going to be using in-memory
      data access (since localStorage I/O is relatively expensive and
      requires data to be serialized - two things we don't want during the
      user to "feel"). However, when the application unloads, we want to try
      to persist the in-memory cache to the localStorage.
    */
    $window.addEventListener( 'beforeunload', persistData );

    //---

    var service = {
      clear           : clear,
      disablePersist  : disablePersist,
      enablePersist   : enablePersist,
      extractItem     : extractItem,
      getItem         : getItem,
      onBeforePersist : onBeforePersist,
      removeItem      : removeItem,
      setItem         : setItem
    };

    return service;
  }

});
