module.exports = {

  // TODO: review
  // https://github.com/CaryLandholt/AngularFun/blob/master/Gruntfile.coffee

  scripts: {

    options: {

      baseUrl: './<%= app.paths.build %>/scripts/',
      findNestedDependencies: true,
      logLevel: 0,
      mainConfigFile: './<%= app.paths.build %>/scripts/main.js',
      name: 'main',
      onBuildWrite: function(moduleName, path, contents) {
        var modulesToExclude, shouldExcludeModule;
        modulesToExclude = ['main'];
        shouldExcludeModule = modulesToExclude.indexOf(moduleName) >= 0;
        if (shouldExcludeModule) {
          return '';
        }
        return contents;
      },
      optimize: 'uglify2',
      out: './<%= app.paths.dist %>/scripts/scripts.min.js',
      preserveLicenseComments: false,
      generateSourceMaps: true,
      skipModuleInsertion: true,
      uglify: {
        no_mangle: false
      }

    }

  }  

};