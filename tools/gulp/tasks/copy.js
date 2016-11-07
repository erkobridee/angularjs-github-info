module.exports = function(gulp, $) {

  gulp.task('copy:js2build', function() {
    return gulp.src( $.config.js.project.copy2build )
      .pipe( gulp.dest( $.config.paths.build ) );
  });

  gulp.task('copy:vendor2dist', function() {
    return gulp.src([
        $.config.paths.vendor + '/**/*'
      ])
      .pipe( gulp.dest( $.config.paths.dist + '/' + $.config.vendorsDirName ) );
  });

  gulp.task('copy:dist2repo-dir', function() {
    return gulp.src( $.config.paths.dist + '/**/*' )
      .pipe( gulp.dest( $.config.paths.repoDir ) );
  });

};
