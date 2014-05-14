/**
 * Gulp, with a little love added on.
 * WIP:  Add another param to .task() method - help text
 **/
var gulp = require('gulp');

var tasks = [];
var gulpTaskReal = gulp.task;

function rlTask() {
  var args = Array.prototype.slice.call(arguments);
  var message = args.pop();

  // Is lat param a string?
  // If not, put it back!
  if (typeof message !== 'string') {
    args.push(message);
    message = false;
  }
  gulpTaskReal.apply(this, args);

  if (message) {
    var taskName = args.shift();
    var taskHelp = {
      name: taskName,
      message: message
    };
    tasks.push(taskHelp);
  }
}
gulp.task = rlTask;

gulp.getTaskHelp = function () {
  return tasks;
};
