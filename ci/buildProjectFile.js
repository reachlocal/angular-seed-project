/**
 * Async scan application directory for js files.
 * Push array of files to the .project_files.js file.
 * @returns promise
 */
module.exports = function () {
    var config = require('./gulpConfig');
    var deferred = require('q').defer();
    var glob = require('glob');
    // Search for project files
    glob(config.APPLICATION_SCRIPTS, {}, function (err, project_files) {
        if (err) {
            deffered.reject('Could not glob-search for project files. ' + err.message);
        } else {
            // Make the file paths relative
            var path = require('path');
            for (var i = 0; i < project_files.length; i++) {
                project_files[i] = path.relative(config.APPLICATION_ROOT, project_files[i]);
            }

            // Write to file.
            project_files = JSON.stringify(project_files);
            require('fs').writeFile(config.APPLICATION_ROOT + '/.project_files.json', project_files, function(err) {
                if (err) {
                    deferred.reject('Could not build project files.' + err.message);
                } else {
                    deferred.resolve();
                }
            });
        }
    });
    return deferred.promise;
};