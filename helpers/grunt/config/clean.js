module.exports = {

  //--- @begin: gh_pages
  gh_pages_dir: [
    '<%= app.paths.gh_pages %>/'
  ],

  gh_pages_content: [
    '<%= app.paths.gh_pages %>/**/*'
  ],
  //--- @end: gh_pages


  bower: [
    '<%= app.paths.bower %>/'
  ],


  //--- @begin: working dir's
  build: [
    '<%= app.paths.build %>/'
  ],

  dist: [
    '<%= app.paths.dist %>/'
  ],
  //--- @end: working dir's


  //--- @begin: prod build
  build_views: [
    '<%= app.paths.build %>/views/'
  ],

  build_scripts: [
    '<%= app.paths.build %>/scripts/'
  ]
  //--- @end: prod build


};