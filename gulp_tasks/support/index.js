var gulp = require('gulp');
var merge = require('event-stream').merge;
var plugins = require('gulp-load-plugins')();

var paths = exports.paths = {
  stylesheets: [ 'app/modules/**/*.scss', '!app/modules/rl_seeds/seeds.scss' ],
  javascripts: 'app/modules/**/*.js',
  templates: 'app/modules/**/*.html',
  index: 'app/index.html',
  statics: 'app/*.*',
  dist: 'dist',
  styleguide: {
    stylesheets: 'app/modules/rl_seeds/**/*.scss',
    index: 'app/modules/rl_seeds/index.html'
  }
};

exports.streams = {
  stylesheets: streamStylesheets,
  javascripts: streamJavascripts,
  translations: streamTranlations,
  templates: streamTemplates,
  styleguide: streamStyleguide
};

function streamStylesheets() {
  var stream = merge(
    gulp.src(paths.stylesheets),
    plugins.bowerFiles().pipe(plugins.ignore.exclude('**/*.js')))
    .pipe(plugins.sass({ errLogToConsole: !plugins.util.env.production, sourceComments: 'map', includePaths: ['app/modules', 'app/bower_components'] }))
    .pipe(plugins.autoprefixer('last 2 chrome versions', 'last 2 ff versions'));

  if (plugins.util.env.production) stream = stream
    .pipe(plugins.concat('cpi.min.css'))
    .pipe(plugins.minifyCss());

  return stream;
}

function streamJavascripts() {
  var stream = merge(
    plugins.bowerFiles().pipe(plugins.ignore.exclude('**/*.css')),
    gulp.src(paths.javascripts));

  if (plugins.util.env.production) stream = stream
    .pipe(plugins.concat('cpi.min.js', { sourceContent: true }))
    .pipe(plugins.uglify({ mangle: false }));

  return stream;
}

function streamTranlations() {
  var locales = ['en', 'pt'];
  return merge.apply(this, locales.map(function (locale) {
    return gulp.src('app/modules/**/lang-' + locale + '.json')
      .pipe(plugins.extend('lang-' + locale + '.json'));
  }));
}

function streamTemplates() {
  return gulp.src(paths.templates)
    .pipe(plugins.angularTemplatecache({ root: 'modules', module: 'templates' }));
}

function streamStyleguide() {
  var css = gulp.src(paths.styleguide.stylesheets)
    .pipe(plugins.sass({
      errLogToConsole: !plugins.util.env.production,
      sourceComments: 'map'
    }));

  var index = gulp.src(paths.styleguide.index);

  return merge(css, index);
}
