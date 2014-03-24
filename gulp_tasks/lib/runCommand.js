/**
 * Run the following process with the specified options (ex: ['rm', '-r', '/']) <-- OH NO!
 * The supplied callback will be called when the process exits.
 * @param options
 * @param callback
 * @param quiet boolean     If true, suppress stdout.
 * @return process
 */
var child_process = require('child_process');
var gutil = require('gulp-util');

/**
 * Take a string that is 1+ lines long
 * Prefix each line with a colored prefix of some kind
 * Pass the color function you want to use to color your text
 * @param string
 * @param colorFunc
 */
function prettyPrint(string, colorFunc) {
    // Don't decorate anything shorter than this...
    var minLineLength = 10;
    var prefix = "--- ";
    var lines = string.split("\n");
    var prettyLines = [];
    lines.map(function(line) {
        if (line.length > minLineLength) {
            prettyLines.push(colorFunc(prefix) + line);
        } else {
            prettyLines.push(line);
        }
    });
    return prettyLines.join("\n");
}

module.exports = function(options, callback, quiet) {

    var cProcess = child_process.spawn('node', options);
    if (!!callback) {
        cProcess.on('exit', callback);
    }
    if (!quiet) {
        cProcess.stdout.on('data', function(d) {
            process.stdout.write(String(d), gutil.colors.blue);
        });

        cProcess.stderr.on('data', function(d) {
            process.stderr.write(prettyPrint(String(d), gutil.colors.red));
        });
    }

    return cProcess;
};