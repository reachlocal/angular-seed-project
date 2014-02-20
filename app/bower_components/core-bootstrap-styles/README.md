## Core ReachLocal Styles
ReachLocal's core, standard styles.  (Based on Bootstrap)  Styles in this project are meant for use across multiple projects downstream.  This project is here to help maintain a consistant look-and-feel across teams and projects.

_________

## Contributing Styles
Add cross-project, UXD-approved styles to this project following the guidelines below.

### Setting Up Your Mac
(If you're a PC user, shoot an email to Tom Hood.  This could get a little more involved...)

From the command line, run the ci/default.sh script to setup your system.  This will install node, npm, and gulp.

```bash
./ci/default.sh
```

#### Gulp Commands
We use the gulp asset pipeline to run our basic tasks like serving content and compiling scss files.

You can run a simple local server to assist in your development.
```bash
gulp serve
```

Please ensure you have built your project prior to commiting to git.  Running `gulp` by itself will compile the common css file.
```bash
gulp
git add --all
git commit -m"improve(page-header): add nifty border to page header"
git push origin
```

### Contributing Styles: Patterns
In this example, we have added a UXD-approved common component - a product header.  This product header is going to become a ReachLocal standard across projects.  It will follow these patterns:

* **TARGETTED:** Components should be namespaced using a combination of element name and an unambiguous class name.  This helps ensure your style's name is intuitive to future users, and prevents your style from appling to unintended elements.
* **NESTED:** If this component contains standard subcomponents (such as a "settings" section, in this example), these styles should be nested
* **INTUITIVE:** It may be useful to future users if classes are prefixed with "rl-" to differentiate them from classes introduced by other libraries
* **ORGANIZED:** Keep styles organized in seperate files and use the rl_bootstrap.scss file to import them
* **VARIABLE:** Use variables for things like colors and sizes.  This helps with consistancy and makes it easier to refactor styles.
* **EXAMPLE:** Include an example of your style on the index.html page, or a new page.

##### Example HTML - index.html
```html
<body>
  <header class="rl-page-header">
    Product Name
    <menu class="settings">
      <a>Logout</a>
      <a>Settings</a>
    </menu>
  </header>
  ...
```

##### Example SCSS - _rl_page_header.scss
```scss
header.rl-page-header {
  color: $white;
  min-height: 100px;
  menu.settings {
    color: $gray-lighter;
  }
}
```

##### rl_bootstrap.scss
```scss
...
// ReachLocal standard page-headers
@import "rl_page_header";
...
```

### Contributing Styles: Anti-Patterns
A common problem with SCSS/CSS management is a tendency toward monolithic files.  These become tangled buckets of stylish poop.  Here is another version of the above example following common anti-patterns.

* Large, generic scss files
* Ambiguous class names
* Broad CSS selectors (styles that style unintended elements)
* Hard-coding values that should be variables (ex: colors and sizes)
* Using styles that are specific to a single project

##### Example HTML - index.html
```html
<body>
  <header>
    Campaign Provisioner
    <small class="provisioning-subheader">
      Account: 12345
    </small>
    <div class="settings">
      <a>Logout</a>
      <a>Settings</a>
    </div>
  </header>
  ...
```

##### Example SCSS - _rl_style_bucket.scss
```scss
header {
  color: #FFFFFF;
  min-height: 100px;
}
.settings {
  color: #CCCCCC;
}

```
##### rl_bootstrap.scss
```
...
@import "rl_style_bucket";
...
```

_________

## Using These Styles in Your Project
To use these styles in your project, install it using bower.

* Go to your project directory
* Add our internal bower registry to your .bowerrc

```bash
$ cat .bowerrc
{
  "registry": {
    "search": ["http://bower.dev.wh.reachlocal.com","https://bower.herokuapp.com"],
    "register": "http://bower.dev.wh.reachlocal.com"
  }
}
```

* Install this bower artifact.

```bash
bower install core-bootstrap-styles
```

* Either use the `dist/core-bootstrap.css` file from the artifact, or...
* Add this asset's scss compilation to your Gulpfile - ex:

```js
    ...
    gulp.src(config.APPLICATION_STYLES)
        .pipe(sass({includePaths: [
            'app/bower_components/core-bootstrap-styles/app/sass',
            'app/bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap'
        ]}))
        .pipe(minifyCss())
        ...
```

**NOTE:** If you add this project to your sass include paths, you can import components from this project.  For example:

```scss
@import "rl_variables"
// Color all text using ReachLocal's standard link color
.my-custom-style {
  color: $link-color;
}
```
