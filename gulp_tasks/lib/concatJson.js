var through = require('through');
var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;

module.exports = function (fileName, opt) {
    if (!fileName) throw new PluginError('gulp-concat-json', 'Missing fileName option for gulp-concat-json');
    if (!opt) opt = {};
    if (!opt.newLine) opt.newLine = gutil.linefeed;

    var buffer = {};
    var firstFile = null;

    function bufferContents(file) {
        if (file.isNull()) return; // ignore
        if (file.isStream()) return this.emit('error', new PluginError('gulp-concat-json', 'Streaming not supported'));

        if (!firstFile) firstFile = file;

        var translation = file.contents.toString('utf8');
        try {
            translation = JSON.parse(translation);
        } catch (err) {
            err.fileName = file.path;
            err.message += "\nIn source file: " + file.path;
            throw err;
        }
        for (var key in translation) {
            buffer[key] = translation[key];
        }
    }

    function endStream() {
        if (!firstFile) {
            gutil.log(gutil.colors.red(buffer));
        }
        var joinedPath = path.join(firstFile.base, fileName);

        var joinedContents = JSON.stringify(buffer);
        var joinedFile = new File({
            cwd: firstFile.cwd,
            base: firstFile.base,
            path: joinedPath,
            contents: new Buffer(joinedContents)
        });

        this.emit('data', joinedFile);
        this.emit('end');
    }

    return through(bufferContents, endStream);
};