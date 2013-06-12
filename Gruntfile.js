module.exports = function(grunt) {  
  'use strict';

  // load all grunt tasks -> see package.json :: devDependencies
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  //---

  var appConfig = {
    serverPort: 1337
  };

  var gruntConfig = {

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: [
        'Gruntfile.js',
        'app/**/*.js'
      ]
    },

    clean: {
      build: ['dist/']
    },

    copy: {
      build: {
        files: [
          {src: ['.gitignore'], dest: 'dist/', filter: 'isFile'},
          {src: ['README.md'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'app/', src: ['**'], dest: 'dist/'}
        ]
      }
    },

    // TODO: add template compilation

    // TODO: add less

    // TODO: add watch

    // TODO: add livereload to development mode

    connect: {
      dev: {
        options: {
          port: appConfig.serverPort,
          base: 'app', 
          keepalive: true
        }
      },
      prod: {
        options: {
          port: appConfig.serverPort,
          base: 'dist', 
          keepalive: true
        }
      }
    },

    open: {
      webapp: {
        path: 'http://localhost:' + appConfig.serverPort
      }
    },

    build_gh_pages: {
      gh_pages: {
        
      }
    }

    
  };

  grunt.initConfig(gruntConfig);

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('dev', ['jshint', 'open', 'connect:dev']);

  grunt.registerTask('prod', ['jshint', 'clean', 'copy', 'open', 'connect:prod']);

  grunt.registerTask('publish', ['jshint', 'clean', 'copy', 'build_gh_pages:gh_pages']);


};