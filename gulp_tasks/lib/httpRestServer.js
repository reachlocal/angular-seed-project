var gutil = require('gulp-util');

module.exports = function() {

    // How long to delay before responding
    var delay = 500;

    var config = require('../config/config');

    /**
     * Middleware for express.
     * Respond to request with static file (in json format)
     * but delay momentarily before responding
     */
    function RESTResponder(req, res) {
        var resp = res;
        var requ = req;
        var fs = require('fs');
        fs.readFile('test/REST_mocks' + requ.path + '.json', function(err, data) {
            if (err) {
                resp.status(404);
                resp.send(err);
            } else {
                setTimeout(function() {
                    resp.set('Content-Type', 'application/json');
                    resp.send(data);
                }, delay);
            }
        });
    }

    /**
     * Middleware for express.
     * Enable CORS for this REST server.
     */
    function CORS(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    }

    gutil.log("Starting REST server running on:", gutil.colors.yellow("http://localhost:" + config.REST_SERVER_PORT));
    var REST = require('express')();
    REST.use(CORS);
    REST.use(RESTResponder);
    REST.listen(config.REST_SERVER_PORT)
        .on('error', function (err) {
            if (err.errno === 'EADDRINUSE') {
                var message = 'REST Port already in use. Is the server already running?';
                gutil.log(gutil.colors.red(message));
                throw message;
            } else {
                throw err;
            }
        });
};