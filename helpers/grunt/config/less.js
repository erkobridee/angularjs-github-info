module.exports = {

  dev: {
    options: {
       // These paths are searched for @imports
      paths: ['<%= app.paths.project %>/styles']
    },
    files: {
      '<%= app.paths.build %>/styles/app.css': '<%= app.paths.project %>/styles/app.less'
    }
  },

  prod: {
    options: {
       // These paths are searched for @imports
      paths: ['<%= app.paths.project %>/styles'],
      compress: true
    },
    files: {
      '<%= app.paths.build %>/styles/app.css': '<%= app.paths.project %>/styles/app.less'
    }
  }
  
};