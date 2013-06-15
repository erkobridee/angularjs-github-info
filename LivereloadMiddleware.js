/* global module:false */
module.exports = function(connect, options) {
  'use strict';

  var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
   
  var folderMount = function folderMount(connect, point) {
    return connect.static(point);
  };

  return [lrSnippet, folderMount(connect, options.base)];

};