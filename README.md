# CPI Client
The CPI Client is a single-page-app that renders all UI components of the CPI project.  It interfaces with the CPI-Gateway for all data transactions.  It's written in AngularJS and uses Gulp for its asset pipeline.

_________

## Quick Start
If you just want to get this project up and running, here's what you'll need to do.

1. Checkout the project.
2. Point your terminal at the project directory.
3. Copy/Paste

```
# Install npm and node, and run 'npm install'
ci/default.sh

# Install gulp as a system utility (not required, but super handy)
npm install -g gulp
```

Now you can run the server using one of these commands:

* gulp serve  <--- Runs the client

## Tests and Stuff
We have 3 types of tests:  Unit tests, Integration tests, and Cucumber tests.

You can run these with:

```
gulp test:unit
gulp test:integration
gulp test:cucumber
```

Or run all three with:

```
gulp test
```

There are three variations on the cucumber tasks:

`gulp test:cucumber` assumes you have the cpi-gateway running locally in stub mode, like this `STUB_SERVICES=true SKIP_AUTH=true be rails s --port 8001`

`gulp test:cucumber-stub` uses our static, CI gateway stub server - this is the easiest way to run cucumber tests

`gulp test:cucumber-ci` uses our static, CI gateway stub server AND our static, CI web-driver server

### Commit and Push Hooks
If you run npm install, we will install a pre-commit hook and a pre-push hook for git.

The pre-commit hook runs all unit and integration tests (as well as some linting and such).
If you run into problems and need to skip it, use the -n switch: `git commit -n`

The pre-push hook runs all cucumber tests.  If you run into problems and need to skip it, use
the --no-verify switch: `git push --no-verify`

## Project Organization
Here's a quick overview of how our project is organized.

* /Gulpfile.js & /gulp_tasks/* <-- All our gulp tasks
* /ci/*.js <-- Helpers for gulp
* /app/ <-- All our project files
* /app/bower_components/ <-- Vendor libraries
* /app/index.html <-- Landing page + bootstrap helpers
* /app/modules/ <-- Our project - broken up by functional area
* /app/modules/\*\*/*.js <-- The nuts and bolts of our project
* /app/modules/\*\*/*.scss <-- We got style
* /app/modules/\*\*/*.json <-- Translations
* /app/modules/\*\*/*.html <-- Views
* /test/unit <-- Unit tests
* /test/integration <-- Internal integration tests
* /test/features <-- Cucumber tests
* /test/helpers <-- Custom helper functions and classes for testing
* /dist <-- Distributable assets compiled by gulp
* /config <-- Capistrano stuff
