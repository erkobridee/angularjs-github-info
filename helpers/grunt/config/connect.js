module.exports = {

  options: {
    port: 1337,
    hostname: '*',
    open: 'http://localhost:<%= connect.options.port %>'
  },

  livereload: { 
    options: { 
      base: '<%= app.paths.dist %>', 
      livereload: true 
    } 
  }, 

  dist: { 
    options: { 
      base: '<%= app.paths.dist %>', 
      keepalive: true
    } 
  } 

};