/**
 * Simple method for setting the config.js symlink for a particular environment
 * Pass the environment name:  'development', 'qa', 'production'...
 * @param environment String
 * @return void
 **/
module.exports = function configForEnvironment(environment) {
  var paths = require('../support').paths;
  var fs = require('fs');
  var sourcePath = 'configs/' + environment + '.js';
  var destPath   = paths.dist + '/config.js';
  fs.unlinkSync(destPath);
  fs.symlinkSync(sourcePath, destPath);
};
