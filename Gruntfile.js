module.exports = function(grunt) {
  'use strict';

  console.log('\nloading grunt plugins and configs...');
  require('load-grunt-config')(grunt, {configPath: __dirname+'/helpers/grunt/config'});
  console.log('... done\n');

  // custom tasks
  grunt.loadTasks('helpers/grunt/tasks'); // grunt helloWorld

  //--- grunt tasks

  grunt.registerTask('default', ['jshint']); 

  /*
  // init github repository on gh_pages
  grunt.registerTask('init', [
    'jshint',
    'clean:gh_pages_dir',
    'gitclone:gh_pages'
  ]);

  // publish on github gh_pages
  grunt.registerTask('publish', [
    'jshint',
    'clean:gh_pages_content',
    'copy:gitignore',
    'build',
    'copy:distToGHPages',
    'githubPages:gh_pages',
    'clean:dist'
  ]);
  */

  grunt.registerTask('server', function(target) {
    if (target === 'dist') {
      //return grunt.task.run(['build', 'connect:dist']); 
      return grunt.task.run(['helloWorld']); 
    }

    // dev
    return grunt.task.run([
      'clean:dist',
      'clean:build',
      'jshint',
      'copy:images',
      'copy:bower',
      'copy:js',
      'less:dev',
      'template:views',
      'template:js_dev',
      'template:index_dev',
      'copy:buildToDist',
      'connect:livereload',
      'watch'
    ]);
  });

  /*
  grunt.registerTask('build', [
    'clean:dist',
    'clean:build',
    'jshint',
    // add build tasks sequence
    'clean:build'
  ]);
  */

};