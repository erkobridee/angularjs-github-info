module.exports = function(gulp, $) {

  gulp.task('less', function() {
    $.log("Building css files...");
    return $.streams.less();
  });

  /*
  gulp.task('sass', function() {
    $.log("Building css files...");
    return $.streams.sass();
  });
  */

  gulp.task('styles', function() {
    $.log("Building css files...");
    if( $.is.sass ) {
      // return $.streams.sass();
    } else {
      return $.streams.less();
    }
  });

};
