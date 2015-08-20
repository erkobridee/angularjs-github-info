module.exports = function(gulp, $) {

  gulp.task('styles', function() {
    $.log("Building sass...");
    return $.streams.sass();
  });

};
