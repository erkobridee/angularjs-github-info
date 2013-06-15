module.exports = function(grunt) {  
  'use strict';

  // load all grunt tasks -> see package.json :: devDependencies
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  //---

  var appConfig = {

    serverPort: 1337,
    
    paths: {
      bower: 'components', // bower components dir
      app: 'src', 
      build: 'build', 
      dist: 'dist' 
    },
    
    // grunt-hustler configs

    template: {
      views: {
        files: {'./build/views/': './<%= paths.app %>/views/**/*.html'}
      },
      dev: {
        files: {'./build/index.html': './<%= paths.app %>/index.html'},
        environment: 'dev'
      },
      prod: {
        files: '<%= template.dev.files %>',
        environment: 'prod'
      }
    }, // end template

    minifyHtml: {
      index: {
        files: {
          './build/': './<%= paths.build %>/index.html'
        }
      },
      all: {
        files: {
          './build/': './<%= paths.build %>/**/*.html'
        }
      }
    }, // end minifyHtml

    ngTemplateCache: { // TODO: review 
      views: {
        files: {
          './build/scripts/views.js': './<%= paths.build %>/ ** / *.html'
        }, 
        options: {
          module: 'GithubApp', // angular app module name
          trim: './<%= paths.build %>'
        }
      }
    } // end ngTemplateCache

  }; // end appConfig


  //---


  var gruntConfig = {

    pkg: grunt.file.readJSON('package.json'),

    paths: appConfig.paths,

    //----------

    template: appConfig.template,

    minifyHtml: appConfig.minifyHtml,

    // TODO: review
    // ngTemplateCache: appConfig.ngTemplateCache,

    //----------

    jshint: {
      all: [
        'Gruntfile.js',
        'LivereloadMiddleware.js',
        '<%= paths.app %>/**/*.js'
      ]
    }, // end jshing

    //----------

    clean: {
      
      working: [
        '<%= paths.build %>/',
        '<%= paths.dist %>/'
      ],

      build: ['<%= paths.build %>/']

    }, // end clean

    //----------

    // TODO: add less

    //----------

    imagemin: {

      options: {                       
        optimizationLevel: 3
      },

      files: {
          expand: true,      
          cwd: '<%= paths.app %>/',
          src: ['**/*.{png,jpg,jpeg}'], 
          dest: '<%= paths.build %>/'  
      }

    }, // end imagemin    

    //----------

    // TODO: add requirejs

    //----------

    watch: {
      dist: {
        files : ['<%= paths.dist %>/**'],
        options: {
          livereload: true
        }
      },

      index: {
        files : ['<%= paths.app %>/index.html'],
        tasks : [
          'template:dev', 
          'copy:index'
        ]
      },

      views: {
        files : ['<%= paths.app %>/views/**/*.html'],
        tasks : [
          'template:views', 
          'copy:views'
        ]
      },

      scripts: {
        files : ['<%= paths.app %>/scripts/**'],
        tasks : [
          'copy:js', 
          'copy:scripts'
        ]
      },

      styles: {
        files : ['<%= paths.app %>/styles/**'],
        tasks : [
          'copy:css', 
          'copy:styles'
        ]
      }
    }, // end watch

    //----------

    copy: {

      //--- watch:scripts call this
      //--- send files to build/
      js: {
        files: [
          {
            cwd: '<%= paths.app %>/', 
            src: ['scripts/**/*.js'], 
            dest: '<%= paths.build %>/', 
            expand: true
          }
        ]
      },

      // TODO: when migrate to less remove this
      css: {
        files: [
          {
            cwd: '<%= paths.app %>/', 
            src: ['styles/**/*.css'], 
            dest: '<%= paths.build %>/', 
            expand: true
          }
        ]
      },

      bower_components: {
        files: [
          { // jquery
            cwd: '<%= paths.bower %>/jquery/', 
            src: ['jquery.min.js'], 
            dest: '<%= paths.build %>/scripts/libs/', 
            expand: true
          },
          { // angularjs
            cwd: '<%= paths.bower %>/angularjs-bower/', 
            src: [
              'angular.min.js',
              'angular-resource.min.js'
            ], 
            dest: '<%= paths.build %>/scripts/libs/', 
            expand: true
          },
          { // twitter bootstrap css
            cwd: '<%= paths.bower %>/bootstrap/docs/assets/css/', 
            src: [
              'bootstrap.css',
              'bootstrap-responsive.css'
            ], 
            dest: '<%= paths.build %>/styles/', 
            expand: true
          },
          { // twitter bootstrap img
            cwd: '<%= paths.bower %>/bootstrap/docs/assets/img/', 
            src: [
              'glyphicons-halflings.png',
              'glyphicons-halflings-white.png'
            ], 
            dest: '<%= paths.build %>/img/', 
            expand: true
          },
          { // twitter bootstrap ico
            cwd: '<%= paths.bower %>/bootstrap/docs/assets/', 
            src: [
              'ico/**'
            ], 
            dest: '<%= paths.build %>/img/', 
            expand: true
          },          
          { // twitter bootstrap js
            cwd: '<%= paths.bower %>/bootstrap/docs/assets/js/', 
            src: [
              'bootstrap.min.js'
            ], 
            dest: '<%= paths.build %>/scripts/libs/', 
            expand: true
          }
        ]
      }, // end bower_components

      img: {
        files: [
          {
            cwd: '<%= paths.app %>/', 
            src: ['**/*.{png,jpg,jpeg,gif,ico}'], 
            dest: '<%= paths.build %>/', 
            expand: true
          }
        ]
      },

      //--- send files to dist/
      dev: {
        files: [
          {
            cwd: '<%= paths.build %>/', 
            src: ['**'], 
            dest: '<%= paths.dist %>/', 
            expand: true
          }
        ]
      },
      prod: {
        files: [
          {src: ['.gitignore'], dest: '<%= paths.dist %>/', filter: 'isFile'},
          {src: ['README.md'], dest: '<%= paths.dist %>/', filter: 'isFile'},
          {
            cwd: '<%= paths.build %>/', 
            src: ['**'], 
            dest: '<%= paths.dist %>/', 
            expand: true
          }
        ]
      },
      
      //--- for watch tasks
      index: {
        files: [
          {
            cwd: '<%= paths.build %>/', 
            src: ['index.html'], 
            dest: '<%= paths.dist %>/', 
            expand: true
          }
        ]
      },

      views: {
        files: [
          {
            cwd: '<%= paths.build %>/', 
            src: ['views/**'], 
            dest: '<%= paths.dist %>/', 
            expand: true
          }
        ]
      },

      scripts: {
        files: [
          {
            cwd: '<%= paths.build %>/', 
            src: ['scripts/**'], 
            dest: '<%= paths.dist %>/', 
            expand: true
          }
        ]
      },

      styles: {
        files: [
          {
            cwd: '<%= paths.build %>/', 
            src: ['scripts/**'], 
            dest: '<%= paths.dist %>/', 
            expand: true
          }
        ]
      }

    }, // end copy

    //----------

    connect: {

      dev: {
        options: {
          port: appConfig.serverPort,
          base: '<%= paths.dist %>', 
          middleware: require('./LivereloadMiddleware') 
        }
      },

      prod: {
        options: {
          port: appConfig.serverPort,
          base: '<%= paths.dist %>', 
          keepalive: true
        }
      }

    }, // end connect

    //----------

    open: {
      webapp: {
        path: 'http://localhost:' + appConfig.serverPort
      }
    },

    //----------

    build_gh_pages: {
      gh_pages: {
        
      }
    }

    
  };

  grunt.initConfig(gruntConfig);

  //--- grunt tasks

  grunt.registerTask('default', ['jshint']);

  //---

  grunt.registerTask('dev_build', [
    'clean:working',
    'jshint',
    'copy:js',
    'copy:bower_components',
    'copy:img',
    'copy:css',
    'template:views',
    'template:dev',
    'copy:dev'
  ]);

  grunt.registerTask('prod_build', [
    'clean:working',
    'jshint',
    'copy:img',
    'imagemin',
    'template:views',
    'template:prod',
    'minifyHtml:all',
    //'ngTemplateCache',
    //'requirejs',
    'copy:js',
    'copy:css',
    // TODO: define and run tests
    'copy:prod',
    'clean:build'
  ]);

  //---

  grunt.registerTask('dev', ['dev_build', 'open', 'connect:dev', 'watch']);

  grunt.registerTask('prod', ['prod_build', 'open', 'connect:prod']);

  grunt.registerTask('publish', ['prodbuild', 'build_gh_pages:gh_pages']);


};