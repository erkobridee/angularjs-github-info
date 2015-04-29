module.exports = (function() {

  return {
    builder: require('./builder'),
    rewriteConfig: require('./js-ast-js/gulp-rewrite-require-config')
  };

})();
