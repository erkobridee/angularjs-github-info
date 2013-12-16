module.exports = {

  options: {                       
    optimizationLevel: 3
  },

  files: {
    expand: true,      
    cwd: '<%= app.paths.project %>/',
    src: ['**/*.{png,jpg,jpeg}'], 
    dest: '<%= app.paths.build %>/'  
  }  

};