angular-nested-module
================

A namespaced module loader for angularjs (experimental).

```javascript
// Declare a bunch of modules usind dot-seperated module names
angular.rlmodule('foo.directives.MyDirective', [])
angular.rlmodule('foo.directives.AnotherDirective', [])
angular.rlmodule('foo.directives.YetAnotherDirective', [])

angular.rlmodule('foo.services.MyService', [])
angular.rlmodule('foo.services.AnotherService', [])
angular.rlmodule('foo.services.YetAnotherService', [])

// Include your modules similarly to Java's import ___.* convention
angular.rlmodule('foo.controllers.MyController', ['foo.services', 'foo.directives'])
```

```html
<!-- It also works in your HTML -->
<ng-app="foo"></ng-app>
```

### Why?
Maybe you've seen other Angular projects that have app.js files scattered around.  Often, all these files do is bundle other modules.  I like to avoid boiler-plate code.

This script adds an additional module method to angular's API.  The method is called rlmodule() and is almost identical to angular's module() method.  (It's a wrapper for angular's module() method.)

### Warning
There are a few known bugs with this version of this extension.

Don't declare any components on a module bundle.

```javascript
angular.rlmodule('foo.config', []).constant('FOO', 'BAR')
angular.rlmodule('foo.config.submodule', []).constant('ZIP', 'ZAP')
```

When rlmodule builds the bundles, it will overwrite the FOO.  This is a known bug.  Until it gets fixed, please avoid stacking names like this.

Also, by default, ngmin doesn't seem to recognize calls to rlmodule - therefore, it won't protect you from uglifying variable names and totally breaking your project when you minify it.
