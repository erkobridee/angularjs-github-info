module.exports = function(gulp, $) {

  gulp.task('build', function( done ) {

    $.runSequence(
      [
        'copy:js2build',
        'styles',
        'build:min:index.html',
        'copy:vendor2dist',
        'build:min:images'
      ],
      'html2js',
      // 'update:main:package.js',
      // 'requirejs',
      // 'build:concat:js',
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
    return gulp.src( $.config.paths.src + '/shared/img/**/*' )
      .pipe( $.imagemin({
        progressive: true,
        interlaced: true
      }) )
      .pipe( gulp.dest( $.config.paths.dist + '/shared/img' ) );
  });

  gulp.task('build:concat:js', function() {
    var filter = $.filter([
      'require.config.js'
    ]);

    return gulp.src([
        $.config.paths.build + '/' + $.config.require.name + '.js',
        $.config.require.config
      ])
      .pipe( filter )
      .pipe( $.uglify() )
      .pipe( filter.restore() )
      .pipe( $.concat( 'require.config.js' ) )
      .pipe( gulp.dest( $.config.paths.dist ) );
  });

};
