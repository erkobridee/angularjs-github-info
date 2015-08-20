module.exports = function(gulp, $) {

  // https://github.com/ck86/gulp-lintspaces

  var lintspacesStream = $.lazypipe()
    .pipe( $.cached, 'lintspaces' )
    .pipe( $.lintspaces, { editorconfig: '.editorconfig' } )
    .pipe( $.lintspaces.reporter );

  //---

  gulp.task('lintspaces:html', function() {

    return gulp.src( $.config.html.files )
      .pipe( lintspacesStream() );

  });

  gulp.task('lintspaces:js', function() {

    return gulp.src( $.config.js.project.lint )
      .pipe( lintspacesStream() );

  });

  gulp.task('lintspaces:tools', function() {

    return gulp.src( $.config.js.tools )
      .pipe( lintspacesStream() );

  });

  gulp.task('lintspaces:styles', function() {

    return gulp.src( $.config.styles.sass.project )
      .pipe( lintspacesStream() );

  });

  //---

  gulp.task('lintspaces', [
    'lintspaces:html',
    'lintspaces:styles',
    'lintspaces:js',
    'lintspaces:tools'
  ]);

};
