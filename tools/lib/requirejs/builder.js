var requirejs = require('requirejs');

function builder( config, done, debug, logger ) {
  debug = debug || false;
  log = logger || console.log;

  requirejs.optimize( config, buildResponse, buildError );

  function buildResponse( response ) {
    if( debug ) {
      log( 'requirejs build done' );
      log( response );
    }
    done();
  }

  function buildError( error ) {
    log( 'requirejs build error' );
    log( error );
    done();
  }
}

//---

module.exports = builder;
