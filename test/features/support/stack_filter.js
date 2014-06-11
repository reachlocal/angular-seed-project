/*
* Found this here: https://github.com/cucumber/cucumber-js/issues/157
* It makes our stack trace a little bit less verbose.
*/

var path = require('path');
var filteredPathPrefix = path.resolve(__dirname, '..', '..');
var originalPrepareStackTrace = Error.prepareStackTrace;

if (originalPrepareStackTrace) {
  Error.prepareStackTrace = function (error, stack) {
    var originalString = originalPrepareStackTrace(error, stack);
    var string = 'Error: ' + error.message + '\n';
    var lines = originalString.replace('Error: ' + error.message + '\n', '')
                              .replace(/\s*$/, '')
                              .split('\n');
    var i;
    for (i = 0; i < lines.length; i++) {
      var line = lines[i];
      var callSite = stack[i];
      if (callSite.getFileName().indexOf(filteredPathPrefix) === 0)
        string = string + line + '\n';
    }
    return string;
  };
}