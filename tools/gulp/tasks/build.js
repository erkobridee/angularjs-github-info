module.exports = function(gulp, $) {

  gulp.task('build', function( done ) {

    $.runSequence(
      'copy:vendor2dist',
      [
        'copy:js2build',
        'styles',
        'build:min:index.html',
        'build:min:images'
      ],
      'html2js',
      'update:main:package.js',
      'requirejs',
      'build:concat:js',
      'clean:build',
      done
    );

  });

  gulp.task('build:min:index.html', function() {
    return gulp.src( $.config.html.index )
      .pipe( $.htmlmin( $.config.htmlmin ) )
      .pipe( gulp.dest( $.config.paths.dist ) );
  });

  gulp.task('build:min:images', function() {
    return gulp.src( $.config.paths.src + '/img/**/*' )
      .pipe( $.imagemin({
        progressive: true,
        interlaced: true
      }) )
      .pipe( gulp.dest( $.config.paths.dist + '/img' ) );
  });

  gulp.task('build:concat:js', function() {
    var filter = $.filter([
      'require.config.js'
    ], {restore: true});

    return gulp.src([
        $.config.paths.build + '/' + $.config.require.name + '.js',
        $.config.require.config
      ])
      .pipe( filter )
      .pipe( $.uglify() )
      .pipe( filter.restore )
      .pipe( $.concat( 'require.config.js' ) )
      .pipe( $.uglify() )
      .pipe( gulp.dest( $.config.paths.dist ) );
  });

};
