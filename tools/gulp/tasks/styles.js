module.exports = function(gulp, $) {

  gulp.task('styles', function() {
    $.log("Building css files...");
    return $.streams.less();
  });

};
