## Core ReachLocal Styles
(Based on Bootstrap)

### Usage
* Go to your project directory
* Add our internal bower registry to your .bowerrc
```
$ cat .bowerrc
{
  "registry": {
    "search": ["http://bower.dev.wh.reachlocal.com","https://bower.herokuapp.com"],
    "register": "http://bower.dev.wh.reachlocal.com"
  }
}
```
* Install this bower artifact.
```
bower install core-bootstrap-styles
```
* Either use the `dist/core-bootstrap.css` file from the artifact, or...
* Add this asset's scss compilation to your Gulpfile - ex:
```
    ...
    gulp.src(config.APPLICATION_STYLES)
        .pipe(sass({includePaths: [
            'app/bower_components/core-bootstrap-styles/app/sass',
            'app/bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap'
        ]}))
        .pipe(minifyCss())
        ...
```
* WIN!
