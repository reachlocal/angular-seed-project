/**
 * ###############################
 * CONFIG
 * Configuration options for our application.
 * ###############################
 */
var PROJECT_ROOT = __dirname + '/..';
var APPLICATION_ROOT = PROJECT_ROOT + '/app';
var config = {
    // When you run the 'serve' task, what port should we use?
    WEB_SERVER_PORT: 4001,
    APPLICATION_ROOT: APPLICATION_ROOT,
    LIVERELOAD_PORT: 35729,
    APPLICATION_VIEWS: APPLICATION_ROOT + '/**/*.html',
    ALL_STYLES: APPLICATION_ROOT + '/**/*.scss',
    APPLICATION_STYLES: APPLICATION_ROOT + '/sass/rl_bootstrap.scss',
    MINIFY_DESTINATION: PROJECT_ROOT + '/dist'
};

// Use this for wathcers that monitor ALL application files
config.APPLICATION_FILES = [
    config.APPLICATION_VIEWS,
    config.APPLICATION_STYLES
];

module.exports = config;
