/**
 * ###############################
 * CONFIG
 * Configuration options for our application.
 * ###############################
 */
var APPLICATION_ROOT = __dirname + '/../app';
var config = {
    // When you run the 'serve' task, what port should we use?
    WEB_SERVER_PORT: 4000,
    APPLICATION_ROOT: APPLICATION_ROOT,
    LIVERELOAD_PORT: 35729,
    APPLICATION_SCRIPTS: APPLICATION_ROOT + '/modules/**/*.js',
    APPLICATION_VIEWS: APPLICATION_ROOT + '/modules/**/*.html',
    APPLICATION_STYLES: APPLICATION_ROOT + '/modules/**/*.scss',
    TEST_LIBRARIES: ['app/bower_components/angular-mocks/angular-mocks.js']
};

// Use this for wathcers that monitor ALL application files
config.APPLICATION_FILES = [
    config.APPLICATION_SCRIPTS,
    config.APPLICATION_VIEWS,
    config.APPLICATION_STYLES
];

//Matchers for our bower files - managed by the application developers
config.BOWER_FILES = require(APPLICATION_ROOT + '/bower_files').map(function (file) {
    return 'app/' + file;
});

module.exports = config;