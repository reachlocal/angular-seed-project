# /app
Any files you need to bootstrap your project go here.

* index.html
* config.js
* airbrake-shim.js

You shouldn't put any project concerns here.  This is essentially middleware.

## index.html
index.html is here to source your project files (this is done automatically via `gulp build`) and bootstrap your app.

It does not have any content.

It does not have a layout.

It isn't really a "page".

Your angular app should only need to "load" one page (index).  All your layouts and templates should be setup with a routing system.

## configs
This is a basic config setup.  You have one config per environment.  The `app/config.js` file should be a symlink to
one of these files - or to a config file in /rl/data/shared/configs, if that's how you roll.

## bower_components
Use `bower` to install all your vendor libraries.  Do *not* install them manually - that's a huge pain in the butt.

The 'gulp build' will automatically discover and source all your vendor libraries.  (Less work for you.)

## modules
This is where you live.  Make some modules for your project and go to town.  HTML, JavaScript, translations...  It all lives in here.
