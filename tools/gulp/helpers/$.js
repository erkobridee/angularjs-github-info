// Expose all Gulp plugins found
var $ = module.exports = require('gulp-load-plugins')();

//---

// Expose some other modules
$.path            = require('path');

$.rootPath = $.path.resolve( './' );

// [Gist] Better local require() paths for Node.js
// https://gist.github.com/branneman/8048520
$.rootRequire = function( name ) {
  return require( $.path.join( $.rootPath, name ) );
};

//---

$.del             = require('del');
$.lazypipe        = require('lazypipe');
$.runSequence     = require('run-sequence');

$.browserSync     = require('browser-sync');
$.reload          = $.browserSync.reload;

$.open            = require('open');

  //--- local modules

$.pkg       = $.rootRequire('package.json');

$.config    = $.rootRequire('tools/config');

$.localip   = $.rootRequire('tools/lib/localip');

$.requirejs = $.rootRequire('tools/lib/requirejs');

//---

$.args = require('yargs').argv;

//---

$.is = {
  debug   : !!$.args.debug,
  release : !!$.args.release,
  preview : !!$.args.preview,
  publish : !!$.args.publish,
  init    : !!$.args.init
};

//---
// @begin: define output dir

(function() {

  $.config.paths.outputDir = (
    $.is.release ?
      $.config.paths.dist :
      $.config.paths.build
  );

})();

// @end: define output dir
//---
// @begin: check webserver configs

(function() {

  $.config
    .webserver = $.config.webserver || {};

  $.config
    .webserver
    .port = parseInt($.args.port, 10) || $.config.webserver.port || 3000;

  // middlewares array
  $.config
    .webserver
    .middlewares = [];

  //---
  // @begin: config proxies
  var proxyMiddleware = require('http-proxy-middleware'),
      hasGulpTaskName = !!$.args._[0],
      configProxyFlag = false;

  if( $.is.release ) {
    configProxyFlag = $.is.preview;
  } else {
    configProxyFlag = !hasGulpTaskName && !( $.is.publish || $.is.init );
  }

  if( $.config.webserver.proxies ) {
    $.config
      .webserver
      .proxies.forEach(function(proxy) {
        if( !$.config.webserver.proxy ) $.config.webserver.proxy = proxy;
        if( configProxyFlag ) configProxy( mountProxyOptions( proxy ) );
      });
  } else if( $.config.webserver.proxy ) {
    if( configProxyFlag ) configProxy( mountProxyOptions( $.config.webserver.proxy ) );
  }

  function mountProxyOptions( proxy ) {
    return {
      host     : proxy.host || 'localhost',
      port     : proxy.port || 80,
      context  : checkContext(proxy.context),
      https    : proxy.https || false,
      xforward : proxy.xforward || false
    };
  }

  function configProxy( proxyOptions ) {
    $.config
      .webserver
      .middlewares
      .push(
        proxyMiddleware(
          proxyOptions.context,
          {
            target : mountTarget( proxyOptions ),
            secure : proxyOptions.https,
            xfwd   : proxyOptions.xforward
          }
        )
      );
  }

  function checkContext( context ) {
    if( !context ) return '/api';
    if( !/^\//.test(context) ) context = '/' + context;
    return context;
  }

  function mountTarget( proxyOptions ) {
    return (
      ( proxyOptions.https ? 'https://' : 'http://' ) +
      proxyOptions.host + ':' + proxyOptions.port
    );
  }
  // @end: config proxies
  //---

})();

// @end: check webserver configs
//---

/**
  * Log a message or series of messages using chalk's blue color.
  * Can pass in a string, object or array.
  */
$.log = function(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
};

$.onError = function(err) {
  $.log(err);
};

//---

$.projectInfoMsg = function() {
  $.log('');
  $.log('project: ' + $.pkg.name + ' v' + $.pkg.version);
  $.log('description: ' + $.pkg.description);
  $.log('');

  var msg = '';

  if( $.is.release ) {
    msg += ' release';

    $.log('>> ' + msg);
    $.log('');
  }
};
