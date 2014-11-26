var gulp = require('gulp');
var all = require('./support').streams;
var paths = require('./support').paths;
var merge = require('event-stream').merge;

// bowerJavascripts ============================================================ 

gulp.task('build:bowerJavascripts', function () {
  return all.bowerscripts()
    .pipe(gulp.dest(paths.dist));
});

// Stylesheets ================================================================= 

gulp.task('build:stylesheets', function () {
  return merge(all.stylesheets(), all.bowerstylesheets())
    .pipe(gulp.dest(paths.dist));
});

// Javascripts ================================================================= 

gulp.task('build:javascripts', ['build:javascripts:templates'], function () {
  return all.javascripts().pipe(gulp.dest(paths.dist));
});

// Templates ===================================================================

gulp.task('build:javascripts:templates', function () {
  return all.templates().pipe(gulp.dest(paths.dist + '/modules'));
});

// Index =======================================================================

gulp.task('build:inject:index', function () {
  var inject = require('gulp-inject');
  var ignoreList = [ '/app', '/app', '/dist'];
  var javascripts = all.javascripts(),
    bowerJavascripts = all.bowerscripts(),
    templates = all.templates(),
    stylesheets = all.stylesheets(),
    bowerStylesheets = all.bowerstylesheets();

  return gulp.src(paths.index)
    .pipe(inject(bowerJavascripts, {
      name: 'bower',
      ignorePath: ignoreList,
      addRootSlash: false
    }))
    .pipe(inject(stylesheets, {
      ignorePath: ignoreList,
      addRootSlash: false
    }))
    .pipe(inject(bowerStylesheets, {
      name: 'bower',
      ignorePath: ignoreList,
      addRootSlash: false
    }))
    .pipe(inject(templates, {
      name: 'templates',
      ignorePath: ignoreList,
      addRootSlash: false
    }))
    .pipe(inject(merge(stylesheets, javascripts), {
      ignorePath: ignoreList,
      addRootSlash: false
    }))
    .pipe(gulp.dest(paths.dist));

});

// Statics =====================================================================

gulp.task('build:statics', function () {
  var statics = paths.statics;
  return gulp.src(statics, {base: paths.app})
    .pipe(gulp.dest(paths.dist));
});

// I18N ========================================================================

gulp.task('build:i18n', function () {
  var i18nFilters = gulp.src('app/bower_components/angular-i18n/*.js')
    .pipe(gulp.dest(paths.dist + '/bower_components/angular-i18n'));
  var l10nTranslations = all.translations().pipe(gulp.dest(paths.dist + '/l10n'));
  return merge(i18nFilters, l10nTranslations);
});

// Styleguide ==================================================================

gulp.task('build:styleguide', function () {
  return all.styleguide().pipe(gulp.dest(paths.dist + '/styleguide'));
});

// Clean =======================================================================

gulp.task('clean', function () {
  var clean = require('gulp-rimraf');
  return gulp.src(paths.dist, { read: false }).pipe(clean({ force: true }));
});

// Build =======================================================================

gulp.task('build', function (done) {
  return require('run-sequence')(
    'clean',
    'build:i18n',
    'build:bowerJavascripts',
    'build:javascripts',
    'build:stylesheets',
    'build:styleguide',
    'build:statics',
    'build:inject:index',
    done
  );
});
