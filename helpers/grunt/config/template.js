module.exports = {

  views: {
    files: {'.local/build/views/': './<%= app.paths.project %>/views/**/*.html'}
  },

  js_dev: {
    files: { '.local/build/scripts/main.js': './<%= app.paths.project %>/scripts/main.template.js' },
    environment: 'dev'
  },

  js_prod: {
    files: '<%= template.js_dev.files %>',
    environment: 'prod'
  },

  index_dev: {
    files: { '.local/build/index.html': './<%= app.paths.project %>/index.html' },
    environment: 'dev'
  },

  index_prod: {
    files: '<%= template.index_dev.files %>',
    environment: 'prod'
  }  

};