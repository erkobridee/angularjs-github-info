module.exports = function(gulp, $) {

  gulp.task('clean:build', $.del.bind(null, [
    $.config.paths.build
  ]));

  gulp.task('clean:dist', $.del.bind(null, [
    $.config.paths.dist
  ]));

  gulp.task('clean', ['clean:dist', 'clean:build']);

};
