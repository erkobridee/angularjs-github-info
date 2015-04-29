var path      = require('path');
var fs        = require('fs');
var gulp      = require('gulp');
var $         = require('./$');


function loadTask(filepath) {
  var filename = path.basename(filepath);
  var msg = 'Loading "' + filename + '" tasks...';
  var fn;

  try {
    // Load taskfile.
    fn = require(path.resolve(filepath));
    if(typeof fn === 'function') {
      fn.call({}, gulp, $);
    }
  } catch(e) {
    console.log(msg);
    // Something went wrong.
    console.error(e);
  }
  fn = null;
}

function loadTasks(tasksDir) {
  var files = fs
    .readdirSync(tasksDir)
    .filter(function isValid(file) {
      return (file !== '.DS_store' && file.indexOf('.') !== 0 && /\.js$/.test(file));
    });

  // load tasks from files
  files.forEach(function(filename) {
    loadTask(path.join(tasksDir, filename));
  });
}

module.exports = function(tasksDir) {
  if(fs.existsSync(tasksDir)) {
    loadTasks(tasksDir);
  } else {
    console.error('Tasks directory "' + tasksDir + '" not found.');
  }
};
