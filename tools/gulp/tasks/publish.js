module.exports = function(gulp, $) {

  gulp.task('publish', function( done ) {

    $.runSequence(
      [
        'clean:repo-dir:content',
        'shell:tools-build'
      ],
      'copy:dist2repo-dir',
      'shell:git:add',
      'shell:git:commit',
      [
        'clean',
        'shell:git:push'
      ],
      done
    );

  });

};
