var project_files = require('../../app/.project_files');
var bower_files = require('../../app/bower_files');

module.exports = function(karma) {
    karma.set({
        basePath: '../../app',

        files: bower_files.
            concat(project_files).
            concat([
                'bower_components/angular-mocks/angular-mocks.js',
                '../test/unit/**/*.spec.js'
            ]),

        frameworks: ['jasmine'],

        autoWatch: true,

        browsers: ['PhantomJS'],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
