module.exports = function(gulp, $) {

  var TEMPLATE_HEADER = [
    'define(function(require) {',
    '  \'use strict\';',
    '',
    '  var module = require(\'./module\');',
    '',
    '  module.run(runner);',
    '',
    '  //---',
    '',
    '  runner.$inject = [\'$templateCache\'];',
    '',
    '  function runner($templateCache) {',
    ''
  ].join('\n');

  var TEMPLATE_FOOTER = [
    '',
    '  }',
    '});'
  ].join('\n');

  var html2jsOpts = {
    templateHeader : TEMPLATE_HEADER,
    templateFooter : TEMPLATE_FOOTER,
    base           : function(file) {
      return file.path.replace( $.path.resolve($.config.paths.src) + $.path.sep , '' );
    }
  };

  //----------------------------------------------------------------------------

  gulp.task('html2js', function() {
    return gulp.src( $.config.html2js.src )
      .pipe( $.htmlmin( $.config.htmlmin ) )
      .pipe(
        $.angularTemplatecache(
          $.config.html2js.filename,
          html2jsOpts
        )
      )
      .pipe( gulp.dest( $.config.html2js.dest ) );
  });

  gulp.task('update:main:package.js', function() {
    return gulp.src( $.config.html2js.dest + '/package.js' )
      .pipe( $.injectString.before(
        'return ', 'require(\'./' + $.config.html2js.filename + '\');\n  '
      ) )
      .pipe( gulp.dest( $.config.html2js.dest ) );
  });

};
