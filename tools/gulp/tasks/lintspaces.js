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

    var source;

    if( $.is.sass ) {
      source = $.config.styles.sass.project;
    } else {
      source = $.config.styles.less.project;
    }

    return gulp.src( source )
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
