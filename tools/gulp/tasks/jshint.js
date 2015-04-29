module.exports = function(gulp, $) {

  var jshintStream = $.lazypipe()
    .pipe( $.cached, 'jshint' )
    .pipe( $.jshint )
    .pipe( $.jshint.reporter, 'jshint-stylish' )
    .pipe( $.jshint.reporter, 'fail' );

  //---

  gulp.task('jshint:tools', function() {
    return gulp.src( $.config.js.tools )
      .pipe( jshintStream() );
  });

  gulp.task('jshint:project', function() {
    return gulp.src( $.config.js.project.lint )
      .pipe( jshintStream() );
  });

  gulp.task('jshint', ['jshint:tools', 'jshint:project']);

};
