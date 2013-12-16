module.exports = {
  
  gh_pages: {
    
    options: {
      // The default commit message for the gh-pages branch
      commitMessage: 'gh-pages auto commit <%= grunt.template.today("isoUtcDateTime") %>'
    },

    // The folder where your gh-pages repo is
    src: '<%= app.paths.gh_pages %>'
  }

};