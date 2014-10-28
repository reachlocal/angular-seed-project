var gulp = require('gulp');
var merge = require('event-stream').merge;
var plugins = require('gulp-load-plugins')();
var bowerFiles = require('main-bower-files');
var rev = require('gulp-rev');

/**
 * CONFIGURATION
 * This tells us how to assemble parts of your project.
 **/
var matchJs = /\.js$/i;
var matchStyle = /\.(css|sass|scss)$/i;

var supportedLocales = exports.supportedLocales = [ 'en', 'pt' ];

var paths = exports.paths = {
  stylesheets: [ 'app/modules/index.scss', 'app/modules/**/*.scss', 'app/modules/**/*.sass', '!app/modules/rl_seeds/seeds.scss' ],
  javascripts: ['app/modules/**/index.js', 'app/modules/**/*.js'],
  bowerscripts: bowerFiles().filter(filterByRegex(matchJs)),
  bowerstyles: bowerFiles().filter(filterByRegex(matchStyle)),
  bowerstatics: bowerFiles().filter(filterByNotRegexes(matchJs, matchStyle)),
  templates: 'app/modules/**/*.html',
  index: 'app/index.html',
  statics: ['app/*.*', 'app/configs/*.*', 'app/statics/**/*', '!' + this.index],
  app: 'app',
  dist: 'dist',
  styleguide: {
    stylesheets: 'app/modules/rl_seeds/**/*.scss',
    index: 'app/modules/rl_seeds/index.html'
  },
  spectests: 'test/**/*.spec.js'
};

exports.streams = {
  stylesheets: buildStreamStylesheets(paths.stylesheets, 'product.min.css'),
  bowerstylesheets: buildStreamStylesheets(paths.bowerstyles, 'bower.min.css'),
  javascripts: buildStreamJavascripts(paths.javascripts, 'product.min.js'),
  bowerscripts: buildStreamJavascripts(paths.bowerscripts, 'bower.min.js'),
  translations: streamTranslations,
  templates: streamTemplates,
  styleguide: streamStyleguide
};

function streamTranslations() {
  return merge.apply(this, supportedLocales.map(function (locale) {
    return gulp.src('app/**/lang-' + locale + '.json')
      .pipe(plugins.extend('lang-' + locale + '.json'));
  }));
}

function streamTemplates() {
  var stream = gulp.src(paths.templates)
    .pipe(plugins.angularTemplatecache({ root: 'modules', module: 'templates' }));
  if (plugins.util.env.production) {
    stream = stream.pipe(rev()); // Cache-bust (add md5 hash to filename)
  }
  return stream;
}

function streamStyleguide() {
  var css = gulp.src(paths.styleguide.stylesheets)
    .pipe(plugins.sass({
      errLogToConsole: !plugins.util.env.production,
      sourceComments: 'map'
    }));

    // errLogToConsole: true,
    // sourceComments: 'map',
    // includePaths: ['app/modules', 'app/bower_components']

  var index = gulp.src(paths.styleguide.index);

  return merge(css, index);
}


/**
 * Use with array filter to find rows that match the specified regex
 * This builds a filter function for use with array.filter()
 * @param regex
 * @return function
 **/
function filterByRegex(regex) {
  return function (row) {
    return row.search(regex) > 0;
  };
}

/**
 * Use with array filter (like above) to find things that do NOT match any of the supplied
 * regexes
 * @param regex (as many as you want)
 **/
function filterByNotRegexes() {
  var regexes = arguments;
  return function (row) {
    var i, regex;
    for (i = 0; i < regexes.length; i++) {
      regex = regexes[i];
      if (row.search(regex) > 0) {
        return false;
      }
    }
    return true;
  };
}

/**
 * Build a STYLE stream building function based on the supplied input
 * @param {String|Array} glob   String or array glob matching pattern thingy
 * @param {String} minfileName  If we're in production mode, what name shall we give you min file?
 * @returm {Function}           The function will build a stream :)
 **/
function buildStreamStylesheets(glob, minfileName) {
  return function stylesheet() {
    var stream = gulp.src(glob, { base: 'app/' })
      .pipe(plugins.sass({
        errLogToConsole: true,
        sourceComments: 'map',
        includePaths: ['app/modules', 'app/bower_components']
      }))
      .pipe(plugins.autoprefixer('last 2 chrome versions', 'last 2 ff versions'));

    if (plugins.util.env.production) {
      stream = stream
        .pipe(plugins.concat(minfileName))
        .pipe(rev()) // Cache-bust (add md5 hash to filename)
        .pipe(plugins.minifyCss());
    }
    return stream;
  };
}

/**
 * Build a JS stream building function based on the supplied input
 * @param {String|Array} glob
 * @param {String} minfileName
 * @return {Function}
 **/
function buildStreamJavascripts(glob, minfileName) {
  return function javascriptStream() {
    var stream = gulp.src(glob, { base: 'app/' });

    if (plugins.util.env.production) {
      stream = stream
        .pipe(plugins.concat(minfileName))
        .pipe(rev()) // Cache-bust (add md5 hash to filename)
        .pipe(plugins.uglify({ mangle: false }));
    }
    return stream;
  };
}
