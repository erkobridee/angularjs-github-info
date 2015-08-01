module.exports = function(gulp, $) {

  gulp.task('bower:clean', $.del.bind(null, [
    $.config.paths.vendor
  ]));

  gulp.task('bower:angular', function() {
    return gulp.src([
        $.config.paths.bower + '/vendor/angular*/angular*.{js,map,css}'
      ])
      .pipe(gulp.dest( $.config.paths.vendor ));
  });

  gulp.task('bower:bootstrap', function() {
    return gulp.src([
        $.config.paths.bower + '/vendor/bootstrap/dist/**/*'
      ])
      .pipe(gulp.dest( $.config.paths.vendor + '/bootstrap' ));
  });

  gulp.task('bower:jquery', function() {
    return gulp.src([
        $.config.paths.bower + '/vendor/jquery/dist/**/*'
      ])
      .pipe(gulp.dest( $.config.paths.vendor + '/jquery' ));
  });

  gulp.task('bower:requirejs', function() {
    return gulp.src([
        $.config.paths.bower + '/vendor/requirejs/require.js'
      ])
      .pipe(gulp.dest( $.config.paths.vendor + '/requirejs' ))
      .pipe( $.uglify() )
      .pipe( $.rename({ suffix: '.min' }) )
      .pipe(gulp.dest( $.config.paths.vendor + '/requirejs' ));
  });

  gulp.task('bower:hashids', function() {
    return gulp.src([
      $.config.paths.bower + '/vendor/hashids/lib/*.min.js'
    ])
    .pipe(gulp.dest( $.config.paths.vendor + '/hashids' ));
  });

  gulp.task('bower:momentjs', function() {
    return gulp.src([
      $.config.paths.bower + '/vendor/moment/min/*.min.js'
    ])
    .pipe(gulp.dest( $.config.paths.vendor + '/moment' ));
  });

  gulp.task('bower', ['bower:clean'], function(done) {
    $.runSequence([
      'bower:angular',
      'bower:bootstrap',
      'bower:jquery',
      'bower:requirejs',
      'bower:hashids',
      'bower:momentjs'
    ], done);
  });

};
