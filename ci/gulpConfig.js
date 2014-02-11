/**
 * ###############################
 * CONFIG
 * Configuration options for our application.
 * ###############################
 */
var PROJECT_ROOT = __dirname + '/..';
var APPLICATION_ROOT = PROJECT_ROOT + '/app';
var config = {
    WEB_SERVER_PORT: 4000,
    REST_SERVER_PORT: 3000,
    APPLICATION_ROOT: APPLICATION_ROOT,
    LIVERELOAD_PORT: 35729,
    PROJECT_ROOT: PROJECT_ROOT,
    APPLICATION_SCRIPTS: APPLICATION_ROOT + '/modules/**/*.js',
    APPLICATION_VIEWS: APPLICATION_ROOT + '/modules/**/*.html',
    APPLICATION_STYLES: APPLICATION_ROOT + '/modules/**/*.scss',
    TEST_LIBRARIES: ['app/bower_components/angular-mocks/angular-mocks.js'],
    MINIFY_DESTINATION: PROJECT_ROOT + '/dist'
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