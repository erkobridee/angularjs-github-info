module.exports = function(grunt) {  
  'use strict';

  // load all grunt tasks -> see package.json :: devDependencies
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  //---

  var gruntConfig = {
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: [
        'Gruntfile.js'
        //, 'app/**/*.js'
      ]
    },

    connect: {
      dev: {
        options: {
          port: 1337,
          base: 'app',
          keepalive: true
        }
      },
      test: {
        options: {
          port: 1337,
          base: 'dist',
          keepalive: true
        }
      }
    },

    clean: {
      build: ['dist/']
    },

    copy: {
      build: {
        files: [
          {src: ['.gitignore'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'app/', src: ['**'], dest: 'dist/'}
        ]
      }
    },

    build_gh_pages: {
      gh_pages: {
        
      }
    }    

  };

  grunt.initConfig(gruntConfig);

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('dev', ['jshint', 'connect:dev']);

  grunt.registerTask('test', ['jshint', 'clean', 'copy', 'connect:test']);

  grunt.registerTask('publish', ['jshint', 'clean', 'copy', 'build_gh_pages:gh_pages']);


};