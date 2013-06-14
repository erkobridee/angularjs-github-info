module.exports = function(grunt) {  
  'use strict';

  // load all grunt tasks -> see package.json :: devDependencies
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  //---

  var appConfig = {
    serverPort: 1337,
    paths: {
      bower: 'components', // bower components dir
      app: 'src', // source
      build: 'build', // dev - mount
      dist: 'dist' // to production
    }
  };

  var gruntConfig = {

    paths: appConfig.paths,

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: [
        'Gruntfile.js',
        '<%= paths.app %>/**/*.js'
      ]
    },

    clean: {
      working: [
        '<%= paths.build %>/',  
        '<%= paths.dist %>/'
      ]
    },

    copy: {
      prodbuild: {
        files: [
          {src: ['.gitignore'], dest: '<%= paths.dist %>/', filter: 'isFile'},
          {src: ['README.md'], dest: '<%= paths.dist %>/', filter: 'isFile'},
          {
            cwd: '<%= paths.app %>/', 
            src: ['**'], 
            dest: '<%= paths.dist %>/', 
            expand: true
          }
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
          base: '<%= paths.app %>', 
          keepalive: true
        }
      },
      prod: {
        options: {
          port: appConfig.serverPort,
          base: '<%= paths.dist %>', 
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

  //---

  grunt.registerTask('prodbuild', ['jshint', 'clean', 'copy:prodbuild']);  

  //---

  grunt.registerTask('dev', ['jshint', 'open', 'connect:dev']);

  grunt.registerTask('prod', ['prodbuild', 'open', 'connect:prod']);

  grunt.registerTask('publish', ['prodbuild', 'build_gh_pages:gh_pages']);


};