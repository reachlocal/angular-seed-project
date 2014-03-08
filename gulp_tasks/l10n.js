var lrServer = global.lrServer;

var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('./config/config');
var refresh = require('gulp-livereload');

/**
 * Concat translation files for each language
 **/
gulp.task('l10n', ['l10n:support'], function () {
    var eventStream = require('event-stream');
    var concatJson = require('./lib/concatJson');

    // Create all the streams for our supported locales
    var jsonStreams = [];
    gutil.log('Building l10n files for locales specified in gulp\'s config.js:', gutil.colors.yellow(config.LOCALES));
    for (var i in config.LOCALES) {
        var locale = config.LOCALES[i];
        var l10nPipe = gulp.src(config.APPLICATION_ROOT + '/modules/**/lang-' + locale + '.json')
            .pipe(concatJson('lang-' + locale + '.json'))
            .pipe(gulp.dest(config.APPLICATION_ROOT + '/.l10n/'))
            .pipe(gulp.dest(config.MINIFY_DESTINATION + '/.l10n/'))
            .pipe(refresh(lrServer));
        jsonStreams.push(l10nPipe);
    }

    // Group them and return them
    return eventStream.concat.apply(this, jsonStreams);
});

// Copy supporting, lazy-loaded files for l10n
gulp.task('l10n:support', function () {
    var supportFiles = [
        config.APPLICATION_ROOT + '/bower_components/angular-i18n/*.js'
    ];
    return gulp.src(supportFiles)
        .pipe(gulp.dest(config.MINIFY_DESTINATION + '/bower_components/angular-i18n'));
});

// Setup test stubs for translations
gulp.task('l10n:testify', ['l10n'], function () {
    var deferred = require('q').defer();
    var fs = require('fs');
    fs.readFile(config.APPLICATION_ROOT + '/.l10n/lang-en.json', function(err, data) {
        if (err) {
            gutil.log(gutil.colors.red("Could not build test l10n files."));
            deferred.reject();
            throw err;
        } else {
            data = "// This file is generated automatically by the gulp l10n:testify task.\n" +
                "// Do not edit it.\n" +
                'var translations = ' + data + ';';
            fs.writeFile('test/helpers/l10n.js', data, function () {
                if (err) {
                    gutil.log(gutil.colors.red("Could not write test l10n file."));
                    deferred.reject();
                    throw err;
                } else {
                    deferred.resolve();
                }
            });
        }
    });
    return deferred.promise;
});