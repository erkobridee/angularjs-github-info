module.exports = {                             // Task 

  index: {                                     // Target
    options: {                                 // Target options
      removeComments: true,
      collapseWhitespace: true
    },
    files: {                                   // Dictionary of files
      '<%= app.paths.build %>/index.html': '<%= app.paths.build %>/index.html'
    }
  }  

};