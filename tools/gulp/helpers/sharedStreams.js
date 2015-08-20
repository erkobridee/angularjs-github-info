var gulp      = require('gulp');
var $         = require('./$');

// shared streams to gulp tasks
var streams = $.streams = {};

//--

var outputCssDir = $.path.join( $.config.paths.outputDir, 'styles' );

//---

streams.autoprefix = function() {
  return $.autoprefixer( $.config.autoprefixer );
};

//---

streams.sass = function() {

  return gulp
    .src( $.config.styles.sass.main )
    .pipe( $.if( $.is.debug, $.debug() ) )
    .pipe( $.sass().on('error', $.sass.logError) )
    .pipe( streams.autoprefix() )
    .pipe( $.injectString.prepend( $.config.banner ) )
    .pipe( $.if( $.is.release, $.minifyCss() ) )
    .pipe( gulp.dest( outputCssDir ) )
    .pipe( $.filter( '**.css' ) )
    .pipe( $.if( $.browserSync.active, $.reload({stream: true}) ) )
    .on( 'error', $.onError );

};
