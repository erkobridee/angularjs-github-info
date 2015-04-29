// through2 is a thin wrapper around node transform streams
var through = require('through2'),
    gutil = require('gulp-util'),
    transform = require('./rewrite-require-config'),
    PluginError = gutil.PluginError;

// Consts
var PLUGIN_NAME = 'gulp-rewrite-require-config';


// Plugin level function(dealing with files)
function gulpRewriteRequireConfig() {

  // Creating a stream through which each file will pass
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    if ( file.isBuffer() ) {
      file.contents = new Buffer(
        transform( String( file.contents ) )
      );
    }

    return cb(null, file);

  });

}

// Exporting the plugin main function
module.exports = gulpRewriteRequireConfig;
