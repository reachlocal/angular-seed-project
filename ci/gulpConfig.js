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
    REST_SERVER_PORT: 8001,
    APPLICATION_ROOT: APPLICATION_ROOT,
    LIVERELOAD_PORT: 35729,
    PROJECT_ROOT: PROJECT_ROOT,
    APPLICATION_SCRIPTS: APPLICATION_ROOT + '/modules/**/*.js',
    APPLICATION_VIEWS: APPLICATION_ROOT + '/modules/**/*.html',
    APPLICATION_STYLES: [APPLICATION_ROOT + '/modules/**/*.scss', APPLICATION_ROOT + '/modules/**/*.css'],
    TEST_LIBRARIES: ['app/bower_components/angular-mocks/angular-mocks.js'],
    MINIFY_DESTINATION: PROJECT_ROOT + '/dist'
};

// Use this for wathcers that monitor ALL application files
config.APPLICATION_FILES = [
    config.APPLICATION_SCRIPTS,
    config.APPLICATION_VIEWS
].concat(config.APPLICATION_STYLES);

// Matchers for our bower scripts - managed by the application developers
config.BOWER_SCRIPTS = require(APPLICATION_ROOT + '/bower_scripts').map(function (file) {
    return 'app/' + file;
});
// Matchers for our bower styles - managed by the application developers
config.BOWER_CSS = require(APPLICATION_ROOT + '/bower_css').map(function (file) {
    return 'app/' + file;
});
config.APPLICATION_STYLES = config.APPLICATION_STYLES.concat(config.BOWER_CSS);

module.exports = config;