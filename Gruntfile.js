module.exports = function(grunt) {  
  'use strict';

  // load all grunt tasks -> see package.json :: devDependencies
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  //---

  var appConfig = {

    serverPort: 1337,
    
    paths: {
      bower: 'cache/bower_components', // bower components dir
      app: 'src', 
      build: 'build', 
      dist: 'dist',
      gh_pages: 'cache/gh_pages' 
    },
    
    // grunt-hustler configs

    template: {

      views: {
        files: {'./build/views/': './<%= paths.app %>/views/**/*.html'}
      },

      js_dev: {
        files: {
          './build/scripts/main.js': './<%= paths.app %>/scripts/main.template.js'
        },
        environment: 'dev'
      },

      js_prod: {
        files: '<%= template.js_dev.files %>',
        environment: 'prod'
      },

      dev: {
        files: { './build/index.html': './<%= paths.app %>/index.html' },
        environment: 'dev'
      },

      prod: {
        files: '<%= template.dev.files %>',
        environment: 'prod'
      }

    }, // end template

    ngTemplateCache: { 
      views: {
        files: {
          './build/scripts/views.js': './<%= paths.build %>/views/**/*.html'
        }, 
        options: {
          module: 'GithubApp', // angular app module name
          trim: './<%= paths.build %>/'
        }
      }
    } // end ngTemplateCache

  }; // end appConfig


  //---


  var gruntConfig = {

    pkg: grunt.file.readJSON('package.json'),

    paths: appConfig.paths,

    //----------
    // grunt-hustler

    template: appConfig.template,

    ngTemplateCache: appConfig.ngTemplateCache,

    //----------

    htmlmin: {                                     // Task
      index: {                                     // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'build/index.html': 'build/index.html'
        }
      }
    },

    //----------

    jshint: {
      all: [
        'Gruntfile.js',
        'LivereloadMiddleware.js',
        '<%= paths.app %>/**/*.js',
        '!<%= paths.app %>/scripts/**/*.template.js'
      ]
    }, // end jshing

    //----------

    clean: {
      
      working: [
        '<%= paths.build %>/',
        '<%= paths.dist %>/'
      ],

      build: ['<%= paths.build %>/'],

      build_views: ['<%= paths.build %>/views/'],

      dev_scripts: [
        '<%= paths.build %>/scripts/'
      ],

      gh_pages: [
        '<%= paths.gh_pages %>/img/',
        '<%= paths.gh_pages %>/scripts/',
        '<%= paths.gh_pages %>/styles/',
        '<%= paths.gh_pages %>/*.{md,html}'
      ]

    }, // end clean

    //----------

    less: {
      dev: {
        options: {
           // These paths are searched for @imports
          paths: ["<%= paths.app %>/styles"]
        },
        files: {
          "<%= paths.build %>/styles/app.css": "<%= paths.app %>/styles/app.less"
        }
      },
      prod: {
        options: {
           // These paths are searched for @imports
          paths: ["<%= paths.app %>/styles"],
          compress: true
        },
        files: {
          "<%= paths.build %>/styles/app.css": "<%= paths.app %>/styles/app.less"
        }
      }
    },

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

    // TODO: review
    // https://github.com/CaryLandholt/AngularFun/blob/master/Gruntfile.coffee

    requirejs: {

      scripts: {
        options: {
          baseUrl: './<%= paths.build %>/scripts/',
          findNestedDependencies: true,
          logLevel: 0,
          mainConfigFile: './<%= paths.build %>/scripts/main.js',
          name: 'main',
          onBuildWrite: function(moduleName, path, contents) {
            var modulesToExclude, shouldExcludeModule;
            modulesToExclude = ['main'];
            shouldExcludeModule = modulesToExclude.indexOf(moduleName) >= 0;
            if (shouldExcludeModule) {
              return '';
            }
            return contents;
          },
          optimize: 'uglify2',
          out: './<%= paths.dist %>/scripts/scripts.min.js',
          preserveLicenseComments: false,
          generateSourceMaps: true,
          skipModuleInsertion: true,
          uglify: {
            no_mangle: false
          }
        }
      }
    }, // end requirejs

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
          'less:dev',
          'copy:css'
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
            src: [
              'scripts/**/*.js',
              '!scripts/*.template.js'
            ], 
            dest: '<%= paths.build %>/', 
            expand: true
          }
        ]
      },     

      bower_components: {
        files: [
          { // requirejs
            cwd: '<%= paths.bower %>/requirejs/', 
            src: ['require.js'], 
            //dest: '<%= paths.build %>/scripts/libs/', 
            dest: '<%= paths.build %>/vendor/js/', 
            expand: true
          },
          { // jquery
            cwd: '<%= paths.bower %>/jquery/', 
            src: ['jquery.min.js'], 
            //dest: '<%= paths.build %>/scripts/libs/', 
            dest: '<%= paths.build %>/vendor/js/', 
            expand: true
          },
          { // angularjs
            cwd: '<%= paths.bower %>/angularjs-bower/', 
            src: [
              'angular.min.js',
              'angular-resource.min.js'
            ], 
            //dest: '<%= paths.build %>/scripts/libs/', 
            dest: '<%= paths.build %>/vendor/js/', 
            expand: true
          },

          //------------------------------------------------
          { // twitter bootstrap css
            cwd: '<%= paths.bower %>/bootstrap/dist/css', 
            src: [
              '*.min.css'
            ], 
            dest: '<%= paths.build %>/vendor/bootstrap/css', 
            expand: true
          },
          { // twitter bootstrap fonts
            cwd: '<%= paths.bower %>/bootstrap/dist/fonts', 
            src: [
              '*.*'
            ], 
            dest: '<%= paths.build %>/vendor/bootstrap/fonts', 
            expand: true
          },
          { // twitter bootstrap js
            cwd: '<%= paths.bower %>/bootstrap/dist/js', 
            src: [
              '*.min.js'
            ], 
            dest: '<%= paths.build %>/vendor/bootstrap/js', 
            expand: true
          },
          { // twitter bootstrap ico
            cwd: '<%= paths.bower %>/bootstrap/assets/ico', 
            src: [
              '*.*'
            ], 
            dest: '<%= paths.build %>/vendor/bootstrap/ico', 
            expand: true
          },
          //---
          { // twitter bootstrap IE fallback
            cwd: '<%= paths.bower %>/bootstrap/assets/js', 
            src: [
              'html5shiv.js',
              'respond.min.js'
            ], 
            dest: '<%= paths.build %>/vendor/js', 
            expand: true
          },
          //------------------------------------------------

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
          {src: ['README.md'], dest: '<%= paths.dist %>/', filter: 'isFile'},
          {
            cwd: '<%= paths.build %>/', 
            src: ['**'], 
            dest: '<%= paths.dist %>/', 
            expand: true
          }
        ]
      },
     
      css: {
        files: [
          {
            cwd: '<%= paths.build %>/', 
            src: [
              'styles/**/*.css',
              '!styles/**/bootstrap*.css'
            ], 
            dest: '<%= paths.dist %>/', 
            expand: true
          }
        ]
      }, 

      //--- send files to cache/gh-pages/
      gh_pages: {
        files: [
          {
            cwd: '<%= paths.dist %>/', 
            src: ['**'], 
            dest: '<%= paths.gh_pages %>/', 
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
            src: ['styles/**'], 
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
          livereload: true,
          open: true
        }
      },

      prod: {
        options: {
          port: appConfig.serverPort,
          base: '<%= paths.dist %>', 
          keepalive: true,
          open: true
        }
      }

    }, // end connect

    //----------

    /*
      Grunt Github Pages
      https://github.com/thanpolas/grunt-github-pages
    */
    githubPages: {
      gh_pages: {
        options: {
          // The default commit message for the gh-pages branch
          commitMessage: 'gh-pages auto commit <%= grunt.template.today("isoUtcDateTime") %>'
        },
        // The folder where your gh-pages repo is
        src: '<%= paths.gh_pages %>'
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
    'less:dev',
    'template:js_dev',
    'template:views',
    'template:dev',
    'copy:dev'
  ]);

  grunt.registerTask('prod_build', [
    'clean:working',
    'jshint',
    'copy:js',
    'copy:bower_components',
    'less:prod',
    
    'copy:img',
    'imagemin',

    'template:views',
    'ngTemplateCache',
    'clean:build_views',

    'template:js_prod',
    'requirejs',
    'clean:dev_scripts',
    
    'template:prod',
    'htmlmin:index',
    
    // TODO: define and run tests

    'copy:prod', 
    'clean:build'
  ]);

  //---

  grunt.registerTask('dev', ['dev_build', 'connect:dev', 'watch']);

  grunt.registerTask('prod', ['prod_build', 'connect:prod']);

  grunt.registerTask('publish', [
    'prod_build', 
    'clean:gh_pages', 
    'copy:gh_pages', 
    'clean:working', 
    'githubPages:gh_pages'
  ]);


};