define(function(require) {
  'use strict';

  var Hashids = require('hashids');
  var salt = 'shorthashservice';
  var hashids = new Hashids( salt );
  //---

  var module = require('./module');

  module.factory('ShortHashService', ShortHashService);

  //---

  ShortHashService.$inject = [];

  function ShortHashService() {
    //--- publish

    function hashFn(value) {
      if( !angular.isString( value ) ) value = JSON.stringify( value );

      var i,
          charArray = [];

      for( i = value.length - 1; i >= 0; i-- ) {
        charArray.push( value.charCodeAt(i) );
      }

      var hash = hashids.encode( charArray );
      charArray = [];

      var hashSum = hash.length;
      for( i = hash.length - 1; i >= 0; i-- ) {
        hashSum += hash.charCodeAt(i);
      }

      // return {
      //   input: value,
      //   hashSum: hashSum,
      //   hash: hashids.encode( hashSum )
      // };
      return hashids.encode( hashSum );
    }

    //--- api
    var service = {
      make: hashFn
    };
    return service;
  }

});
