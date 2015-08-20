module.exports = function(gulp, $) {

  gulp.task('watch', ['webserver:dev'], function() {

    // javascript project
    gulp.watch( $.config.js.project.watch, ['wf:js'] );

    //---

    // html project
    gulp.watch([
      $.config.html.files,
      // '!' + $.config.paths.src + '/vendor/**/*'
    ], ['wf:html']);

    //---

    // (less) stypes project
    gulp.watch([
      $.config.styles.sass.project
    ], ['wf:styles']);

  });

  //---

  gulp.task('wf:bs:reload', function() {
    $.reload();
  });

  gulp.task('wf:js', function( done ) {

    $.runSequence(
      ['jshint:project', 'lintspaces:js'],
      'wf:bs:reload',
      done
    );

  });

  gulp.task('wf:html', function( done ) {

    $.runSequence(
      'lintspaces:html',
      'wf:bs:reload',
      done
    );

  });

  gulp.task('wf:styles', function( done ) {

    $.runSequence(
      'lintspaces:styles',
      'styles',
      done
    );

  });

};
