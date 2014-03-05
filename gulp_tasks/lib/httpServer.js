var gutil = require('gulp-util');

/**
 * Host a static http server using the specified root and port.
 * This will also inject the livereload javascript automatically.
 * @param webRoot
 * @param port
 */
module.exports = function (webRoot, port) {
    var express = require('express');
    var app = express();
    gutil.log("Starting web server running on:", gutil.colors.yellow("http://localhost:" + port));
    app.use(require('connect-livereload')())
        .use(express.static(webRoot, {hidden: true}))
        .listen(port)
        .on('error', function (err) {
            if (err.errno === 'EADDRINUSE') {
                var message = 'APP Port already in use. Is the server already running?';
                gutil.log(gutil.colors.red(message));
                throw message;
            } else {
                throw err;
            }
        });
    return app;
};