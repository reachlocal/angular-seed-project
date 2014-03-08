/**
 * Our gulpfile got big, so we broke it up.  This will help you find your way:
 *
 *   /gulp_tasks/*.js     <--- Each group of gulp tasks live in their own file
 *                             All files in this directory are loaded automagically
 *   /gulp_tasks/config/  <--- Our config file lives here. Paths, magic numbers, etc...
 *   /gulp_tasks/lib/*.js <--- A bunch of helpers used by our gulp tasks
 *
 * What goes in this file then?
 *   - One line tasks
 *   - Global variables (ex: Our live reload server instance)
 *   - Our task file auto-loader thingy
 *
 * Thanks for helping us keep it clean!
 */
var gulp = require('gulp');

/**
 * Setup live reload, spawn a server, and stash it in the global scope
 */
var refresh = require('gulp-livereload');
global.lrServer = require('tiny-lr')();

/**
 * A tiny task that will print out all our other tasks
 * Usage:  `gulp help`
 */
var help = require('gulp-task-listing');
gulp.task('help', help);

/**
 * Default task:  Build build build!
 */
gulp.task('default', ['build']);

/**
 * Build task:  Run tests and compile assets into 'dist/' directory
 */
gulp.task('build', ['dist', 'test', 'lint:failhard']);

/**
 * Magic loader that pulls in all tasks from the gulp_tasks directory
 */
var glob = require('glob');
var tasks = glob.sync('./gulp_tasks/*.js');
for (var i in tasks) {
    var task = tasks[i];
    require(task);
}