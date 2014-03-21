module.exports = function(grunt) {
  'use strict';

  grunt.log.writeln('\nloading grunt plugins and configs...');
  require('load-grunt-config')(grunt, {configPath: __dirname+'/helpers/grunt/config'});
  grunt.log.writeln('...done\n');

  // load custom tasks
  grunt.loadTasks('helpers/grunt/tasks'); // grunt helloWorld
  grunt.task.run('helloworld');

  //--- @begin: grunt tasks

  grunt.registerTask('default', ['jshint']);


  grunt.registerTask('server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build:prod', 'connect:dist']);
    }

    // dev
    return grunt.task.run([
      'build:dev',
      'connect:livereload',
      'watch'
    ]);
  });


  grunt.registerTask('build', function(target) {

    var clean = ['clean:dist', 'clean:build'],
        start = clean.concat(['newer:jshint']);

    if (target === 'prod') {

      return grunt.task.run(start.concat([
        'copy:bower',
        'copy:js',

        'copy:images',
        'imagemin',

        'less:prod',

        'template:views',
        'ngTemplateCache',
        'clean:build_views',

        'template:js_prod',
        'requirejs',
        'clean:build_scripts',

        'template:index_prod',
        'htmlmin:index',

        'copy:buildToDist',

        'clean:build'
      ]));

    } else if (target === 'dev') {

      return grunt.task.run(start.concat([
        'copy:images',
        'copy:bower',
        'copy:js',
        'less:dev',
        'template:views',
        'template:js_dev',
        'template:index_dev',
        'copy:buildToDist'
      ]));

    }

    // clean working dir's and run jshint
    return grunt.task.run(clean);
  });


  grunt.registerTask('gh_pages', function(target) {

    // init local repository on gh-pages branch
    if (target === 'init') {
      return grunt.task.run([
        'jshint',
        'clean:gh_pages_dir',
        'gitclone:gh_pages'
      ]);
    }

    // publish files on github gh-pages
    return grunt.task.run([
      'jshint',
      'clean:gh_pages_content',
      'copy:gitignore',
      'build:prod',
      'copy:distToGHPages',
      'githubPages:gh_pages',
      'clean:dist'
    ]);
  });

  //--- @end: grunt tasks

};
