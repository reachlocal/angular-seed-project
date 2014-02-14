/**
 * Run the following process with the spcified options (ex: ['rm', '-r', '/']) <-- OH NO!
 * The supplied callback will be called when the process exits.
 * @param options
 * @param callback
 * @param quiet boolean     If true, suppress stdout.
 * @return process
 */
var child_process = require('child_process');

module.exports = function(options, callback, quiet) {

    var cProcess = child_process.spawn('node', options)
        .on('exit', callback);
    if (!quiet) {
        cProcess.stdout.on('data', function(d) {
            process.stdout.write(String(d));
        });
    }

    cProcess.stderr.on('data', function(d) {
        process.stderr.write(String(d));
    });

    return cProcess;
};