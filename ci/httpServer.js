/**
 * Host a static http server using the specified root and port.
 * This will also inject the livereload javascript automatically.
 * @param webRoot
 * @param port
 */
module.exports = function(webRoot, port) {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')());
    app.use(express.static(webRoot, {hidden: true}));
    app.listen(port);
    return app;
};