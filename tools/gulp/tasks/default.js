module.exports = function(gulp, $) {

  gulp.task('run:flow', function(done) {

    var runTasks = [
      'clean',
      'validate',
      'bower'
    ];

    if( $.is.release ) {

      runTasks = runTasks.concat([ 'build' ]);

      if( $.is.preview ) {
        runTasks = runTasks.concat([ 'webserver:preview' ]);
      }

    } else {

      // dev flow
      runTasks = runTasks.concat([ 'watch' ]);

    }

    runTasks = runTasks.concat([ done ]);
    $.runSequence.apply(null, runTasks);

  });

  //---

  gulp.task('default', ['run:flow'], function() {

    $.projectInfoMsg();

  });

};
