# GULP
We use gulp to run our asset pipeline.  It assembles our javascript files, styles, html templates, and translation files.
It runs our tests, can spin up a dev server, and make coffee.  Gulp is awesome!

Please take a minute to Google gulp and learn a little about it.

Most of our gulp tasks are grouped by functional area.  Each file contains one or more task(s).

A few top-level tasks (like `gulp default`) are defined in the /Gulpfile.js at the root.

## support/
Support is a set of methods and settings that feed *streams* of files (like js files or scss files) to gulp.
The gulp tasks consume these streams, assemble them, concat them, minify them, etc...

If you need to configure something (like what translations are available for your project) look here first.