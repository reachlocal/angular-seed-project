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

* gulp serve  <--- Runs the client and a stub gateway
* gulp serve:app <--- Runs *only* the client, assumes the gateway is already running

## Project Organization
Here's a quick overview of how our project is organized.

* /Gulpfile.js <-- All our gulp tasks
* /ci/*.js <-- Helpers for gulp
* /app/ <-- All our project files
* /app/bower_components/ <-- Vendor libraries
* /app/index.html, RlLoad.js, RlModule.js <-- Landing page + bootstrap helpers
* /app/bower_css.json, bower_scripts.json <-- List of bower files to load for our app (order matters)
* /app/modules/ <-- Our project - broken up by functional area
* /app/modules/\*\*/*.js <-- The nuts and bolts of our project
* /app/modules/\*\*/*.scss <-- We got style
* /app/modules/\*\*/*.json <-- Translations
* /app/modules/\*\*/*.html <-- Views
* /test/unit <-- Unit tests
* /test/integration <-- Internal integration tests
* /test/features <-- Cucumber tests
* /test/helpers <-- Custom helper functions and classes for testing
* /test/REST_mocks <-- Stub endpoints for our mock rest server (gulp serve, gulp serve:rest)
* /dist <-- Distributable assets compiled by gulp
* /config <-- WTF is Ruby doing here?  :)