module.exports = function(gulp, $) {

  gulp.task('webserver:dev', ['styles'], function() {

    var serverConfig = {
      port: $.config.webserver.port,
      server:{
        baseDir: [
          $.config.paths.src,
          $.config.paths.build
        ]
      }
    };

    if( $.is.proxy ) {
      serverConfig.server.middleware = $.config.webserver.middlewares;
    }

    $.browserSync( serverConfig );

  });

  gulp.task('webserver:preview', function() {

    var serverConfig = {
      port: $.config.webserver.port,
      root: [
        $.config.paths.outputDir
      ]
    };

    if( $.is.proxy ) {
      serverConfig.middleware = function( connect, opts ) {
        return $.config.webserver.middlewares;
      };
    }

    // https://www.npmjs.com/package/gulp-connect
    $.connect.server( serverConfig );
    $.open('http://' + $.localip + ':' + $.config.webserver.port);

  });

};
