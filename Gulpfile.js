/**
 * This file imports and bundles gulp tasks defined in the gulp_tasks directory
 * By convention - tasks defined in this file are only bundles of other tasks
 */
try {
    var gulp = require('gulp');
    var seq = require('run-sequence');
    require('require-dir')('./gulp_tasks');

    gulp.task('default', function gulpDefault(done) {
        seq(
            'lint:failhard',
            'build',
            'test',
            'test:fail_on_skipped',
            done
        );
    });

    gulp.task('pre-commit', function preCommit(done) {
        seq(
            'lint:failhard',
            'build',
            'test:fail_on_skipped',
            'test:unit',
            'test:integration',
            done
        );
    });

    gulp.task('pre-push', function prePush(done) {
        seq(
            'lint:failhard',
            'build',
            'test:fail_on_skipped',
            'test:cucumber-stub',
            done
        );
    });

    gulp.task('ci', function gulpDefault(done) {
        var seq = require('run-sequence');
        seq(
            'build',
            'test:fail_on_skipped',
            'lint:failhard',
            'test:unit',
            'test:integration',
            'test:cucumber-ci',
            done
        );
    });
} catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
        console.log("#########################################");
        console.log("You are missing some node modules...");
        console.log("Please run 'npm install', then try again.");
        console.log("#########################################");
        throw err;
    }
}
