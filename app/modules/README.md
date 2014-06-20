# /app/modules
This is where your project lives.  Typically, we name projects like this:  `rl.[project name]`
You can nest directories and use whatever naming convention you like.  The `gulp build` task will
discover everything in here automatically.

## Advice
I recommend creating a project module.  If you end up building a service or directive that
isn't really specific to your project, put it in a separate module.

Within your modules, I suggest breaking things down by functional area.  You should also avoid
big controllers, services, html templates, etc...  It's better to make lots of little sub-modules.
Use directives and services to help manage and modularize complex pages.

Beyond that, use your best judgement.  :)

* rl.myProject/
  * initialize/
  * layout/
  * reports/
  * manageUsers/
* rl.errorPopup

## rl_seeds?
This is a mini-module - a stand-alone project that will allow you to manage a visual pattern
library for your project.  You don't have to use it, but it's pretty dang handy.
This is typically where you'll define global styles for your your project.

By default, the `gulp serve` task will serve this module up here:  http://localhost:4000/styleguide/
