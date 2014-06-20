# Angular Seed Project
Let's get you going.  Please familiarize yourself with the directory structure and check out the
README.md files scattered around this project.  This should help you get your bearings.  Once you've
done that, come back here and we'll get started.

Don't worry.  I'll wait...

## Setup
This project has a little hello-world app already built.  Let's run it.  (Note, you may need
to install xCode to get this all working.)

### Step 1 NODE
First, install nvm, node, and npm.

`ci/default.sh`

This should install node *and* test your project.

### Step 2 GULP
Install gulp globally.

`npm install -g gulp`

### Step 3 SERVE
Serve up the demo app.

`gulp serve`

You should be able to see the app at `http://localhost:4000`

## Building Stuff
All your code will go in the `app/modules` directory.  (There's a README there that can tell you more.)

All your tests will to in the `test` directory.  (There's a README there too.)

## Stuff You Need to Know
There are several technologies we're using on our projects.  You should take a few minutes to read up on them.

* gulp - our asset pipeline
  * node.js - for our asset pipeline
  * npm - for installing node modules
* ng-router - for all your routing needs (if you edit index.html, we'll know you skipped this homework)
* bower - for managing vendor libraries
