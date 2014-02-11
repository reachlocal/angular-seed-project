module.exports = function() {

    // How long to delay before responding
    var delay = 500;

    var config = require('./gulpConfig');

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

    var REST = require('express')();
    REST.use(CORS);
    REST.use(RESTResponder);
    REST.listen(config.REST_SERVER_PORT);
};