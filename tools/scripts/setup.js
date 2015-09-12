var testModuleThenExecute = require('../lib/testModuleThenExecute');

testModuleThenExecute('shelljs', function executeLater() {

  require('shelljs/global');

  var oscheck = require('../lib/oscheck');

  var sudoStr =  (oscheck.isLinux || oscheck.isMac) ? 'sudo ' : '';
  var cmd = '';

  echo('About to setup environment');
  echo('It works if it finishes with OK\n');

  echo('----------------------------------------\n');

  if(!which('bower')) {
    echo('Bower is missing...taking care of that now.');
    cmd = sudoStr + 'npm install --global bower';
    echo(cmd); exec(cmd);
  }
  echo('bower --version ');
  echo(exec('bower --version', {silent:true}).output);

  if(!which('gulp')) {
    echo('gulp is missing...taking care of that now.');
    cmd = sudoStr + 'npm install --global gulp';
    echo(cmd); exec(cmd);
  }
  echo('gulp --version ');
  echo(exec('gulp --version', {silent:true}).output);

  echo('----------------------------------------');

  echo('\nOK!');

});
