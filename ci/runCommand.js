/**
 * Run the following process with the spcified options (ex: ['rm', '-r', '/']) <-- OH NO!
 * The supplied callback will be called when the process exits.
 * @param options
 * @param callback
 * @return process
 */
var child_process = require('child_process');

module.exports = function(options, callback) {

    var process = child_process.spawn('node', options)
        .on('exit', callback);
    process.stdout.on('data', function(d) {
        console.log(String(d));
    });

    process.stderr.on('data', function(d) {
        console.error(String(d));
    });

    return process;
};