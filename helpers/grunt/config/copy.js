module.exports = {

  //--- @begin: gh_pages
  gitignore: {
    files: [
      {
        cwd: './',
        src: ['.gitignore'],
        dest: '<%= app.paths.gh_pages %>/'
      }
    ]
  },

  distToGHPages: {
    files: [
      {
        cwd: '<%= app.paths.dist %>/',
        src: ['**'],
        dest: '<%= app.paths.gh_pages %>/',
        expand: true
      }
    ]
  },
  //--- @end: gh_pages


  //--- @begin: prepare dev
  images: {
    files: [
      {
        cwd: '<%= app.paths.project %>/', 
        src: ['{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico}'], 
        dest: '<%= app.paths.build %>/', 
        expand: true
      }
    ]
  },

  bower: {
    files: [
      { // requirejs
        cwd: '<%= app.paths.bower %>/requirejs/', 
        src: ['require.js'], 
        dest: '<%= app.paths.build %>/vendor/js/', 
        expand: true
      },

      //------------------------------------------------
      { // jquery
        cwd: '<%= app.paths.bower %>/jquery/', 
        src: ['jquery.min.js'], 
        dest: '<%= app.paths.build %>/vendor/js/', 
        expand: true
      },

      //------------------------------------------------ 
      //  Angular.js
      
      { // angular
        cwd: '<%= app.paths.bower %>/angular/', 
        src: [
          'angular.min.js'
        ], 
        dest: '<%= app.paths.build %>/vendor/js/', 
        expand: true
      },
      { // angular-resource
        cwd: '<%= app.paths.bower %>/angular-resource/', 
        src: [
          'angular-resource.min.js'
        ], 
        dest: '<%= app.paths.build %>/vendor/js/', 
        expand: true
      },
      { // angular-route
        cwd: '<%= app.paths.bower %>/angular-route/', 
        src: [
          'angular-route.min.js'
        ], 
        dest: '<%= app.paths.build %>/vendor/js/', 
        expand: true
      },

      //------------------------------------------------
      { // twitter bootstrap css
        cwd: '<%= app.paths.bower %>/bootstrap/dist/css', 
        src: [
          '*.min.css'
        ], 
        dest: '<%= app.paths.build %>/vendor/bootstrap/css', 
        expand: true
      },
      { // twitter bootstrap fonts
        cwd: '<%= app.paths.bower %>/bootstrap/dist/fonts', 
        src: [
          '*.*'
        ], 
        dest: '<%= app.paths.build %>/vendor/bootstrap/fonts', 
        expand: true
      },
      { // twitter bootstrap js
        cwd: '<%= app.paths.bower %>/bootstrap/dist/js', 
        src: [
          '*.min.js'
        ], 
        dest: '<%= app.paths.build %>/vendor/bootstrap/js', 
        expand: true
      },
      { // twitter bootstrap ico
        cwd: '<%= app.paths.bower %>/bootstrap/assets/ico', 
        src: [
          '*.*'
        ], 
        dest: '<%= app.paths.build %>/vendor/bootstrap/ico', 
        expand: true
      },
      //---
      { // twitter bootstrap IE fallback
        cwd: '<%= app.paths.bower %>/bootstrap/assets/js', 
        src: [
          'html5shiv.js',
          'respond.min.js'
        ], 
        dest: '<%= app.paths.build %>/vendor/js', 
        expand: true
      },
      //------------------------------------------------

    ]
  }, // end bower_components

  //---

  buildToDist: {
    files: [
      {
        cwd: '<%= app.paths.build %>/', 
        src: ['**'], 
        dest: '<%= app.paths.dist %>/', 
        expand: true
      }
    ]
  },

  //---

  js: {
    files: [
      {
        cwd: '<%= app.paths.project %>/', 
        src: [
          'scripts/**/*.js',
          '!scripts/*.template.js'
        ], 
        dest: '<%= app.paths.build %>/', 
        expand: true
      }
    ]
  }, 
  //--- @end: prepare dev


  //--- @begin: watch
  index: {
    files: [
      {
        cwd: '<%= app.paths.build %>/', 
        src: ['index.html'], 
        dest: '<%= app.paths.dist %>/', 
        expand: true
      }
    ]
  },

  views: {
    files: [
      {
        cwd: '<%= app.paths.build %>/', 
        src: ['views/**'], 
        dest: '<%= app.paths.dist %>/', 
        expand: true
      }
    ]
  },

  scripts: {
    files: [
      {
        cwd: '<%= app.paths.build %>/', 
        src: ['scripts/**'], 
        dest: '<%= app.paths.dist %>/', 
        expand: true
      }
    ]
  },

  styles: {
    files: [
      {
        cwd: '<%= app.paths.build %>/', 
        src: ['styles/**'], 
        dest: '<%= app.paths.dist %>/', 
        expand: true
      }
    ]
  }  
  //--- @end: watch


  // TODO: define more?

};