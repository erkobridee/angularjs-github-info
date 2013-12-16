module.exports = {

  views: {
    files: {
      './<%= app.paths.build %>/scripts/views.js': './<%= app.paths.build %>/views/**/*.html'
    }, 
    options: {
      module: 'GithubApp', // angular app module name
      trim: './<%= app.paths.build %>/'
    }
  }

};