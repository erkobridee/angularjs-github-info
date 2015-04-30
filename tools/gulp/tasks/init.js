module.exports = function(gulp, $) {

  gulp.task('init', function( done ) {

    $.runSequence(
      'clean:repo-dir',
      'shell:git:clone',
      'shell:git:checkout',
      done
    );

  });

};
