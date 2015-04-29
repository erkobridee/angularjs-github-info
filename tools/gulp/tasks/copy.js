module.exports = function(gulp, $) {

  gulp.task('copy:js2build', function() {
    return gulp.src( $.config.js.project.copy2build )
      .pipe( gulp.dest( $.config.paths.build ) );
  });

  gulp.task('copy:vendor2dist', function() {
    return gulp.src([
        $.config.paths.src + '/vendor/**/*',
        '!' + $.config.paths.src + '/vendor/**/*.{less,html}'
      ])
      .pipe( gulp.dest( $.config.paths.dist + '/vendor' ) );
  });

};
