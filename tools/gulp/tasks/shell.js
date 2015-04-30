module.exports = function(gulp, $) {

  //---
  // @begin: tools

  gulp.task('shell:tools-build', $.shell.task([
    'gulp --release'
  ]));

  // @end: tools
  //---
  // @begin: git

    // init, checkout

  gulp.task('shell:git:clone', $.shell.task([
    'git clone ' + $.pkg.repository.url + ' ' + $.config.paths.repoDir
  ]));


  gulp.task('shell:git:checkout', $.shell.task([
    'git checkout ' + $.config.git.branch
  ], {
    cwd: $.config.paths.repoDir
  }));

    // add, commit, push

  gulp.task('shell:git:add', $.shell.task([
    'git add . '
  ], {
    cwd: $.config.paths.repoDir
  }));

  gulp.task('shell:git:commit', $.shell.task([
    'git commit -m "' +
      $.util.template(
        $.config.git.commitMessage,
        {
          branch: $.config.git.branch,
          time: new Date().toISOString(),
          file: $.util.noop()
        }
      ) +
    '"'
  ], {
    cwd: $.config.paths.repoDir,
    ignoreErrors: true
  }));

  gulp.task('shell:git:push', $.shell.task([
    'git push origin ' + $.config.git.branch
  ], {
    cwd: $.config.paths.repoDir
  }));

  // @end: git

};
