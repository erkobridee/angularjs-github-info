module.exports = {

  gh_pages: {
    options: {
      repository: '<%= package.repository.url %>',
      branch: 'gh-pages',
      directory: '<%= app.paths.gh_pages %>'
    }
  }
  
};