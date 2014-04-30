try {
    var gulp = require('gulp');
    require('require-dir')('./gulp_tasks');

    gulp.task('default', function gulpDefault(done) {
        var seq = require('run-sequence');
        seq(
            'build',
            'test',
            'test:fail_on_skipped',
            'lint:failhard',
            done
        );
    });

    gulp.task('ci', function gulpDefault(done) {
        var seq = require('run-sequence');
        seq(
            'build',
            //'test-ci',
            'test:unit',
            'test:integration',
            'test:fail_on_skipped',
            'lint:failhard',
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
