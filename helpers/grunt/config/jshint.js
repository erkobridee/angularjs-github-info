module.exports = {

  options: {
    reporter: require('jshint-stylish')
  },
  
  grunt: [
    'Gruntfile.js'
  ],

  helpers: [
    'helpers/grunt/**/*.js'
  ],

  project: [    
    '<%= app.paths.project %>/{,*/}*.js',
    '!<%= app.paths.project %>/{,*/}*.template.js'
  ]

}; 